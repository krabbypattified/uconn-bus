import React from 'react'
import {connect} from 'react-redux'
import PreviewBox from 'components/PreviewBox'
import styled from 'styled-components'


class PreviewList extends React.Component {
  render() {
    return (
      <List>
        {this.props.highlightedThings.map((thing, idx) => (
          <PreviewBox key={idx} data={thing}/>
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
`
