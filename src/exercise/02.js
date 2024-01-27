// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useLocalStorage} from './hooks/useLocalStorage'

function Greeting({initialName = ''}) {
  const {state, handleStateChange} = useLocalStorage('name', initialName)

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={state} onChange={handleStateChange} id="name" />
      </form>
      {state ? <strong>Hello {state}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Greeting />
    </>
  )
}

export default App
