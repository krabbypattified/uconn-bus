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


function randomNumber() {
  return String(Math.floor(Math.random() * 9e15))
}
