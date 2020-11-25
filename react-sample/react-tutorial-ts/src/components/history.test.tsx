import React from 'react';
import renderer from 'react-test-renderer';
import History, { history } from 'components/history'

describe('history component test', () => {
  it('should be same as a previous snapshot.', () => {
    const history: history = [
      { squares: [null, null, null,null, null, null,null, null, null] },
      { squares: ['O', 'X', null,null, null, null,null, null, null] },
    ];
    const component = renderer.create(
      <History
        history={history}
        onClick={() =>  () => true}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
