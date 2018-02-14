import React from 'react'
import {connect} from 'react-redux'
import DirectionsDOM from 'components/Directions'
import {directionsBack, directionsNext, directionsDone} from 'data/actions'


let Directions = ({directions, directionsBack, directionsNext}) =>
directions.state
? <DirectionsDOM
    directions={directions}
    onBack={directionsBack}
    onNext={directionsNext}
    onDone={directionsDone}
  />
: null


export default connect(
  state => ({
    directions: state.directions,
  }),
  dispatch => ({
    directionsBack: ()=>dispatch(directionsBack()),
    directionsNext: ()=>dispatch(directionsNext()),
    directionsDone: ()=>dispatch(directionsDone()),
  })
)(Directions)
