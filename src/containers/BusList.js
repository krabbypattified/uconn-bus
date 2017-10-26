import React from 'react'
import {graphql} from 'react-apollo'

import Bus from 'components/Bus'
import {buses} from 'data/queries'


class BusList extends React.Component {
  render() {
    let {data} = this.props
    if (data.loading) return null
    return (
      <div>
        {
          data.buses.map((bus, idx) => (
            <Bus
              key={idx}
              color={bus.busLine.color}
              lngLat={[bus.longitude, bus.latitude]}
              heading={bus.heading}
            />
          ))
        }
      </div>
    )
  }
}


export default graphql(buses, {options: { pollInterval: 2400 }})(BusList)
