import React from 'react'
import {graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'

import BusStopManager from 'components/BusStopManager'
import {busStops} from 'data/queries'


class BusStops extends React.Component {
  render() {
    let {data, directions} = this.props
    if (directions) return null
    return <BusStopManager busStops={data.busStops||[]}/>
  }
}


export default compose(
  graphql(busStops),
  connect(state => ({
    directions: state.directions
  }))
)(BusStops)
