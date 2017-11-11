import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import {directionsNext, setDirections} from 'data/actions'
import {switchy} from 'components/helpers'
import 'assets/MainButton.css'
import 'assets/MainButtonAnimation.css'


class MainButton extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }


  initDirections() {
    let {location, setDirections, directionsNext} = this.props
    setDirections({
      from: location ? location : this.context.map.getCenter().toArray(),
      to: this.context.map.getCenter().toArray(),
    })
    directionsNext()
  }


  render() {
    let {thingSelected, directions, directionsNext} = this.props

    let button = switchy(directions.state)({
      0:_=><Button color='#4a90f0' onClick={()=>this.initDirections()}>Get Directions</Button>,
      1:_=><Button color='#53bf85' onClick={()=>directionsNext()}>Next</Button>,
      2:_=><Button color='#53bf85' onClick={()=>directionsNext()}>Next</Button>,
      DEFAULT:_=>null,
    })
    if (thingSelected) button = null

    return <CSSTransitionGroup
             transitionName={'MainButtonAnimation'}
             transitionAppear={true} transitionAppearTimeout={130} // weird...
             transitionEnterTimeout={130} transitionLeaveTimeout={130}>
               {button}
           </CSSTransitionGroup>
  }
}




// Connect & Export
export default connect(
  state => ({
    location: state.location,
    directions: state.directions,
    thingSelected: state.selectedThingStack.length,
  }),
  dispatch => ({
    setDirections: payload => dispatch(setDirections(payload)),
    directionsNext: () => dispatch(directionsNext()),
  })
)(MainButton)




// Helpers
let Button = ({children, ...other}) => <ButtonDiv key={1} className='MainButton' {...other}>{children}</ButtonDiv>
let ButtonDiv = styled.div`
  background-color: ${p=>p.color};
  &:active { background-color: ${p=>desaturate(.45,darken(.13,p.color))} }
`
