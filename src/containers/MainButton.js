import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import {directionsNext} from 'data/actions'
import 'assets/MainButtonAnimation.css'


class MainButton extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  render() {
    let {location, thingSelected, directions, directionsNext} = this.props
    let {map} = this.context
    let button

    if (thingSelected || directions) button = null
    else button = <Button key={1} color='#2196f3' onClick={()=>{directionsNext({from:location, to:map.getCenter().toArray()})}}>Get Directions</Button>

    return (
      <BottomBar>
        <CSSTransitionGroup
          transitionName={'MainButtonAnimation'}
          transitionAppear={true} transitionAppearTimeout={130} // weird...
          transitionEnterTimeout={130} transitionLeaveTimeout={130}>
            {button}
        </CSSTransitionGroup>
      </BottomBar>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    location: state.location,
    directions: state.directions.state,
    thingSelected: state.selectedThingStack.length,
  }),
  dispatch => ({
    directionsNext: fromTo => dispatch(directionsNext(fromTo)),
  })
)(MainButton)


// Helpers
let BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1em 7px 0 7px;
  z-index: 11;
  pointer-events: none;
`

let Button = styled.div`
  user-select: none;
  pointer-events: auto;
  cursor: pointer;
  margin: 0 auto;
  width: 400px;
  max-width: 100%;
  background-color: white;
  background-color: ${({color})=>color};
  text-align: center;
  color: white;
  border-radius: 10px 10px 0 0;
  padding: 13px;
  font-size: 17px;
  font-weight: 600;
  box-shadow: 0 0px 12px -1px rgba(0,0,0,0.33);
  transition: background-color .15s;
  &:active {
    background-color: ${({color})=>desaturate(.45,darken(.13,color))};
  }
`
