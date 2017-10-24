import React from 'react'
import {graphql, compose} from 'react-apollo'

import BusStop from 'components/BusStop'
import {busStops} from 'data/queries'


class BusStopList extends React.Component {
  render() {
    let {data} = this.props
    if (data.loading) return null
    return (
      <div>
        {
          data.busStops.map((stop, idx) => (
            <BusStop key={idx} lngLat={[stop.longitude, stop.latitude]} />
          ))
        }
      </div>
    )
  }
}


// Connect & Export
export default compose(
  graphql(busStops),
  // connect(
  //   state => ({...state}),
  //   dispatch => ({onMapClick: () => dispatch(deselect())})
  // ),
)(BusStopList)
