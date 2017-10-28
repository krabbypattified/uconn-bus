import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import BusSVG from 'components/BusSVG'
import BusStopDot from 'components/BusStopDot'
import {isMobile} from './helpers'


export default ({thing,isBus,arrivals,onBack,loading}) => (
  <DetailView pullformore={isMobile()}>
    <Title onBack={onBack} thing={thing} isBus={isBus}/>
    {loading
      ? 'Loading...'
      : arrivals.map(arrival => <Detail arrival={arrival} isBus={arrival.id<60}/>)
    }
  </DetailView>
)



let DetailView = styled.div`
  position: absolute;
  z-index: 21;
  width: 400px;
  max-width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 7px 0 rgba(0,0,0,.2);
`

let Title = ({onBack, thing, isBus}) => (
  <div>
    <div onClick={onBack}>&lt;-</div>
    {isBus
      ? <div>{`${thing.busLine.name} Bus`} <BusSVG color={thing.busLine.color}/></div>
      : <div>{thing.name} <BusStopDot/></div>
    }
  </div>
)

let Detail = ({arrival, isBus}) => {
  let time = moment(arrival.time).format('h:mm A')
  let fromNow = moment(arrival.time).diff(moment(), 'minutes') // 14
  fromNow += [-1,1].includes(fromNow) ? ' min' : ' mins'

  return (
    <div>
      {isBus
        ? <div>{`${arrival.busLine.name} Bus`} <BusSVG color={arrival.busLine.color}/></div>
        : <div>{arrival.name} <BusStopDot/></div>
      }
      <div>{fromNow}</div>
      <div>{time}</div>
    </div>
  )
}
