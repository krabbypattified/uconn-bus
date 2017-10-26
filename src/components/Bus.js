import React from 'react'
import PropTypes from 'prop-types'
import {randomNumber, GeoJSON} from './helpers'
// import busSVG from 'assets/bus.svg'


let nope
let buses = new GeoJSON()
export default class Bus extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  updateMap() {
    this.context.map.getSource('buses').setData(buses.data())
  }

  componentWillMount() {
    this.key = randomNumber()

    if (nope) return
    nope = true
    let {map} = this.context

    // TODO check github issues
    // map.addImage('bus', busSVG)

    map.addSource('buses', {
      "type": "geojson",
      "data": buses.data()
    })

    map.addLayer({
      id: 'buses',
      type: 'symbol',
      source: 'buses',
      layout: {
        'icon-image': 'airport-15',
        'icon-rotation-alignment': 'map',
        'icon-rotate': {
          property: 'heading',
          stops: [[0, 0], [359, 359]]
        }
      }
    })
  }

  componentWillUnmount() {
    buses.delete(this.key)
    this.updateMap()
  }

  render() {
    let {lngLat, heading} = this.props
    buses.set(this.key, {coordinates:lngLat,properties:{heading}})
    this.updateMap()
    return null
  }
}
