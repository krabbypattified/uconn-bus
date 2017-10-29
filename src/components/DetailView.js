import React from 'react'
import styled, {keyframes} from 'styled-components'
import ReactSVG from 'react-svg'
import moment from 'moment'
import BusSVG from 'components/BusSVG'
import BusStopDot from 'components/BusStopDot'
import {isMobile} from './helpers'
import arrowSVG from 'assets/arrow.svg'


export default ({thing,isBus,arrivals,onBack,loading}) => (
  <DetailView /*pullformore*/>
    <Title onBack={onBack} thing={thing} isBus={isBus}/>
    {loading
      ? [1,2].map(i=><Detail key={i} placeholder/>)
      : arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} isBus={arrival.id<60}/>)
    }
    {!loading && !arrivals.length && <NoContent/>}
  </DetailView>
)


let DetailView = styled.div`
  position: absolute;
  z-index: 21;
  width: ${isMobile()?'100%':'400px'};
  max-width: 100%;
  ${isMobile()&&'max-height: 50%;'}
  background-color: white;
  box-shadow: 0 0 7px 0 rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`

let Title = ({onBack, thing, isBus}) => {
  let name = isBus ? <Name>{thing.busLine.name} Bus</Name> : <Name>{thing.name}</Name>
  let icon = isBus ? <div style={{width:'30px'}}><BusSVG color={thing.busLine.color}/></div> : <BusStopDot/>
  return (
    <Header>
      <BackArrow onClick={onBack}><ReactSVG path={arrowSVG}/></BackArrow>
      <Flex>{name}{icon}</Flex>
    </Header>
  )
}

let Detail = ({arrival, isBus, placeholder}) => {
  if (placeholder) return <Placeholder/>

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

let Placeholder = () => (
  <ShinyRow>
    <Bar style={{flexBasis:'48%'}}/>
    <div style={{flexBasis:'30%', display:'flex', justifyContent:'space-between'}}>
      <Bar style={{width: '45%'}}/>
      <Bar style={{width: '45%'}}/>
    </div>
  </ShinyRow>
)

let NoContent = () => (
  <NoContentDiv>No Arrivals. Sucks for you.</NoContentDiv>
)

let NoContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 14px;
`

let Row = styled.div`
  margin: 5px 30px;
  display: flex;
  justify-content: space-between;
`

let ShinyRow = styled(Row)`
  position: relative;

  &:after {
    content: " ";
    z-index: 10;
    display: block;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    color: rgba(255,255,255,0.1);
    background: -webkit-gradient(linear, left top, right top, from(rgba(255,255,255,0)), to(rgba(255,255,255,0)),
      color-stop(0.5, #fff)
    );
    background-size: 300px 100%;
    background-repeat: repeat-x;
    pointer-events: none;
    animation: .8s linear infinite ${keyframes`
      0% { background-position: 0 0; }
      100% { background-position: 300px 0; }
    `};
  }
`

let Bar = styled.div`
  background-color: #e8e8e8;
  height: 20px;
`

let Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

let Header = styled(Flex)`
  position: relative;
  margin: 20px;
`

let Name = styled.div`
  max-width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 17px;
  font-weight: 600;
`

let BackArrow = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  svg { transition: transform .3s; }
  &:hover svg { transform: translateX(-5px) }
`
