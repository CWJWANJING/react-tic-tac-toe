import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>{value}
    </button>);
}

function checkWinner(nextSquares) {

  if (
    (nextSquares[0] && nextSquares[0] == nextSquares[1] && nextSquares[1] == nextSquares[2]) ||
    (nextSquares[3] && nextSquares[3] == nextSquares[4] && nextSquares[4] == nextSquares[5]) ||
    (nextSquares[6] && nextSquares[6] == nextSquares[7] && nextSquares[7] == nextSquares[8]) ||
    (nextSquares[0] && nextSquares[0] == nextSquares[3] && nextSquares[3] == nextSquares[6]) ||
    (nextSquares[1] && nextSquares[1] == nextSquares[4] && nextSquares[4] == nextSquares[7]) ||
    (nextSquares[2] && nextSquares[2] == nextSquares[5] && nextSquares[5] == nextSquares[8]) ||
    (nextSquares[0] && nextSquares[0] == nextSquares[4] && nextSquares[4] == nextSquares[8]) ||
    (nextSquares[2] && nextSquares[2] == nextSquares[4] && nextSquares[4] == nextSquares[6])
    ) {
      return true;
  }
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [isXnext, setIsXnext] = useState(true);

  function handleClick(index) {
    console.log(index);
    const nextSquares = squares.slice();
    // If there's already a value in the square, cannot be override
    if (nextSquares[index]) {
      return;
    }
    if (isXnext) {
      nextSquares[index] = "X";
    }
    else {
      nextSquares[index] = "O";
    }
    setSquares(nextSquares);
    setIsXnext(!isXnext);
    if (checkWinner(nextSquares)) {
      alert("Win");
    }
    else {
      console.log(nextSquares);
    }
  }

  return (
    <>
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
