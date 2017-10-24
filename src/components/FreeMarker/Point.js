import {Point} from 'mapbox-gl'

// Mutates
Point.prototype.add = function(point) {
  if (Array.isArray(point)) point = new Point(...point)
  this.x += point.x
  this.y += point.y
  return this
}

Point.prototype.minus = function(point) {
  if (Array.isArray(point)) point = new Point(...point)
  const x = this.x - point.x
  const y = this.y - point.y
  return new Point(x,y)
}


export default Point
