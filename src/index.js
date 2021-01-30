import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ToastProvider } from "react-toast-notifications";
// import "semantic-ui-css/semantic.min.css";

import "./index.scss";
import App from "./App";
import authReducer from "./store/reducers/auth";
import commonReducer from "./store/reducers/common";
import popupOverlayReducer from "./store/reducers/popup_overlay";
import employerReducer from "./store/reducers/employer";
import candidateReducer from "./store/reducers/candidate";
import toastReducer from "./store/reducers/toast";

import {
	candidateSetDataReducer,
	setAllFunctionsReducer,
	setAllIndustriesReducer,
	setCandidateCertificateTitlesReducer,
	setCandidateAllAnswersReducer,
	candidateCurrentStatusReducer,
	setCandidateJobsReducer,
	setCandidateAppliedJobsDataReducer,
	setCandidateExperienceTypeReducer,
	setCandidateDegreeTitlesReducer,
	setCandidateInstitutionTypeReducer,
	setCandidateJobViewDataReducer,
	setJobDescriptionReducer,
	setAllMajorMinorReducer,
	flagReducer,
	setCurrentGoalsReducer,
	candidateSetHealthCareGoalsReducer,
	candidateSetAlternativeGoalsReducer,
	candidateSetGoalsByIdReducer,
} from "./modals/candidateProfile/index";

const rootReducer = combineReducers({
	authReducer,
	popupOverlayReducer,
	candidateSetDataReducer,
	candidateCurrentStatusReducer,
	setCandidateAppliedJobsDataReducer,
	setCandidateExperienceTypeReducer,
	setCandidateDegreeTitlesReducer,
	setCandidateInstitutionTypeReducer,
	setCandidateAllAnswersReducer,
	setCandidateJobViewDataReducer,
	setCandidateJobsReducer,
	employerReducer,
	setCandidateCertificateTitlesReducer,
	setAllFunctionsReducer,
	setAllIndustriesReducer,
	commonReducer,
	candidateReducer,
	setJobDescriptionReducer,
	toastReducer,
	setAllMajorMinorReducer,
	flagReducer,
	setCurrentGoalsReducer,
	candidateSetHealthCareGoalsReducer,
	candidateSetAlternativeGoalsReducer,
	candidateSetGoalsByIdReducer,
});

/* Middleware */
const logger = (store) => {
	return (next) => {
		return (action) => {
			// console.log("[Middleware] Dispatcing", action);
			const result = next(action);
			// console.log("[Middleware] next state", store.getState());
			return result;
		};
	};
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

store.subscribe(() => {
	// console.log("[subscribe]", store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<StrictMode>
			<ToastProvider>
				<App />
			</ToastProvider>
		</StrictMode>
	</Provider>,
	document.getElementById("root")
);
