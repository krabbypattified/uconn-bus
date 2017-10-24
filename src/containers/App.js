import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo'

import reducers from 'data/reducers'
import Map from 'components/Map'
import GeolocationMarker from 'containers/GeolocationMarker'
import BusStopList from 'containers/BusStopList'
import BusList from 'containers/BusList'
import Pointer from 'containers/Pointer'


// Apollo Setup
const networkInterface = createBatchingNetworkInterface({
	uri: 'https://uconn-bus-api.herokuapp.com/graphql',
	batchInterval: 35,
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


// Base App
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Map
          container='root'
          mapStyle='mapbox://styles/mapbox/streets-v9'
          maxBounds={[-72.55,41.65,-71.96,41.97]}
          center={[-72.2683646, 41.8059531]}
          zoom={13}
        >
          <GeolocationMarker/>
          <Pointer/>
          <BusStopList/>
          <BusList/>
        </Map>
      </ApolloProvider>
    )
  }
}
