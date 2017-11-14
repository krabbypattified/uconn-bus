import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Buses from 'components/graphql/Buses'
import BusStops from 'components/graphql/BusStops'
// import SearchExpander from 'components/graphql/SearchExpander'
// import SearchReceiver from 'components/graphql/SearchReceiver'

import {setDirections, directionsNext} from 'data/actions'



class Default extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  render() {
    let {directions, thingSelected/*, setDirections, directionsNext*/} = this.props
    // let center = this.context.map.getCenter().toArray()
    return directions || thingSelected
    ? null
    : <div>
        <Buses/>
        <BusStops/>
        {/* <SearchExpander>
          <SearchReceiver/>
          <SVG className='searchSVG' path={searchSVG}/>
          <SVG className='directionsSVG' path={directionsSVG} onClick={_=>{
            setDirections({from: location||center, to: center})
            directionsNext()
          }}/>
        </SearchExpander> */}
      </div>
  }
}


export default connect(
  state => ({
    directions: state.directions.state,
    thingSelected: state.selectedThingStack.length,
  }),
  dispatch => ({
    setDirections: fromTo => dispatch(setDirections(fromTo)),
    directionsNext: _=> dispatch(directionsNext()),
  })
)(Default)
