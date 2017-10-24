import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import ReactSVG from 'react-svg'
import styled from 'styled-components'
import {LngLat} from 'mapbox-gl'
import pointerSVG from 'assets/pointer.svg'
import {buses, busStops} from 'data/queries'
import {setHighlightedThings} from 'data/actions'


class Pointer extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  setHighlightedThings() {
    let {buses, busStops} = this.props
    let {map} = this.context

    if (buses.loading || busStops.loading) return
    buses = buses.buses || []
    busStops = busStops.busStops || []

    let center = map.getCenter()
    let centerPx = map.project(center)
    let offCenterPx = [centerPx.x+24,centerPx.y] // 96px per inch
    let offCenter = map.unproject(offCenterPx)
    let maxDist = distance(center, offCenter)

    let things = getNearestThings([...buses, ...busStops], {distance:maxDist, location:center, max:4})
    this.props.setHighlightedThings(things)
  }

  componentWillMount() {
    // TODO don't listen so much lol
    this.context.map.on('drag', this.setHighlightedThings.bind(this))
    this.context.map.on('zoom', this.setHighlightedThings.bind(this))
  }

  componentWillUnmount() {
    this.context.map.off('drag', this.setHighlightedThings)
    this.context.map.off('zoom', this.setHighlightedThings)
  }

  render() {
    return <PointerSVG path={pointerSVG}/>
  }
}


// Connect & Export
export default compose(
  graphql(buses, {name: 'buses'}), // TODO see if this works/updates
  graphql(busStops, {name: 'busStops'}),
  connect(
    state => ({}),
    dispatch => ({
      setHighlightedThings: things => dispatch(setHighlightedThings(things))
    })
  ),
)(Pointer)




// Helpers
let PointerSVG = styled(ReactSVG)`
  pointer-events: none;
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 50%;
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
