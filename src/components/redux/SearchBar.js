import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import SearchBarGraphQL from 'components/graphql/SearchBar'
import {debounce, getNearestThings} from 'helpers'
import {setDirections, directionsNext} from 'data/actions'
import {buildings} from 'data/queries'


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

  updateGeocode = () => {
    if (!this.mounted) return
    this.closeBuildings && this.setState({geocode: this.closeBuildings[0] || this.center}) // also updates sorted buildings
  }

  componentWillMount() {
    this.mounted = true
    this.debounceGeocode = debounce(this.updateGeocode, 350)
    this.context.map.on('center-changed', this.debounceGeocode)
  }

  componentWillUnmount() {
    this.mounted = false
    this.context.map.off('center-changed', this.debounceGeocode)
  }

  render() {
    let {thingSelected, directions, location, setDirections, directionsNext} = this.props
    let {longitude, latitude} = this.center
    let center = [longitude, latitude]
    return (thingSelected||directions.state)
    ? null
    : <SearchBarGraphQL
        initializeDirections={_=> {
          setDirections({from: location||center, to: center})
          directionsNext()
        }}
        autofill={this.sortedBuildings}
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
