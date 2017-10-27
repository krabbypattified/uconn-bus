import React from 'react'
import {graphql} from 'react-apollo'

import BusStopManager from 'components/BusStopManager'
import {busStops} from 'data/queries'


class BusStopList extends React.Component {
  render() {
    let {data} = this.props
    if (data.loading) return null
    return <BusStopManager busStops={data.busStops}/>
  }
}


export default graphql(busStops)(BusStopList)
