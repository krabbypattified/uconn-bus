import React from 'react'
import PropTypes from 'prop-types'
import {SourceManager} from './helpers'


export default class BusStopManager extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context

    this.manager = new SourceManager({
      map,
      source: 'busStops',
      getProperties: stop => ({
        coordinates: [stop.longitude, stop.latitude]
      })
    })

    let paint = {
      'circle-radius': 4,
      'circle-color': '#ff6666',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',
    }
    for (let prop in paint) map.setPaintProperty('busStops', prop, paint[prop])
  }

  componentWillUnmount() {
    this.manager.remove()
  }

  render() {
    this.manager.set(this.props.busStops)
    return null
  }
}
