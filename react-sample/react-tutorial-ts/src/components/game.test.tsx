import React from 'react';
import renderer from 'react-test-renderer';
import {
  render, cleanup, screen, fireEvent,
} from '@testing-library/react';
import Game from 'components/game';

afterEach(cleanup);

describe('game component test', () => {
  it('should be same as a previous snapshot.', () => {
    const component = renderer.create(
      <Game />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should progress normal scenario', () => {
    render(<Game />);

    const playerXMsg = 'Next player: X';
    const playerOMsg = 'Next player: O';
    // first requirements.
    screen.getByText('Go to game start');
    screen.getByText(playerXMsg);
    expect(screen.queryByText(playerOMsg)).toBeNull();

    // progress first turn.
    fireEvent.click(screen.getByTestId('btn-0'));
    // reverse next player
    screen.getByText(playerOMsg);
    expect(screen.queryByText(playerXMsg)).toBeNull();
    // Go to this turn button was appeared.
    const expectedFirstHistoryStr = 'Go to move #1. [row: 1, col: 1]';
    screen.getByText(expectedFirstHistoryStr);

    // progress second turn.
    fireEvent.click(screen.getByTestId('btn-1'));
    // reverse next player
    screen.getByText(playerXMsg);
    expect(screen.queryByText(playerOMsg)).toBeNull();
    // Go to this turn button was appeared.
    const expectedSecondHistoryStr = 'Go to move #2. [row: 1, col: 2]';
    screen.getByText(expectedSecondHistoryStr);

    // time travel to first turn
    fireEvent.click(screen.getByText(expectedFirstHistoryStr));
    screen.getByText(playerOMsg);
    expect(screen.queryByText(playerXMsg)).toBeNull();
    // can go to current turn
    screen.getByText(expectedSecondHistoryStr);
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
      'btn-2',
    ];
      // progress first turn.
    clicks.forEach((click) => fireEvent.click(screen.getByTestId(click)));

    // Winner comment was appeared.
    expect(screen.getByText('Winner: X')).toBeTruthy();
  });
});
