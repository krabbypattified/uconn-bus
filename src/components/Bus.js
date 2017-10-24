import React from 'react'
import ReactSVG from 'react-svg'
import styled from 'styled-components'
import FreeMarker from 'components/FreeMarker'
import busSVG from 'assets/bus.svg'


export default class Bus extends React.Component {
  componentWillUpdate(nextProps) {
    if (nextProps.heading) this.heading = nextProps.heading // prevent realign to 0deg
  }

  render() {
    let {lngLat, color} = this.props
    return (
      <FreeMarker projected lock lngLat={lngLat} interpolation>
        <BusSVG path={busSVG} color={color} style={{transform: `rotate(${this.heading||this.props.heading}deg)`}}/>
      </FreeMarker>
    )
  }
}

// TODO smooth bus movement?

// Helpers
let BusSVG = styled(ReactSVG)`
	.st0 {
		fill: ${({color}) => color};
	}
`
