import React from 'react'
import Map from 'components/Map'
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
        <FreeMarker
          className='mydiv'
          style={{
            background:'red',
            width:'14px',
            height:'14px',
            borderRadius:'100px',
          }}
          projected={this.state.projected}
          onPanEnd={()=>this.setState({projected: !this.state.projected})}
        />
      </Map>
    )
  }
}
