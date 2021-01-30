import * as actionTypes from "./actionTypes/auth";

/* val: true or false */
export const updateTermsAndConditions = (val) => {
	return {
		type: actionTypes.UPDATE_TERMSANDCONDITIONS,
		value: val,
	};
};

/* val: true or false */
export const updateEmailOtp = (val) => {
	return {
		type: actionTypes.UPDATE_EMAILOTP,
		value: val,
	};
};

/* val: true or false */
export const updatePhoneOtp = (val) => {
	return {
		type: actionTypes.UPDATE_PHONEOTP,
		value: val,
	};
};

/* val: true or false */
export const updateLoggedIn = (val) => {
	return {
		type: actionTypes.UPDATE_LOGGEDIN,
		value: val,
	};
};

export const updateSignupDetails = (details) => {
	return {
		type: actionTypes.UPDATE_SINGUP_DETAILS,
		details,
	};
};

export const updateJwtToken = (JWT) => ({
	type: actionTypes.UPDATE_JWT_TOKEN,
	JWT,
});

export const clearAuthState = (val) => ({
	type: actionTypes.CLEAR_AUTH_STATE,
	val,
});

export const updateRememberMe = (REMEMBER_ME) => ({
	type: actionTypes.REMEMBER_ME,
	REMEMBER_ME,
});

export const setLoggedOut = (val) => ({
	type: actionTypes.LOGOUT,
	val,
});

