import React from 'react'
import {connect} from 'react-redux'
import {graphql, compose} from 'react-apollo'
import SearchBar as SearchBarComponent from 'components/SearchBar'
import {debounce} from 'components/helpers'


// Outer
class SearchBarManager extends React.PureComponent {

  static contextTypes = {
    map: PropTypes.any
  }

  updateGeocode() {
    let {map} = this.context
    let {data:{buildings}} = this.props
    if (!buildings) return

    let center = map.getCenter().toArray()
    let closestBuilding = getNearestThings(buildings, {distance:240/5280, location:center, max:1})[0]
    let geocode = closestBuilding ? closestBuilding : {longitude:center[0],latitude:center[1]}

    this.setState({geocode})
  }

  componentWillMount() {
    this.state = {geocode: null}
    this.debounceGeocode = debounce(_=>this.updateGeocode(), 17)
    this.context.map.on('center-change', this.debounceGeocode)
  }

  componentWillUnmount() {
    this.context.map.off('center-change', this.debounceGeocode)
  }

  render() {
    let {thingSelected, directions, data:{buildings}} = this.props

    return thingSelected || !buildings ? null
    : <GQLSearchBar autofill={buildings} state={directions.state} geocode={this.state.geocode}/>
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
class SearchBar extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  render() {
    return <SearchBarComponent placeholder={placeholder} autofill={buildings}/>
  }
}

let GQLSearchBar = compose(
  graphql(geocode, {
    skip: p => !shouldQuery(p.geocode),
    options: p => ({variables: {lngLat: p.geocode}})
  })
)
(({data, geocode, ...other}) =>
  shouldQuery(geocode) && data.loading
  ? null
  : <SearchBarComponent placeholder={shouldQuery(geocode) ? data.geocode : geocode} {...other} />
)


function shouldQuery(geocode) {
  return geocode && !geocode.type
}
