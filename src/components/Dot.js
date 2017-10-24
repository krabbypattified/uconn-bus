import React from 'react'
import styled from 'styled-components'


export default ({color='#333333', radius=5, stroke, satellite}) => {
  if (!satellite) return <Dot color={color} radius={radius} stroke={stroke}/>
  return (
    <Satellite color={color} {...(typeof satellite === 'number' && {radius:satellite})}>
      <Dot color={color} radius={radius} stroke={stroke}/>
    </Satellite>
  )
}


// Helpers
let Dot = styled.div`
  background-color: ${({color='#333333'})=>rgba(color)};
  width: ${({radius=5})=>radius*2}px;
  height: ${({radius=5})=>radius*2}px;
  border-radius: 100px;
  border: ${({stroke=2})=>stroke}px solid white;
  box-shadow: 0 2px 1px 0 rgba(0,0,0,.3);
`


let Satellite = styled.div`
  background-color: ${({color='#333333'})=>rgba(color, .25)};
  width: ${({radius=14})=>radius*2}px;
  height: ${({radius=14})=>radius*2}px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`


function rgba(color, opacity=1) {
  if (!/[0-9A-Fa-f]{6}/.test(color)) {
    console.warn('Marker color must be a HEX value')
    color = '#333333'
  }
  let hex = color.replace('#','');
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r},${g},${b},${opacity})`
}
