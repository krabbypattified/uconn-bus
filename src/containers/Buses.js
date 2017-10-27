import React from 'react'
import {graphql} from 'react-apollo'

import BusManager from 'components/BusManager'
import {buses} from 'data/queries'


class BusList extends React.Component {
  render() {
    let {data} = this.props
    if (data.loading) return null
    return <BusManager buses={data.buses}/>
  }
}


export default graphql(buses, {options: { pollInterval: 2400 }})(BusList)
