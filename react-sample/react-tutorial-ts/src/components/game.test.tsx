import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Game from 'components/game';

afterEach(cleanup);

describe('game component test', () => {
  it('should be same as a previous snapshot.', () => {
    const component = renderer.create(
      <Game />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should progress normal scenario', () => {
      render(<Game />);

      // first requirements.
      screen.getByText('Go to game start');
      screen.getByText('Next player: X');
      expect(screen.queryByText('Next player: O')).toBeNull();

      // progress first turn.
      fireEvent.click(screen.getByTestId('btn-0'));
      // reverse next player
      screen.getByText('Next player: O');
      expect(screen.queryByText('Next player: X')).toBeNull();
      // Go to this turn button was appeared.
      screen.getByText('Go to move #1');

      // progress second turn.
      fireEvent.click(screen.getByTestId('btn-1'));
      // reverse next player
      screen.getByText('Next player: X');
      expect(screen.queryByText('Next player: O')).toBeNull();
      // Go to this turn button was appeared.
      screen.getByText('Go to move #2');

      // time travel to first turn
      fireEvent.click(screen.getByText('Go to move #1'));
      screen.getByText('Next player: O');
      expect(screen.queryByText('Next player: X')).toBeNull();
      // can go to current turn
      screen.getByText('Go to move #2');
      // button 1 value is gone.
      expect(screen.getByTestId('btn-1')).toBeEmptyDOMElement();
  });

  it('should win the X player', () => {
      render(<Game />);
      const clicks = [
        'btn-0',
        'btn-7',
        'btn-1',
        'btn-8',
        'btn-2'
      ];
      // progress first turn.
      clicks.forEach((click) => fireEvent.click(screen.getByTestId(click)));

      // Winner comment was appeared.
      expect(screen.getByText('Winner: X')).toBeTruthy();
  })
});

