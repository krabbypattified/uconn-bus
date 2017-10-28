import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Preview from 'components/Preview'
import {selectThing} from 'data/actions'
import 'assets/PreviewAnimation.css'


class PreviewList extends React.Component {
  render() {
    let {selectedThingStack, highlightedThings, selectThing} = this.props
    if (selectedThingStack&&selectedThingStack.length) return null
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
    highlightedThings: state.highlightedThings
  }),
  dispatch => ({
    selectThing: thing => dispatch(selectThing(thing))
  })
)(PreviewList)


// Helpers
let List = styled.div`
  position: absolute;
  z-index: 20;
  width: 400px;
  max-width: 100%;
`
