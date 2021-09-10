import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Rhyme } from '../../../../../store/phraser/types';

import SongPartRhyme from './index';

import { AppMock, DragDropDroppableWrapper } from '../../../../../mock/components';
import { getRhymeMock } from '../../../../../mock/phraser';

describe('SongPartRhyme', () => {
  const SongPartRhymeInApp = (rhyme: Rhyme, index: number = 0) => (
    <AppMock>
      <DragDropDroppableWrapper>
        <SongPartRhyme rhyme={rhyme} index={index} />
      </DragDropDroppableWrapper>
    </AppMock>
  );

  test('should select vocals highlighting when vocal highlighting button clicked', () => {
    const rhyme = getRhymeMock();
    render(SongPartRhymeInApp(rhyme, 0));

    const textIcon = document.querySelector('.icon-text');
    if (textIcon) {
      fireEvent.click(textIcon);
    }

    const selectedButton = document.querySelector('.selected');
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton?.querySelector('.icon-text')).toBeInTheDocument();
  });

  test('should deselect vocals highlighting when vocal highlighting button is selected and clicked again', () => {
    const rhyme = getRhymeMock();
    render(SongPartRhymeInApp(rhyme, 0));

    const textIcon = document.querySelector('.icon-text');
    if (textIcon) {
      fireEvent.click(textIcon);
      fireEvent.click(textIcon);
    }

    const selectedButton = document.querySelector('.selected');
    expect(selectedButton).not.toBeInTheDocument();
  });
});
