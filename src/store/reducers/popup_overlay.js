import * as actionTypes from "../actions/actionTypes/app";
import { updateObject } from "../utility";

const initialState = {
	popup: {
		show: false,
		which: "",
		info: {},
		previousWhich: ""
	},
	overlay: {
		show: false,
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_POPUP:
			return updateObject(state, {
				popup: {
					show: action.payload[0] ? true : false,
					which: action.payload[1],
					info: action.payload[2],
					previousWhich: state.popup.which
				},
			});
		case actionTypes.TOGGLE_OVERLAY:
			return updateObject(state, {
				overlay: { show: action.payload ? true : false },
			});

		default:
			return state;
	}
};

export default reducer;
