import React from 'react'
import {Satellite, Dot} from './helpers'


export default ({color='#333', radius, stroke, satellite}) => {
  if (!satellite) return <Dot color={color} radius={radius} stroke={stroke}/>
  return (
    <div>
      <Satellite color={color}/>
      <Dot color={color} radius={radius} stroke={stroke}/>
    </div>
  )
}
