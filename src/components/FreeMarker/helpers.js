import {Point} from 'mapbox-gl'
import 'web-animations-js'

// Helpers
export function addPoints(p1, p2) {
  if (Array.isArray(p1)) p1 = new Point(...p1)
  if (Array.isArray(p2)) p2 = new Point(...p2)
  const x = p1.x + p2.x
  const y = p1.y + p2.y
  return new Point(x,y)
}


export function subtractPoints(p1, p2) {
  if (Array.isArray(p1)) p1 = new Point(...p1)
  if (Array.isArray(p2)) p2 = new Point(...p2)
  const x = p1.x - p2.x
  const y = p1.y - p2.y
  return new Point(x,y)
}


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
  return new Point(el.offsetLeft,el.offsetTop)
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


export function interpolatePosition({el, to, easing='ease-in-out', duration=1000, callback=()=>{}}) {
  if (!el) throw new Error('Interpolation requires an \'el\' parameter.')
  if (!to) throw new Error('Interpolation requires a \'to\' parameter.')

  el.willChange = 'transform'

  let from = window.getComputedStyle(el).getPropertyValue('transform')

  let frames = {transform: [from, to], easing}
  let timing = {duration}
  let anim = el.animate(frames, timing)

  if (!el.dataset.animations) el.dataset.animations = 0
  el.dataset.animations++
  anim.onfinish = function() {
    el.dataset.animations--
    if (el.dataset.animations==0) callback() // eslint-disable-line
  }
}
