import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>{value}
    </button>);
}

function checkWinner(nextSquares) {
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
    if (nextSquares[x] && nextSquares[x] == nextSquares[y] && nextSquares[x] == nextSquares[z]) {
      return nextSquares[x];
    }
  }
  return null;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXnext, setIsXnext] = useState(true);
  let [xOrO, setXorO] = useState("");

  function handleClick(index) {
    console.log(index);
    const nextSquares = squares.slice();
    const winner = checkWinner(nextSquares);
    // If there's already a value in the square, cannot be override
    if (nextSquares[index]) {
      return;
    }
    if (winner) {
      setXorO("The winner: " + winner);
      console.log(xOrO);
    }
    else {
      setXorO("Next player: " + (isXnext ? "O": "X"));
      console.log(xOrO);
    }
    if (isXnext) {
      nextSquares[index] = "X";
    }
    else {
      nextSquares[index] = "O";
    }
    setSquares(nextSquares);
    setIsXnext(!isXnext);
  }

  return (
    <>
      <div className="board-row">
        <h1>{xOrO}</h1>
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
