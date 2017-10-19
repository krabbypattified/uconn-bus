import React from 'react'
import FreeMarker from 'components/FreeMarker'
import StyledMarkerDiv from 'components/StyledMarkerDiv'


export default class StartMarker extends React.Component {
  render() {
    return (
      <FreeMarker projected lngLat={[-72.2683646, 41.8059531]}>
        <StyledMarkerDiv color='#6964D6'/>
      </FreeMarker>
    )
  }
}
