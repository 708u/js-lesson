import React from 'react';
import renderer from 'react-test-renderer';
import Game from 'components/game';

describe('game component test', () => {
  it('should be same as a previous snapshot.', () => {
    const component = renderer.create(
      <Game />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

