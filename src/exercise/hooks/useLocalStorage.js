import * as React from 'react'

export const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage)
    }
    // Handle case where `defaultValue` is a computationally expensive function
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // To keep track of the key in case it changes
  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    // To keep track of the previous key for the entire lifecycle of this component
    prevKeyRef.current = key

    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
