export default {

	location(state = null, action) {
		return action.type === 'SET_LOCATION' ? action.location : state
	},

  highlightedThings(state = [], action) {
    return action.type === 'SET_HIGHLIGHTED_THINGS' ? action.things : state
  },

}
