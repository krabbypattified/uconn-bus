import React from 'react'
import {connect} from 'react-redux'
import SearchBar from 'containers/SearchBar'
import Previews from 'containers/Previews'
import Buses from 'components/Buses'
import BusStops from 'components/BusStops'


let Default = ({directions, thingSelected}) =>
directions.state || thingSelected
? null
: <div>
    <Buses/>
    <BusStops/>
    <Previews/>
    <SearchBar/>
  </div>


export default connect(
  state => ({
    directions: state.directions,
    thingSelected: state.selectedThingStack.length,
  }),
)(Default)
