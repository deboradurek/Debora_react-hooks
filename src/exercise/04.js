// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null))

  const nextValue = squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function calculateWinner(squares) {
    const winningLines = [
      // Horizontal lines
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical lines
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal lines
      [0, 4, 8],
      [2, 4, 6],
    ]

    const winnerLine = winningLines.find(
      ([a, b, c]) =>
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c],
    )

    return winnerLine ? squares[winnerLine[0]] : null
  }

  function calculateStatus(winner, squares, nextValue) {
    if (winner) {
      return `Winner: ${winner}`
    } else if (squares.every(Boolean)) {
      return `Scratch: Cat's game`
    } else {
      return `Next player: ${nextValue}`
    }
  }

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function App() {
  return <Game />
}

export default App
