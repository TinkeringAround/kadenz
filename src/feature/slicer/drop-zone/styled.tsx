import styled from 'styled-components';

import { fadeIn } from '../../../animations';
import { noScrollbar } from '../../../scrollbar';

export const SDropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2rem;

  height: 100%;
  width: 100%;

  box-sizing: border-box;
  outline: none;

  h1 {
    width: 100%;
    margin: 0;
    padding: 0 0 1rem 0;

    font-family: 'Mono', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
  }
`;

export const SResizableOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: ${({ theme: { hexToRgbA, white } }) => hexToRgbA(white, '0.8')};
  animation: fadeIn 0.15s ease-in-out;

  z-index: 5;

  ${fadeIn};
`;

export const SDropZoneFiles = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden auto;

  ${noScrollbar};
`;

export const SAudioInput = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80px;
  width: 80%;

  margin: 2rem 0;
  border-radius: 2px;

  font-family: 'Roboto-Bold', sans-serif;
  font-size: 0.9rem;
  background: ${({ theme: { yellow } }) => yellow};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.7')};
  }

  .icon {
    font-size: 1.25rem;
    margin-right: 0.75rem;
  }
`;
