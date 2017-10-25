import React from 'react'
import Marker from 'components/Marker'
import {Dot} from './helpers'


// TODO ONE updating geojson maplayer for all busStops (solves size problem)
export default class BusStop extends React.Component {

  render() {
    let {lngLat} = this.props
    return (
      <Marker lngLat={lngLat}>
        <Dot color='#ff6666' radius={5}/>
      </Marker>
    )
  }
}
