import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

export type mark = 'O' | 'X' | null;

export const SquareBtn = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`;

type Props = {
  onClick: (e: MouseEvent) => void,
  id: number,
  value: mark
}

const Square: FC<Props> = (props) => {
  const { onClick, id, value } = props;
  return (
    <SquareBtn id={`btn-${id}`} onClick={ onClick }>
      { value }
    </ SquareBtn>
  );
}

export default Square;
