import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import {setLocation} from 'data/actions';


class MainButton extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  render() {
    let {location,setLocation} = this.props
    let {map} = this.context

    let button = location
    ? <Button color='#254A7D' onClick={()=>'getDirectionsMode()'}>Get Directions</Button>
    : <Button color='#5eb3d2' onClick={()=>setLocation(map.getCenter())}>Set My Location</Button>

    return <BottomBar>{button}</BottomBar>
  }
}


// Connect & Export
export default connect(
  state => ({
    location: state.location
  }),
  dispatch => ({
    setLocation: loc => dispatch(setLocation(loc))
  })
)(MainButton)


// Helpers
let BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: .6em .5em;
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
  background-color: ${({color})=>color};
  text-align: center;
  color: white;
  border-radius: 6px;
  padding: 9px;
  font-size: 17px;
  font-weight: 600;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.33);
  transition: background-color .15s;
  &:active {
    background-color: ${({color})=>desaturate(.45,darken(.13,color))};
  }
`
