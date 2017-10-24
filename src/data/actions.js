export const setLocation = location => {
  if (location && location.x) location = [location.x, location.y]
  return {
    type: 'SET_LOCATION',
    location
  }
}
