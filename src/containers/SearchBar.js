import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import SearchBar from 'components/SearchBar'
import {debounce, getNearestThings} from 'components/helpers'
import {buildings, geocode} from 'data/queries'


// Outer
class SearchBarManager extends React.PureComponent {

  static contextTypes = {
    map: PropTypes.any
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
    this.closeBuildings && this.setState({geocode: this.closeBuildings[0] || this.center})
  }

  componentWillMount() {
    this.setState({geocode: null})
    this.debounceGeocode = debounce(_=>this.updateGeocode(), 350)
    this.context.map.on('center-changed', this.debounceGeocode)
  }

  componentWillUnmount() {
    this.context.map.off('center-changed', this.debounceGeocode)
  }

  render() {
    let {thingSelected, directions} = this.props
    return thingSelected
    ? null
    : <GQLSearchBar autofill={this.sortedBuildings} state={directions.state} geocode={this.state.geocode}/>
  }
}

export default compose(
  graphql(buildings),
  connect(
    state => ({
      thingSelected: state.selectedThingStack.length,
      directions: state.directions,
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
  ({data, geocode, autofill, state}) =>
  <SearchBar
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
