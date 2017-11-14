export function switchy(thing) {
	return function(choices) {
  	let res = typeof choices[thing] === 'undefined' ? choices['DEFAULT'] : choices[thing]
	  return res instanceof Function ? res() : res
  }
}
