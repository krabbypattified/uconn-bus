import React from 'react'
import {graphql} from 'react-apollo'
import {geocode} from 'data/queries'
import {SearchReceiverDOM} from 'components/SearchReceiver'


let SearchReceiver = ({placeholder, data, geocode}) =>
<SearchReceiverDOM placeholder={data.loading?'Loading...':placeholder} geocode={shouldQuery(geocode)?data.geocode:geocode}/>


export default graphql(geocode, {
  skip: p => !shouldQuery(p.geocode),
  options: p => ({variables: {lngLat: p.geocode}})
})(SearchReceiver)




// Helper
function shouldQuery(geocode) {
  return geocode && !geocode.type
}
