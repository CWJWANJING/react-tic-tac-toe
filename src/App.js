function Square({XorO}) {
  return <button className="square">{XorO}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square XorO="X"/>
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
