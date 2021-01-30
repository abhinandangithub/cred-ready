import Axios from "axios";
import {
	employeFetchHireRequiredRangesUrl,
	employerFetchComapnySizeUrl,
	employerUpdateUserPhoneUrl,
	employerUpdateEmailUrl,
	employerDeleteAccountUrl,
	employerUpdateProfileUrl,
	employerFetchAllPostedJobsUrl,
	employerSendCandidateEmailUrl,
	employerJobFollowUpUrl,
	employerUpdateApplicationStatusOfCandidateUrl,
	employerFetchJobById,
	employerFetchJobByFilters,
	employeFetchQuestionbankUrl,
	employeGetEmailTemplate,
	employerFetchCandidatesByJobId,
	employerPostJob,
	employeCreateQuestion,
	employeCandidateSendEmail,
	employeFecthOrgLocations,
	employeFecthJobPreviewDetails,
	employerDeleteQuestionsFromJobUrl,
	employerDeleteQuestionFromJobUrl,
	employerUpdateQuestion,
	employerUpdateCompanyLogoUrl,
	orgNameUrl,
	employeAddEmailTemplate,
	employeUpdateEmailTemplate,
	profileDownloadUrl,
	employerUpdateJob,
	dashboardUrl,
	dashboardMetricsUrl,
	suspendJobUrl
} from "../api/employer";

import { updateLoggedIn } from "../actions/auth";
import { geographyUrl } from '../api/entity';
import {
	setHiringNeeds, setCompanySize, setPhoneNumber,
	setEmail, setEmployerProfile, setEmployerJobs,
	setCandidatesList, setEmploymentType, setIndustry,
	setFunction, setSkills, setQuestionBank, setEmailTemplate, setPostedJobURL,
	setAppliedCandidateDetails, setLocations, setJobDetails, setLogin,
	setOrgNames,
	setGeography,
	setQuestionBankQuestion,
	setEmployerResumePath,
	jobToUpdate,
	jobToUpdateArray,
	setPostJobResponse,
	setEmployerDashboardMetrics,
	setEmployerDashboardData,
	setNewJob
} from "../actions/employer";

import {
	beginApiCall, apiCallError
} from "../actions/common";

import {
	showToast
} from "../actions/toast";

import { updateJwtToken } from "../actions/auth";

import { candidateFetchAllCertificatesUrl, profileCandidateDownloadUrl } from '../api/candidate';

// import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader, setAllowAccessHeader } from "../utility";
import { requestConfig } from "./utils";
import { enitityFetchExperienceTypeUrl, entityFetchEntityIndustryUrl, entityFetchEntitityFunctionUrl, entityFetchSkillsUrl, entityFetchEmployementSatusUrl } from "../api/entity";
import { candidateFetchJobsAppliedUrl } from "../api/candidate";
import Cookies from "js-cookie";
import { keys } from "highcharts";

import { clearAuthState, setLoggedOut } from "../../store/actions/auth";
import { clearEmployerState } from "../../store/actions/employer";
import { clearCandidateState } from "../../store/actions/candidate";

export const getHiringNeedsThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(employeFetchHireRequiredRangesUrl, requestConfig);
		if (!data) return false;
		dispatch(setHiringNeeds(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch hiring needs ${err}`);
	}
};

export const getCompanySizeThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(employerFetchComapnySizeUrl, requestConfig);
		if (!data) return false;
		dispatch(setCompanySize(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch company size ${err}`);
	}
};

export const getGeographyThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(geographyUrl);
		if (!data) return false;
		if (data.data && data.data.data.length) {
			let temp = data.data.data.sort(function (a, b) {
				const x = a["city"].toLowerCase();
				const y = b["city"].toLowerCase();
				return x > y ? 1 : x < y ? -1 : 0;
			});
			data.data.data = temp;
		}
		dispatch(setGeography(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch geography size ${err}`);
	}
};

export const updateProfileThunk = (token, profile) => async (dispatch, getState) => {
	try {
		const state = getState();
		if (!!profile.companySize)
			profile.companySize = state.employerReducer.companySizeKeys.find(val => val.range_display_value === profile.companySize).id;
		if (!!profile.hiresRequired)
			profile.hiresRequired = state.employerReducer.hiringKeys.find(val => val.range_display_value === profile.hiresRequired).id;
		dispatch(beginApiCall());
		const data = await Axios.patch(employerUpdateProfileUrl, profile, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		let obj = {
			map: {
				jwt: data.data.data,
				user_type: state.authReducer.JWT.map.user_type
			}
		}
		Cookies.remove("JWT");
		Cookies.set("JWT", obj);

		dispatch(updateJwtToken(obj));

		dispatch(showToast({
			message: "Profile updated succesfully ",
			type: "success",
			isShow: true
		}));
		dispatch(getProfileThunk());
		dispatch(apiCallError());
		dispatch(profileDownload())
	} catch (err) {
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const getProfileThunk = (type = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const data = await Axios.get(employerUpdateProfileUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmployerProfile(data.data));
		if (type) dispatch(updateLoggedIn([true, type]));
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const updatePhoneNumberThunk = (token, phone) => async (dispatch, getState) => {
	try {
		const data = await Axios.put(employerUpdateUserPhoneUrl, phone, requestConfig);
		if (!data) return false;
		dispatch(showToast({
			message: "Phone updated successfully.",
			type: "success",
			isShow: true
		}));
		dispatch(setPhoneNumber(data.data.phone));
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating phone.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to update phone number ${err}`);
	}
};

export const updateEmailThunk = (email) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.put(employerUpdateEmailUrl, { "email": email }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: "Email updated successfully.",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
		dispatch(setEmail(data.data.email));
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating email.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const updatePhoneThunk = (phone) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.put(employerUpdateUserPhoneUrl, { "phone": phone }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: "Phone updated successfully.",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
		dispatch(setPhoneNumber(data.data.phone));
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating phone.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const deleteAccount = (props) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.delete(employerDeleteAccountUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		localStorage.clear();
		// dispatch(updateLoggedIn([false, ""]));
		//props.history.push("/login")
		dispatch(showToast({
			message: "Account deleted successfully",
			type: "success",
			isShow: true
		}));
		// dispatch(clearEmployerState(null));
		// dispatch(clearAuthState(null));
		// dispatch(clearCandidateState(null));
		//	window.location.replace(window.location.origin + '/login').reload();
		Cookies.remove("JWT");
		dispatch(setLoggedOut(true));
	} catch (err) {
		dispatch(showToast({
			message: "Failed to delete. Please try again.  ",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to delete employer account ${err}`);
	}
};

export const getPostedJobs = (isUpdate = undefined, jobId = undefined, isPostJob = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const data = await Axios.get(employerFetchAllPostedJobsUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(setEmployerJobs(data.data));
		if (isUpdate === 'update' && jobId) {
			dispatch(jobToUpdate(jobId));
		}
		if (isPostJob && data.data) {
			let temp = data.data.data.find((j) => j.job_id == jobId);
			dispatch(jobToUpdateArray(temp));
		}
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to fetch the posted jobs ${err}`);
	}
};

export const sendEmail = (notif) => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		const state = getState();
		const data = await Axios.post(employeCandidateSendEmail, notif, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: "Email sent successfully.",
			type: "success",
			isShow: true
		}));
		dispatch(apiCallError());
		if (!data) return false;
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: "Error in sending the email.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to send email notification to candidate ${err}`);
	}
};

export const sendNotification = (notif) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.put(employerJobFollowUpUrl, notif, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to send email notification to candidate ${err}`);
	}
};

export const updateStatus = (status, isShowToast = true) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.put(employerUpdateApplicationStatusOfCandidateUrl, status, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (isShowToast) {
			dispatch(showToast({
				message: "Status Changed successfully.",
				type: "success",
				isShow: true
			}));
		}
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: "Error in changing the status..",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getCandidatesList = (jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const URL = employerFetchJobById + "/" + jobID;
		const data = await Axios.get(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setCandidatesList(data.data));
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Invalid job id",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getCandidatesByStatusAndRange = (jobID, previousDate, currentDate, status, range) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const URL = `${employerFetchJobByFilters}/${jobID}/${previousDate}/${currentDate}?rfs=${status}&rfd=${range}`;
		const data = await Axios.get(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setCandidatesList(data.data));
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Invalid job id",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getCandidatesByRange = (jobID, previousDate, currentDate, range) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const URL = `${employerFetchJobByFilters}/0/${previousDate}/${currentDate}?jpid=${jobID}&jpcri=${range}`;
		const data = await Axios.get(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setCandidatesList(data.data));
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Invalid job id",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getCandidatesByAvailability = (jobID, previousDate, currentDate, availability) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const URL = `${employerFetchJobByFilters}/${jobID}/${previousDate}/${currentDate}?aa=${availability}`;
		const data = await Axios.get(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setCandidatesList(data.data));
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Invalid job id",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getEmploymentType = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(entityFetchEmployementSatusUrl);
		if (!data) return false;
		if (data.data && data.data.data.length) {
			let temp = data.data.data.sort(function (a, b) {
				const x = a["employment_status"].toLowerCase();
				const y = b["employment_status"].toLowerCase();
				return x > y ? 1 : x < y ? -1 : 0;
			});
			data.data.data = temp;
		}
		dispatch(setEmploymentType(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to set the employment type ${err}`);
	}
};

export const getIndustry = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(entityFetchEntityIndustryUrl);
		if (!data) return false;
		if (data.data && data.data.data.length) {
			let temp = data.data.data.sort(function (a, b) {
				const x = a["industry_name"].toLowerCase();
				const y = b["industry_name"].toLowerCase();
				return x > y ? 1 : x < y ? -1 : 0;
			});
			data.data.data = temp;
		}
		dispatch(setIndustry(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the industry ${err}`);
	}
};

export const getFunction = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(entityFetchEntitityFunctionUrl);
		if (!data) return false;
		if (data.data && data.data.data.length) {
			let temp = data.data.data.sort(function (a, b) {
				const x = a["function_name"].toLowerCase();
				const y = b["function_name"].toLowerCase();
				return x > y ? 1 : x < y ? -1 : 0;
			});
			data.data.data = temp;
		}
		dispatch(setFunction(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the function ${err}`);
	}
};


export const getOrgNames = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(orgNameUrl);
		if (!data) return false;
		dispatch(setOrgNames(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the function ${err}`);
	}
};

export const getSkills = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(candidateFetchAllCertificatesUrl);
		if (!data) return false;
		dispatch(setSkills(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the skills ${err}`);
	}
};

export const getQuestionBank = () => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		const state = getState();
		const data = await Axios.get(employeFetchQuestionbankUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setQuestionBank(data.data));
		dispatch(apiCallError());
	} catch (err) {
		if (err.response) console.error(`failed to get the question bank ${err}`);
	}
};

export const getEmailTemplate = () => async (dispatch, getState) => {
	try {
		console.log('get email template');
		const state = getState();
		const data = await Axios.get(employeGetEmailTemplate, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		console.log('get email template');
		if (!data) return false;
		dispatch(setEmailTemplate(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const addEmailTemplate = (body) => async (dispatch, getState) => {
	try {
		const state = getState();
		console.log('body add', body);
		let obj = {
			emailBody: body && body.body[0],
			fromEmail: body && body.email[0],
			templateName: body && body.name[0]
		};
		console.log('body add obj', obj);

		const data = await Axios.post(employeAddEmailTemplate, obj, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: data.data.message,
			type: "success",
			isShow: true
		}));
		dispatch(getEmailTemplate());
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: "Error adding email template.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const updateEmailTemplate = (body) => async (dispatch, getState) => {
	try {
		const state = getState();
		console.log('body edit', body);
		let obj = {
			emailBody: body && body.body[0],
			fromEmail: body && body.email[0],
			templateName: body && body.name[0],
			templateId: body.templateId
		};
		const data = await Axios.post(employeUpdateEmailTemplate, obj, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: "Email template updated successfully",
			type: "success",
			isShow: true
		}));
		dispatch(getEmailTemplate());
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: err.response && err.response.data && err.response.data.data,
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const postJob = (jobId = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
		let data = undefined;
		dispatch(beginApiCall());
		let body = { ...state.employerReducer.newJob }
		let questions = body.jobQuestionnaireMap.map((q, i) => {
			return { questionId: q, questionOrder: i }
		});
		body.jobQuestionnaireMap = questions;
		if (!!jobId) {
			body = { ...body, jobId: jobId };
			data = await Axios.patch(employerUpdateJob, body, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
			if (!!jobId) {
				dispatch(getPostedJobs("update", jobId));
			}
		}
		else {
			// body = { ...state.employerReducer.newJob }
			// let job = {
			// 	emailTemplateId: 1, employmentType: 3,
			// 	function: 680, industry: 21, jobDescription: "<p>java</p>",
			// 	jobQuestionnaireMap: [482], jobCertificateMap: [16859, 15],
			// 	jobTitle: "test", location: 828, maxExp: 5, minExp: 0, openPositions: "3"
			// };
			data = await Axios.post(employerPostJob, body, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
		}
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(showToast({
			message: jobId ? "You have successfully updated the job " : "You have successfully posted the job ",
			type: "success",
			isShow: true
		}));
		//	dispatch(setPostJobResponse(true));		
		dispatch(setPostedJobURL(data.data.data));
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: jobId ? "Error in updating the job." : "Error in posting the job.",
			type: "error",
			isShow: true
		}));
		dispatch(setPostedJobURL(null));
		if (err.response) console.error(`failed to post the job ${err}`);
	}
};


export const createQuestion = (question, action, type = undefined, updateJob = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
		let data = "";
		dispatch(beginApiCall());
		if (action === "edit") {
			data = await Axios.patch(employerUpdateQuestion, question, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
			console.log('questionToSave ', question);
			let temp = state.employerReducer.questionBank.questions.map((val) => {
				if (val.question_id === question.questionId) {
					val.job_title = question.jobTitle;
					val.question_type = question.questionType;
					val.question_name = question.questionName;
					if (question.questionType === "mcq") {
						val.option_choices = question.optionChoices.map((o) => {
							return {
								option_choice_name: o.optionChoiceName,
								question_type: o.questionType,
								id: o.id ? o.id : 1,
								question_id: o.questionId ? o.questionId : question.questionId
							}
						})
					}
				}
				return val;
			});
			console.log('questionToSave ', temp);
			dispatch(setQuestionBankQuestion(temp));
		} else {
			data = await Axios.post(employeCreateQuestion, question, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});

			if (!!data && !!data.data && data.data.data.question_id) {
				let oldQuestions = state.employerReducer.questionBank.questions ? state.employerReducer.questionBank.questions : [];
				let newQuestion = {};
				newQuestion.question_id = data.data.data.question_id;
				newQuestion.job_title = question.jobTitle;
				newQuestion.question_type = question.questionType;
				newQuestion.question_name = question.questionName;
				if (question.questionType === "mcq") {
					newQuestion.option_choices = question.optionChoices.map((o) => {
						return {
							option_choice_name: o.optionChoiceName,
							question_type: o.questionType,
							id: o.id ? o.id : 1,
							question_id: o.questionId ? o.questionId : question.questionId
						}
					})
				};
				dispatch(setQuestionBankQuestion([newQuestion, ...oldQuestions]));
				if (!!updateJob) {
					let temp = state.employerReducer.jobToUpdate;
					dispatch(jobToUpdateArray({ ...temp, questions: [newQuestion, ...oldQuestions] }));
				}
				dispatch(setNewJob({ jobQuestionnaireMap: state.employerReducer.questionBank.questions }));
			}

		}
		dispatch(apiCallError());
		if (!data) return false;
		if (type === 'public') {
			dispatch(showToast({
				message: "This question has been submitted for review. When approved it will be added to the Public Library. Until then it is available immediately for your use. Please navigate to the Private Library to select this question and add it to your job post.",
				type: "success",
				isShow: true
			}));
		} else {
			dispatch(showToast({
				message: data.data.message,
				type: "success",
				isShow: true
			}));
		}
		dispatch(getQuestionBank());
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getAppliedCandidateDetails = (candidateID, jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const data = await Axios.get(employerFetchCandidatesByJobId + "/" + jobID + '/' + candidateID, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(setAppliedCandidateDetails(data.data));
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getLocations = () => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.get(employeFecthOrgLocations, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setLocations(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getJobDetails = (jobID) => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		const state = getState();
		const jwt = Cookies.get("JWT");
		let user = "employer";
		if (jwt) {
			user = JSON.parse(jwt).map.user_type;
		}
		let URL = employeFecthJobPreviewDetails + '/' + jobID;
		let headers = {};
		if ((jwt && user === 'candidate') || (state.employerReducer.isLoggedIn)) {
			dispatch(setLogin(true));
			URL = candidateFetchJobsAppliedUrl + '/' + jobID;
			headers = {
				'Authorization': JSON.parse(jwt).map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		}
		const data = await Axios.get(URL, {
			headers: headers
		});
		if (!data) return false;
		if (user === 'candidate') {
			dispatch(setJobDetails(data.data));
		} else {
			dispatch(setJobDetails(data.data));
		}
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		console.log(err);
		if (err.response) console.error(`failed to fetch job details ${err}`);
	}
};

export const deleteQuestion = (id) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		let URL = employerDeleteQuestionFromJobUrl + '/' + id;
		const data = await Axios.delete(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: data.data.data,
			type: "success",
			isShow: true
		}));
		dispatch(apiCallError());
		let temp = state.employerReducer.questionBank.questions.filter((val) => {
			return val.question_id != id;
		});
		dispatch(setQuestionBankQuestion(temp));
		dispatch(setNewJob({ jobQuestionnaireMap: temp }));
		// if (!data) return false;
		dispatch(getQuestionBank());
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			// message: "Failed to delete question.",
			message: err.response && err.response.data && err.response.data.data ? err.response.data.data : "Failed to delete question.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};


export const uploadProfileImage = (image) => async (dispatch, getState) => {
	try {
		const data = await Axios.patch(employerUpdateCompanyLogoUrl, image, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'multipart/form-data'
			}
		});
		dispatch(showToast({
			message: "Profile picture updated succesfully ",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating Profile picture. ",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const profileDownload = (type) => async (dispatch, getState) => {
	try {
		const state = getState();
		let url = '';
		if (type === "candidate") {
			url = profileCandidateDownloadUrl;
		} else {
			url = profileDownloadUrl;
		}
		const data = await Axios.get(url, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmployerResumePath(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getDashboard = (id, previousDate, currentDate) => async (dispatch, getState) => {
	try {
		let url = `${dashboardUrl}/${id}/${previousDate}/${currentDate}`;
		dispatch(beginApiCall());
		const data = await Axios.get(url, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(setEmployerDashboardData(data.data));
	} catch (err) {
		dispatch(setEmployerDashboardData({ data: undefined }));
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};


export const getDashboardMetrics = (type) => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		const data = await Axios.get(dashboardMetricsUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(setEmployerDashboardMetrics(data.data));
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const suspendJob = (jobId) => async (dispatch, getState) => {
	try {
		dispatch(beginApiCall());
		let url = `${suspendJobUrl}/${jobId}/true`
		const data = await Axios.put(url, {}, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(getPostedJobs());
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

// //setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);