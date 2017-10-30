import React from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import ReactSVG from 'react-svg'

import Marker from 'components/Marker'
import BusLineManager from 'components/BusLineManager'
import WalkManager from 'components/WalkManager'
import DetailView from 'components/DetailView'
import {clearDirections} from 'data/actions'
import {directions} from 'data/queries'
import markerSVG from 'assets/marker.svg'


// Redux business
let DirectionsManager = ({directions, clearDirections}) => {
  if (!directions) return null
  return <ConnectedDirections directions={directions} onBack={clearDirections}/>
}

export default connect(
  state => ({
    directions: state.directions,
  }),
  dispatch => ({
    clearDirections: ()=>dispatch(clearDirections()),
  })
)(DirectionsManager)








class Directions extends React.Component {
  render() {
    let {onBack, data: {loading, directions}} = this.props
    if (loading || !directions) return <DetailView type='DIRECTIONS' onBack={onBack} loading={loading}/>

    let theDirections = [
      <div>Walk to {directions.hopOn.stop.name}.</div>,
      <div>Hop on {directions.hopOn.bus.busLine.name} Bus at {directions.hopOn.time}.</div>,
      <div>Hop off the bus at {directions.hopOff.stop.name} ({directions.hopOff.time}).</div>,
    ]

    return (
      // TODO the bus
      <div>
        <DetailView type='DIRECTIONS' directions={theDirections}/>
        <Marker lngLat={directions.to}><ReactSVG path={markerSVG}/></Marker>
        <BusLineManager busLine={directions.hopOn.bus.busLine}/>
        <WalkManager walk={[
          {
            from: directions.from,
            to: [directions.hopOn.stop.longitude, directions.hopOn.stop.latitude],
          },
          {
            from: [directions.hopOff.stop.longitude, directions.hopOff.stop.latitude],
            to: directions.to,
          }
        ]}/>
      </div>
    )
  }
}

let ConnectedDirections = graphql(directions, {
  options: ({directions: {from, to}}) => ({notifyOnNetworkStatusChange: true, variables: {
    from: {
      longitude: from[0],
      latitude: from[1],
    },
    to: {
      longitude: to[0],
      latitude: to[1],
    }
  }}),
})(Directions)
