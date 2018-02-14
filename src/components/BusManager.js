import React from 'react'
import PropTypes from 'prop-types'
import {SourceManager, hexColor, difference, union} from 'helpers'
import busSVG from 'assets/bus.svg'
let oldBuses = {}
let loadedColors = new Set()

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
        color: hexColor(bus.busLine.color),
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
  }


  componentWillUnmount() {
    this.manager.remove()
  }


  render() {

    let {buses, colors} = this.props

    fetch(busSVG).then(x=>x.text()).then(svg => {
        let newColors = new Set(colors)
        let unloadedColors = Array.from(difference(newColors, loadedColors))
        loadedColors = union(newColors, loadedColors)

        unloadedColors.forEach(color => {
          let hex = hexColor(color)
          let img = new Image(50, 50)
          img.onload = () => this.context.map.addImage(hex, img)
          img.src = 'data:image/svg+xml;charset=UTF-8,'+svg.replace(/#F4D03F/, hex)
        })
    })

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
