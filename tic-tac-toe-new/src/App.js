import React, { useState, useEffect } from 'react';

// Square component represents each cell on the Tic Tac Toe board
const Square = ({ value, onClick, isWinningSquare }) => {
  const baseClasses = "w-24 h-24 flex items-center justify-center text-5xl font-bold border-2 border-gray-400 rounded-lg cursor-pointer transition-all duration-200 ease-in-out";
  const winningClasses = isWinningSquare ? "bg-green-300 text-white" : "hover:bg-gray-100";

  return (
    <button
      className={`${baseClasses} ${winningClasses}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

// Board component renders the 3x3 grid of squares
const Board = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i) => {
    const isWinningSquare = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-xl shadow-lg">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(i))}
    </div>
  );
};

// Game component manages the overall game logic and state
const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const { winner, winningLine } = calculateWinner(current.squares);

  // Handles a click on a square
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = newHistory[newHistory.length - 1].squares.slice();

    // If game is won or square is already filled, do nothing
    if (winner || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: currentSquares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  // Jumps to a specific move in the game history
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // Status message for the game
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  // Renders the list of past moves
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className="mb-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  // Function to determine the winner
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
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningLine: lines[i] };
      }
    }
    return { winner: null, winningLine: null };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 font-inter">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">Tic Tac Toe</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="bg-white p-6 rounded-xl shadow-2xl">
          <div className="text-2xl font-semibold mb-4 text-gray-800">{status}</div>
          <Board
            squares={current.squares}
            onClick={handleClick}
            winningLine={winningLine}
          />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full md:w-auto max-h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Game History</h2>
          <ol className="list-none p-0">{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default App;
