import React from 'react'
import {graphql} from 'react-apollo'

import BusStopManager from 'components/dom/BusStopManager'
import {busStops} from 'data/queries'


let BusStops = ({data}) => <BusStopManager busStops={data.busStops||[]}/>


export default graphql(busStops, {options: {pollInterval: 1000*90}})(BusStops)
