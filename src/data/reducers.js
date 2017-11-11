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

  directions(state = {state:0}, action) {
    if (action.type === 'DIRECTIONS_BACK') return {
      ...state,
      state: state.state ? state.state-1 : 0
    }

    if (action.type === 'DIRECTIONS_NEXT') return {
      ...state,
      state: state.state>=3 ? 3 : state.state+1
    }

    if (action.type === 'SET_DIRECTIONS') {
      let {type, ...other} = action
      return {
        ...state,
        ...other,
      }
    }

    return state
  },

}
