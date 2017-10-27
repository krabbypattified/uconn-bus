import React from 'react'
import PropTypes from 'prop-types'
import {SourceManager} from './helpers'
import busSVG from 'assets/bus.svg'


export default class BusManager extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context
    this.oldBuses = {}

    this.manager = new SourceManager({
      map,
      source: 'buses',
      getProperties: bus => ({
        coordinates: [bus.longitude, bus.latitude],
        properties: {
          heading: bus.heading,
          color: bus.busLine.color
        },
      }),
    })

    fetch(busSVG).then(x=>x.text()).then(svg => {

        let stops = Array.from(new Set(this.props.colors))

        stops.forEach(hex => {
          let img = new Image(33,33)
          img.onload = () => map.addImage(hex, img)
          img.src = 'data:image/svg+xml;charset=UTF-8,'+svg.replace(/#F4D03F/, hex)
        })

        let layout = {
          'icon-image': ['get', 'color'],
          'icon-allow-overlap': true,
          'icon-rotation-alignment': 'map',
          'icon-rotate': {
            property: 'heading',
            stops: [[0, 0], [359, 359]]
          }
        }
        for (let prop in layout) map.setLayoutProperty('buses', prop, layout[prop])

    })

    map.moveLayer('busStops', 'buses')
  }

  componentWillUnmount() {
    this.manager.remove()
  }

  render() {
    let {buses} = this.props

    // Fix heading 0
    this.manager.set(buses.map(b => ({
      ...b,
      heading: !b.heading && this.oldBuses[b.id] ? this.oldBuses[b.id].heading : b.heading
    })))

    buses.forEach(b => {
      if (b.heading) this.oldBuses[b.id] = b
    })
    return null
  }
}
