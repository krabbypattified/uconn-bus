import React from 'react'
import {graphql, compose} from 'react-apollo'
import moment from 'moment'
import {arrivalsForBus, arrivalsForStop} from 'data/queries'
import Buses from 'components/Buses'
import BusStops from 'components/BusStops'
import DetailHeader from 'components/DetailHeader'
import DetailContent from 'components/DetailContent'
import BusLineManager from 'components/BusLineManager'
import BusManager from 'components/BusManager'
import BusStopManager from 'components/BusStopManager'
import BusStopDot from 'components/BusStopDot'
import BusIcon from 'components/BusIcon'
import ScrollingName from 'components/ScrollingName'
import {hexColor} from 'helpers'


class Details extends React.Component {

  render() {
    let {thing, onBack, bus, busStop, selectThing} = this.props
    let loading = isBus(thing) ? bus.loading : busStop.loading

    // Arrivals
    let arrivals=[]
    if (isBus(thing) && !loading) arrivals = bus.bus.arrivals.slice(0).sort((a,b)=>a.time-b.time)
    else if (!isBus(thing) && !loading) arrivals = busStop.busStop.arrivals.slice(0).sort((a,b)=>a.time-b.time)


    return <div>
             {managers(thing)}
             <DetailHeader title={title(thing)} onBack={onBack}/>
             {!loading && <DetailContent content={content(arrivals, selectThing, !isBus(thing))} noContent={noContent(thing)}/>}
           </div>
  }
}


export default compose(

  graphql(arrivalsForBus, {
    name: 'bus',
    skip: ({thing}) => !isBus(thing),
    options: ({thing}) => ({ variables: { id:thing.id, before: Date.now() + 1000*60*90 }, notifyOnNetworkStatusChange: true }),
  }),

  graphql(arrivalsForStop, {
    name: 'busStop',
    skip: ({thing}) => isBus(thing),
    options: ({thing}) => ({ variables: { id:thing.id, before: Date.now() + 1000*60*90 }, notifyOnNetworkStatusChange: true }),
  }),

)(Details)




// Helpers
function isBus(thing) {
  return thing.id < 60
}

function title(thing, selectThing) {
  let name = isBus(thing) ? `${thing.busLine.name} Bus` : thing.name
  let icon = isBus(thing) ? <BusIcon key='bi' color={hexColor(thing.busLine.color)}/> : <BusStopDot key='bi'/>
  return [ <ScrollingName key='bn' onClick={()=>selectThing&&selectThing(thing)}>{name}</ScrollingName>, icon ]
}

function content(arrivals, selectThing, isBus) {
  return arrivals.map((arrival,idx) => {
    let fromNow = moment(arrival.time).diff(moment(), 'minutes') + 'm'
    let time = moment(arrival.time).format('h:mm A')
    return (
      <div className="Row" key={idx}>
        {title(isBus?arrival.bus:arrival.stop, selectThing)}
        <div className='Padder'/>
        <div className='Time'>
          <span>{fromNow}</span>
          <span>{time}</span>
        </div>
      </div>
    )
  })
}

function noContent(thing) {
  return isBus(thing) ? 'This bus isn\'t scheduled to stop anywhere.' : 'No arrivals are currently scheduled for this stop.'
}

function managers(thing) {
  return isBus(thing)
  ? [
      <BusStops key='bs'/>,
      <BusManager key='bm' buses={[thing]} size={1}/>,
      <BusLineManager key='blm' opacity={.67} lines={[{
        path: thing.busLine.path,
        color: thing.busLine.color,
      }]}/>
    ]
  : [
      <Buses key='b'/>,
      <BusStopManager busStops={[thing]} size={6} key='bsm'/>
    ]
}
