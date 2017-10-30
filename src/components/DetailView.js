import React from 'react'
import styled, {keyframes} from 'styled-components'
import ReactSVG from 'react-svg'
import moment from 'moment'
import BusIcon from 'components/BusIcon'
import BusStopDot from 'components/BusStopDot'
import {isMobile, switchy, times} from './helpers'
import arrowSVG from 'assets/arrow.svg'


export default ({type, arrivals=[], directions=[], thing, onBack, loading}) => {

  let details = switchy(type)({
    BUS: _=>arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} type='STOP'/>),
    STOP: _=>arrivals.map((arrival,i) => <Detail key={i} arrival={arrival} type='BUS'/>),
    DIRECTIONS: _=>directions.map((content, i) => <Detail key={i} content={content} type='DIRECTIONS'/>),
  })

  let noContent = switchy(type)({
    BUS: arrivals.length || <NoContent>This bus doesn't stop anywhere. Sucks for you.</NoContent>,
    STOP: arrivals.length || <NoContent>No arrivals. Sucks for you.</NoContent>,
    DIRECTIONS: directions.length || <NoContent>I got nothin.</NoContent>,
  })

  return(
    <DetailView /*pullformore*/>
      <Title onBack={onBack} type={type} thing={thing}/>
      {loading ? times(2)(i=><Placeholder key={i}/>) : details}
      {loading || noContent}
    </DetailView>
  )
}



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
        <Name>{name}</Name>
        {icon}
      </Flex>
    </Header>
  )
}



let Detail = ({type, arrival, content}) => {

  let leftDivs = switchy(type)({
    BUS: _=><div>{`${arrival.busLine.name} Bus`} <BusIcon color={arrival.busLine.color}/></div>,
    STOP: _=><div>{arrival.name} <BusStopDot/></div>,
    DIRECTIONS: content,
  })

  let rightDivs = null
  if (['BUS', 'STOP'].includes(type)) {
    let time = moment(arrival.time).format('h:mm A')
    let fromNow = moment(arrival.time).diff(moment(), 'minutes') // 14
    fromNow += [-1,1].includes(fromNow) ? ' min' : ' mins'
    rightDivs =  <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div>{fromNow}</div>
                  <div>{time}</div>
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
  max-width: ${isMobile()?'209px':'246px'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 17px;
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
