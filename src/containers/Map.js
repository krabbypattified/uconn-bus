import React from 'react'
import {connect} from 'react-redux'
import Map from 'components/Map'
import {isMobile} from 'components/helpers'

class MapContainer extends React.Component {

  onLoad(map) {
    this.map = map
    // Click-pan
    this.map.on('click', e => {
      this.map.easeTo({
        center: e.lngLat.toArray(),
        duration: 300,
      })
      setTimeout(_=>this.map.fire('click-panned'), 300)
    })
  }

  render() {
    let {children, thingSelected, thing, directions} = this.props

    // Zoom into thing
    if (this.map && thingSelected) {
      this.lastSelected = true
      let {longitude, latitude} = thing
      this.map.easeTo({
        center: [longitude, latitude],
        zoom: isMobile()?14:15,
      })
    }

    // Zoom into directions
    if (this.map && directions.state===3 && !this.oldDirections) { // TODO better bounds
      let lon = directions.from[0]/2 + directions.to[0]/2
      let lat = directions.from[1]/2 + directions.to[1]/2
      this.map.easeTo({
        center: [lon, lat],
        zoom: isMobile()?13:14,
      })
    }
    if (!directions.state) this.oldDirections = false
    else this.oldDirections = directions

    // Zoom out
    if (this.map && !thingSelected && this.lastSelected) {
      this.lastSelected = false
      this.map.easeTo({
        zoom: isMobile()?13:14,
      })
    }

    return (
      <Map
        container='root'
        mapStyle='mapbox://styles/chefgabe/cj9d0hyrr5qu42smoce9sjx8o'
        attributionControl={false}
        logoPosition='bottom-left'
        center={[-72.253502, 41.8051962]}
        onLoad={map=>this.onLoad(map)}
        doubleClickZoom={false}
        zoom={13}
        maxZoom={18}
        sources={['buses', 'busStops', 'busLine', 'walk']}
        layers={[
          {id:'buses', type:'symbol', source:'buses'},
          {id:'busStops', type:'circle', source:'busStops', before:'buses'},
          {id:'busLine', type:'line', source:'busLine', before:'busStops'},
          {id:'walk', type:'line', source:'walk', before:'busStops'},
        ]}
      >{children}</Map>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    thing: state.selectedThingStack[state.selectedThingStack.length-1],
    directions: state.directions,
  })
)(MapContainer)
