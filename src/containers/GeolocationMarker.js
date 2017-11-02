import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import GeolocationMarker from 'components/GeolocationMarker'
import {setLocation} from 'data/actions'


class GeolocationMarkerContainer extends React.Component {

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
    let {location, setLocation, directions} = this.props
    if (!location) return null
    return (
      <GeolocationMarker
        location={location}
        onPanEnd={that=>setLocation(that.marker.getLngLat().toArray())}
        scale={directions?1.25:1}
      />
    )
  }
}


// Connect & Export
export default connect(
  state => ({
    location: state.location,
    directions: state.directions
  }),
  dispatch => ({
    setLocation: loc => dispatch(setLocation(loc))
  })
)(GeolocationMarkerContainer)



// Helpers
function pointInBounds(pt, bd) {
  return (pt[0] >= bd.getWest()) && (pt[0] <= bd.getEast()) && (pt[1] <= bd.getNorth()) && (pt[1] >= bd.getSouth())
}
