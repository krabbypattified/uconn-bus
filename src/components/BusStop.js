import React from 'react'
import Marker from 'components/Marker'
import CircleMarkerDiv from 'components/CircleMarkerDiv'


export default class BusStop extends React.Component {

  render() {
    let {lngLat, color} = this.props
    return (
      <Marker lngLat={lngLat}>
        <CircleMarkerDiv color={color} style={{transform:'scale(.5)'}} />
      </Marker>
    )
  }
}
