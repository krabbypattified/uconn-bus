import styled, {keyframes} from 'styled-components'
import ReactSVG from 'react-svg'
import {darken, desaturate} from 'polished'


export class GeoJSON {
  constructor() {
    this.d = {}
  }

  set(key, {coordinates, properties}) {
    this.d[key] = {
      type: 'Feature',
      properties,
      geometry: {
        type: 'Point',
        coordinates
      }
    }
  }

  delete(key) {
    delete this.d[key]
  }

  data() {
    return {
      type: 'FeatureCollection',
      features: Object.values(this.d)
    }
  }
}


let mobile
export function isMobile() {
  if (typeof mobile !== 'undefined') return mobile
  mobile = navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  return mobile
}


export function nearestDeg(dOld,dNew) {
  let old = dOld % 360

  let dist1 = Math.abs(old-dNew)
  let dist2 = 360 - dist1

  if (old>dNew) {
  	  if (dist1<dist2) return dOld - dist1
  		else return dOld + dist2
  }

  if (dist1<dist2) return dOld + dist1
  else return dOld - dist2
}


export function randomNumber() {
  return String(Math.floor(Math.random() * 9e15))
}




// Styled Components




export let blink = keyframes`
  from {
    opacity: .25;
    transform: translate(-50%, -50%) scale(.3);
  }
  40% {
    opacity: .14;
  }
  80% {
    opacity: 0;
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3.15);
  }
`


export let Satellite = styled.div`
  position: absolute;
  background-color: ${({color})=>color};
  width: 30px;
  height: 30px;
  border-radius: 100px;
  animation: ${blink} 3s cubic-bezier(.1,.55,.65,1) infinite;
  transform: translate(-50%, -50%);
  pointer-events: none;
`


export let Dot = styled.div`
  pointer-events: auto;
  position: absolute;
  background-color: ${({color})=>color};
  width: ${({radius=7})=>radius*2}px;
  height: ${({radius=7})=>radius*2}px;
  border-radius: 100px;
  border: ${({stroke=2})=>stroke}px solid white;
  transform: translate(-50%, -50%);
`




export let Flex = styled.div`
  display: flex;
  align-items: center;
`

// TODO animate in out from left? OR just helper keyframes?
export let Box = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13.5px 23.5px;
  box-shadow: 0 0 7px 0 rgba(0,0,0,.2);
  font-size: 17px;
  width: 100%;
  border-bottom: .5px solid #eee;
`

export let Title = styled.div`
  max-width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export let Details = styled.div`
  user-select: none;
  cursor: pointer;
  font-size: 14.5px;
  font-weight: 600;
  color: white;
  padding: 3px 18px ;
  background-color: ${({color})=>color};
  border-radius: 30px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.36);
  transition: all .1s;
  &:hover {
    background-color: ${({color})=>desaturate(.1,darken(.03,color))};
    transform: translateY(1px);
  }
`

export let BusSVG = styled(ReactSVG)`
  position: absolute;
  transform: translate(4px,1px) rotate(60deg) scale(.85);
  transform: translateY(-50%) translate(5px,0px) rotate(73deg) scale(.85);
  margin-right: 10px;
	.st0 {
		fill: ${({color}) => color};
	}
`
