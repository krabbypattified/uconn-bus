import {switchy} from 'components/helpers'


export default {

	location(state = null, action) {
		return action.type === 'SET_LOCATION' ? action.location : state
	},

  highlightedThings(state = [], action) {
    return action.type === 'SET_HIGHLIGHTED_THINGS' ? action.things : state
  },

  selectedThingStack(state = [], action) {
    return switchy(action.type)({
      SELECT_THING:_=> [...state, action.thing],
      DESELECT_THING:_=> state.slice(0,state.length-1),
      DESELECT_ALL:_=> [],
      DEFAULT: _=> state
    })
  },

  directions(state = {state:0}, action) {
    return switchy(action.type)({
      DIRECTIONS_DONE:_=> ({state:0}),
      DIRECTIONS_BACK:_=> ({
        ...state,
        state: state.state ? state.state-1 : 0
      }),
      DIRECTIONS_NEXT:_=> ({
        ...state,
        state: state.state>=3 ? 3 : state.state+1
      }),
      SET_DIRECTIONS: _=> {
        let {type, ...other} = action
        return {...state, ...other}
      },
      DEFAULT: _=> state
    })
  },

}
