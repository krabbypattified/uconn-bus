import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo'

import reducers from 'data/reducers'
import Map from 'components/Map'
import StartMarker from 'containers/StartMarker'
import EndMarker from 'containers/EndMarker'
import BusStopList from 'containers/BusStopList'
import BusList from 'containers/BusList'


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
          zoom={12}
        >
          <EndMarker/>
          <StartMarker/>
          {/* <BusList/> */}
          <BusStopList/>
        </Map>
      </ApolloProvider>
    )
  }
}


// Connect & Export TODO
// export default connect(
//   dispatch => ({onMapClick: () => dispatch(deselect())})
// )(MapContainer)


// // Connect & Export TODO
// export default compose(
//   graphql(query.busLines, {name: 'busLines'}),
//   graphql(query.buses, {name: 'buses', /*options: { pollInterval: 2000 }*/}),
//   graphql(query.busStops, {name: 'busStops', /*options: { pollInterval: 15000 }*/}),
//   connect(
//     state => ({...state}),
//     dispatch => ({onMapClick: () => dispatch(deselect())})
//   ),
// )(MapContainer)
