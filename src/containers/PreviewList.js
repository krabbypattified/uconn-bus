import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Preview from 'components/Preview'
import {selectThing} from 'data/actions'
import {isMobile} from 'components/helpers'
import 'assets/PreviewAnimation.css'


class PreviewList extends React.Component {
  render() {
    let {thingSelected, highlightedThings, selectThing} = this.props
    if (thingSelected) return null
    return (
      <List>
        <CSSTransitionGroup
          transitionName={'PreviewAnimation'}
          transitionEnterTimeout={200} transitionLeaveTimeout={200}>
              {highlightedThings.map((thing, idx) => (
                <Preview onDetailsClick={()=>selectThing(thing)} key={idx} data={{...thing,idx}}/>
              ))}
        </CSSTransitionGroup>
      </List>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    highlightedThings: state.highlightedThings,
    thingSelected: state.selectedThingStack.length,
  }),
  dispatch => ({
    selectThing: thing => dispatch(selectThing(thing))
  })
)(PreviewList)


// Helpers
let List = styled.div`
  position: absolute;
  z-index: 20;
  width: ${isMobile()?'100%':'400px'};
  max-width: 100%;
  ${isMobile()&&'padding: 0 7px;'}
`
