import React from 'react'
import {connect} from 'react-redux'
import PreviewsDOM from 'components/Previews'
import BusLineManager from 'components/BusLineManager'
import {selectThing} from 'data/actions'


let Previews = ({directions, thingSelected, highlightedThings, selectThing, firstBus}) =>
<div>
  <PreviewsDOM things={highlightedThings} selectFunc={selectThing}/>
  {firstBus && (
    <BusLineManager opacity={.42} lines={[{
    path: firstBus.busLine.path,
    color: firstBus.busLine.color,
    }]}/>
  )}
</div>



export default connect(
  state => ({
    highlightedThings: state.highlightedThings,
    thingSelected: state.selectedThingStack.length,
    directions: state.directions.state,
    firstBus: state.highlightedThings.filter(t=>t.id<60)[0],
  }),
  dispatch => ({
    selectThing: thing => dispatch(selectThing(thing))
  })
)(Previews)
