import * as actionTypes from "../actions/actionTypes/employer";
import { updateObject } from "../utility";

const initialState = {
	hiringNeeds: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	companySize: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	geography: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	phoneNumber: "",
	email: "",
	profile: {
		"message": "Success",
		"data": {
			"employerId": 2,
			"username": "",
			"name": "",
			"title": "",
			"role_id": 0,
			"org_id": 0,
			"org": {
				"orgId": 0,
				"org_name": "",
				"naics_code": "",
				"hires_required": undefined,
				"company_size": undefined,
				"reference_source": "",
				"website": "",
				"address": []
			},
			"contacts": [
				{
					"id": 0,
					"contact_type": "email",
					"contact": "",
					"is_verified": true
				},
				{
					"id": 10,
					"contact_type": "phone",
					"contact": "",
					"is_verified": true
				}
			],
			"role": {
				"role_id": 1,
				"role_name": "employer",
				"is_active": true,
				"privileges": [
					{
						"privilege_id": 2,
						"role_id": 2
					}
				]
			},
			"created_by": "Jane Doe",
			"created_on": "Oct 1, 2020, 1:27:37 AM",
			"modified_by": "Jane Doe",
			"modified_on": "Oct 1, 2020, 1:27:37 AM"
		},
		"status": "OK"
	},
	postedJobs: {
		"message": "Question added successfully",
		"data": [{}],
		"status": "OK"
	},
	candidatesList: {
		"message": "Candidate fetched successfully",
		"data": [
			// {
			// 	"job_app_id": 1,
			// 	"candidate_id": 1,
			// 	"job_id": 1,
			// 	"email_template_id": 3,
			// 	"candidate_name": "Mike Rogers",
			// 	"title": "Certified Nursing Assistant",
			// 	"candidate_experience": "2.0 year(s)",
			// 	"current_organization": "ABC Staffing",
			// 	"status": "Emailed",
			// 	"readiness_index": 82,
			// 	"modified_by": "Jane Feldner",
			// 	"modified_on": "Oct 7, 2020, 4:54:54 PM"
			// },
			// {
			// 	"job_app_id": 2,
			// 	"candidate_id": 3,
			// 	"job_id": 1,
			// 	"email_template_id": 3,
			// 	"candidate_name": "Peter Gray",
			// 	"title": "Developer",
			// 	"candidate_experience": "3.0 year(s)",
			// 	"current_organization": "ABC Staffing",
			// 	"status": "Applied",
			// 	"readiness_index": 20,
			// 	"modified_by": "admin",
			// 	"modified_on": "Oct 6, 2020, 6:02:26 PM"
			// }
		],
		"status": "OK"
	},
	employmentType: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	industry: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	functionType: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	orgType: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	skills: {
		"message": null,
		"data": [],
		"error": null,
		"status": "OK"
	},
	questionBank: {
		questions: [],
		"message": "Question bank fetched successfully",
		"data": {
			"private_question_bank": [
				{
					"question_id": 1,
					"question_name": "What are your hobbies?",
					"category": "Employer Questions",
					"question_type": "text-input",
					"is_public": false,
					"job_title": "CNA",
					"org_id": 1,
					"option_choices": [],
					"created_by": "admin",
					"created_on": "Oct 6, 2020, 5:55:33 PM",
					"modified_by": "admin",
					"modified_on": "Oct 6, 2020, 5:55:33 PM"
				},
				{
					"question_id": 2,
					"question_name": "Are you okay with night shift?",
					"category": "Employer Questions",
					"question_type": "mcq",
					"is_public": false,
					"job_title": "CNA",
					"org_id": 1,
					"option_choices": [
						{
							"id": 2,
							"question_id": 2,
							"option_choice_name": "No",
							"question_type": "boolean",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 2,
							"question_id": 2,
							"option_choice_name": "No",
							"question_type": "boolean",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						}
					],
					"created_by": "admin",
					"created_on": "Oct 6, 2020, 5:55:33 PM",
					"modified_by": "admin",
					"modified_on": "Oct 6, 2020, 5:55:33 PM"
				}
			],
			"public_question_bank": [
				{
					"question_id": 3,
					"question_name": "What are you preferred timings?",
					"category": "Employer Questions",
					"question_type": "mcq",
					"is_public": true,
					"job_title": "CNA",
					"option_choices": [
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						}
					],
					"created_by": "admin",
					"created_on": "Oct 6, 2020, 5:55:33 PM",
					"modified_by": "admin",
					"modified_on": "Oct 6, 2020, 5:55:33 PM"
				}
			]
		},
		"status": "OK"
	},
	emailTemplateNames: [],
	hiringKeys: [],
	companySizeKeys: [],
	geographyKeys: [],
	employmentKeys: [],
	functionKeys: [{
		id: 0,
		function_name: "Test"
	}],
	industryKeys: [{
		id: 0,
		industry_name: "Test"
	}],
	isLoggedIn: false,
	emailTemplate: [],
	jobURL: "",
	newJob: {
		// "emailTemplateId": null,
		"employmentType": null,
		"function": 1126,
		// "industry": null,
		"jobDescription": "",
		"jobQuestionnaireMap": [],
		"jobCertificateMap": [16859],
		"jobTitle": "",
		"location": null,
		"maxExp": 4,
		"minExp": 3,
		"openPositions": null
	},
	postJobValidation: false,
	appliedCandidateDetails: {},
	locations: {
		data: [
			{
				"id": 0,
				"street_address": "",
				"city": "",
				"state": "",
				"zip_code": 0
			}
		]
	},
	locationNames: [],
	jobDetails: {
		"data": {
			"job_id": 1,
			"location": "",
			"job_title": "",
			"job_description": "<p></p>",
			"min_experience": 2,
			"max_experience": 0,
			"org_name": ""
		},
		"status": "OK"
	},
	jobToUpdate: {

	},
	dashboard: undefined,
	dashboardMetrics: undefined,
	redirectURL: undefined,
	employerProfilePath: "",
	JWT: null,
};

let stateCopy = JSON.parse(JSON.stringify(initialState));

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_HIRING_NEEDS:
			return updateObject(state, {
				isVerified: {
					termsAndConditions: action.value,
					emailOtp: state.isVerified.emailOtp,
					phoneOtp: state.isVerified.phoneOtp,
				},
			});

		case actionTypes.SET_HIRING_NEEDS:
			const hiringNeedsTemp = state.hiringNeeds;
			hiringNeedsTemp.message = action.value.message;
			hiringNeedsTemp.error = action.value.error;
			hiringNeedsTemp.status = action.value.status;
			hiringNeedsTemp.data = action.value.data.map((value) => value.range_display_value);
			return updateObject(state, {
				hiringNeeds: hiringNeedsTemp,
				hiringKeys: action.value.data
			});

		case actionTypes.SET_COMPANY_SIZE:
			const companySizeTemp = state.companySize;
			companySizeTemp.message = action.value.message;
			companySizeTemp.error = action.value.error;
			companySizeTemp.status = action.value.status;
			companySizeTemp.data = action.value.data.map((value) => value.range_display_value);
			return updateObject(state, {
				companySize: companySizeTemp,
				companySizeKeys: action.value.data
			});

		case actionTypes.SET_GEOGRAPHY:
			const geographyTemp = state.geography;
			geographyTemp.message = action.value.message;
			geographyTemp.error = action.value.error;
			geographyTemp.status = action.value.status;
			geographyTemp.data = action.value.data.map((value) => value.city);
			return updateObject(state, {
				geography: geographyTemp,
				geographyKeys: action.value.data
			});

		case actionTypes.SET_PHONE_NUMBER:
			return updateObject(state, {
				phoneNumber: action.value
			});

		case actionTypes.SET_EMAIL:
			return updateObject(state, {
				email: action.value
			});

		case actionTypes.SET_EMPLOYER_PROFILE:
			action.value.data.org.address.sort((a, b) => b.id - a.id);
			return updateObject(state, {
				profile: action.value
			});

		case actionTypes.SET_CANDIDATES_LIST:
			return updateObject(state, {
				candidatesList: action.value
			});

		case actionTypes.SET_EMPLOYER_POSTED_JOBS:
			return updateObject(state, {
				postedJobs: action.value
			});

		case actionTypes.JOB_TO_UPDATE:
			const jobs = state.postedJobs.data;
			let temp = jobs.find((j) => j.job_id == action.value);
			return updateObject(state, {
				jobToUpdate: temp
			});

		case actionTypes.JOB_TO_UPDATE_ARRAY:
			return updateObject(state, {
				jobToUpdate: action.value
			});

		case actionTypes.SET_EMPLOYMENT_TYPE:
			const employemntTemp = state.employmentType;
			employemntTemp.message = action.value.message;
			employemntTemp.error = action.value.error;
			employemntTemp.status = action.value.status;
			employemntTemp.data = action.value.data.map((value) => value.employment_status);
			return updateObject(state, {
				employmentType: employemntTemp,
				employmentKeys: action.value.data
			});

		case actionTypes.SET_INDUSTRY:
			const indistryTemp = state.industry;
			indistryTemp.message = action.value.message;
			indistryTemp.error = action.value.error;
			indistryTemp.status = action.value.status;
			indistryTemp.data = action.value.data.map((value) => value.industry_name);
			return updateObject(state, {
				industry: indistryTemp,
				industryKeys: action.value.data
			});

		case actionTypes.SET_FUNCTION:
			const functionTemp = state.functionType;
			functionTemp.message = action.value.message;
			functionTemp.error = action.value.error;
			functionTemp.status = action.value.status;
			functionTemp.data = action.value.data.map((value) => value.function_name);
			return updateObject(state, {
				functionType: functionTemp,
				functionKeys: action.value.data
			});

		case actionTypes.SET_ORG_NAMES:
			const functionTemp1 = state.orgType;
			functionTemp1.message = action.value.message;
			functionTemp1.error = action.value.error;
			functionTemp1.status = action.value.status;
			functionTemp1.data = action.value.data.map((value) => value.org_name);
			return updateObject(state, {
				orgType: functionTemp1,
				orgKeys: action.value.data
			});

		case actionTypes.SET_SKILLS:
			return updateObject(state, {
				skills: action.value
			});

		case actionTypes.EMPLOYER_DASHBOARD_METRICS:
			return updateObject(state, {
				dashboardMetrics: action.value.data
			});

		case actionTypes.EMPLOYER_DASHBOARD:
			return updateObject(state, {
				dashboard: action.value.data
			});

		case actionTypes.SET_QUESTION_BANK:
			const questionsTemp = state.questionBank;
			questionsTemp.message = action.value.message;
			questionsTemp.status = action.value.status;
			questionsTemp.data = action.value.data;
			questionsTemp.questions = state.questionBank.questions;
			// questionsTemp.questions.push(...action.value.data.private_question_bank);
			// questionsTemp.questions.push(...action.value.data.public_question_bank);
			return updateObject(state, {
				questionBank: questionsTemp
			});

		case actionTypes.SET_QUESTION_BANK_QUESTIONS:
			const questionsTemp1 = state.questionBank;
			// questionsTemp1.questions.push(...action.value);
			questionsTemp1.questions = action.value;
			return updateObject(state, {
				questionBank: questionsTemp1
			});

		case actionTypes.CLEAR_SELECTED_JOBS:
			const questionsTemp2 = state.questionBank;
			// questionsTemp1.questions.push(...action.value);
			questionsTemp2.questions = [];
			return updateObject(state, {
				questionBank: questionsTemp2
			});

		case actionTypes.SET_EMAIL_TEMPLATE:
			let emailTemplateNamesTemp = state.emailTemplateNames;
			emailTemplateNamesTemp = action.value.data.private_email_template.map((value) => value.template_name);
			action.value.data.public_email_template.map((value) => emailTemplateNamesTemp.push(value.template_name));
			let emailTemplates = [...action.value.data.private_email_template, ...action.value.data.public_email_template];
			return updateObject(state, {
				emailTemplate: emailTemplates,
				emailTemplateNames: emailTemplateNamesTemp
			});

		case actionTypes.SET_JOB_URL:
			return updateObject(state, {
				jobURL: action.value
			});

		case actionTypes.SET_APPLIED_CANDIDATE:
			return updateObject(state, {
				appliedCandidateDetails: action.value
			});

		case actionTypes.SET_LOCATIONS:
			let locationTemp = state.locationNames;
			locationTemp = action.value.data.map((value) => value.street_address + ", " + value.city + ", " + value.state + ", " + value.zip_code);
			return updateObject(state, {
				locations: action.value,
				locationNames: locationTemp
			});

		case actionTypes.SET_NEW_JOB:
			const newJobTemp = state.newJob;
			// if (action.value.emailTemplateId !== undefined) {
			// 	newJobTemp.emailTemplateId = action.value.emailTemplateId;
			// }
			if (action.value.employmentType !== undefined) {
				newJobTemp.employmentType = action.value.employmentType;
				// newJobTemp.employmentType = state.employmentKeys.find(x => x.employment_status === action.value.employmentType).id;
			}
			if (action.value.function !== undefined) {
				newJobTemp.function = action.value.function;
				// newJobTemp.function = state.functionKeys.find(x => x.function_name === action.value.function).id;
			}
			// if (action.value.industry !== undefined) {
			// 	newJobTemp.industry = action.value.industry;
			// }
			if (action.value.jobDescription !== undefined) {
				newJobTemp.jobDescription = action.value.jobDescription;
			}
			if (action.value.jobTitle !== undefined) {
				newJobTemp.jobTitle = action.value.jobTitle;
			}
			if (action.value.location !== undefined) {
				newJobTemp.location = action.value.location;
				// newJobTemp.location = state.locations.data.find(x => x.street_address + ", " + x.city + ", " + x.state + ", " + x.zip_code === action.value.location).id;
			}
			if (action.value.openPositions !== undefined) {
				newJobTemp.openPositions = action.value.openPositions;
			}
			if (action.value.minExp !== undefined) {
				newJobTemp.minExp = action.value.minExp;
			}
			if (action.value.maxExp !== undefined) {
				newJobTemp.maxExp = action.value.maxExp;
			}
			if (action.value.jobQuestionnaireMap !== undefined) {
				newJobTemp.jobQuestionnaireMap = action.value.jobQuestionnaireMap.map((val) => val.question_id);
			}
			if (action.value.jobCertificateMap !== undefined) {
				newJobTemp.jobCertificateMap = action.value.jobCertificateMap.map((val) => val.id);
			}

			return updateObject(state, {
				newJob: newJobTemp
			});

		// return updateObject(state, {
		// 	isVerified: {
		// 		termsAndConditions: action.value,
		// 		emailOtp: state.isVerified.emailOtp,
		// 		phoneOtp: state.isVerified.phoneOtp,
		// 	},
		// });

		case actionTypes.SET_JOB_DETAILS:
			// const jobDetailsTemp = state.jobDetails;
			const jobDetailsTemp = {
				"data": {
					"job_id": 1,
					"location": "",
					"job_title": "NO JOB POSTED WITH THIS ID",
					"job_description": "",
					"min_experience": "",
					"max_experience": "",
					"org_name": "",
					"certificates": [],
				}
			};
			if (action.value.data !== undefined) {
				if (action.value.data.job_id !== undefined) {
					jobDetailsTemp.data.job_id = action.value.data.job_id;
				}
				if (action.value.data.address.city !== undefined) {
					jobDetailsTemp.data.location = action.value.data.address.city;
				}
				if (action.value.data.organization.org_name !== undefined) {
					jobDetailsTemp.data.org_name = action.value.data.organization.org_name;
				}
				if (action.value.data.job_title !== undefined) {
					jobDetailsTemp.data.job_title = action.value.data.job_title;
				}
				if (action.value.data.job_description !== undefined) {
					jobDetailsTemp.data.job_description = action.value.data.job_description;
				}
				if (action.value.data.min_experience !== undefined) {
					jobDetailsTemp.data.min_experience = action.value.data.min_experience;
				}
				if (action.value.data.max_experience !== undefined) {
					jobDetailsTemp.data.max_experience = action.value.data.max_experience;
				}
				if (action.value.data.certificates !== undefined) {
					jobDetailsTemp.data.certificates = action.value.data.certificates;
				}
				if (action.value.data.organization.logo_path !== undefined) {
					jobDetailsTemp.data.logo_path = action.value.data.organization.logo_path;
				}
			} else {
				if (action.value.jobId !== undefined) {
					jobDetailsTemp.data.job_id = action.value.jobId;
				}
				if (action.value.location !== undefined) {
					jobDetailsTemp.data.location = action.value.location;
				}
				if (action.value.orgName !== undefined) {
					jobDetailsTemp.data.org_name = action.value.orgName;
				}
				if (action.value.jobTitle !== undefined) {
					jobDetailsTemp.data.job_title = action.value.jobTitle;
				}
				if (action.value.jobDescription !== undefined) {
					jobDetailsTemp.data.job_description = action.value.jobDescription;
				}
				if (action.value.minExp !== undefined) {
					jobDetailsTemp.data.min_experience = action.value.minExp;
				}
				if (action.value.maxExp !== undefined) {
					jobDetailsTemp.data.max_experience = action.value.maxExp;
				}
				if (action.value.certificates !== undefined) {
					jobDetailsTemp.data.certificates = action.value.certificates;
				}
				if (action.value.logo_path !== undefined) {
					jobDetailsTemp.data.logo_path = action.value.logo_path;
				}
			}
			return updateObject(state, {
				jobDetails: jobDetailsTemp
			});

		case actionTypes.SET_LOGIN:
			return updateObject(state, {
				isLoggedIn: action.value
			});

		case actionTypes.SET_REDIRECT_URL:
			return updateObject(state, {
				redirectURL: action.value
			});

		case actionTypes.EMPLOYER_RESUME_PATH:
			return updateObject(state, {
				employerProfilePath: action.value
			});

		case actionTypes.CLEAR_EMPLOYER_STATE:
			return stateCopy;

		default:
			return state;
	}
};

export default reducer;