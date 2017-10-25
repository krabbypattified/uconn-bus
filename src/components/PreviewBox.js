import React from 'react'
import busSVG from 'assets/bus.svg'
import {Flex, Box, Title, Details, BusStopDot, BusSVG} from './helpers'


export default class PreviewBox extends React.Component {
  render() {
    let {data} = this.props
    let isBus = data.id < 60
    return (
      <Box style={{zIndex:20-data.idx}}>
        <Flex>
          <Title>{data.name||`${data.busLine.name} Bus`}</Title>
          {isBus ? <BusSVG path={busSVG} color={data.busLine.color}/> : <BusStopDot color='#ff6666'/>}
        </Flex>
        {isBus ? <Details color={data.busLine.color}>Details</Details> : <Details color='#383838'>Details</Details>}
      </Box>
    )
  }
}
