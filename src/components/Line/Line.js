import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'
import {makeLine, trimCoordinates} from './helpers'


// TODO ONE updating geojson maplayer for all lines
export default class Line extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {coordinates, stroke, color, start, end} = this.props
    this.id = randomize('*', 10)

    map.addLayer(makeLine({
      id: this.id,
      coordinates: trimCoordinates(coordinates, start, end),
      stroke,
      color
    }))
  }

  componentWillUnmount() {
    map.removeLayer(this.id)
  }

  render() {
    return null
  }
}
