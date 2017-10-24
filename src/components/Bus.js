import React from 'react'
import ReactSVG from 'react-svg'
import styled from 'styled-components'
import FreeMarker from 'components/FreeMarker'
import busSVG from 'assets/bus.svg'


export default class Bus extends React.Component {

  componentWillMount() {
    this.firstPosition = true
  }

  componentWillUpdate(newProps) {
    this.duration = this.firstPosition ? 0 : Date.now() - this.timeGotLastLocation
    this.timeGotLastLocation = Date.now()
    this.firstPosition = false
  }

  // interpolation={{duration:this.duration}}
  render() {
    let {lngLat, color, heading} = this.props
    return (
      <FreeMarker projected lock lngLat={lngLat}>
        <BusSVG path={busSVG} color={color} heading={heading}/>
      </FreeMarker>
    )
  }
}


// Helpers
let BusSVG = styled(ReactSVG)`
  transform: rotate(${({heading}) => heading}deg);
	.st0 {
		fill: ${({color}) => color};
	}
`
