import React from 'react'

class ErrorBoundary extends React.Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  render() {
    const {error} = this.state

    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
