import React from 'react'
import {graphql, compose} from 'react-apollo'
import PointerReact from 'components/dom/Pointer'
import {buses, busStops} from 'data/queries'


let Pointer = ({buses:{buses}, busStops:{busStops}, onChange=_=>{}, ...other}) =>
<PointerReact {...other} onChange={map=>onChange({map, buses, busStops})}/>


export default compose(
  graphql(buses, {name: 'buses'}),
  graphql(busStops, {name: 'busStops'}),
)(Pointer)
