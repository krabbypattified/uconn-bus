import React from 'react'
import Marker from 'components/Marker'
import CircleMarkerDiv from 'components/CircleMarkerDiv'


export default class BusStop extends React.Component {

  render() {
    let {lngLat, style} = this.props
    return (
      <FreeMarker
        lngLat={lngLat}
        // interpolation
      >
        <CircleMarkerDiv
          color={this.props.color}
          style={style}
        />
      </FreeMarker>
    )
  }
}
