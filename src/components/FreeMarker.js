import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL, {Point} from 'mapbox-gl'
import Hammer from 'hammerjs'
import {Matrix} from 'transformation-matrix-js'
import 'web-animations-js'


export default class FreeMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  // Place on map
  project(lngLat) {
    let {map} =this.context
    const INTERP = this.shouldInterpolate && lngLat

    // Clean up
    if (this.projected === false) this.markerDiv.remove()
    resetPosition(this.markerDiv)

    // Set position (vs interpolate)
    if (!INTERP) this.marker.setLngLat(lngLat||this.marker.getLngLat())

    // Add to map
    if (this.projected !== true) this.marker.addTo(map)

    // Interpolate
    if (INTERP) {
      let oldPos = cornerToCenter(this.markerDiv)
      let newPos = map.project(lngLat)
      this.interpolatePosition(newPos.minus(oldPos), () => {
        this.marker.setLngLat(lngLat)
      })
    }

    // Update state
    this.projected = true
  }

  // Place on mapDiv
  unproject(position) {
    // Clean up
    if (this.projected) this.marker.remove()

    // Set position (vs interpolate)
    if (position && !this.shouldInterpolate) {
      this.markerDiv.style.transform = ''
      setPosition(this.markerDiv, position)
    }

    // Add to mapDiv
    if (this.projected !== false) this.context.map.getContainer().appendChild(this.markerDiv)

    // Interpolate
    if (position && this.shouldInterpolate) {
      let oldPos = cornerToCenter(this.markerDiv)
      let newPos = absoluteToPoint(this.markerDiv, position)
      this.interpolatePosition(newPos.minus(oldPos), () => {
        this.markerDiv.style.transform = ''
        setPosition(this.markerDiv, position)
      })
    }

    // Update state
    this.projected = false
  }

  // Animate marker position
  interpolatePosition(point, callback) {
    this.interpolating = true
    interpolate({
      el: this.markerDiv,
      delta: new Matrix().translate(point.x,point.y),
      ...this.props.interpolation,
      callback: () => {
        this.interpolating = false
        callback && callback()
      }
    })
  }

  componentWillMount() {
    let {map} = this.context

    this.markerDiv = document.createElement('div')
    this.marker = new MapboxGL.Marker(this.markerDiv)
    resetPosition(this.markerDiv)

    let pos = new Point(0,0)

    let mc = new Hammer(this.markerDiv)
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 })

    mc.on('panstart', e => {
      if (this.lock) return

      map.dragPan.disable()

      pos = getPosition(this.markerDiv)
    })

    mc.on('pan', e => {
      if (this.lock) return
    	this.markerDiv.style.transform = `translate(${pos.x + e.deltaX}px, ${pos.y + e.deltaY}px)`
    })

    mc.on('panend', e => {
      if (this.lock) return

      pos.add([e.deltaX, e.deltaY])

      let offset = cornerToCenter(this.markerDiv).add(pos)
      this.marker.setLngLat(map.unproject(offset))

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

  get lock() {
    return this.props.lock || this.interpolating
  }

  get shouldInterpolate() {
    return (typeof this.projected !== 'undefined' && Boolean(this.props.interpolation))
  }

  render() {
    let {children, style, className='', position, projected, lngLat} = this.props

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

let checkerDiv
function absoluteToPoint(el, pos) {
  if (!checkerDiv) {
    checkerDiv = document.createElement('div')
    checkerDiv.style.pointerEvents = 'none'
    el.parentNode.appendChild(checkerDiv)
  }

  checkerDiv.style.width = el.offsetWidth+'px'
  checkerDiv.style.height = el.offsetHeight+'px'
  setPosition(checkerDiv, pos)
  return cornerToCenter(checkerDiv)
}

function setStyle(el, style={}) {
  let {top, right, bottom, left, transform, position, ...other} = style
  for (let p in other) el.style[p] = other[p]
}

function getPosition(el) {
  const matrix = window.getComputedStyle(el).getPropertyValue('transform')
  const translate = matrix.match(/[0-9\.]+/g) || [0,0,0,0,0,0] // eslint-disable-line
  const x = parseFloat(translate[4], 10)
  const y = parseFloat(translate[5], 10)
  return new Point(x,y)
}

function cornerToCenter(el) {
  let x = el.offsetWidth/2 + el.offsetLeft
  let y = el.offsetHeight/2 + el.offsetTop
  return new Point(x,y)
}

function interpolate({el, delta, easing='ease-in-out', duration=1000, callback=()=>{}}) {
  if (!el) throw new Error('Interpolation requires an \'el\' parameter.')
  if (!delta) throw new Error('Interpolation requires a \'delta\' parameter.')

  let before = Matrix.from(el)
  if (isNaN(before.a)) before = new Matrix() // bugfix
  let after = before.concat(delta)

  el.willChange = 'transform'

  let frames = [
    {transform: before.toCSS(), easing},
    {transform:  after.toCSS(), easing}
  ]
  let timing = {duration}
  let anim = el.animate(frames, timing)
  anim.onfinish = callback
}

// Mutates
Point.prototype.add = function(point) {
  if (Array.isArray(point)) point = new Point(...point)
  this.x += point.x
  this.y += point.y
  return this
}

Point.prototype.minus = function(point) {
  if (Array.isArray(point)) point = new Point(...point)
  const x = this.x - point.x
  const y = this.y - point.y
  return new Point(x,y)
}
