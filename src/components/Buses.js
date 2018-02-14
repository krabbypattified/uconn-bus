/* global Loader */
import React from 'react'
import {graphql, compose} from 'react-apollo'
import BusManager from 'components/BusManager'
import {buses, busLines} from 'data/queries'


let Buses = ({buses:{buses=[]}, busLines:{busLines=[]}}) => {
  Loader.finish()
  return busLines.length
  ? <BusManager buses={buses} colors={busLines.map(i=>i.color)}/>
  : null
}


export default compose(
  graphql(buses, {name:'buses', options: {pollInterval: 2400}}),
  graphql(busLines, {name:'busLines'}),
)(Buses)
