import React from 'react'
import {graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'

import BusManager from 'components/BusManager'
import {buses, busLines} from 'data/queries'


class Buses extends React.Component {
  render() {
    let {buses, busLines, directions} = this.props
    if (buses.loading || busLines.loading || directions) return null
    buses = buses.buses || []
    busLines = busLines.busLines || []

    return <BusManager buses={buses} colors={busLines.map(i=>i.color)}/>
  }
}


export default compose(
  graphql(buses, {name: 'buses', options: { pollInterval: 2400 }}),
  graphql(busLines, {name: 'busLines'}),
  connect(state => ({
      directions: state.directions
    }))
)(Buses)
