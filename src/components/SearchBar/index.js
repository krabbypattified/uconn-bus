import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'react-apollo'
import SearchBarDOM from './SearchBar'
import {buildings} from 'data/queries'
import {getNearestThings} from 'helpers'


class SearchBar extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }


  get center() {
    let c = this.context.map.getCenter().toArray()
    return {longitude:c[0], latitude:c[1]}
  }


  render() {
    let {initializeDirections, data: {buildings}} = this.props
    let sortedBuildings = buildings ? getNearestThings(buildings, {location:this.center}) : []
    return <SearchBarDOM buildings={sortedBuildings} initializeDirections={initializeDirections}/>
  }

}


export default graphql(buildings)(SearchBar)
