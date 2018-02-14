// Returns things in a that aren't in b
export function difference(a, b) {
  return new Set([...a].filter(x => !b.has(x)))
}

export function union(a, b) {
  return new Set([...a, ...b])
}
