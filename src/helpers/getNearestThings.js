import {distance} from '.'


export function getNearestThings(things, {distance:maxDist=Infinity, location, max=Infinity}) {
  return things
    .map(thing => ({
      val: thing,
      distance: distance(location, thing)
    }))
    .sort((a,b) => a.distance - b.distance)
    .slice(0,max)
    .filter(({distance}) => distance < maxDist)
    .map(wrap => wrap.val)
}
