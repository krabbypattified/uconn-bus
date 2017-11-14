import React from 'react'
import busSVG from 'assets/bus.svg'
import styled from 'styled-components'
import SVG from 'components/dom/SVG'


export default props => <BusSVG {...props} path={busSVG}/>


let BusSVG = styled(SVG)`
  width: 30px;
  svg {
    position: absolute;
    transform: translate(1px,-50%) scale(0.77) rotate(73deg);
  }
	.st0 {
		fill: ${({color}) => color};
	}
`
