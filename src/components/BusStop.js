import React from 'react'
import Marker from 'components/Marker'
import Dot from 'components/Dot'


export default class BusStop extends React.Component {

  render() {
    let {lngLat, color} = this.props
    return (
      <Marker lngLat={lngLat}>
        <Dot color={color}/>
      </Marker>
    )
  }
}

// TODO size algorithm based on px distance between stops, say 50ft away
// directly proportional (& global max) (min 3?)
