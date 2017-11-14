import React from 'react'
import PropTypes from 'prop-types'
import {SourceManager, hexColor} from 'components/helpers'
import busSVG from 'assets/bus.svg'
let first = true
let oldBuses = {}

export default class BusManager extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {

    let {map} = this.context

    this.manager = new SourceManager({
      map,
      source: 'buses',
      getProperties: bus => ({
        coordinates: [bus.longitude, bus.latitude],
        heading: bus.heading,
        color: hexColor[bus.busLine.color],
      }),
    })

    let layout = {
      'icon-image': ['get', 'color'],
      'icon-size': this.props.size||.667,
      'icon-allow-overlap': true,
      'icon-rotation-alignment': 'map',
      'icon-rotate': {
        property: 'heading',
        stops: [[0, 0], [359, 359]]
      }
    }
    for (let prop in layout) map.setLayoutProperty('buses', prop, layout[prop])


    // Only load images once
    if (!first) return

    fetch(busSVG).then(x=>x.text()).then(svg => {

        let stops = Array.from(new Set(this.props.colors))

        stops.forEach(hex => {
          first = false
          let img = new Image(50, 50)
          img.onload = () => map.addImage(hex, img)
          img.src = 'data:image/svg+xml;charset=UTF-8,'+svg.replace(/#F4D03F/, hex)
        })

    })

  }

  componentWillUnmount() {
    this.manager.remove()
  }

  render() {
    let {buses} = this.props

    this.manager.set(buses.map(b => ({
      ...b,
      heading: !b.heading && oldBuses[b.id] ? oldBuses[b.id].heading : b.heading // Fix heading 0
    })))

    buses.forEach(b => {
      if (b.heading) oldBuses[b.id] = b // Fix heading 0
    })
    return null
  }
}
