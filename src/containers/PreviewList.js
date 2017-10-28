import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Preview from 'components/Preview'
import 'assets/PreviewAnimation.css'
import {isMobile} from 'components/helpers'
import {selectThing} from 'data/actions'


class PreviewList extends React.Component {
  render() {
    let {selectedThingStack, highlightedThings, selectThing} = this.props
    if (selectedThingStack&&selectedThingStack.length) return null
    return (
      <List>
        <CSSTransitionGroup
          transitionName={isMobile() ? 'PreviewAnimationVertical' : 'PreviewAnimation'}
          transitionEnterTimeout={300} transitionLeaveTimeout={300}>
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
