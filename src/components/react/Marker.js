import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'


export default class Marker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    this.markerDiv = document.createElement('div')

    this.marker = new MapboxGL.Marker(this.markerDiv)
      .setLngLat(this.props.lngLat)
      .addTo(this.context.map)
  }

  componentWillUnmount() {
    this.marker.remove()
  }

  render() {
    setStyle(this.markerDiv, this.props.style)
    return ReactDOM.createPortal(
      this.props.children,
      this.markerDiv,
    )
  }
}




// Helpers
function setStyle(el, style={}) {
  for (let p in style) el.style[p] = style[p]
}
