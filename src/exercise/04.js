// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorage} from './hooks/useLocalStorage'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorage('tic-tac-toe:history', [
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = useLocalStorage('tic-tac-toe:step', 0)

  const currentSquares = history[currentStep]

  const nextValue = currentSquares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

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

  const moves = history.map((_, index) => {
    const text = index === 0 ? 'Go to game start' : `Go to move #${index}`
    const isCurrentStep = index === currentStep

    return (
      <li key={index}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(index)}>
          {text} {isCurrentStep && '(current)'}
        </button>
      </li>
    )
  })

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }

    const historyCopy = history.slice(0, currentStep + 1)
    const currentSquaresCopy = [...currentSquares]
    currentSquaresCopy[square] = nextValue
    setHistory([...historyCopy, currentSquaresCopy])
    setCurrentStep(historyCopy.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function App() {
  return <Game />
}

export default App
