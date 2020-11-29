import React, { MouseEvent } from 'react';
import Square, { mark } from 'components/square';
import styled from 'styled-components';
import 'index.css';

export type board = mark[];

type props = {
  squares: board,
  onClick: (n: number) => (e: MouseEvent<HTMLButtonElement>) => void
};

type LocationIndex = '1-1' | '1-2' | '1-3' | '2-1' | '2-2' | '2-3' | '3-1' | '3-2' | '3-3';

const LocationMap: Map<LocationIndex, {
  row: number;
  col: number;
}> = new Map([
  ['1-1', { row: 1, col: 1 }],
  ['1-2', { row: 1, col: 2 }],
  ['1-3', { row: 1, col: 3 }],
  ['2-1', { row: 2, col: 1 }],
  ['2-2', { row: 2, col: 2 }],
  ['2-3', { row: 2, col: 3 }],
  ['3-1', { row: 3, col: 1 }],
  ['3-2', { row: 3, col: 2 }],
  ['3-3', { row: 3, col: 3 }],
]);

const Board = (props: props) => {
  const BoardRaw = styled.div`
  ::after {
    clear: both;
    content: "";
    display: table;
  }
`;

  const { squares, onClick } = props;

  const boardNumbers: {
    location: LocationIndex;
    id: number;
  }[][] = [
    [
      {
        location: '1-1',
        id: 0,
      },
      {
        location: '1-2',
        id: 1,
      },
      {
        location: '1-3',
        id: 2,
      },
    ],
    [
      {
        location: '2-1',
        id: 3,
      },
      {
        location: '2-2',
        id: 4,
      },
      {
        location: '2-3',
        id: 5,
      },
    ],
    [
      {
        location: '3-1',
        id: 6,
      },
      {
        location: '3-2',
        id: 7,
      },
      {
        location: '3-3',
        id: 8,
      },
    ],
  ];

  return (
    <div>
      {boardNumbers.map((row, index) => (
        <BoardRaw>
          {row.map((value) => <Square name={value.location} testId={value.id} value={squares[value.id]} onClick={onClick(value.id)} />)}
        </BoardRaw>
      ))}
    </div>
  );
};

export type {
  LocationIndex,
};

export {
  LocationMap,
};

export default Board;
