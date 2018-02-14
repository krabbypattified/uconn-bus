import React from 'react'
import {connect} from 'react-redux'
import PointerGraphQL from 'components/Pointer'
import {setHighlightedThings, setDirections} from 'data/actions'
import {distance, getNearestThings, switchy} from 'helpers'


class Pointer extends React.Component {

  onHoverDirections = ({map}) => {
    let {setDirections, directions} = this.props
    let center = map.getCenter().toArray()
    setDirections(directions.state === 1 ? {from:center} : {to:center})
  }


  onHoverThings = ({map, buses, busStops}) => {
    let {setHighlightedThings} = this.props
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

    
    return thingSelected
    ? null
    : switchy(directions.state)({
        0:_=> <PointerGraphQL onChange={this.onHoverThings}/>,
        1:_=> <PointerGraphQL label='Start' background='#71D5A0' onChange={this.onHoverDirections}/>,
        2:_=> <PointerGraphQL label='End' background='#61A3FE' onChange={this.onHoverDirections}/>,
        3:_=> null,
      })
  }

}


export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    directions: state.directions,
  }),
  dispatch => ({
    setHighlightedThings: things => dispatch(setHighlightedThings(things)),
    setDirections: fromTo => dispatch(setDirections(fromTo)),
  })
)(Pointer)
