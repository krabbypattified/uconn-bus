import React from 'react'
import {connect} from 'react-redux'
import ReactSVG from 'react-svg'
import styled from 'styled-components'
import pointerSVG from 'assets/pointer.svg'


class Pointer extends React.Component {
  render() {
    return <PointerSVG path={pointerSVG}/>
  }
}


// Connect & Export
export default connect(
  state => ({
    // location: state.location
  }),
  dispatch => ({
    // setLocation: loc => dispatch(setLocation(loc))
  })
)(Pointer)


// Helpers
let PointerSVG = styled(ReactSVG)`
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-150%);
`
