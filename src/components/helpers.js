import styled, {keyframes} from 'styled-components'
import ReactSVG from 'react-svg'
import {darken, desaturate} from 'polished'


export class SourceManager {

  constructor(args) {
    Object.assign(this, args)
  }

  set(data) {
    if (!data) return
    let features = data.map(d => {
        let {coordinates, properties={}} = this.getProperties(d)
        return {
            type: 'Feature',
            properties,
            geometry: {
              type: 'Point',
              coordinates
            }
        }
    })

    this.map.getSource(this.source).setData({
      type: 'FeatureCollection',
      features,
    })
  }

  remove() {
    this.map.removeSource(this.source)
  }
}


export class AnimationSourceManager extends SourceManager {

  constructor(args) {
    super(args)
    this.startTime = Date.now()
    this.delay = this.delay || 0
    this.keyframes = []
  }

  remove() {
    this.frame && cancelAnimationFrame(this.frame)
    super.remove()
  }

  addKeyframe(data) {
    let now = Date.now()

    let assocData = []
    for (let i = data.length; i--;) {
      let props = this.getProperties(data[i])
      assocData[props.key] = {
        ...props,
        timeStamp: now
      }
    }

    this.keyframes.push(assocData)
    if (this.paused) {
      this.paused = false
      this.frame = window.requestAnimationFrame(()=>this.animate(this.keyframes.length-2))
    }

    if (this.keyframes.length === 2) {
      let startIn = this.delay - (now-this.startTime)
      if (startIn < 0) this.frame = window.requestAnimationFrame(()=>this.animate(0))
      else setTimeout(() => this.frame = window.requestAnimationFrame(()=>this.animate(0)), startIn)
    }
  }

  animate(key, previousti) {
    // Handle removing/adding objects
    let {one:currKeyframe, two:nextKeyframe} = intersectKeys(this.keyframes[key], this.keyframes[key+1])

    // Calculate ti
    let ti
    if (!previousti) ti = getFirstThing(currKeyframe).timeStamp
    else if (previousti >= getFirstThing(nextKeyframe).timeStamp) {
      key++
      if (!this.keyframes[key+1]) return this.paused = true
      let {one, two} = intersectKeys(this.keyframes[key], this.keyframes[key+1])
      currKeyframe = one
      nextKeyframe = two
      ti = getFirstThing(currKeyframe).timeStamp
    }
    else ti = previousti + (Date.now() - this.lastAnimated)
    this.lastAnimated = Date.now()

    // Calculate frame data
    let frameData = currKeyframe.map((curr, idx) => {

        let next = nextKeyframe[idx]

        let newCoordinates = []
        let newProperties = {}

        // Calculate coordinates
        let dist = distance(curr.coordinates, next.coordinates)
        let delta = dpPlusError(ti, curr, next)
        let dLerp
        if (dist && dist<1) dLerp = delta/dist
        else if (dist) dLerp = 1
        newCoordinates = lerp(curr.coordinates, next.coordinates, dLerp)

        // Lerp properties
        let tiPercent = (ti - curr.timeStamp) / (next.timeStamp - curr.timeStamp)
        for (let key in curr.properties) {
          if (typeof curr.properties[key] !== 'number') continue

          let currProp = curr.properties[key]
          let nextProp = next.properties[key]
          newProperties[key] = lerp([currProp], [nextProp], tiPercent)[0]
        }

        // Map it
        return {
            type: 'Feature',
            properties: newProperties,
            geometry: {
              type: 'Point',
              coordinates: newCoordinates,
            }
        }

    })

    this.map.getSource(this.source).setData({
      type: 'FeatureCollection',
      features: Object.values(frameData),
    })

    this.frame = window.requestAnimationFrame(()=>this.animate(key))
  }
}


// a,b: array of length X
// t: number from 0 to 1
function lerp(a, b, t) {
    var len = a.length;
    if(b.length !== len) return;

    var x = [];
    for(var i = 0; i < len; i++)
        x.push(a[i] + t * (b[i] - a[i]));
    return x;
}


// ti: a time between curr.timeStamp and next.timeStamp
// units : milliseconds, miles
function dpPlusError(_ti, _curr, _next) {
	// miles/hour => meters/second, milliseconds => seconds
  let ti = _ti/1000
  let curr = {..._curr, velocity: _curr.velocity*0.44704, timeStamp: _curr.timeStamp/1000}
  let next = {..._next, velocity: _next.velocity*0.44704,  timeStamp: _next.timeStamp/1000}
  let dpFunc = deltaPosition(curr,next) // optimize: computed once each keyframe?

  let actualDP = distance(curr.coordinates, next.coordinates) * 1609.34 // meters
  let computedDP = dpFunc(next.timeStamp, curr.timeStamp) // meters
  let error = actualDP - computedDP // meters
  let E = error * (ti - curr.timeStamp) / (next.timeStamp - curr.timeStamp) // meters

  return (dpFunc(ti, curr.timeStamp) + E) / 1609.34 // back to miles
}


// unitless
function deltaPosition(curr, next) {
  let a = (next.velocity-curr.velocity) / (next.timeStamp-curr.timeStamp)
  let v = curr.velocity
  return (t,t0) => {
  	let dt = t - t0
    return v*dt + .5*a*dt*dt // distance formula
  }
}


function distance(from, to) {
  let d2 = Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2)
  return Math.sqrt(d2) * 60.7053 // for miles (hacky)
}


function getFirstThing(data) {
  for (var prop in data)
    return data[prop]
}


function intersectKeys(_one, _two) {
  let keys1 = Object.keys(_one)
  let keys2 = Object.keys(_two)
  let common = keys1.filter(n => keys2.includes(n))
  let one = []
  let two = []

  for (let i = 0; i < common.length; i++) {
    one[common[i]] = _one[common[i]]
    two[common[i]] = _two[common[i]]
  }

  return {one, two}
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
  padding: 13.5px 21px 13.5px 23.5px;
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
  font-size: 14px;
  font-weight: 600;
  color: white;
  padding: 3px 17px ;
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
