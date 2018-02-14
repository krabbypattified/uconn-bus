import React from 'react'
import {connect} from 'react-redux'
import DetailsDOM from 'components/Details'
import {deselectThing, selectThing} from 'data/actions'


let Details = ({thingSelected, thing, deselectThing, selectThing}) =>
thingSelected
? <DetailsDOM
    onBack={deselectThing}
    thing={thing}
    selectThing={selectThing}
  />
: null


export default connect(
  state => ({
    thingSelected: state.selectedThingStack.length,
    thing: state.selectedThingStack[state.selectedThingStack.length-1],
  }),
  dispatch => ({
    selectThing: thing=>dispatch(selectThing(thing)),
    deselectThing: ()=>dispatch(deselectThing()),
  })
)(Details)
