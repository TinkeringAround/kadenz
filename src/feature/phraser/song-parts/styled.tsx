import styled from 'styled-components';

import { noScrollbar } from '../../../scrollbar';

export const SParts = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden auto;

  ${noScrollbar};

  header {
    position: sticky;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding-bottom: 1rem;

    background: ${({ theme: { light } }) => light};

    box-sizing: border-box;
    z-index: 5;

    .song-name {
      width: calc(100% - 8rem);
      height: 100%;

      margin: 0;
      padding: 1rem;

      font-size: 2.5rem;
      background: transparent;
      border-radius: 3px;
      border: 3px solid transparent;
      outline: none;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      transition: background 0.15s ease-in-out, border 0.15s ease-in-out;
      box-sizing: border-box;

      &:hover {
        background: ${({ theme: { white } }) => white};
      }

      &:focus {
        background: ${({ theme: { white } }) => white};
        border: 3px solid ${({ theme: { yellow } }) => yellow};
      }
    }

    .icon {
      width: 3rem;
      height: 3rem;

      font-size: 1.5rem;
      background: ${({ theme: { grey } }) => grey};
      border-radius: 3px;

      transition: background 0.2s ease-in-out;

      &:hover {
        background: ${({ theme: { yellow } }) => yellow};
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: calc(6px + 6.5rem);

    > button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      color: ${({ theme: { grey } }) => grey};
      background: transparent;
      font-size: 1rem;
      border-radius: 3px;
      border: none;
      outline: none;

      cursor: pointer;
      transition: color 0.15s ease-in-out, background 0.15s ease-in-out;

      &:hover {
        color: ${({ theme: { black } }) => black};
        background: ${({ theme: { white } }) => white};
      }
    }
  }
`;
