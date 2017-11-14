import React from 'react'
import ReactSVG from 'react-svg'
import styled from 'styled-components'


export default ({path, ...props}) => <div {...props}><SVG path={path}/></div>


let SVG = styled(ReactSVG)`
  display: flex;
  div {display: flex}
`
