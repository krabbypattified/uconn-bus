import React from 'react'
import {graphql} from 'react-apollo'

import BusStop from 'components/BusStop'
import {busStops} from 'data/queries'


class BusStopList extends React.Component {
  render() {
    let {data} = this.props
    if (data.loading) return null
    return (
      <div>
        {data.busStops.map((stop, idx) => (
            <BusStop key={idx} lngLat={[stop.longitude, stop.latitude]}/>
          ))}
      </div>
    )
  }
}


export default graphql(busStops)(BusStopList)
