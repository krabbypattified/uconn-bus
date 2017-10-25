import React from 'react'
import ReactSVG from 'react-svg'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FreeMarker from 'components/FreeMarker'
import busSVG from 'assets/bus.svg'
import {isMobile, nearestDeg} from './helpers'


// TODO better bus svg
export default class Bus extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context
    this.heading = 0
    this.headingMod = 0
    this.interpolation = isMobile() ? false : {duration:350}

    map.on('rotateend', () => {
      this.headingMod = map.getBearing()
      this.forceUpdate()
    })
  }

  render() {
    let {lngLat, color, heading} = this.props

    if (heading) this.heading = nearestDeg(this.heading, heading) // smooth rotation

    return (
      <FreeMarker projected lock lngLat={lngLat} interpolation={this.interpolation}>
        <div style={{transform: `rotate(${this.heading - this.headingMod}deg)`,transition:'transform 1s'}}>
          <BusSVG path={busSVG} color={color} />
        </div>
      </FreeMarker>
    )
  }
}

// Helpers
let BusSVG = styled(ReactSVG)`
	.st0 {
		fill: ${({color}) => color};
	}
`
