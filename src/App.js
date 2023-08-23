import { useState } from 'react';

function Square() {
  const [XorO, setXorO] = useState(null);
  
  function handleClick() {
    setXorO("X");
  }
  return (
    <button
      className="square"
      onClick={handleClick}>{XorO}
    </button>);
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
