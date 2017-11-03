import React from 'react'
import busSVG from 'assets/bus.svg'
import styled from 'styled-components'
import ReactSVG from 'react-svg'


export default ({color}) => <div style={{width:'30px'}}><SVG path={busSVG} color={color}/></div>


let SVG = styled(ReactSVG)`
  margin-left: 5px;
  position: absolute;
  transform: translateY(-50%) rotate(73deg) scale(.85);
	.st0 {
		fill: ${({color}) => color};
	}
`
