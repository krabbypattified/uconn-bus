import React from 'react'
import Marker from 'components/Marker'


export default class BusStop extends React.Component {

  render() {
    let {lngLat, color} = this.props
    return (
      <Marker lngLat={lngLat}>
        <div style={{
          backgroundColor:color,
          width:'10px',
          height:'10px',
          borderRadius:'100px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        }}></div>
      </Marker>
    )
  }
}
