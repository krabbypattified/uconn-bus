import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import SearchBar from 'components/SearchBar'
import {debounce, getNearestThings} from 'components/helpers'
import {setDirections, directionsNext} from 'data/actions'
import {buildings, geocode} from 'data/queries'


// Outer
class SearchBarManager extends React.PureComponent {

  static contextTypes = {
    map: PropTypes.any
  }

  constructor(...args) {
    super(...args)
    this.state = {geocode: null}
  }

  get closeBuildings() {
    let {buildings} = this.props.data
    if (!buildings || (this.lastCenter && this.center.latitude === this.lastCenter.latitude)) return this._buildings // memoize check

    this._buildings = getNearestThings(buildings, {distance:160/5280, location:this.center})
    this.lastCenter = this.center

    return this._buildings
  }

  get sortedBuildings() {
    let {buildings} = this.props.data
    return !buildings ? [] : getNearestThings(buildings, {location:this.center})
  }

  get center() {
    let c = this.context.map.getCenter().toArray()
    return {longitude:c[0], latitude:c[1]}
  }

  updateGeocode() {
    this.closeBuildings && this.setState({geocode: this.closeBuildings[0] || this.center}) // also updates sorted buildings
  }

  componentWillMount() {
    this.debounceGeocode = debounce(_=>this.updateGeocode(), 350)
    this.context.map.on('center-changed', this.debounceGeocode)
  }

  componentWillUnmount() {
    this.context.map.off('center-changed', this.debounceGeocode)
  }

  render() {
    let {thingSelected, directions, location, setDirections, directionsNext} = this.props
    let {longitude, latitude} = this.center
    let center = [longitude, latitude]
    return (thingSelected||directions.state===3)
    ? null
    : <GQLSearchBar
        initializeDirections={_=> {
          setDirections({from: location||center, to: center})
          directionsNext()
        }}
        autofill={this.sortedBuildings}
        state={directions.state}
        geocode={this.state.geocode}
        map={this.context.map}
      />
  }
}

export default compose(
  graphql(buildings),
  connect(
    state => ({
      location: state.location,
      thingSelected: state.selectedThingStack.length,
      directions: state.directions,
    }),
    dispatch => ({
      setDirections: d=>dispatch(setDirections(d)),
      directionsNext: _=>dispatch(directionsNext()),
    })
  )
)(SearchBarManager)




// Inner
let GQLSearchBar = compose(
  graphql(geocode, {
    skip: p => !shouldQuery(p.geocode),
    options: p => ({variables: {lngLat: p.geocode}})
  })
)(
  ({data, geocode, autofill, state, map, initializeDirections}) =>
  <SearchBar
    onDirectionsClick={initializeDirections}
    onSelect={bldg => map.fire('fake-click', {lngLat:[bldg.longitude, bldg.latitude]})}
    placeholder={shouldQuery(geocode) ? data.geocode : geocode}
    loading={shouldQuery(geocode) && data.loading}
    autofill={autofill}
    state={state}
  />
)




// Helper
function shouldQuery(geocode) {
  return geocode && !geocode.type
}
