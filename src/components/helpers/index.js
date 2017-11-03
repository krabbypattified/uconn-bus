export class SourceManager {

  constructor(args) {
    Object.assign(this, args)
  }

  set(data) {
    if (!data) return

    this.trackId = randomNumber()

    let features = data.map(d => {
        let {coordinates, ...properties} = this.getProperties(d)
        return {
            type: 'Feature',
            properties: {
              ...properties,
              trackId: this.trackId
            },
            geometry: {
              type: this.type||'Point',
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
    let source = this.map.getSource(this.source)

    // Check if it wasn't updated somewhere else
    let feat = source._data.features
    if (!feat[0] || feat[0].properties.trackId !== this.trackId) return

    source.setData({
      type: 'FeatureCollection',
      features: [],
    })
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


export function randomNumber() {
  return String(Math.floor(Math.random() * 9e15))
}


export function switchy(thing) {
	return function(choices) {
  	let res = choices[thing]
	  return res instanceof Function ? res() : res
  }
}


export function times(num) {
	return function(val) {
  	return val instanceof Function
    ? [...Array(num)].map((v,i)=>i).map(val)
    : [...Array(10)].map(v=>val)
  }
}
