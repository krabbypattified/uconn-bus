import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'


class BottomButton extends React.Component {
  render() {
    return (
      <BottomBar>
        <Button>Get Directions</Button>
      </BottomBar>
    )
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
)(BottomButton)


// Helpers
let BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 1em 1em 1em;
  z-index: 11;
  pointer-events: none;
`

let Button = styled.div`
  pointer-events: auto;
  cursor: pointer;
  margin: 0 auto;
  width: 300px;
  max-width: 100%;
  background-color: #61a3fe;
  text-align: center;
  color: white;
  border-radius: 100px;
  padding: 7px 14px;
  font-size: 17px;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.33);
`
