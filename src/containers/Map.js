import React from 'react'
import {connect} from 'react-redux'
import Map from 'components/Map'
import {deselectAll} from 'data/actions'


let MapContainer = ({children, deselectAll}) => (
  <Map
    container='root'
    mapStyle='mapbox://styles/mapbox/streets-v9?optimize=true'
    attributionControl={false}
    logoPosition='top-left'
    center={[-72.253502, 41.8051962]}
    onLoad={map=>{
      map.on('drag', deselectAll)
      map.on('click', deselectAll)
    }}
    zoom={13}
    minZoom={12}
    sources={['buses', 'busStops']}
    layers={[
      {id:'buses', type:'symbol', source:'buses'},
      {id:'busStops', type:'circle', source:'busStops'},
    ]}
  >{children}</Map>
)


// Connect & Export
export default connect(
  state => ({}),
  dispatch => ({
    deselectAll: ()=>dispatch(deselectAll()),
  })
)(MapContainer)
