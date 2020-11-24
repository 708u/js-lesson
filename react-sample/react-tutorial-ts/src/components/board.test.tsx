import renderer from 'react-test-renderer';
import React from 'react';
import Board from 'components/board';
import { mark } from './square';

describe('testing board components', () => {
  it('should be same as a previous snapshot.', () => {
      const squares: mark[] = [
        'O', 'X','O', 'X','O', 'X','O', 'X','O'
      ];

      const onClick = (i: number): void => { return };
      const component = renderer.create(
        <Board squares={squares} onClick={onClick}/>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });
});
