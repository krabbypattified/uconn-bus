import React from 'react'
import PropTypes from 'prop-types'
import {SourceManager} from './helpers'


export default class WalkManager extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context

    this.manager = new SourceManager({
      map,
      source: 'walk',
      type: 'LineString',
      getProperties: awalk => ({
        coordinates: [awalk.from, awalk.to],
      })
    })

    let paint = {
      'line-color': '#2196f3',
      'line-width': 4,
    }
    for (let prop in paint) map.setPaintProperty('walk', prop, paint[prop])
  }

  componentWillUnmount() {
    this.manager.remove()
  }

  render() {
    this.manager.set(this.props.walk)
    return null
  }
}
