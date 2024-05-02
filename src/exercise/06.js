// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from './ErrorBoundary/components/ErrorFallback'

function PokemonInfo({pokemonName}) {
  const [pokemonState, setPokemonState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })

  const {status, pokemon, error} = pokemonState

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    setPokemonState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemonState({status: 'resolved', pokemon: pokemonData})
      })
      .catch(error => {
        setPokemonState({status: 'rejected', error})
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
