import React, { FC } from 'react';
import { board } from 'components/board';
import styled from 'styled-components';

export type Position = {
  col: number,
  row: number,
};

export type squares = {
  squares: board,
  position?: Position
};

export type history = squares[];

type Props = {
  history: history;
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
      {history.map((history, move) => (
        <li key={move}>
          <button onClick={onClick(move)} className={current === move ? 'btn-bold' : ''}>
            {move ? `Go to move #${move}. [row: ${history.position?.row}, col: ${history.position?.col}]` : 'Go to game start'}
          </button>
        </li>
      ))}
    </HistoryList>
  );
};

export default History;
