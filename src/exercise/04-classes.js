// useState: tic tac toe
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/04-classes.js

import * as React from 'react'

const Game = () => {
  const [squares, setSquares] = React.useState(
    () =>
      JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null),
  )

  React.useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares))
  }, [squares])

  const calculateNextValue = () =>
    squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }

    return null
  }

  const calculateStatus = (winner, nextValue) =>
    winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`

  const nextValue = calculateNextValue()
  const winner = calculateWinner()
  let status = calculateStatus(winner, nextValue)

  const selectSquare = squareIndex => {
    if (calculateWinner(squares) || squares[squareIndex]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[squareIndex] = nextValue
    setSquares(squaresCopy)
  }

  const renderSquare = i => (
    <button className="square" onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  )

  const restart = () => {
    setSquares(Array(9).fill(null))
  }

  return (
    <div className="game">
      <div className="game-board">
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
      </div>
    </div>
  )
}

function App() {
  return <Game />
}

export default App
