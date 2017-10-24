import {Matrix} from 'transformation-matrix-js'
import Point from './Point'
import 'web-animations-js'

// Helpers
export function setPosition(el, position={}) {
  for (let key in position) if (typeof position[key] === 'number') position[key] = position[key]+'px'
  el.style.position = 'absolute'
  el.style.top = position.top || ''
  el.style.right = position.right || ''
  el.style.bottom = position.bottom || ''
  el.style.left = position.left || ''
}


export function resetPosition(el) {
  setPosition(el)
}


let checkerDiv
export function absoluteToPoint(el, pos) {
  if (!checkerDiv) {
    checkerDiv = document.createElement('div')
    checkerDiv.style.pointerEvents = 'none'
    el.parentNode.appendChild(checkerDiv)
  }

  checkerDiv.style.width = el.offsetWidth+'px'
  checkerDiv.style.height = el.offsetHeight+'px'
  setPosition(checkerDiv, pos)
  return cornerToCenter(checkerDiv)
}


export function setStyle(el, style={}) {
  let {top, right, bottom, left, transform, position, ...other} = style
  for (let p in other) el.style[p] = other[p]
}


export function getPosition(el) {
  const matrix = window.getComputedStyle(el).getPropertyValue('transform')
  const translate = matrix.match(/[0-9\.]+/g) || [0,0,0,0,0,0] // eslint-disable-line
  const x = parseFloat(translate[4], 10)
  const y = parseFloat(translate[5], 10)
  return new Point(x,y)
}


export function cornerToCenter(el) {
  let x = el.offsetWidth/2 + el.offsetLeft
  let y = el.offsetHeight/2 + el.offsetTop
  return new Point(x,y)
}


export function interpolate({el, delta, easing='ease-in-out', duration=1000, callback=()=>{}}) {
  if (!el) throw new Error('Interpolation requires an \'el\' parameter.')
  if (!delta) throw new Error('Interpolation requires a \'delta\' parameter.')

  let before = Matrix.from(el)
  if (isNaN(before.a)) before = new Matrix() // bugfix
  let after = before.concat(delta)

  el.willChange = 'transform'

  console.log('before',before)
  console.log('after',after)

  let frames = [
    {transform: before.toCSS(), easing},
    {transform:  after.toCSS(), easing}
  ]
  let timing = {duration}
  let anim = el.animate(frames, timing)
  anim.onfinish = callback
}
