import React from 'react'
import styled, {keyframes} from 'styled-components'


export default ({color='#333', radius, stroke, satellite}) => {
  if (!satellite) return <Dot color={color} radius={radius} stroke={stroke}/>
  return (
    <div>
      <Satellite color={color}/>
      <Dot color={color} radius={radius} stroke={stroke}/>
    </div>
  )
}


// Helpers
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
