import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
  const { onClick, value } = props;
  return (
    <button className="square" onClick={ onClick }>
      { value }
    </button>
  );
}

const Board = (props) => {
  const { squares, onClick } = props;
  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => onClick(0)}/>
        <Square value={squares[1]} onClick={() => onClick(1)}/>
        <Square value={squares[2]} onClick={() => onClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => onClick(3)}/>
        <Square value={squares[4]} onClick={() => onClick(4)}/>
        <Square value={squares[5]} onClick={() => onClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => onClick(6)}/>
        <Square value={squares[7]} onClick={() => onClick(7)}/>
        <Square value={squares[8]} onClick={() => onClick(8)}/>
      </div>
    </div>
  );
}

const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const current = history[stepNumber];

  const handleClick = (i) => {
    // すべての盤面履歴取得
    // history = [{hist1}, {hist2}]
    const historyCopy = history.slice(0, stepNumber + 1);
    // 盤面全体を保持するobject取得
    // { squares: Array(9)}
    const current = historyCopy[historyCopy.length - 1];
    // 現在の盤面を取得しつつ、インスタンスを新規に作成
    // ['', 'X', ...];
    const squares = current.squares.slice();

    // クリックした点で勝利した人がいたらゲームを早期終了
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 盤面にマークをセット
    squares[i] = xIsNext ? 'X' : 'O';

    // state更新
    setHistory(historyCopy.concat([{
        squares: squares,
      }]));
    setStepNumber(historyCopy.length);
    setXIsNext(! xIsNext);
  };

  const jumpTo = (step) => () => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const getStatus = () => {
    // TODO: change useState
    const winner = calculateWinner(current.squares);
    return winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{getStatus()}</div>
        <ol>
          {history.map((_, move) => {
            return <li key={move}>
              <button onClick={jumpTo(move)}>
                {move ? 'Go to move #' + move : 'Go to game start'}
              </button>
            </li>
          })}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // 0, 1, 2
    const [a, b, c] = lines[i];
    // X, null, X
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 勝利したマークを返却する
    }
  }
  return null; // 勝負が終わってなければnull
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
