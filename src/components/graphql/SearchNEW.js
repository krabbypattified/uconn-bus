import React from 'react'
import {graphql} from 'react-apollo'
import {buildings} from 'data/queries'


class SearchExpander extends React.Component {

  static contextTypes = {
    map: PropTypes.any
  }

  get center() {
    let c = this.context.map.getCenter().toArray()
    return {longitude:c[0], latitude:c[1]}
  }

  render() {
    let {children, data: {buildings}} = this.props
    let sortedBuildings = buildings ? getNearestThings(buildings, {location:this.center) : []
    return <SearchExpander buildings={sortedBuildings}>{children}</SearchExpander>
  }

}


export default graphql(buildings)(SearchExpander)
