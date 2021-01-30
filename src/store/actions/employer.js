import * as actionTypes from "./actionTypes/employer";
// import {getHiringNeedsThunk} from '../thunks/employer';

/* val: true or false */
export const getHiringNeeds = (val) => {
	return {
		type: actionTypes.GET_HIRING_NEEDS,
		value: val,
	};
	// getHiringNeedsThunk();
};

/* val: true or false */
export const setHiringNeeds = (val) => {
	return {
		type: actionTypes.SET_HIRING_NEEDS,
		value: val,
	};
};

export const setCompanySize = (val) => {
	return {
		type: actionTypes.SET_COMPANY_SIZE,
		value: val,
	};
};

export const setPhoneNumber = (val) => {
	return {
		type: actionTypes.SET_PHONE_NUMBER,
		value: val,
	};
};

export const setEmail = (val) => {
	return {
		type: actionTypes.SET_EMAIL,
		value: val,
	};
};

export const setEmployerProfile = (val) => {
	return {
		type: actionTypes.SET_EMPLOYER_PROFILE,
		value: val,
	};
};

export const setEmployerJobs = (val) => {
	return {
		type: actionTypes.SET_EMPLOYER_POSTED_JOBS,
		value: val,
	};
};

export const setCandidatesList = (val) => {
	return {
		type: actionTypes.SET_CANDIDATES_LIST,
		value: val,
	};
};

export const setEmploymentType = (val) => {
	return {
		type: actionTypes.SET_EMPLOYMENT_TYPE,
		value: val,
	};
};

export const setIndustry = (val) => {
	return {
		type: actionTypes.SET_INDUSTRY,
		value: val,
	};
};

export const setFunction = (val) => {
	return {
		type: actionTypes.SET_FUNCTION,
		value: val,
	};
};

export const setSkills = (val) => {
	return {
		type: actionTypes.SET_SKILLS,
		value: val,
	};
};

export const setQuestionBank = (val) => {
	return {
		type: actionTypes.SET_QUESTION_BANK,
		value: val,
	};
};

export const setQuestionBankQuestion = (val) => {
	console.log('val ', val);
	return {
		type: actionTypes.SET_QUESTION_BANK_QUESTIONS,
		value: val,
	};
};

export const setEmailTemplate = (val) => {
	return {
		type: actionTypes.SET_EMAIL_TEMPLATE,
		value: val,
	};
};

export const setPostedJobURL = (val) => {
	return {
		type: actionTypes.SET_JOB_URL,
		value: val,
	};
};

export const setNewJob = (val) => {
	return {
		type: actionTypes.SET_NEW_JOB,
		value: val,
	};
};

export const setAppliedCandidateDetails = (val) => {
	return {
		type: actionTypes.SET_APPLIED_CANDIDATE,
		value: val,
	};
};

export const setLocations = (val) => {
	return {
		type: actionTypes.SET_LOCATIONS,
		value: val,
	};
};

export const setJobDetails = (val) => {
	return {
		type: actionTypes.SET_JOB_DETAILS,
		value: val,
	};
};

export const setLogin = (val) => {
	return {
		type: actionTypes.SET_LOGIN,
		value: val,
	};
};

export const setRedirectURL = (val) => {
	return {
		type: actionTypes.SET_REDIRECT_URL,
		value: val,
	};
};

export const clearSelectedJobs = (val) => {
	return {
		type: actionTypes.CLEAR_SELECTED_JOBS,
		value: val,
	};
};

export const setOrgNames = (val) => {
	return {
		type: actionTypes.SET_ORG_NAMES,
		value: val,
	};
};

export const setGeography = (val) => {
	return {
		type: actionTypes.SET_GEOGRAPHY,
		value: val,
	};
};

export const clearEmployerState = (val) => {
	return {
		type: actionTypes.CLEAR_EMPLOYER_STATE,
		value: val,
	};
};

export const jobToUpdate = (val) => {
	return {
		type: actionTypes.JOB_TO_UPDATE,
		value: val,
	};
};

export const jobToUpdateArray = (val) => {
	return {
		type: actionTypes.JOB_TO_UPDATE_ARRAY,
		value: val,
	};
};

export const setEmployerResumePath = (val) => {
	return {
		type: actionTypes.EMPLOYER_RESUME_PATH,
		value: val,
	};
};

export const setEmployerDashboardData = (val) => {
	return {
		type: actionTypes.EMPLOYER_DASHBOARD,
		value: val,
	};
};

export const setEmployerDashboardMetrics = (val) => {
	return {
		type: actionTypes.EMPLOYER_DASHBOARD_METRICS,
		value: val,
	};
};
