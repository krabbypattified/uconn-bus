import React from 'react'
import {connect} from 'react-redux'
import PreviewBox from 'components/PreviewBox'
import styled from 'styled-components'


class PreviewBoxList extends React.Component {
  render() {
    return (
      <List>
        {this.props.highlightedThings.map((thing, idx) => (
          <PreviewBox key={idx} data={{...thing,idx}}/>
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
)(PreviewBoxList)


// Helpers
let List = styled.div`
  position: absolute;
  z-index: 20;
  width: 400px;
  max-width: 100%;
`
