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
import Default from 'containers/Default'
import Directions from 'containers/Directions'
import Details from 'containers/Details'
import Pointer from 'containers/Pointer'
import GeolocationMarker from 'containers/GeolocationMarker'
import {isMobile} from 'helpers'


// Apollo setup
const httpLink = new HttpLink({uri: 'https://uconn-bus-api.herokuapp.com/graphql'})
// const retry = new RetryLink({max:Infinity,delay:5000})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


// Redux setup
const store = createStore(
  combineReducers({...reducers}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// CSS Helpers
isMobile() && document.body.classList.add('mobile')
injectGlobal`${normalize()}`


// Base App
const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Map>
        <Default/>
        <Details/>
        <Directions/>
        <Pointer/>
        <GeolocationMarker/>
      </Map>
    </Provider>
  </ApolloProvider>
)


export default App
