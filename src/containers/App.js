import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo'

import reducers from 'data/reducers'
import Map from 'components/Map'
import DetailViewContainer from 'containers/DetailViewContainer'
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


// Base App
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Map
          container='root'
          mapStyle='mapbox://styles/mapbox/streets-v9?optimize=true'
          attributionControl={false}
          logoPosition='top-left'
          center={[-72.253502, 41.8051962]}
          zoom={13}
          minZoom={12}
          sources={['buses', 'busStops']}
          layers={[
            {id:'buses', type:'symbol', source:'buses'},
            {id:'busStops', type:'circle', source:'busStops'},
          ]}
        >
          <DetailViewContainer/>
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
