import React, { FC, MouseEvent } from 'react';

export type square = 'O' | 'X' | null;

type Props = {
  onClick: (e: MouseEvent) => void,
  value: square
}

const Square: FC<Props> = (props) => {
  const { onClick, value } = props;
  return (
    <button className="square" onClick={ onClick }>
      { value }
    </button>
  );
}

export default Square;
