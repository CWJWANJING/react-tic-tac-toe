import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>{value}
    </button>);
}

function checkWinner(squares) {
  const winnerPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i=0; i < winnerPatterns.length; i++) {
    const [x, y, z] = winnerPatterns[i];
    if (squares[x] && squares[x] == squares[y] && squares[x] == squares[z]) {
      return squares[x];
    }
  }
  return null;
}

function Board({ isXnext, squares, onPlay }) {

  function handleClick(index) {
    // If there's already a value in the square, cannot be override
    if (checkWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    if (isXnext) {
      nextSquares[index] = "X";
    }
    else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  }

  let xOrO;
  const winner = checkWinner(squares);
  if (winner) {
    xOrO = 'Winner: ' + winner;
  }
  else {
    xOrO = "Next player: " + (isXnext ? "X": "O");
  }

  return (
    <>
      <h1>{xOrO}</h1>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=> handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=> handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=> handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=> handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=> handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=> handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=> handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=> handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=> handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [isXnext, setIsXnext] = useState(true);
  const [historySquares, setHistorySquares] = useState([Array(9).fill(null)]);
  const currentSquares = historySquares[historySquares.length - 1];
  const [currentMove, setCurrentMove] = useState(0);

  function handlePlay(nextSquares) {
    const nextHistory = [...historySquares.slice(0, currentMove + 1), nextSquares];
    setHistorySquares(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsXnext(!isXnext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsXnext(nextMove % 2 === 0);
  }

  const moves = historySquares.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isXnext={isXnext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}