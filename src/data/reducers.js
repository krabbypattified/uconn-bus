export default {

	location(state = null, action) {
		return action.type === 'SET_LOCATION' ? action.location : state
	},

}
