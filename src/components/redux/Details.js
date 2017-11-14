import React from 'react'
import {connect} from 'react-redux'
import {deselectThing, selectThing} from 'data/actions'
import Details from 'components/graphql/Details'


export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    thing: state.selectedThingStack[state.selectedThingStack.length-1],
  }),
  dispatch => ({
    selectThing: thing=>dispatch(selectThing(thing)),
    deselectThing: ()=>dispatch(deselectThing()),
  })
)(
  ({thingSelected, thing, deselectThing, selectThing}) =>
  !thingSelected ? null : <Details onBack={deselectThing} thing={thing} selectThing={selectThing}/>
)
