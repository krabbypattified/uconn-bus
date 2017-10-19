import React from 'react'
import Map from 'components/Map'
// import Marker from 'components/Marker'
import FreeMarker from 'components/FreeMarker'


export default class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {projected: false}
  }

  render() {
    return (
      <Map
        container='root'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        center={[-72.2683646, 41.8059531]}
        zoom={12}
        >
        <FreeMarker style={{background:'red'}} projected={this.state.projected} onPanEnd={()=>this.setState({projected: !this.state.projected})}>hey there bud</FreeMarker>
        {/* <div style={{position:'absolute',bottom:0,zIndex:100}}>hi i'm down here!</div> */}
      </Map>
    )
  }
}
