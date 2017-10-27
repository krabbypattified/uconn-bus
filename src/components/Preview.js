import React from 'react'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import BusSVG from 'components/BusSVG'
import BusStopDot from 'components/BusStopDot'
import {isMobile} from 'components/helpers'


export default class Preview extends React.Component {
  render() {
    let {data} = this.props
    let isBus = data.id < 60
    return (
      <Box style={{zIndex:-data.idx}}>
        <Flex>
          <Title>{data.name||`${data.busLine.name} Bus`}</Title>
          {isBus ? <BusSVG color={data.busLine.color}/> : <BusStopDot color='#ff6666'/>}
        </Flex>
        <Details onClick={this.props.onClick} color={isBus?data.busLine.color:'#383838'}>Details</Details>
      </Box>
    )
  }
}


// Styled Components

let Box = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13.5px 21px 13.5px 23.5px;
  font-size: 17px;
  width: 100%;
  border-bottom: .5px solid #eee;
  ${isMobile() || 'box-shadow: 0 0 7px 0 rgba(0,0,0,.2);'}
`

let Flex = styled.div`
  display: flex;
  align-items: center;
`

let Title = styled.div`
  max-width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  &:active {
    background-color: ${({color})=>desaturate(.1,darken(.03,color))};
    transform: translateY(1px);
  }
`
