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
    let {children, thingSelected, thing} = this.props

    if (this.map && thingSelected) {
      let {longitude, latitude} = thing
      this.map.easeTo({
        center: [longitude, latitude],
        zoom: 16.5,
      })
    }

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
          {id:'busStops', type:'circle', source:'busStops'},
          {id:'busLine', type:'line', source:'busLine'},
          {id:'walk', type:'line', source:'walk'},
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
  }),
  dispatch => ({
    deselectAll: ()=>dispatch(deselectAll()),
  })
)(MapContainer)
