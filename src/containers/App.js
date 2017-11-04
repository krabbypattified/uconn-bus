import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
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


// Apollo setup
const client = new ApolloClient({
  link: new HttpLink({uri: 'https://uconn-bus-api.herokuapp.com/graphql'}),
  cache: new InMemoryCache()
})

// Redux setup
const store = createStore( combineReducers({...reducers}) )

// Add mobile class to body
isMobile() && document.body.classList.add('mobile')

// Normalize CSS
injectGlobal`${normalize()}`


// Base App
export default () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Map>
        <Details/>
        <Previews/>
        <Pointer/>
        <GeolocationMarker/>
        <Directions/>
        <Default/>
        <MainButton/>
      </Map>
    </Provider>
  </ApolloProvider>
)
