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
  project(lngLat) {
    let {map} =this.context
    let {interpolation} = this.props
    let interpolate = interpolation && lngLat

    // Clean up
    if (this.projected === false) this.markerDiv.remove()
    resetPosition(this.markerDiv)

    // Set position (vs interpolate)
    if (!interpolate) this.marker.setLngLat(lngLat||this.marker.getLngLat())

    // Add to map
    this.marker.addTo(map)

    // Update state
    this.projected = true

    // Interpolate
    if (!interpolate) return


    // get the current transform
    // compute the new transform
    // interpolate
    // project(newTransform)
    let oldPos = cornerToCenter(this.markerDiv)
    let newPos = map.project(lngLat)
    interpolate(this.markerDiv, oldPos, newPos)
  }

  // Place on mapDiv
  unproject(position) {
    // TODO interpolation
    if (this.projected) this.marker.remove()

    // Without interpolation (&& position)
    if (position && !this.props.interpolation) {
      this.markerDiv.style.transform = ''
      setPosition(this.markerDiv, position)
    }

    // Add to mapDiv
    this.context.map.getContainer().appendChild(this.markerDiv)

    // Update state
    this.projected = false

    // Interpolate
    // get the current transform
    // compute the new transform
    // interpolate
    // unproject(newTransform)
  }

  componentWillMount() {
    let map = this.context.map

    this.markerDiv = document.createElement('div')
    this.marker = new MapboxGL.Marker(this.markerDiv)
    resetPosition(this.markerDiv)

    let x = 0
    let y = 0

    let mc = new Hammer(this.markerDiv)
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 })

    mc.on('panstart', e => {
      if (this.lock) return

      map.dragPan.disable()

      let trans = getTransform(this.markerDiv)
      x = trans.x
      y = trans.y
    })

    mc.on('pan', e => {
      if (this.lock) return
    	this.markerDiv.style.transform = `translate(${x + e.deltaX}px, ${y + e.deltaY}px)`
    })

    mc.on('panend', e => {
      if (this.lock) return

      x += e.deltaX
    	y += e.deltaY

      let offset = cornerToCenter(this.markerDiv)
      this.marker.setLngLat(map.unproject([x+offset.x, y+offset.y]))

      map.dragPan.enable()

      this.props.onPanEnd && this.props.onPanEnd(this)
    })
  }

  componentWillUpdate(newProps) {
    this.sameProjection =
      this.props.projected === newProps.projected &&
      this.props.position === newProps.position &&
      this.props.lngLat === newProps.lngLat
  }

  componentWillUnmount() {
    this.marker.remove()
  }

  render() {
    let {children, style, className='', position, projected, lngLat, lock, interpolation} = this.props

    // Dragable lock
    this.lock = lock || interpolation

    // CSS
    setStyle(this.markerDiv, style)
    this.markerDiv.classList = className

    // Projection
    if (!this.sameProjection) projected ? this.project(lngLat) : this.unproject(position)

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

function getTransform(el) {
  const matrix = window.getComputedStyle(el).getPropertyValue('transform')
  const translate = matrix.match(/[0-9\.]+/g) || [0,0,0,0,0,0] // eslint-disable-line
  const x = parseFloat(translate[4], 10)
  const y = parseFloat(translate[5], 10)
  return {x,y}
}

function cornerToCenter(el) {
  let x = el.offsetWidth/2 + el.offsetLeft
  let y = el.offsetHeight/2 + el.offsetTop
  return {x,y}
}
