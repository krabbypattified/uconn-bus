import React from 'react'
import {graphql, compose} from 'react-apollo'

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
              onClick
              key={idx}
              color={bus.color}
              lngLat={[bus.longitude, bus.latitude]}
            />
          ))
        }
      </div>
    )
  }
}


// Connect & Export TODO
export default compose(
  graphql(buses),
  // connect(
  //   state => ({...state}),
  //   dispatch => ({onMapClick: () => dispatch(deselect())})
  // ),
)(BusList)
