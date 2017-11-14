import React from 'react'
import {connect} from 'react-redux'

import Buses from 'components/graphql/Buses'
import BusStops from 'components/graphql/BusStops'


let Default = ({directions, thingSelected}) => (
  directions || thingSelected
  ? null
  : <div>
      <Buses/>
      <BusStops/>
    </div>
)


export default connect(state => ({
  directions: state.directions.state,
  thingSelected: state.selectedThingStack.length,
}))(Default)
