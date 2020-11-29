import React from 'react';
import renderer from 'react-test-renderer';
import History, { history } from 'components/history';

describe('history component test', () => {
  it('should be same as a previous snapshot.', () => {
    const history: history = [
      { squares: [null, null, null, null, null, null, null, null, null] },
      {
        squares: ['O', null, null, null, null, null, null, null, null],
        position: { row: 1, col: 1 },
      },
      {
        squares: ['O', 'X', null, null, null, null, null, null, null],
        position: { row: 1, col: 2 },
      },
    ];
    const component = renderer.create(
      <History history={history} current={0} onClick={() => () => true} />
    );
    expect(component.toJSON()).toMatchSnapshot();

    // determine if current has applied.
    const secondComponent = renderer.create(
      <History history={history} current={2} onClick={() => () => true} />
    );

    expect(secondComponent.toJSON()).toMatchSnapshot();
  });
});
