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
          position={{top:5,left:5}}
          projected={this.state.projected}
          onPanEnd={()=>this.setState({projected: true})}
        >
          <div style={{
            backgroundColor:'rgba(255,100,119,.25)',
            width:'29px',
            height:'29px',
            borderRadius:'100px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
          }}>
            <div style={{
              backgroundColor:'rgb(255,100,119)',
              width:'13px',
              height:'13px',
              borderRadius:'100px',
              border:'2px solid white',
              boxShadow:'0 1px 1px 0 rgba(0,0,0,.3)'
            }}></div>
          </div>
        </FreeMarker>
      </Map>
    )
  }
}
