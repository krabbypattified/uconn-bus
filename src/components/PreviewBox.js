import React from 'react'
import styled from 'styled-components'


export default class PreviewBox extends React.Component {
  render() {
    return (
      <Box>{this.props.data.name||this.props.data.busLine.color}</Box>
    )
  }
}


// Helpers
let Box = styled.div`
  background: white;
`
