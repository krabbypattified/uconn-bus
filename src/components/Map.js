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
    let { container, mapStyle, sources, layers, onLoad, ...otherProps } = this.props

    this.mapDiv = document.getElementById(this.props.container)

    this.map = new MapboxGL.Map({
      container: this.mapDiv,
      style: mapStyle,
      ...otherProps
    })

    this.renderFunc = ()=>null
    this.map.on('load', () => {

      onLoad(this.map)

      sources.forEach(src => {
        this.map.addSource(src, {type:'geojson', data: {type: 'FeatureCollection',features: []}})
      })
      layers.forEach(layer => {
        this.map.addLayer(layer)
      })

      this.renderFunc = ReactDOM.createPortal.bind(
        this,
        this.props.children,
        this.mapDiv,
      )
      this.forceUpdate()
    })
  }

  render() {
    return this.renderFunc()
  }
}
