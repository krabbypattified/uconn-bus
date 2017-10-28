import React from 'react'
import busSVG from 'assets/bus.svg'
import styled from 'styled-components'
import ReactSVG from 'react-svg'


export default ({color}) => <SVG path={busSVG} color={color}/>


let SVG = styled(ReactSVG)`
  position: absolute;
  transform: translate(4px,1px) rotate(60deg) scale(.85);
  transform: translateY(-50%) translate(5px,0px) rotate(73deg) scale(.85);
  margin-right: 10px;
	.st0 {
		fill: ${({color}) => color};
	}
`
