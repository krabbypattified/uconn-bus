import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import {LngLat} from 'mapbox-gl'
import Pin from 'components/Pointer'
import {buses, busStops} from 'data/queries'
import {setHighlightedThings, setDirections} from 'data/actions'
import {distance, getNearestThings} from 'components/helpers'


class Pointer extends React.Component {

  onHoverDirections(map) {
    let {setDirections, directions} = this.props
    let center = map.getCenter().toArray()
    setDirections(directions.state === 1 ? {from:center} : {to:center})
  }

  onHoverThings() {
    let {buses:{buses}, busStops:{busStops}, setHighlightedThings} = this.props
    if (!buses||!busStops) return null
    let center = map.getCenter()
    let centerPx = map.project(center)
    let offCenterPx = [centerPx.x+24,centerPx.y] // 96ppi, ~1cm from center
    let offCenter = map.unproject(offCenterPx)
    let maxDist = distance(center, offCenter)
    let things = getNearestThings([...buses, ...busStops], {distance:maxDist, location:center, max:3})
    setHighlightedThings(things)
  }

  render() {
    let {thingSelected, directions} = this.props
    if ([1,2].includes(directions.state)) return <Pin label={this.state.label} onChange={map=>this.onHoverDirections(map)}/>
    else if (thingSelected || directions.state === 3) return null
    else return <Pin onChange={map=>this.onHoverThings(map)}/>
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
