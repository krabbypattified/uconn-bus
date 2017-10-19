import React from 'react'
import Map from 'components/Map'
import StartMarker from 'components/StartMarker'
import EndMarker from 'components/EndMarker'


export default class App extends React.Component {
  render() {
    return (
      <Map
        container='root'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        center={[-72.2683646, 41.8059531]}
        zoom={12}
        >
          <EndMarker/>
          <StartMarker/>
      </Map>
    )
  }
}
