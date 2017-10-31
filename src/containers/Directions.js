import React from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import ReactSVG from 'react-svg'
import moment from 'moment'
import styled from 'styled-components'

import Marker from 'components/Marker'
import BusLineManager from 'components/BusLineManager'
import BusManager from 'components/BusManager'
import BusStopManager from 'components/BusStopManager'
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
    let {onBack, directions:fromTo, data: {loading, directions}} = this.props
    if (loading || !directions) return <DetailView type='DIRECTIONS' onBack={onBack} loading={loading}/>

    let theDirections = [
      <Dir>Walk to <Text color='#ff6f6f'>{directions.hopOn.stop.name}</Text>.</Dir>,
      <Dir>
        Hop on <Text color={directions.hopOn.bus.busLine.color}>{directions.hopOn.bus.busLine.name}</Text> Bus at {moment(directions.hopOn.time).format('h:mm A')}.
      </Dir>,
      <Dir>Arrive at <Text color='#ff6f6f'>{directions.hopOff.stop.name}</Text> at {moment(directions.hopOff.time).format('h:mm A')}.</Dir>,
    ]

    return (
      <div>
        <BusManager buses={[directions.hopOn.bus]} size={1}/>
        <BusStopManager busStops={[directions.hopOn.stop, directions.hopOff.stop]} size={6}/>
        <DetailView type='DIRECTIONS' directions={theDirections} onBack={onBack}/>
        <Marker lngLat={fromTo.to}><ReactSVG path={markerSVG} style={{transform:'translateY(calc(-50% + 3px))'}}/></Marker>
        <BusLineManager line={{
          path: directions.path,
          color: directions.hopOn.bus.busLine.color,
        }}/>
        <WalkManager walk={[
          {
            from: fromTo.from,
            to: [directions.hopOn.stop.longitude, directions.hopOn.stop.latitude],
          },
          {
            from: [directions.hopOff.stop.longitude, directions.hopOff.stop.latitude],
            to: fromTo.to,
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




let Dir = styled.div`
  font-weight: 400;
`

let Text = styled.span`
  font-weight: 600;
  color: ${p=>p.color};
`
