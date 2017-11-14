import {LngLat} from 'mapbox-gl'


export function distance(one,two) {
  let from = one instanceof LngLat ? one.toArray() : [one.longitude, one.latitude]
  let to = two instanceof LngLat ? two.toArray() : [two.longitude, two.latitude]
  let d2 = Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2)
  return Math.sqrt(d2) * 60.7053 // for miles (hacky)
}
