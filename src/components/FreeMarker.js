import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'
import Hammer from 'hammerjs'


export default class FreeMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  // Place on map
  project(lngLat=this.marker.getLngLat()) {
    let map = this.context.map
    if (this.projected === false) this.markerDiv.remove()
    resetPosition(this.markerDiv)

    // [map.clientX, map.clientY] TODO what if its outside the map, or map not fullscreen
    this.marker.setLngLat(lngLat).addTo(map)
    this.projected = true
  }

  // Place on mapDiv
  unproject(position) {
    if (this.projected) this.marker.remove()

    if (position) {
      this.markerDiv.style.transform = ''
      setPosition(this.markerDiv, position)
    }

    this.context.map.getContainer().appendChild(this.markerDiv)
    this.projected = false
  }

  componentWillMount() {
    let map = this.context.map

    this.markerDiv = document.createElement('div')
    this.marker = new MapboxGL.Marker(this.markerDiv)
    resetPosition(this.markerDiv)

    let x = 0
    let y = 0

    this.markerDiv.addEventListener('mouseover', e=>map.dragPan.disable())
    this.markerDiv.addEventListener('mouseout', e=>map.dragPan.enable())

    let mc = new Hammer(this.markerDiv)
    let lock = this.props.lock
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 })

    mc.on('panstart', e => {
      if (lock) return
      const matrix = window.getComputedStyle(this.markerDiv).getPropertyValue('transform')
      const translate = matrix.match(/\d+/g) || [0,0,0,0,0,0]
      x = parseInt(translate[4], 10)
    	y = parseInt(translate[5], 10)
    })

    mc.on('pan', e => {
      if (lock) return
    	this.markerDiv.style.transform = `translate(${x + e.deltaX}px, ${y + e.deltaY}px)`
    })

    mc.on('panend', e => {
      if (lock) return
    	x += e.deltaX
    	y += e.deltaY
      let px = x + this.markerDiv.offsetWidth/2 + this.markerDiv.offsetLeft
      let py = y + this.markerDiv.offsetHeight/2 + this.markerDiv.offsetTop

      this.marker.setLngLat(map.unproject([px, py]))

      this.props.onPanEnd(this)
    })
  }

  componentWillUpdate(newProps) {
    this.same =
      this.props.projected === newProps.projected &&
      this.props.position === newProps.position &&
      this.props.lngLat === newProps.lngLat
  }

  render() {
    let {children, style, className='', position, projected, lngLat} = this.props
    if (typeof projected === 'undefined' && lngLat) projected = true // if only lngLat defined

    // CSS
    setStyle(this.markerDiv, style)
    this.markerDiv.classList = className

    // Projection
    if (!this.same) projected ? this.project(lngLat) : this.unproject(position)

    // Render
    return ReactDOM.createPortal(
      children,
      this.markerDiv,
    )
  }
}


// Helpers
function setPosition(el, position={}) {
  for (let key in position) if (typeof position[key] === 'number') position[key] = position[key]+'px'
  el.style.position = 'absolute'
  el.style.top = position.top || ''
  el.style.right = position.right || ''
  el.style.bottom = position.bottom || ''
  el.style.left = position.left || ''
}

function resetPosition(el) {
  setPosition(el)
}

function setStyle(el, style={}) {
  let {top, right, bottom, left, transform, position, ...other} = style
  for (let p in other) el.style[p] = other[p]
}
