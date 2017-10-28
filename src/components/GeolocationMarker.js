import React from 'react'
import styled, {keyframes} from 'styled-components'
import FreeMarker from 'components/FreeMarker'


export default ({location, onPanEnd}) => (
  <FreeMarker projected
    style={{zIndex:1}}
    lngLat={location}
    onPanEnd={onPanEnd}
  >
    <Satellite color='#61a3fe'/>
    <Dot color='#61a3fe'/>
  </FreeMarker>
)


// Styled Components
let blink = keyframes`
  from {
    opacity: .25;
    transform: translate(-50%, -50%) scale(.3);
  }
  40% {
    opacity: .14;
  }
  80% {
    opacity: 0;
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3.15);
  }
`


let Satellite = styled.div`
  position: absolute;
  background-color: ${({color})=>color};
  width: 30px;
  height: 30px;
  border-radius: 100px;
  animation: ${blink} 3s cubic-bezier(.1,.55,.65,1) infinite;
  transform: translate(-50%, -50%);
  pointer-events: none;
`


let Dot = styled.div`
  pointer-events: auto;
  position: absolute;
  background-color: ${({color})=>color};
  width: ${({radius=7})=>radius*2}px;
  height: ${({radius=7})=>radius*2}px;
  border-radius: 100px;
  border: ${({stroke=2})=>stroke}px solid white;
  transform: translate(-50%, -50%);
`
