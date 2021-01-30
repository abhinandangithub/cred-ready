// If user is loggedin, they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { updateJwtToken, updateLoggedIn } from "../store/actions/auth";
import { setRedirectURL } from "../store/actions/employer";
import { useEffect } from "react";
import { clearAuthState } from "../store/actions/auth";
import { clearEmployerState } from "../store/actions/employer";
import { clearCandidateState } from "../store/actions/candidate";

const PrivateRoute = ({ component: Component, history, ...rest }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const redirectUrl = useSelector((state) => state.employerReducer.redirectURL);

	const handleOnIdle = event => {
		// clear cache and store
		let remember_me = localStorage.getItem('remember_me');
		if (!remember_me) {
			localStorage.clear();
			dispatch(clearEmployerState(null));
			dispatch(clearAuthState(null));
			dispatch(clearCandidateState(null));
			window.location.reload();
			Cookies.remove("JWT");
		}
	}

	// 1hr minutes for logout
	const ALLOWED_IDLE_TIME = 3600000;
	let previousTime = new Date().getTime();

	const onUserNavigate = () => {
		let idleTime = new Date().getTime() - previousTime;
		previousTime = new Date().getTime();
		if (idleTime > ALLOWED_IDLE_TIME) {
			handleOnIdle();
		}
	}

	history.listen((location, action) => {
		onUserNavigate();
	});

	// const userType = localStorage.getItem("user_type")
	const token = Cookies.get("JWT");
	if (token && !auth.JWT) {
		dispatch(updateJwtToken(JSON.parse(token)));
		let userType = JSON.parse(token).map.user_type;
		if (userType === "jobseeker") {
			userType = "candidate";
		}
		dispatch(updateLoggedIn([true, userType]));
	} else {
		if (auth.isLoggedOut) {
			Cookies.remove("JWT");
			window.location.replace(window.location.origin + '/login').reload();
		} else {
			if (!redirectUrl) {
				dispatch(setRedirectURL(window.location.href));
			}
		}
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				token ? (
					<>

						<Component {...props} />
					</>
				) : (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						/>
					)
			}
		/>
	);
};

export default withRouter(PrivateRoute);
