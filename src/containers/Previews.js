import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Preview from 'components/Preview'
import BusLineManager from 'components/BusLineManager'
import {selectThing} from 'data/actions'
import {isMobile} from 'components/helpers'
import 'assets/PreviewAnimation.css'


class Previews extends React.Component {
  render() {
    let {directions, thingSelected, highlightedThings, selectThing, firstBus} = this.props
    if (thingSelected || directions) return null

    let busLineIfAny = firstBus && (
      <BusLineManager opacity={.42} lines={[{
        path: firstBus.busLine.path,
        color: firstBus.busLine.color,
      }]}/>
    )

    return (
      <List>
        <CSSTransitionGroup
          transitionName={'PreviewAnimation'}
          transitionEnterTimeout={200} transitionLeaveTimeout={200}>
              {highlightedThings.map((thing, idx) => (
                <Preview onDetailsClick={()=>selectThing(thing)} key={idx} data={{...thing,idx}}/>
              ))}
        </CSSTransitionGroup>
        {busLineIfAny}
      </List>
    )
  }
}


// Connect & Export
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


// Helpers
let List = styled.div`
  position: absolute;
  z-index: 20;
  width: ${isMobile()?'100%':'400px'};
  max-width: 100%;
  ${isMobile()&&'padding: 0 7px;'}
`
