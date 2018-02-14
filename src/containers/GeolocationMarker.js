import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import GeolocationMarkerDOM from 'components/GeolocationMarker'
import {setLocation} from 'data/actions'
import {pointInBounds} from 'helpers'


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
    let {location, thingSelected, setLocation} = this.props


    return location && !thingSelected
    ? <GeolocationMarkerDOM
        location={location}
        onPanEnd={that=>setLocation(that.marker.getLngLat().toArray())}
      />
    : null
  }

}


export default connect(
  state => ({
    location: state.location,
    thingSelected: state.selectedThingStack.length,
  }),
  dispatch => ({
    setLocation: loc => dispatch(setLocation(loc))
  })
)(GeolocationMarker)
