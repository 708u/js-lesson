import React, { FC } from 'react';
import { board } from 'components/board';
import styled from 'styled-components';

export type Position = {
  col: number;
  row: number;
};

export type squares = {
  squares: board;
  position?: Position;
};

export type History = squares[];

type Props = {
  history: History;
  current: number;
  onClick: (move: number) => () => void;
};

const History: FC<Props> = (props) => {
  const HistoryList = styled.ol`
    padding-left: 30px;
  `;

  const { history, onClick, current } = props;

  return (
    <HistoryList>
      {history.map((h, move) => (
        <li key={move}>
          <button
            type="button"
            onClick={onClick(move)}
            className={current === move ? 'btn-bold' : ''}
          >
            {move
              ? `Go to move #${move}. [row: ${h.position?.row}, col: ${h.position?.col}]`
              : 'Go to game start'}
          </button>
        </li>
      ))}
    </HistoryList>
  );
};

export default History;
