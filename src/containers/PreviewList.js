import React from 'react'
import {connect} from 'react-redux'
import Preview from 'components/Preview'
import styled from 'styled-components'


class PreviewList extends React.Component {
  render() {
    return (
      <List>
        {this.props.highlightedThings.map((thing, idx) => (
          <Preview key={idx} data={{...thing,idx}}/>
        ))}
      </List>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    highlightedThings: state.highlightedThings
  })
)(PreviewList)


// Helpers
let List = styled.div`
  position: absolute;
  z-index: 20;
  width: 400px;
  max-width: 100%;
`
