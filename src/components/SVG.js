import React from 'react'
import ReactSVG from 'react-svg'
import styled from 'styled-components'


const SVG = ({path, ...props}) => <div {...props}><SVGDiv path={path}/></div>


export default SVG


let SVGDiv = styled(ReactSVG)`
  display: flex;
  div {display: flex}
`
