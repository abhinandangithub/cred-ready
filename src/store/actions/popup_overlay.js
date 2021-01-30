import * as actionTypes from "./actionTypes/app";

/* val: [true or false, "popup to show if any", {extra info if required}] */
export const togglePopup = (val) => {
	return {
		type: actionTypes.TOGGLE_POPUP,
		payload: val,
	};
};

/* val: true or false */
export const toggleOverlay = (val) => {
	return {
		type: actionTypes.TOGGLE_OVERLAY,
		payload: val, // true or false
	};
};
