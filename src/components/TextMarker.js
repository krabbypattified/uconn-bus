import React from 'react'
import Marker from 'components/Marker'
import pinStickImage from 'assets/pointerStick.png'


export default ({text, background='#333', lngLat}) => (
  <Marker lngLat={lngLat} style={{zIndex:2}}>
    <div className='small Pin'>
      <div style={{background, color:'white'}}>{text}</div>
      <img src={pinStickImage} alt=''/>
    </div>
  </Marker>
)
