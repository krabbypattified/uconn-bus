import React from 'react'
import {connect} from 'react-redux'
import MapDOM from 'components/Map'
import {isMobile, switchy} from 'helpers'


class Map extends React.Component {

  onLoad(map) {
    this.map = map
    map.on('drag', _=>this.map.fire('center-changed'))
    map.on('zoom', _=>this.map.fire('center-changed'))
    map.on('fake-click', e => this.clickPan(e.lngLat))
    map.on('click', e => this.clickPan(e.lngLat.toArray()))
  }


  clickPan(lngLatArray) {
    setTimeout(_=>this.map.fire('center-changed'), 300)
    this.map.easeTo({
      center: lngLatArray,
      duration: 300,
    })
  }


  shouldComponentUpdate({thingSelected, directions}) {
    this.thingChanged = this.props.thingSelected !== thingSelected
    this.dirStateChanged = this.props.directions.state !== directions.state
    return this.thingChanged || this.dirStateChanged
  }


  render() {
    let {children, thingSelected, thing, directions} = this.props

    if (this.map) {

        if (this.thingChanged || this.dirStateChanged) setTimeout(_=>this.map.fire('center-changed'), 1000)

        if (this.thingChanged) {

            if (thingSelected) {
                let {longitude, latitude} = thing
                this.map.easeTo({
                  center: [longitude, latitude],
                  zoom: isMobile()?14:15,
                })
            }

            else {
                this.map.easeTo({
                  zoom: isMobile()?13:14,
                })
            }

        }

        if (this.dirStateChanged) {
          switchy(directions.state)({
            0:_=>{
                this.map.easeTo({
                  zoom: isMobile()?13:14,
                })
            },

            1:_=>{
                this.map.easeTo({
                  center: directions.from,
                })
            },

            2:_=>{
                this.map.easeTo({
                  center: directions.to,
                })
            },

            3:_=>{ // TODO better bounds
                let lon = directions.from[0]/2 + directions.to[0]/2
                let lat = directions.from[1]/2 + directions.to[1]/2
                this.map.easeTo({
                  center: [lon, lat],
                  zoom: isMobile()?13:14,
                })
            },
          })
        }

    }


    return (
      <MapDOM
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
      >{children}</MapDOM>
    )
  }

}


export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    thing: state.selectedThingStack[state.selectedThingStack.length-1],
    directions: state.directions,
  })
)(Map)
