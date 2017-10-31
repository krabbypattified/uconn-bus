import React from 'react'
import styled, {keyframes} from 'styled-components'
import ReactSVG from 'react-svg'
import moment from 'moment'
import BusIcon from 'components/BusIcon'
import BusStopDot from 'components/BusStopDot'
import {isMobile, switchy, times} from './helpers'
import arrowSVG from 'assets/arrow.svg'


export default ({type, arrivals=[], directions=[], thing, onBack, loading, selectThing}) => {

  let details = switchy(type)({
    BUS: _=>arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} type='STOP' selectThing={selectThing}/>),
    STOP: _=>arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} type='BUS' selectThing={selectThing}/>),
    DIRECTIONS: _=>directions.map((content, i) => <Detail key={i} content={content} type='DIRECTIONS'/>),
  })

  let noContent = switchy(type)({
    BUS: arrivals.length ? null : <NoContent>This bus doesn't stop anywhere. Sucks for you.</NoContent>,
    STOP: arrivals.length ? null : <NoContent>No arrivals. Sucks for you.</NoContent>,
    DIRECTIONS: directions.length ? null : <NoContent>I got nothin.</NoContent>,
  })

  return(
    <DetailView /*pullformore*/>
      <ScrollView>
        <Title onBack={onBack} type={type} thing={thing}/>
        {loading ? times(2)(i=><Placeholder key={i}/>) : details}
        {loading || noContent}
      </ScrollView>
    </DetailView>
  )
}



let DetailView = styled.div`
  background-color: white;
  box-shadow: 0 0 7px 0 rgba(0,0,0,.2);
  max-width: 100%;
  max-height: ${isMobile()?50:100}%;
  overflow-y: auto;
  position: absolute;
  width: ${isMobile()?'100%':'400px'};
  z-index: 21;
`

let ScrollView = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`



let Title = ({onBack, thing, type}) => {
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
    <Header>
      <BackArrow onClick={onBack}><ReactSVG path={arrowSVG}/></BackArrow>
      <Flex>
        <TitleName>{name}</TitleName>
        {icon}
      </Flex>
    </Header>
  )
}



let Detail = ({type, arrival, content, selectThing}) => {

  let leftDivs = switchy(type)({
    BUS: _=><FlexLeft onClick={()=>selectThing(arrival.bus)}>
      <Name>{`${arrival.bus.busLine.name} Bus`}</Name>
      <BusIcon color={arrival.bus.busLine.color}/>
    </FlexLeft>,
    STOP: _=><FlexLeft onClick={()=>selectThing(arrival.stop)}>
      <Name>{arrival.stop.name}</Name>
      <BusStopDot/>
    </FlexLeft>,
    DIRECTIONS: content,
  })

  let rightDivs = null
  if (['BUS', 'STOP'].includes(type)) {
    let time = moment(arrival.time).format('h:mm A')
    // TODO bind this to time, or update the props??
    let fromNow = moment(arrival.time).diff(moment(), 'minutes')
    fromNow += [-1,1].includes(fromNow) ? ' min' : ' mins'
    rightDivs = <div style={{display:'flex'}}>
                  <div style={{color:'#B1B1B1', whiteSpace:'nowrap'}}>{fromNow}</div>
                  <div style={{marginLeft:'10px', whiteSpace:'nowrap'}}>{time}</div>
                </div>
  }

  return <Row>{leftDivs}{rightDivs}</Row>
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



let NoContent = styled.div`
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
  font-size: 17px;
  font-weight: 600;
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

let FlexLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`

let Header = styled(Flex)`
  position: relative;
  margin: 20px;
`

let Name = styled.div`
  max-width: ${isMobile()?137:148}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  font-weight: 600;
  font-size: 17px;
`

let TitleName = styled(Name)`
  max-width: ${isMobile()?209:246}px;
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
