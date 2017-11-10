import React from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import ReactSVG from 'react-svg'
import moment from 'moment'
import styled from 'styled-components'

import Pointer from 'containers/Pointer'
import Marker from 'components/Marker'
import BusLineManager from 'components/BusLineManager'
import BusManager from 'components/BusManager'
import BusStopManager from 'components/BusStopManager'
import WalkManager from 'components/WalkManager'
import DetailView from 'components/DetailView'
import {directionsBack, directionsNext} from 'data/actions'
import {directions} from 'data/queries'
import markerSVG from 'assets/marker.svg'
import {switchy} from 'components/helpers'


// Redux business
let DirectionsManager = ({directions, directionsBack}) => {
  if (!directions.state) return null
  return <ConnectedDirections directions={directions} onBack={directionsBack} onNext={directionsNext}/>
}

export default connect(
  state => ({
    directions: state.directions,
  }),
  dispatch => ({
    directionsBack: ()=>dispatch(directionsBack()),
    directionsNext: ()=>dispatch(directionsNext()),
  })
)(DirectionsManager)




// TODO manage new directions state



class Directions extends React.Component {

  render() {
    let {directions, onBack, onNext} = this.props

    return switchy(directions.state)({
      1:_=> <div><DetailView type='DIRECTIONS' onBack={onBack} onNext={onNext}/><Pointer labelled/></div>/*header,coolPointer*/,
      2:0/*header,coolPointer,startMarker*/,
      3:0/*header, theActualDirections, start/endMarkers, bus, stops, line*/,
    })
  }

  /*render() {
    let {onBack, directions:fromTo, data: {loading, directions}} = this.props
    let endMarker = <Marker lngLat={fromTo.to}><ReactSVG path={markerSVG} style={{transform:'translateY(calc(-50% + 3px))'}}/></Marker>

    if (loading || !directions) return <div><DetailView type='DIRECTIONS' onBack={onBack} loading={loading}/>{endMarker}</div>

    let theDirections = [
      <Dir>Walk to <Text color='#ff6f6f'>{directions.hopOn.stop.name}</Text>.</Dir>,
      <Dir>
        Hop on&nbsp;
        <Text color={directions.hopOn.bus.busLine.color}>{directions.hopOn.bus.busLine.name}</Text>
        &nbsp;Bus at {moment(directions.hopOn.time).format('h:mm A')}.
      </Dir>,
      <Dir>Arrive at <Text color='#ff6f6f'>{directions.hopOff.stop.name}</Text> at {moment(directions.hopOff.time).format('h:mm A')}.</Dir>,
    ]

    return (
      <div>
        {endMarker}
        <BusManager buses={[directions.hopOn.bus]} size={.8}/>
        <BusStopManager busStops={[directions.hopOn.stop, directions.hopOff.stop]} size={6}/>
        <DetailView type='DIRECTIONS' directions={theDirections} onBack={onBack}/>
        <Marker lngLat={fromTo.to}><ReactSVG path={markerSVG} style={{transform:'translateY(calc(-50% + 3px))'}}/></Marker>
        <BusLineManager lines={[{
          path: directions.path,
          color: directions.hopOn.bus.busLine.color,
        }]}/>
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
  }*/

}

let ConnectedDirections = graphql(directions, {
  skip: ({directions}) => directions.state !== 3,
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




let Dir = styled.div``

let Text = styled.span`
  font-weight: 600;
  color: ${p=>p.color};
`
