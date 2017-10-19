import React from 'react'
import Map from 'components/Map'
import Marker from 'components/Marker'
import FreeMarker from 'components/FreeMarker'


export default class App extends React.Component {
  render() {
    return (
      <Map
        container='root'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        center={[-72.2683646, 41.8059531]}
        zoom={12}
        >
        <Marker lngLat={[-72.2683646, 41.8059531]}>hey there bud</Marker>
        <FreeMarker>hey there kids</FreeMarker>
        <div style={{position:'absolute',bottom:0,zIndex:100}}>hi i'm down here!</div>
      </Map>
    )
  }
}
