import React from 'react'
import PropTypes from 'prop-types'
import FreeMarker from 'components/FreeMarker'
import CircleMarkerDiv from 'components/CircleMarkerDiv'


export default class StartMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    let startBounds = this.context.map.getBounds()
    navigator.geolocation.getCurrentPosition(pos => {
      if (this.state.projected) return

      let lng = parseFloat(pos.coords.longitude)
      let lat = parseFloat(pos.coords.latitude)

      if (!pointInBounds([lng,lat], startBounds)) return

      this.setState({lngLat:[lng, lat], projected:true})
      this.lngLat = [lng, lat] // immutable
    })
  }

  render() {
    return (
      <FreeMarker
        {...this.state}
        style={{zIndex:100}}
        position={{top:5,left:5}}
        onPanEnd={()=>this.setState({projected:true,lngLat:null})}
      >
        <CircleMarkerDiv
          color='#6964D6'
          label='Start'
          labelPosition='right'
        />
      </FreeMarker>
    )
  }
}


// Helpers
function pointInBounds(pt, bd) {
  return (pt[0] >= bd.getWest()) && (pt[0] <= bd.getEast()) && (pt[1] <= bd.getNorth()) && (pt[1] >= bd.getSouth())
}
