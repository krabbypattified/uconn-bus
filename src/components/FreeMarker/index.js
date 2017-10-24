import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL, {Point} from 'mapbox-gl'
import Hammer from 'hammerjs'
import {resetPosition,cornerToCenter,setPosition,absoluteToPoint,interpolate,getPosition,setStyle,addPoints,subtractPoints} from './helpers'


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
      let newPos = map.project(lngLat)
      newPos = subtractPoints(newPos, getPosition(this.markerDiv))
      newPos = `translate(-50%, -50%) translate(${newPos.x}px,${newPos.y}px)`
      this.interpolatePosition(newPos, () => {
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
      let newPos = absoluteToPoint(this.markerDiv, position)
      newPos = subtractPoints(newPos, this.markerDiv)
      newPos = `translate(-50%, -50%) translate(${newPos.x}px,${newPos.y}px)`
      this.interpolatePosition(newPos, () => {
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
      el: this.animationDiv,
      to: point,
      ...this.props.interpolation,
      callback: () => {
        this.interpolating = false
        callback && callback()
      }
    })
  }

  componentWillMount() {
    let {map} = this.context

    this.animationDiv = document.createElement('div')
    this.markerDiv = document.createElement('div')
    this.markerDiv.appendChild(this.animationDiv)
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

      pos = addPoints(pos, [e.deltaX, e.deltaY])

      let offset = addPoints(cornerToCenter(this.markerDiv), pos)
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
      this.animationDiv,
    )
  }
}
