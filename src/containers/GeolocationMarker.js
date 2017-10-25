import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FreeMarker from 'components/FreeMarker'
import GeolocationDot from 'components/GeolocationDot'
import {setLocation} from 'data/actions'


class GeolocationMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentDidMount() {
    let {location, setLocation} = this.props
    let startBounds = this.context.map.getBounds()

    navigator.geolocation.getCurrentPosition(pos => {
      if (location) return

      let lng = parseFloat(pos.coords.longitude)
      let lat = parseFloat(pos.coords.latitude)

      if (!pointInBounds([lng,lat], startBounds)) return

      setLocation([lng, lat]) // dispatch
    })
  }

  render() {
    let {location, setLocation} = this.props
    if (!location) return null
    return (
      <FreeMarker
        style={{zIndex:1}}
        lngLat={location}
        onPanEnd={that=>setLocation(that.marker.getLngLat())} // dispatch
        projected
      >
        <GeolocationDot color='#61a3fe' satellite />
      </FreeMarker>
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    location: state.location
  }),
  dispatch => ({
    setLocation: loc => dispatch(setLocation(loc))
  })
)(GeolocationMarker)



// Helpers
function pointInBounds(pt, bd) {
  return (pt[0] >= bd.getWest()) && (pt[0] <= bd.getEast()) && (pt[1] <= bd.getNorth()) && (pt[1] >= bd.getSouth())
}
