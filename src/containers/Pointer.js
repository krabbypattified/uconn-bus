import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import {LngLat} from 'mapbox-gl'
import Pin from 'components/Pointer'
import {buses, busStops} from 'data/queries'
import {setHighlightedThings, setDirections} from 'data/actions'


class Pointer extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  geocode() {
    this.setState({label:geocode(this.context.map.getCenter().toArray())})
  }

  onHoverDirections() {
    this.geocode()
    let center = this.context.map.getCenter().toArray()
    let {setDirections, directions} = this.props
    directions.state === 1
    ? setDirections({from:center})
    : setDirections({to:center})
  }

  onHoverThings() {
    this.geocode()
    let {map} = this.context
    let {buses:{buses}, busStops:{busStops}} = this.props
    if (!buses||!busStops) return null
    let center = map.getCenter()
    let centerPx = map.project(center)
    let offCenterPx = [centerPx.x+24,centerPx.y] // 96ppi, ~1cm from center
    let offCenter = map.unproject(offCenterPx)
    let maxDist = distance(center, offCenter)
    let things = getNearestThings([...buses, ...busStops], {distance:maxDist, location:center, max:3})
    this.props.setHighlightedThings(things)
  }

  componentWillMount() {
    this.geocode()
  }

  render() {
    let {thingSelected, directions} = this.props
    if ([1,2].includes(directions.state)) return <Pin label={this.state.label} onChange={_=>this.onHoverDirections()}/>
    else if (thingSelected || directions.state === 3) return null
    else return <Pin onChange={_=>this.onHoverThings()}/>
  }
}




// Connect & Export
export default compose(
  graphql(buses, {name: 'buses'}),
  graphql(busStops, {name: 'busStops'}),
  connect(
    state => ({
      thingSelected: state.selectedThingStack.length,
      directions: state.directions,
    }),
    dispatch => ({
      setHighlightedThings: things => dispatch(setHighlightedThings(things)),
      setDirections: payload => dispatch(setDirections(payload)),
    })
  ),
)(Pointer)




// Helpers
function distance(one,two) {
  let from = one instanceof LngLat ? one.toArray() : [one.longitude, one.latitude]
  let to = two instanceof LngLat ? two.toArray() : [two.longitude, two.latitude]
  let d2 = Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2)
  return Math.sqrt(d2) * 60.7053 // for miles (hacky)
}

function getNearestThings(things, {distance:maxDist, location, max}) {
  return things
    .map(thing => ({
      val: thing,
      distance: distance(location, thing)
    }))
    .sort((a,b) => a.distance - b.distance)
    .slice(0,max)
    .filter(({distance}) => distance < maxDist)
    .map(wrap => wrap.val)
}


function geocode(point) {
  return 'McMahon'
}
