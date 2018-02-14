import React from 'react'
import {graphql, compose} from 'react-apollo'
import GeocoderDOM from './Geocoder'
import {geocode, buildings} from 'data/queries'
import {getNearestThings} from 'helpers'
import './Geocoder.css'

// TODO why is api return ing null
// TODO why isn't nearbyBuilding working?

let Geocoder = ({placeholder, data, buildings:{buildings=[]}, geocode, ...other}) => {
  let building = nearbyBuilding(buildings, geocode)
  if (building) geocode = building
  // console.log({building, placeholder, data, buildings, geocode, ...other})
  return <GeocoderDOM placeholder={data.loading?'Loading...':placeholder} geocode={shouldQuery(geocode, buildings)?data.geocode:geocode} {...other}/>
}


export default compose(
  graphql(buildings, {name: 'buildings'}),
  graphql(geocode, {
    skip: p => !shouldQuery(p.geocode, p.buildings.buildings||[]),
    options: p => ({variables: {lngLat: p.geocode}})
  })
)(Geocoder)




function shouldQuery(geocode, buildings=[]) {
  if (!geocode||!geocode.latitude||geocode.name) return false
  return !nearbyBuilding(buildings, geocode)
}

function nearbyBuilding(buildings=[], location) { // TODO memoize
  console.log(buildings, location)
  let x = getNearestThings(buildings, {distance:160/5280, location})[0]
  console.log(x)
  return x
}
