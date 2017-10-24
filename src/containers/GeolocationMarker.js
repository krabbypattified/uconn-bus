import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FreeMarker from 'components/FreeMarker'
import Dot from 'components/Dot'
import {setLocation} from 'data/actions'


class GeolocationMarker extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  componentDidMount() {
    let {location, setLocation} = this.props
    let startBounds = this.context.map.getBounds()

    setTimeout(args => {
      setLocation([-72.2533381, 41.8135119]) // dispatch
    }, 2000)

    setTimeout(args => {
      setLocation([-72.2444146, 41.8043314]) // dispatch
    }, 2500)

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
        // onPanEnd={that=>setLocation(that.marker.getLngLat())} // dispatch
        projected
        interpolation
      >
        <Dot color='#61a3fe' satellite />
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
