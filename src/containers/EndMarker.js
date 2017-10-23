import React from 'react'
import FreeMarker from 'components/FreeMarker'
import CircleMarkerDiv from 'components/CircleMarkerDiv'


export default class EndMarker extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {position:{top:5,right:5}}
  }

  render() {
    return (
      <FreeMarker
        {...this.state}
        onPanEnd={()=>this.setState({projected: true})}
      >
        <CircleMarkerDiv
          color='#FF6477'
          label='End'
          labelPosition='left'
        />
      </FreeMarker>
    )
  }
}
