import React, { useState, MouseEvent, FC } from 'react';
import Board, { board, LocationMap, LocationIndex } from 'components/board';
import { mark } from 'components/square';
import History, { History as HistoryType, squares } from 'components/history';
import styled from 'styled-components';
import 'index.css';

const Game: FC = () => {
  const View = styled.div`
    flex-direction: row;
    display: flex;
    font: 14px 'Century Gothic', Futura, sans-serif;
    margin: 20px;
  `;

  const GameInfo = styled.div`
    margin-left: 20px;
  `;

  const [history, setHistory] = useState<HistoryType>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const current = history[stepNumber];

  const gameIsOverPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const;

  const calculateWinner = (squares: board): mark => {
    for (let i = 0; i < gameIsOverPatterns.length; i++) {
      // 0, 1, 2
      const [a, b, c] = gameIsOverPatterns[i];
      // X, null, X
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // 勝利したマークを返却する
      }
    }
    return null; // 勝負が終わってなければnull
  };

  const handleClick = ({ history }: { history: Array<squares> }) => (i: number) => (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    // すべての盤面履歴取得
    // history = [{hist1}, {hist2}]
    const newHistory = history.slice(0, stepNumber + 1);
    // 盤面全体を保持するobject取得
    // { squares: Array(9)}
    const current = newHistory[newHistory.length - 1];
    // 現在の盤面を取得しつつ、インスタンスを新規に作成
    // ['', 'X', ...];
    const squares = current.squares.slice();

    // クリックした点で勝利した人がいたらゲームを早期終了
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 盤面にマークをセット
    squares[i] = xIsNext ? 'X' : 'O';

    const position = e.currentTarget.name as LocationIndex;

    // state更新
    setHistory(
      newHistory.concat([
        {
          squares,
          position: LocationMap.get(position),
        },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => () => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const getStatus = () => {
    const winner = calculateWinner(current.squares);
    return winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <View>
      <Board
        squares={current.squares}
        onClick={handleClick({
          history,
          setHistory,
          setStepNumber,
          setXIsNext,
        })}
      />
      <GameInfo>
        <GameInfo>{getStatus()}</GameInfo>
        <History history={history} current={stepNumber} onClick={jumpTo} />
      </GameInfo>
    </View>
  );
};

export default Game;
