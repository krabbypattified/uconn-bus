import React from 'react'
import {connect} from 'react-redux'
import {directionsBack, directionsNext, directionsDone} from 'data/actions'
import DirectionsGraphQL from 'graphql/Directions'


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
