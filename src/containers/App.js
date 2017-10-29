import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo'
import {injectGlobal} from 'styled-components'
import {normalize} from 'polished'

import reducers from 'data/reducers'
import Map from 'containers/Map'
import DetailView from 'containers/DetailView'
import PreviewList from 'containers/PreviewList'
import Pointer from 'containers/Pointer'
import GeolocationMarker from 'containers/GeolocationMarker'
import BusStops from 'containers/BusStops'
import Buses from 'containers/Buses'
import MainButton from 'containers/MainButton'
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


// Normalize CSS
injectGlobal`${normalize()}`


// Base App
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Map>
          <DetailView/>
          <PreviewList/>
          <Pointer/>
          <GeolocationMarker/>
          <BusStops/>
          <Buses/>
          <MainButton/>
        </Map>
      </ApolloProvider>
    )
  }
}
