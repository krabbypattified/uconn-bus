import React from 'react'
import FreeMarker from 'components/FreeMarker'
import CircleMarkerDiv from 'components/CircleMarkerDiv'


export default class BusStop extends React.Component {

  componentWillMount() {
    this.firstPosition = true
  }

  componentWillUpdate(newProps) {
    this.duration = this.firstPosition ? 0 : Date.now() - this.timeGotLastLocation
    this.timeGotLastLocation = Date.now()
    this.firstPosition = false
  }

  render() {
    let {lngLat, color} = this.props
    return (
      <FreeMarker
        lngLat={lngLat}
        interpolation={{duration:this.duration}}
      >
        <CircleMarkerDiv color={color} />
      </FreeMarker>
    )
  }
}
