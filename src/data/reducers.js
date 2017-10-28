export default {

	location(state = null, action) {
		return action.type === 'SET_LOCATION' ? action.location : state
	},

  highlightedThings(state = [], action) {
    return action.type === 'SET_HIGHLIGHTED_THINGS' ? action.things : state
  },

  selectedThingStack(state = [], action) {
    if (action.type === 'SELECT_THING') return [...state, action.thing]
    if (action.type === 'DESELECT_THING') return state.slice(0,state.length-1)
    if (action.type === 'DESELECT_ALL') return []
    return state
  },

}
