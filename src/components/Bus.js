import React from 'react'
import ReactSVG from 'react-svg'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FreeMarker from 'components/FreeMarker'
import busSVG from 'assets/bus.svg'


export default class Bus extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentWillMount() {
    let {map} = this.context
    this.heading = 0
    this.headingMod = 0
    this.interpolation = isMobile ? false : {duration:350}

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


let isMobile = navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)


function nearestDeg(dOld,dNew) {
  let old = dOld % 360

  let dist1 = Math.abs(old-dNew)
  let dist2 = 360 - dist1

  if (old>dNew) {
  	  if (dist1<dist2) return dOld - dist1
  		else return dOld + dist2
  }

  if (dist1<dist2) return dOld + dist1
  else return dOld - dist2
}
