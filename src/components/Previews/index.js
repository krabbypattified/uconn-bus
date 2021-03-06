import React from 'react'
import styled from 'styled-components'
import {darken, desaturate} from 'polished'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import BusIcon from 'components/BusIcon'
import BusStopDot from 'components/BusStopDot'
import {hexColor} from 'helpers'
import './PreviewAnimation.css'
import './Previews.css'


const Previews = ({things, selectFunc}) => (
  <div className='PreviewList'>
    <CSSTransitionGroup
      transitionName={'PreviewAnimation'}
      transitionEnterTimeout={200} transitionLeaveTimeout={200}>
        {things.map((thing, idx) => (
          <Preview key={idx} onDetailsClick={_=>selectFunc(thing)} data={{...thing,idx}}/>
        ))}
    </CSSTransitionGroup>
  </div>
)


export default Previews




let Preview = ({data, onDetailsClick}) => {
  let isBus = data.id < 60
  return (
    <PreviewDiv className='Preview' style={{zIndex:20-data.idx}}>
      <div className='Name'>{data.name||`${data.busLine.name} Bus`}</div>
      {isBus ? <BusIcon color={hexColor(data.busLine.color)}/> : <BusStopDot/>}
      <div className='Padder'/>
      <DetailButton onClick={onDetailsClick} color={isBus?hexColor(data.busLine.color):'#383838'}/>
    </PreviewDiv>
  )
}

// Autoprefixer fix
let PreviewDiv = styled.div`
  &:last-child {
    /*see PreviewAnimation.css*/
    transition-property: transform, opacity, box-shadow, border-radius;
    transition-duration: 200ms, 200ms, .26s, .26s;
    box-shadow: 0px 7px 7px -5px rgba(31, 73, 125, 0.18);
    border-radius: 0 0 6px 6px;
  }
`


let DetailButton = props => <Button className='DetailButton' {...props}>Arrivals</Button>

let Button = styled.div`
  background-color: ${p=>p.color};
  transition: all .1s;
  &:hover {
    background-color: ${p=>desaturate(.1,darken(.03,p.color))};
    transform: translateY(1px);
  }
`
