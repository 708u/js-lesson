import renderer from 'react-test-renderer';
import React, { MouseEvent } from 'react';
import Board from 'components/board';
import { mark } from 'components/square';

describe('testing board components', () => {
  it('should be same as a previous snapshot.', () => {
    const squares: mark[] = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const onClick = (i: number) => (e: MouseEvent<HTMLButtonElement>) => true;
    const component = renderer.create(<Board squares={squares} onClick={onClick} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
