import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'


class DetailView extends React.Component {
  render() {
    return (
      <View>asdf</View>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    // highlightedThings: state.highlightedThings
  })
)(DetailView)


// Helpers
let View = styled.div`
  position: absolute;
  z-index: 20;
  width: 400px;
  max-width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 7px 0 rgba(0,0,0,.2);
`
