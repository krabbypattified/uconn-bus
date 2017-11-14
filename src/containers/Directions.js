import React from 'react'
import {connect} from 'react-redux'

import DirectionsGraphQL from 'components/Directions'

import {directionsBack, directionsNext, directionsDone} from 'data/actions'


export default connect(
  state => ({
    directions: state.directions,
  }),
  dispatch => ({
    directionsBack: ()=>dispatch(directionsBack()),
    directionsNext: ()=>dispatch(directionsNext()),
    directionsDone: ()=>dispatch(directionsDone()),
  })
)(
  ({directions, directionsBack, directionsNext}) =>
  directions.state ? <DirectionsGraphQL directions={directions} onBack={directionsBack} onNext={directionsNext} onDone={directionsDone}/> : null
)
