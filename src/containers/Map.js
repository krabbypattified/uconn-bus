import React from 'react'
import {connect} from 'react-redux'
import Map from 'components/Map'
import {deselectAll} from 'data/actions'

class MapContainer extends React.Component {

  onLoad(map) {
    let {deselectAll} = this.props

    this.map = map
    map.on('drag', deselectAll)
    map.on('click', deselectAll)
  }

  render() {
    let {children, thingSelected, thing, directions} = this.props

    if (this.map && thingSelected) {
      this.lastSelected = true
      let {longitude, latitude} = thing
      this.map.easeTo({
        center: [longitude, latitude],
        zoom: 15.5,
      })
    }

    if (this.map && !thingSelected && this.lastSelected) {
      this.lastSelected = false
      this.map.easeTo({
        zoom: 13,
      })
    }

    // TODO: check if this works
    if (this.map && directions && !this.oldDirections) {
      let lon = directions.from[0]/2 + directions.to[0]/2
      let lat = directions.from[1]/2 + directions.to[1]/2
      this.map.easeTo({
        center: [lon, lat],
        zoom: 13,
      })
    }
    if (!directions) this.oldDirections = false
    else this.oldDirections = directions

    return (
      <Map
        container='root'
        mapStyle='mapbox://styles/chefgabe/cj9d0hyrr5qu42smoce9sjx8o'
        attributionControl={false}
        logoPosition='top-left'
        center={[-72.253502, 41.8051962]}
        onLoad={map=>this.onLoad(map)}
        zoom={13}
        minZoom={12}
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
  }),
  dispatch => ({
    deselectAll: ()=>dispatch(deselectAll()),
  })
)(MapContainer)
