import React from 'react'
import ReactSVG from 'react-svg'
import moment from 'moment'
import ScrollingName from 'components/ScrollingName'
import BusIcon from 'components/BusIcon'
import BusStopDot from 'components/BusStopDot'
import {switchy} from './helpers'
import arrowSVG from 'assets/arrow.svg'
import 'assets/DetailView.css'


export default ({type, arrivals=[], directions=[], thing, onBack, loading, selectThing}) => {

  let details = switchy(type)({
    BUS: _=>arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} type='STOP' selectThing={selectThing}/>),
    STOP: _=>arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} type='BUS' selectThing={selectThing}/>),
    DIRECTIONS: _=>directions.map((content, i) => <Detail key={i} content={content} type='DIRECTIONS'/>),
  })

  let noContent = switchy(type)({
    BUS: arrivals.length ? null : <NoContent>This bus doesn't stop anywhere.</NoContent>,
    STOP: arrivals.length ? null : <NoContent>No arrivals at this bus stop.</NoContent>,
    DIRECTIONS: directions.length ? null : <NoContent>Directions unavailable.</NoContent>,
  })

  let DetailMain = (type === 'DIRECTIONS' && !directions.length)
  ? <div/>
  : <div className='DetailMain'> {/*TODO Hammer drag*/}
      <div>
      {loading ? <Placeholder/> : details} {/*TODO is only 1 good?*/}
      {loading || noContent}
      </div>
    </div>

  return(
    <div className='DetailView'>
      <DetailHeader onBack={onBack} type={type} thing={thing}/>
      {DetailMain}
    </div>
  )
}



let DetailHeader = ({onBack, thing, type}) => {
  type = switchy(type)

  let name = type({
    BUS: _=>`${thing.busLine.name} Bus`,
    STOP: _=>thing.name,
    DIRECTIONS: 'Directions',
  })

  let icon = type({
    BUS: _=><BusIcon color={thing&&thing.busLine.color}/>,
    STOP: _=><BusStopDot/>,
    DIRECTIONS: null,
  })

  return (
    <div className='DetailHeader'>
      <div className='BackArrow' onClick={onBack}><ReactSVG path={arrowSVG}/></div>
      <ScrollingName>{name}</ScrollingName>
      {icon}
    </div>
  )
}



let Detail = ({type, arrival, content, selectThing}) => {

  let left = switchy(type)({
    BUS: _=><ScrollingName onClick={()=>selectThing(arrival.bus)}>{`${arrival.bus.busLine.name} Bus`}</ScrollingName>,
    STOP: _=><ScrollingName onClick={()=>selectThing(arrival.stop)}>{arrival.stop.name}</ScrollingName>,
    DIRECTIONS: content,
  })

  let icon = switchy(type)({
    BUS: _=><BusIcon color={arrival.bus.busLine.color}/>,
    STOP: _=><BusStopDot/>,
    DIRECTIONS: null,
  })

  let right = null
  if (['BUS', 'STOP'].includes(type)) {
    // TODO bind this to time?
    let fromNow = moment(arrival.time).diff(moment(), 'minutes') + 'm'
    let time = moment(arrival.time).format('h:mm A')

    right = <div className='Time'>
              <span>{fromNow}</span>
              <span>{time}</span>
            </div>
  }

  return <div className='Row'>{left}{icon}<div className='Padder'/>{right}</div>
}



let NoContent = ({children}) => (
  <div className='NoContent'>
    <div>{children}</div>
    <div>You may need to <a onClick={()=>window.location.reload()}>refresh the app</a>.</div>
  </div>
)



let Placeholder = () => (
  <div className='ShinyRow'>
    <div></div>
    <div className='Padder'/>
    <div/>
    <div/>
  </div>
)
