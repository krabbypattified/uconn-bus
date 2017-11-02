import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo'
import {injectGlobal} from 'styled-components'
import {normalize} from 'polished'

import reducers from 'data/reducers'
import Map from 'containers/Map'
import Previews from 'containers/Previews'
import Default from 'containers/Default'
import Directions from 'containers/Directions'
import Details from 'containers/Details'
import Pointer from 'containers/Pointer'
import MainButton from 'containers/MainButton'
import GeolocationMarker from 'containers/GeolocationMarker'
import {buses,busStops,busLines} from 'data/queries'


// Apollo Setup
const networkInterface = createBatchingNetworkInterface({
	uri: 'https://uconn-bus-api.herokuapp.com/graphql',
	batchInterval: 200,
})

const client = new ApolloClient({networkInterface})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	combineReducers({
		...reducers,
		apollo: client.reducer(),
	}),
	{/* preloadedState, */},
	composeEnhancers(applyMiddleware(client.middleware()))
)
// Prefetch
client.query({query:buses})
client.query({query:busStops})
client.query({query:busLines})

// TODO make sure all queries get updated when user enters/exits app (AND update arrival times every 5 mins?)

// Lock Orientation iOS/Android
window.screen.lockOrientation && window.screen.lockOrientation('portrait')

// Normalize CSS
injectGlobal`${normalize()}`


// Base App
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Map>
          <Details/>
          <Previews/>
          <Pointer/>
          <GeolocationMarker/>
          <Directions/>
          <Default/>
          <MainButton/>
        </Map>
      </ApolloProvider>
    )
  }
}
