import React from 'react'
import PropTypes from 'prop-types'
import {AnimationSourceManager} from './helpers'
// import busSVG from 'assets/bus.svg'


export default class BusManager extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context

    this.manager = new AnimationSourceManager({
      map,
      source: 'buses',
      delay: 3500,
      getProperties: bus => ({
        key: bus.id,
        coordinates: [bus.longitude, bus.latitude],
        velocity: bus.speed,
        properties: {
          heading: bus.heading
        },
      }),
    })

    // TODO check github issues
    // map.addImage('bus', busSVG)

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
    this.manager.remove()
  }

  render() {
    this.manager.addKeyframe(this.props.buses)
    return null
  }
}
