import React from 'react'
import {connect} from 'react-redux'
import {directionsNext, setDirections} from 'data/actions'
import SearchBarDOM from 'components/SearchBar'


let SearchBar = ({directions, setDirections, directionsNext}) =>
<SearchBarDOM initializeDirections={center => {
  setDirections({from:directions.from||center, to:center})
  directionsNext()
}}/>


export default connect(
  state => ({
    location: state.location,
    directions: state.directions,
  }),
  dispatch => ({
    setDirections: d=>dispatch(setDirections(d)),
    directionsNext: _=>dispatch(directionsNext()),
  })
)(SearchBar)
