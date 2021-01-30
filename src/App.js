import React, { useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PrivateRoute from "./routes/PrivateRoute";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Overlay from "./components/Overlay";
import Popup from "./components/Popup";
import LandingPage from "./components/LandingPage";
import ToastMessage from "./components/_Elements/Toast";
import { useIdleTimer } from "react-idle-timer";
import { clearAuthState } from "./store/actions/auth";
import { clearEmployerState } from "./store/actions/employer";
import { clearCandidateState } from "./store/actions/candidate";
import Cookies from "js-cookie";
import { initRadioClick } from "./assets/js/Utility";
import {
	togglePopup,
	toggleOverlay,
} from "./store/actions/popup_overlay";

const App = () => {
	const { popup, overlay } = useSelector((state) => state.popupOverlayReducer);

	const dispatch = useDispatch();

	const handleOnIdle = (event) => {
		// clear cache and store
		localStorage.clear();
		dispatch(clearEmployerState(null));
		dispatch(clearAuthState(null));
		dispatch(clearCandidateState(null));
		// window.location.reload();
		Cookies.remove("JWT");
	};

	const handleOnActive = (event) => { };

	const handleOnAction = (e) => { };

	// React.useEffect(() => {
	// 	initRadioClick();
	// }, []);

	// const { getRemainingTime, getLastActiveTime } = useIdleTimer({
	// 	timeout: 1800000,
	// 	onIdle: handleOnIdle,
	// 	onActive: handleOnActive,
	// 	onAction: handleOnAction,
	// 	debounce: 500
	// })

	const getUserConfirmation = useCallback((messages, cb) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "unsavedChanges", { path: messages, cb: cb }]));
	})

	return (
		<BrowserRouter basename={"/"} getUserConfirmation={getUserConfirmation}>
			<Switch>
				<Route path="/login" component={Auth} />
				<Route path="/signup" component={Auth} />
				<Route path="/thank-you" component={Auth} />
				<Route path="/forgot-password" component={Auth} />
				<Route path="/postings/:id" component={LandingPage} />
				<PrivateRoute path="/" component={Home} />
			</Switch>
			<Overlay active={overlay.show} />
			<Popup active={popup.show}></Popup>
			<ToastMessage></ToastMessage>
		</BrowserRouter>
	);
};

export default App;
