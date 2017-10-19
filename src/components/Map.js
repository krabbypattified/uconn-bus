import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'

MapboxGL.accessToken = 'pk.eyJ1IjoiY2hlZmdhYmUiLCJhIjoiY2o4dGNtZGl6MGt1MjJxbWJibG9udWswYSJ9.oJ-xyepjGdPnPtRpkWwyfA'


export default class Map extends React.Component {

  static childContextTypes = {
    map: PropTypes.any
  }

  getChildContext() {
    return {map: this.map}
  }

  componentWillMount() {
    let { container, mapStyle, ...otherProps } = this.props

    this.mapDiv = document.getElementById(this.props.container)

    this.map = new MapboxGL.Map({
      container: this.mapDiv,
      style: mapStyle,
      ...otherProps
    })
    this.map.addControl(new MapboxGL.FullscreenControl())
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.mapDiv,
    )
  }
}
