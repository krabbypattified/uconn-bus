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

export const deselectAll = () => {
  return {
    type: 'DESELECT_ALL',
  }
}

export const getDirections = ({from, to}) => {
  return {
    type: 'GET_DIRECTIONS',
    from,
    to,
  }
}

export const clearDirections = () => {
  return {
    type: 'CLEAR_DIRECTIONS',
  }
}
