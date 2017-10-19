import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Hammer from 'hammerjs'


export default class FreeMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let map = this.context.map
    let mapdiv = map.getContainer()
    this.markerDiv = document.createElement('div')
    this.markerDiv.style.position = 'absolute'
    mapdiv.appendChild(this.markerDiv)

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

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.markerDiv,
    )
  }
}
