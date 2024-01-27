import * as React from 'react'

export const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  function handleStateChange(event) {
    setState(event.target.value)
  }

  return {state, handleStateChange}
}
