export const setLocation = location => {
  if (location && location.x) location = [location.x, location.y]
  return {
    type: 'SET_LOCATION',
    location
  }
}

export const setHighlightedThings = things => {
  return {
    type: 'SET_HIGHLIGHTED_THINGS',
    things
  }
}

export const selectThing = thing => {
  return {
    type: 'SELECT_THING',
    thing
  }
}

export const deselectThing = () => {
  return {
    type: 'DESELECT_THING',
  }
}
