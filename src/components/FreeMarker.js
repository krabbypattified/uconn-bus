import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'
import Hammer from 'hammerjs'


export default class FreeMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  project(lngLat) {
    if (this.projected === false) this.markerDiv.remove() // remove from DOM tree

    if (!lngLat) {
      // translate(x,y) => lngLat
      const matrix = window.getComputedStyle(this.markerDiv).getPropertyValue('transform')
      const translate = matrix.match(/\d+/g) || [0,0,0,0,0,0]
      const xy = [translate[4],translate[5]]
      lngLat = this.context.map.project(xy) // TODO BUG i think we're off by a few pixels
    }

    if (!this.marker) this.marker = new MapboxGL.Marker(this.markerDiv)
    this.marker.setLngLat(lngLat).addTo(this.context.map)
    // TODO make sure you can drag it once it becomes a marker
  }

  unproject(position) {
    if (this.projected) this.marker.remove() // remove from map

    if (!position) {
      // The marker keeps its transform property.
      // If no transform property, no need to initialize one
    }
    else {
      // TODO top, right, bottom, left => translate(calc(-50% + x), calc(-50% + y))
      this.markerDiv.style.transform = '...'
    }

    this.context.map.getContainer().appendChild(this.markerDiv)
  }

  componentWillMount() {
    let map = this.context.map

    this.markerDiv = document.createElement('div')
    this.markerDiv.style.position = 'absolute'

    // TODO easy fix for DRAGGABLE MARKER!! (initialize to translate matrix)
    let x = 0
    let y = 0

    this.markerDiv.addEventListener('mouseover', e=>map.dragPan.disable())
    this.markerDiv.addEventListener('mouseout', e=>map.dragPan.enable())

    let mc = new Hammer(this.markerDiv)
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 })

    mc.on('pan', e => {
    	this.markerDiv.style.transform = `translate(${x + e.deltaX}px, ${y + e.deltaY}px)`
    })

    mc.on('panend pancancel', e => {
    	x += e.deltaX
    	y += e.deltaY
    })
  }

  componentWillUpdate(newProps) {
    this.same =
      this.props.projected === newProps.projected &&
      this.props.position === newProps.position &&
      this.props.lngLat === newProps.lngLat
  }

  render() {
    if (!this.same) this.props.projected ? this.project(this.props.lngLat) : this.unproject(this.props.position)
    return ReactDOM.createPortal(
      this.props.children,
      this.markerDiv,
    )
  }
}
