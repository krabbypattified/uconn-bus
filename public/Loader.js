let done = []

class Loader {

  constructor(callback, doneEarly, defaultPrediction) {
    done.push(doneEarly)
    callback(localStorage.getItem('prediction')-0 || defaultPrediction)
  }

  static finish() {
    localStorage.setItem('prediction', performance.now())
    done.forEach(f=>f())
  }

}
