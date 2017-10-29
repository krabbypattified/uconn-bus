import React from 'react'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import BusSVG from 'components/BusSVG'
import BusStopDot from 'components/BusStopDot'


export default ({data, onDetailsClick}) => {
  let isBus = data.id < 60
  return (
    <Box style={{zIndex:20-data.idx}}>
      <Flex>
        <Title>{data.name||`${data.busLine.name} Bus`}</Title>
        {isBus ? <BusSVG color={data.busLine.color}/> : <BusStopDot/>}
      </Flex>
      <Details onClick={onDetailsClick} color={isBus?data.busLine.color:'#383838'}>Details</Details>
    </Box>
  )
}




let Box = styled.div`
  position: relative;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px 13px 20px;
  font-size: 17px;
  font-weight: 600;
  width: 100%;
  border-bottom: .5px solid #e8e8e8;
  &:last-child {
    /*see PreviewAnimation.css*/
    transition-property: transform, opacity, box-shadow, border-radius;
    transition-duration: 200ms, 200ms, .26s, .26s;
    box-shadow: 0px 7px 7px -5px rgba(31, 73, 125, 0.18);
    border-radius: 0 0 6px 6px;
  }
`

let Flex = styled.div`
  display: flex;
  align-items: center;
`

let Title = styled.div`
  max-width: 209px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: fade;
`

let Details = styled.div`
  user-select: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  padding: 3px 17px ;
  background-color: ${({color})=>color};
  border-radius: 30px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.36);
  transition: all .1s;
  &:hover {
    background-color: ${({color})=>desaturate(.1,darken(.03,color))};
    transform: translateY(1px);
  }
`
