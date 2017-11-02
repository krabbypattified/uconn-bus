import React from 'react'
import PropTypes from 'prop-types'
import polyline from '@mapbox/polyline'
import {SourceManager} from './helpers'


export default class BusStopManager extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {

    let {map} = this.context

    this.manager = new SourceManager({
      map,
      source: 'busLine',
      type: 'LineString',
      getProperties: line => ({
        coordinates: polyline.decode(line.path).map(pt=>[pt[1], pt[0]]),
        color: line.color,
      })
    })

    let paint = {
      'line-color': ['get', 'color'],
      'line-width': 4,
      'line-opacity': this.props.opacity || 1
    }
    for (let prop in paint) map.setPaintProperty('busLine', prop, paint[prop])
  }

  componentWillUnmount() {
    this.manager.remove()
  }

  render() {
    this.manager.set(this.props.lines)
    return null
  }
}
