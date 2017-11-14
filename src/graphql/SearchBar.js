import React from 'react'
import {geocode} from 'data/queries'
import {graphql, compose} from 'react-apollo'
import SearchBarReact from 'components/SearchBar'


let SearchBar = ({data, geocode, autofill, map, initializeDirections}) =>
<SearchBarReact
  onDirectionsClick={initializeDirections}
  onSelect={bldg => map.fire('fake-click', {lngLat:[bldg.longitude, bldg.latitude]})}
  placeholder={shouldQuery(geocode) ? data.geocode : geocode}
  loading={shouldQuery(geocode) && data.loading}
  autofill={autofill}
/>


export default compose(
  graphql(geocode, {
    skip: p => !shouldQuery(p.geocode),
    options: p => ({variables: {lngLat: p.geocode}})
  })
)(SearchBar)


// Helper
function shouldQuery(geocode) {
  return geocode && !geocode.type
}
