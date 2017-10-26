import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {randomNumber, GeoJSON} from './helpers'


let nope
let busStops = new GeoJSON()
export default class BusStop extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  updateMap() {
    this.context.map.getSource('busStops').setData(busStops.data())
  }

  componentWillMount() {
    this.key = randomNumber()

    if (nope) return
    nope = true
    let {map} = this.context

    map.addSource('busStops', {
      "type": "geojson",
      "data": busStops.data()
    })

    map.addLayer({
      id: 'busStops',
      type: 'circle',
      source: 'busStops',
      paint: {
        'circle-radius': 4,
        'circle-color': '#ff6666',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      }
    })
  }

  componentWillUnmount() {
    busStops.delete(this.key)
    this.updateMap()
  }

  render() {
    busStops.set(this.key, {coordinates:this.props.lngLat})
    this.updateMap()
    return null
  }
}


// BusStop non-map dot
export let Dot = styled.div`
  background-color: ${({color})=>color};
  width: 14px;
  height: 14px;
  border-radius: 100px;
  border: 2px solid white;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.36);
  transform: translateX(8px);
  margin-right: 10px;
`
