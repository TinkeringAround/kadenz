import React, { FC, useCallback, useEffect, useState } from 'react';

import { calculateDrawingPoints } from './util';
import { useSlicer } from '../../../../store/slicer';
import { useClientRect } from '../../../../hook/useClientRect';
import { findAbsoluteMax, sampleChannelData } from '../../../../lib/audio';
import { selectSlicerFile } from '../../../../store/slicer/selector';
import { updateSlicerSelection } from '../../../../store/slicer/actions';
import { useRefCallback } from '../../../../hook/useRefCallback';
import { useDebounce } from '../../../../hook/useDebounce';

import Timeline from './timeline';
import Audio from './audio';

import { SDrawing } from './styled';

const PADDING = 70;
const UNDEFINED = 1;
const DELAY = 100;

interface Props {
  zoom: number;
}

const Drawing: FC<Props> = ({ zoom }) => {
  const { samples } = useSlicer();
  const { channelData, buffer } = useSlicer(selectSlicerFile);
  const { ref, setRef } = useRefCallback();
  const { rect } = useClientRect(ref, true);

  const [baseHeight, setBaseHeight] = useState<number>(UNDEFINED);
  const [baseWidth, setBaseWidth] = useState<number>(UNDEFINED);
  const [sample, setSample] = useState<number[]>([]);
  const [maxAmplitude, setMaxAmplitude] = useState<number>(UNDEFINED);
  const [points, setPoints] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);

  const debouncedOffset = useDebounce<number>(offset, DELAY);

  const updateOffset = useCallback(
    event => {
      // update scroll left as duration offset
      // @ts-ignore
      const { scrollLeft } = event.target;
      setOffset((buffer.duration * scrollLeft) / (baseWidth * zoom));
    },
    [buffer, baseWidth, zoom]
  );

  useEffect(() => {
    // calculate samples from channelData
    setSample(sampleChannelData(channelData[0], samples));
  }, [channelData, samples, setSample]);

  useEffect(() => {
    // max absolute amplitude of data array
    setMaxAmplitude(findAbsoluteMax(sample));
  }, [sample, setMaxAmplitude]);

  useEffect(() => {
    // set initial base width for svg
    rect && setBaseWidth(rect.width);
  }, [rect, setBaseWidth]);

  useEffect(() => {
    // set initial base height for svg
    rect && setBaseHeight(rect.height);
  }, [rect, baseHeight, setBaseWidth]);

  useEffect(() => {
    // update points and svg width on zoom change
    if (sample.length === 0 || maxAmplitude === UNDEFINED) {
      return;
    }

    if (baseWidth !== UNDEFINED) {
      const maxHeight = Math.floor(rect.height / 2);
      const stepWidth = (baseWidth * zoom) / samples;
      setPoints(calculateDrawingPoints(sample, maxAmplitude, stepWidth, maxHeight, PADDING));
    }
  }, [rect, sample, maxAmplitude, samples, zoom, baseWidth, setPoints]);

  useEffect(() => {
    updateSlicerSelection({ offset: debouncedOffset });
  }, [debouncedOffset]);

  return (
    <SDrawing role="drawing" ref={setRef} onScroll={updateOffset}>
      <Audio points={points} zoom={zoom} height={baseHeight} />
      <Timeline
        duration={buffer.duration}
        zoom={zoom}
        height={baseHeight}
        width={baseWidth} // Border width left and right
      />
    </SDrawing>
  );
};

export default Drawing;
