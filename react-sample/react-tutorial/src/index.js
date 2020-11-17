import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({ onClick, value }) {
  return (
    <button className="square" onClick={ onClick }>
      { value }
    </button>
  );
}

const Board = ({ squares, onClick }) => {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // すべての盤面履歴取得
    // history = [{hist1}, {hist2}]
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // 盤面全体を保持するobject取得
    // { squares: Array(9)}
    const current = history[history.length - 1];
    // 現在の盤面を取得
    // ['', 'X', ...];
    const squares = current.squares.slice();

    // クリックした点で勝利した人がいたらゲームを早期終了
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 盤面にマークをセット
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // state更新
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  getStatus() {
    // TODO: change useState
    const current = this.state.history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    return winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((_, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
           squares={current.squares}
           onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this.getStatus()}</div>
        <ol>{moves}</ol>
        </div>
      </div>
    );
  }
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
