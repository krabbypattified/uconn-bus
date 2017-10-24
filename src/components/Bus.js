import React from 'react'
import ReactSVG from 'react-svg'
import styled from 'styled-components'
import FreeMarker from 'components/FreeMarker'
import busSVG from 'assets/bus.svg'


export default class Bus extends React.Component {
  render() {
    let {lngLat, color, heading} = this.props
    return (
      <FreeMarker projected lock lngLat={lngLat} interpolation>
        <BusSVG path={busSVG} color={color} heading={heading}/>
      </FreeMarker>
    )
  }
}

// TODO smooth bus movement?

// Helpers
let BusSVG = styled(ReactSVG)`
  transform: rotate(${({heading}) => heading}deg);
	.st0 {
		fill: ${({color}) => color};
	}
`
