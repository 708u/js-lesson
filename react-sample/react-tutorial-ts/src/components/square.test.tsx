import React from 'react';
import Square, { SquareBtn } from './square';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('square test', () => {
  it('should render as expected components', () => {
    const component = renderer.create(
      <Square value={'X'} onClick={() => {}}/>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('has button', () => {
    const buttonWrapper = shallow(<Square value={'X'} onClick={() => {}}/>).find(SquareBtn);
    expect(buttonWrapper).toHaveLength(1);
  })
})

