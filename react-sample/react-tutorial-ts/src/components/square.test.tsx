import Square from './square';
import renderer from 'react-test-renderer';

describe('square test', () => {
  it('should render as expected components', () => {
    const component = renderer.create(
      <Square value={'X'} onClick={() => {}}/>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})

