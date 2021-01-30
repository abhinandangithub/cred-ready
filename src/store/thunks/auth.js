import Axios from "axios";
import {
	loginUrl,
	signUpUrl,
	verifyUserUrl,
	authVcodeRequestPostUrl,
	authResendVcodeRequestPostUrl
} from "../api/auth";
import { updatePhoneOtp } from "../../store/actions/auth";

import { updateLoggedIn, updateJwtToken, updateSignupDetails } from "../actions/auth";
import { fetchCandidateDetails } from "../../modals/candidateProfile/thunk";
import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader } from "../utility";
import { requestConfig } from "./utils";
import { getProfileThunk, getPostedJobs } from "./employer";
import { beginApiCall, apiCallError } from "../actions/common";
import { togglePopup, toggleOverlay } from "../actions/popup_overlay";

import {
	showToast
} from "../actions/toast";

export const tryLogin = (credentials) => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		const {
			data: { data: token },
		} = await Axios.post(loginUrl, credentials, requestConfig);
		if (!token) return false;
		Cookies.set("JWT", token);
		/**
		 * TODO: after uncomment below line, `dispatch(updateLoggedIn([true, type]));` is not working
		 */
		// setDefaultAuthorizationHeader(token);
		dispatch(updateJwtToken(token));
		let type =
			token && token.map
				? token.map.user_type === "jobseeker"
					? "candidate"
					: token.map.user_type
				: "";
		//	await fetchCandidateDetails();
		if (type === 'employer') {
			dispatch(getPostedJobs());
			dispatch(getProfileThunk(type));
		} else {
			dispatch(fetchCandidateDetails());
			dispatch(updateLoggedIn([true, type]));
		}
		setDefaultAuthorizationHeader(token);
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Server error.",
			type: "error",
			isShow: true
		}));
		if (err.response) {
			dispatch(updateLoggedIn([err.response.data.message, "error"]));
			console.error(`failed to log-in with error ${err}`);
		}
	}
};

export const resendVerificationCode = () => async (dispatch, getState) => {
	console.log("userData ", getState().authReducer.signUp);
	try {
		//dispatch(updatePhoneOtp(1111));
		const { data } = await Axios.post(
			authResendVcodeRequestPostUrl,
			getState().authReducer.signUp,
			requestConfig
		);

		if (!data.message) return;
		if (data && data.data) {
			dispatch(showToast({
				message: data.data,
				type: "success",
				isShow: true
			}));
		}
	} catch (err) {
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data,
			type: "error",
			isShow: true
		}));
		console.error(`failed to sign-up user with error ${err}`);
	}
};

export const getVerificationCode = (userData) => async (dispatch, getState) => {
	console.log("userData ", userData);
	try {
		dispatch(beginApiCall());
		//dispatch(updatePhoneOtp(1111));
		const { data } = await Axios.post(
			authVcodeRequestPostUrl,
			userData,
			requestConfig
		);

		if (!data.message) return;
		dispatch(apiCallError());
		if (data && data.data) {
			dispatch(showToast({
				message: data.data,
				type: "success",
				isShow: true
			}));
		}
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "phoneOtp"]));
		dispatch(updateLoggedIn([false, userData.user_type]));
		dispatch(updateSignupDetails(userData));
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Server error.",
			type: "error",
			isShow: true
		}));
		console.error(`failed to sign-up user with error ${err}`);
	}
};

export const verifyUserCode = (type = "phone", otp) => async (
	dispatch,
	getState
) => {
	let obj = {
		type: type,
		contact: getState().authReducer.signUp.phone,
		verification_code: otp,
	};
	try {
		const { data } = await Axios.post(verifyUserUrl, obj, requestConfig);
		if (data && data.data) {
			dispatch(showToast({
				message: data.data,
				type: "success",
				isShow: true
			}));
		}
		if (data.message) {
			dispatch(updatePhoneOtp(true));
			dispatch(signUpUser(getState().authReducer.signUp));
			return;
		}
	} catch (err) {
		dispatch(updatePhoneOtp(false));
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Server error.",
			type: "error",
			isShow: true
		}));
		console.error(`failed to sign-up user with error ${err}`);
	}
};

export const signUpUser = (userData) => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		const { data } = await Axios.post(signUpUrl, userData, requestConfig);
		if (data && data.data) {
			// dispatch(showToast({
			// 	message: "You account has been created successfully.",
			// 	type: "success",
			// 	isShow: true
			// }));
		}
		if (data.message) {
			dispatch(tryLogin({
				username: userData.email,
				password: userData.password
			}));
			dispatch(apiCallError());
			dispatch(updatePhoneOtp(false));
			return;
		}
	} catch (err) {
		dispatch(apiCallError());
		dispatch(updatePhoneOtp(false));
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Server error.",
			type: "error",
			isShow: true
		}));
		console.error(`failed to sign-up user with error ${err}`);
	}
};
