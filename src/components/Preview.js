import React from 'react'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import BusIcon from 'components/BusIcon'
import BusStopDot from 'components/BusStopDot'
import 'assets/Preview.css'


export default ({data, onDetailsClick}) => {
  let isBus = data.id < 60
  return (
    <Preview className='Preview' style={{zIndex:20-data.idx}}>
      <div className='Name'>{data.name||`${data.busLine.name} Bus`}</div>
      {isBus ? <BusIcon color={data.busLine.color}/> : <BusStopDot/>}
      <div className='Padder'/>
      <DetailButton onClick={onDetailsClick} color={isBus?data.busLine.color:'#383838'}/>
    </Preview>
  )
}



// Autoprefixer fix
let Preview = styled.div`
  &:last-child {
    /*see PreviewAnimation.css*/
    transition-property: transform, opacity, box-shadow, border-radius;
    transition-duration: 200ms, 200ms, .26s, .26s;
    box-shadow: 0px 7px 7px -5px rgba(31, 73, 125, 0.18);
    border-radius: 0 0 6px 6px;
  }
`


let DetailButton = props => <Button className='DetailButton' {...props}>Details</Button>

let Button = styled.div`
  background-color: ${p=>p.color};
  transition: all .1s;
  &:hover {
    background-color: ${p=>desaturate(.1,darken(.03,p.color))};
    transform: translateY(1px);
  }
`
