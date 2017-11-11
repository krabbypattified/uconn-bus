import React from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import moment from 'moment'
import styled from 'styled-components'

import TextMarker from 'components/TextMarker'
import DetailHeader from 'components/DetailHeader'
import DetailContent from 'components/DetailContent'
import BusLineManager from 'components/BusLineManager'
import BusManager from 'components/BusManager'
import BusStopManager from 'components/BusStopManager'
import WalkManager from 'components/WalkManager'
import {directionsBack, directionsNext} from 'data/actions'
import {directions} from 'data/queries'
import {switchy} from 'components/helpers'



// Redux
class DirectionsManager extends React.Component {

  shouldComponentUpdate({directions}) {
    return directions.state !== this.props.directions.state
  }

  render() {
    let {directions, directionsBack, directionsNext} = this.props
    return !directions.state
    ? null
    : <ConnectedDirections directions={directions} onBack={directionsBack} onNext={directionsNext}/>
  }

}



// Graphql
class Directions extends React.Component {

  render() {
    let {directions, onBack, onNext, data} = this.props


    // Handle final directions
    if (directions.state === 3 && data.loading) directions = {...directions, state: 'LOADING'}
    if (directions.state === 3 && !data.loading && !data.directions) directions = {...directions, state: 'NO_DIRECTIONS'}


    return switchy(directions.state)({
      1:_=>
      <DetailHeader title='From' onBack={onBack} onNext={onNext}/>,

      2:_=>
      <div>
        <DetailHeader title='To' onBack={onBack} onNext={onNext}/>
        <TextMarker text='Start' background='#77d09f' lngLat={directions.from}/>
      </div>,

      LOADING:_=>
      <div>
        <DetailHeader title='Loading...' onBack={onBack}/>
        <TextMarker key='w' text='Start' background='#77d09f' lngLat={directions.from}/>
        <TextMarker key='x' text='End' background='#61A3FE' lngLat={directions.to}/>
      </div>,

      NO_DIRECTIONS:_=>
      <div>
        <DetailHeader title='Directions' onBack={onBack}/>
        <DetailContent noContent='Directions unavailable.'/>
        <TextMarker key='w' text='Start' background='#77d09f' lngLat={directions.from}/>
        <TextMarker key='x' text='End' background='#61A3FE' lngLat={directions.to}/>
      </div>,

      3:_=>
      <div>
        <DetailHeader title='Directions' onBack={onBack}/>
        <DetailContent content={getInstructions(data)}/>
        <TextMarker key='w' text='Start' background='#77d09f' lngLat={directions.from}/>
        <TextMarker key='x' text='End' background='#61A3FE' lngLat={directions.to}/>
        <BusManager buses={[data.directions.hopOn.bus]} size={.8}/>
        <BusStopManager busStops={[data.directions.hopOn.stop, data.directions.hopOff.stop]} size={6}/>
        <BusLineManager lines={[{
          path: data.directions.path,
          color: data.directions.hopOn.bus.busLine.color,
        }]}/>
        <WalkManager walk={[
          {
            from: directions.from,
            to: [data.directions.hopOn.stop.longitude, data.directions.hopOn.stop.latitude],
          },
          {
            from: [data.directions.hopOff.stop.longitude, data.directions.hopOff.stop.latitude],
            to: directions.to,
          }
        ]}/>
      </div>,
    })
  }

}


// Connect Redux
export default connect(
  state => ({
    directions: state.directions,
  }),
  dispatch => ({
    directionsBack: ()=>dispatch(directionsBack()),
    directionsNext: ()=>dispatch(directionsNext()),
  })
)(DirectionsManager)

// Connect GraphQL
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




// Helper
function getInstructions(data) {
  return [
    <div className='Row' key='a'>Walk to&nbsp;
         <Text color='#929292'>{data.directions.hopOn.stop.name}</Text>.</div>,
    <div className='Row' key='b'>Hop on&nbsp;
         <Text color={data.directions.hopOn.bus.busLine.color}>{data.directions.hopOn.bus.busLine.name}</Text>
         &nbsp;Bus at {moment(data.directions.hopOn.time).format('h:mm A')}.</div>,
    <div className='Row' key='c'>Arrive at&nbsp;
         <Text color='#929292'>{data.directions.hopOff.stop.name}</Text>
         &nbsp;at {moment(data.directions.hopOff.time).format('h:mm A')}.</div>
  ]
}
let Text = styled.span`
  font-weight: 600;
  color: ${p=>p.color};
`
