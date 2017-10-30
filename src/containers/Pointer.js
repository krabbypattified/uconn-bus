import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import styled from 'styled-components'
import {LngLat} from 'mapbox-gl'
import pointerImage from 'assets/pointer.png'
import {buses, busStops} from 'data/queries'
import {setHighlightedThings} from 'data/actions'


class Pointer extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  setHighlightedThings() {
    let {buses, busStops} = this.props
    let {map} = this.context

    if (buses.loading || busStops.loading) return null
    buses = buses.buses || []
    busStops = busStops.busStops || []

    let center = map.getCenter()
    let centerPx = map.project(center)
    let offCenterPx = [centerPx.x+24,centerPx.y] // 96px per inch
    let offCenter = map.unproject(offCenterPx)
    let maxDist = distance(center, offCenter)

    let things = getNearestThings([...buses, ...busStops], {distance:maxDist, location:center, max:3})
    this.props.setHighlightedThings(things)
  }

  componentWillMount() {
    this.debounceThings = debounce(this.setHighlightedThings.bind(this), 17)
    this.context.map.on('drag', this.debounceThings)
    this.context.map.on('zoom', this.debounceThings)
  }

  componentWillUnmount() {
    this.context.map.off('drag', this.debounceThings)
    this.context.map.off('zoom', this.debounceThings)
  }

  render() {
    let {thingSelected, directions} = this.props
    if (thingSelected || directions) return null
    return <PointerImage src={pointerImage}/>
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
      setHighlightedThings: things => dispatch(setHighlightedThings(things))
    })
  ),
)(Pointer)




// Helpers
let PointerImage = styled.img`
  pointer-events: none;
  user-select: none;
  z-index: 10;
  width: 43px;
  position: absolute;
  left: calc(50% + 8px);
  top: calc(50% + 6px);
  transform: translate(-50%,-100%);
`

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

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
