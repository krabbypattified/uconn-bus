let endCallbacks = []
let loaded

class Loader {

  constructor(startCallback, endCallback, defaultPrediction) {
    endCallbacks.push(endCallback)
    startCallback(localStorage.getItem('prediction')-0 || defaultPrediction)
  }

  static finish() {
    if (loaded) return
    else loaded = true
    localStorage.setItem('prediction', performance.now())
    endCallbacks.forEach(c=>c())
  }

}
