import React from 'react'
import styled, {keyframes} from 'styled-components'
import FreeMarker from 'components/FreeMarker'


export default ({location, onPanEnd, scale=1}) => (
  <FreeMarker projected
    style={{zIndex:1}}
    lngLat={location}
    onPanEnd={onPanEnd}
  >
    <Satellite color='#2196f3'/>
    <Dot color='#2196f3' scale={scale}/>
    <HitBox/>
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
  position: absolute;
  background-color: ${({color})=>color};
  width: 14px;
  height: 14px;
  border-radius: 100px;
  border: 2px solid white;
  transform: translate(-50%, -50%) scale(${({scale=1})=>scale});
  pointer-events: none;
`


let HitBox = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 100px;
  transform: translate(-50%, -50%);
  pointer-events: auto;
`
