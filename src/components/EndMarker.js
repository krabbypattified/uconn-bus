import React from 'react'
import FreeMarker from 'components/FreeMarker'
import StyledMarkerDiv from 'components/StyledMarkerDiv'


export default class EndMarker extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {projected: false}
  }

  render() {
    return (
      <FreeMarker
        position={{top:5,left:5}}
        projected={this.state.projected}
        onPanEnd={()=>this.setState({projected: true})}
      >
        <StyledMarkerDiv color='#FF6477'/>
      </FreeMarker>
    )
  }
}
