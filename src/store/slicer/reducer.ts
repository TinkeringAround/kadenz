import { ToneAudioBuffer } from 'tone';

import { ACTION } from '../action-types';
import { INITIAL_SELECTION, useSlicer } from './index';
import {
  AddSlicerFilesPayload,
  RemoveSlicerFilePayload,
  SlicerAudioFile,
  SlicerAudioFileLoadedPayload,
  UpdateSlicerSelectionPayload
} from './types';
import { addNotification } from '../notification/actions';

const { on } = window.electron;

// ==============================================================
export const addSlicerFilesRecipe = (_: null, { files }: AddSlicerFilesPayload) => {
  const { update, files: slicerFiles } = useSlicer.getState();
  const currentFileNames = slicerFiles.map(file => file.name);
  const newFiles = files.filter(file => !currentFileNames.includes(file.name));

  update({
    files: [...slicerFiles, ...newFiles]
  });
};

export const removeSlicerFileRecipe = (_: null, { file }: RemoveSlicerFilePayload) => {
  const { update, files: currentFiles, file: selectedFile } = useSlicer.getState();

  const files = currentFiles.filter(f => f.name !== file.name);
  const fileIsSelection = selectedFile && selectedFile.name === file.name;

  const optionalUpdate = fileIsSelection ? { file: null, selection: INITIAL_SELECTION } : {};

  update({ files, ...optionalUpdate });
};

export const slicerFileLoadedRecipe = (
  _: null,
  { file, error, channelData }: SlicerAudioFileLoadedPayload
) => {
  const { update } = useSlicer.getState();
  const loadedSlicerAudioFile: SlicerAudioFile = {
    ...file,
    channelData: channelData,
    buffer: ToneAudioBuffer.fromArray(channelData)
  };

  if (error) addNotification({ content: error, type: 'error', show: true });

  update({
    file: loadedSlicerAudioFile,
    selection: {
      start: 0,
      end: 0,
      offset: 0,
      zoom: 1
    }
  });
};

export const updateSlicerSelectionRecipe = (
  _: null,
  { end, offset, zoom, start }: UpdateSlicerSelectionPayload
) => {
  const { update, selection } = useSlicer.getState();
  const isDirty =
    (end && end !== selection.end) ||
    (offset && offset !== selection.offset) ||
    (start && start !== selection.start) ||
    (zoom && zoom !== selection.zoom);

  if (isDirty) {
    update({
      selection: {
        start: start ?? Math.max(0, selection.start),
        end: end ?? Math.max(0, selection.end),
        offset: offset ?? selection.offset,
        zoom: zoom ?? selection.zoom
      }
    });
  }
};

// ==============================================================
on(ACTION.addSlicerFiles, addSlicerFilesRecipe);
on(ACTION.removeSlicerFile, removeSlicerFileRecipe);
on(ACTION.slicerFileLoaded, slicerFileLoadedRecipe);
on(ACTION.updateSlicerSelection, updateSlicerSelectionRecipe);
