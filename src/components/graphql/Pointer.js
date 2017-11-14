import React from 'react'
import {graphql, compose} from 'react-apollo'
import PointerReact from 'components/react/Pointer'
import {buses, busStops} from 'data/queries'
import {switchy} from 'helpers'


class Pointer extends React.Component {
  render() {
    let {buses:{buses}, busStops:{busStops}, directions, onHoverThings, onHoverDirections} = this.props
    return switchy(directions.state)({
      0:_=> <PointerReact onChange={map=>onHoverThings({map, buses, busStops})}/>,
      1:_=> <PointerReact label='Start' background='#71D5A0' onChange={map=>onHoverDirections({map})}/>,
      2:_=> <PointerReact label='End' background='#61A3FE' onChange={map=>onHoverDirections({map})}/>,
      3:_=> null,
    })
  }
}


export default compose(
  graphql(buses, {name: 'buses'}),
  graphql(busStops, {name: 'busStops'}),
)(Pointer)
