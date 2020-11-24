import React from 'react';
import Square, { mark } from 'components/square';
import styled from 'styled-components';
import 'index.css';

export type board = mark[];

type props = {
  squares: board,
  onClick: (n: number) => void
}

const Board = (props: props) => {
  const BoardRaw = styled.div`
  ::after {
    clear: both;
    content: "";
    display: table;
  }
`

  const { squares, onClick } = props;

  const boardNumbers = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ] as readonly number[][];

  return (
    <div>
      {boardNumbers.map((row) => {
        return <BoardRaw>
          {row.map((index) => {
            return <Square value={squares[index]} onClick={() => onClick(index)}/>
          })}
        </BoardRaw>
      })}
    </div>
  );
}

export default Board;
