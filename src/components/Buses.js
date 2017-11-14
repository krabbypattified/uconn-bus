/* global Loader */
import React from 'react'
import {graphql, compose} from 'react-apollo'

import BusManager from 'components/BusManager'
import {hexColor} from 'helpers'
import {buses, busLines} from 'data/queries'
let loaded


let Buses = ({buses, busLines}) => {
  if (busLines.loading) return null
  buses = buses.buses || []
  busLines = busLines.busLines || []
  if (!loaded) {
    loaded = true
    Loader.finish()
  }
  return <BusManager buses={buses} colors={busLines.map(i=>hexColor(i.color))}/>
}


export default compose(
  graphql(buses, {name:'buses', options: {pollInterval: 2400}}),
  graphql(busLines, {name:'busLines'}),
)(Buses)
