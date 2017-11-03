import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
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
import {isMobile} from 'components/helpers'


// Apollo Setup
const networkInterface = createNetworkInterface({uri: 'https://uconn-bus-api.herokuapp.com/graphql'})
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

// TODO Do queries get updates when exiting iOS app overnight??

// iOS Refresh WebView scroll
isMobile() && window.scrollTo(0,0)

// Add mobile class to body
isMobile() && document.body.classList.add('mobile')

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
