import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
// import {RetryLink} from 'apollo-link-retry'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {injectGlobal} from 'styled-components'
import {normalize} from 'polished'

import reducers from 'data/reducers'
import Map from 'components/redux/Map'
import Previews from 'components/redux/Previews'
import Default from 'components/redux/Default'
import Directions from 'components/redux/Directions'
import Details from 'components/redux/Details'
import Pointer from 'components/redux/Pointer'
import SearchBar from 'components/redux/SearchBar'
import GeolocationMarker from 'components/redux/GeolocationMarker'
import {isMobile} from 'helpers'


// Apollo setup
const httpLink = new HttpLink({uri: 'https://uconn-bus-api.herokuapp.com/graphql'})
// breaks app refresh
// const retry = new RetryLink({
//   max: Infinity,
//   delay: 5000
// })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// Redux setup
const store = createStore(
  combineReducers({...reducers}),
  // preload,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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
        <SearchBar/>
      </Map>
    </Provider>
  </ApolloProvider>
)
