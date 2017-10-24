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
      setLocation([-72.2666303,41.8274861])
      // setLocation([-72.2413409,41.8012331])
    }, 2000)

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
        style={{zIndex:100}}
        lngLat={location}
        onPanEnd={that=>setLocation(that.marker.getLngLat())} // dispatch
        interpolation
        projected
      >
        <Dot color='#6964D6' satellite={20} />
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
