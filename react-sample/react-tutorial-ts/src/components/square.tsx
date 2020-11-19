import React, { FC, MouseEvent } from 'react';

type Props = {
  onClick: (e: MouseEvent) => void,
  value: string
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
