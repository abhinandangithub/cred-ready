import * as types from "./types";

export const initialState = {
	data: {
		candidate_id: "",
		username: "",
		first_name: "",
		last_name: "",
		current_employment_status: "",
		available_within: "",
		address_id: "",
		address: {
			id: "",
			street_address: "",
			city: "",
			state: "",
			zip_code: "",
		},
		role_id: "",
		role: {
			role_id: "",
			role_name: "",
			is_active: "",
			privileges: [
				{
					privilege_id: "",
					role_id: "",
				},
				{
					privilege_id: "",
					role_id: "",
				},
			],
		},
		contacts: [
			{
				id: "",
				contact_type: "email",
				contact: "",
				is_verified: "",
			},
			{
				id: "",
				contact_type: "phone",
				contact: "",
				is_verified: "",
			},
		],
		education_experience: [],
		additional_experiences: [],
		work_experience: [],
		certificate: [],
		created_by: "",
		created_on: "",
		modified_by: "",
		modified_on: "",
	},
};

export const candidateCurrentStatusInitial = {
	data: [],
};

export const setCandidateAppliedJobsDataInitial = {
	data: [],
};

export const setCandidateExperienceTypeInitial = {
	data: [],
};

export const setCandidateDegreeTitlesInitial = {
	data: [],
};

export const setCandidateInstitutionTypeInitial = {
	data: [],
};

export const setCandidateAllAnswersInitial = {
	data: [],
};

export const setCandidateJobViewDataInitial = {
	data: [],
};

export const setCandidateJobsInitial = {
	data: [],
};

export const setCandidateJobTitlesInitial = {
	data: [],
};

export const setAllFunctionsInitial = {
	data: [],
};

export const setAllIndustriesInitial = {
	data: [],
};

export const setJobDescriptionInitial = {
	data: [],

}

export const setAllMajorMinorInitial = {
	data: [],
}

export const setDataFlagReducerInitial = {
	data: false,
}

export const setCurrentGoalsInitial = {
	data: [],
}

export const candidateSetHealthCareGoalsInitial = {
	data: [],
}
export const candidateSetAlternativeGoalsInitial = {
	data: [],
}
export const candidateSetGoalsByIdInitial = {
	data: [],
}

export function candidateSetDataReducer(state = initialState, action) {
	switch (action.type) {
		case types.CANDIDATE_PROFILE_SET_DATA: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function candidateCurrentStatusReducer(
	state = candidateCurrentStatusInitial,
	action
) {
	switch (action.type) {
		case types.CANDIDATE_CURRENT_STATUS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateAppliedJobsDataReducer(
	state = setCandidateAppliedJobsDataInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE__APPLIED_JOBS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateExperienceTypeReducer(
	state = setCandidateExperienceTypeInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_EXPERIENCE_TYPE: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateDegreeTitlesReducer(
	state = setCandidateDegreeTitlesInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_DEGREE_TITLES: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateInstitutionTypeReducer(
	state = setCandidateInstitutionTypeInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_INSTITUTION_TYPE: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateAllAnswersReducer(
	state = setCandidateAllAnswersInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_ALL_ANSWERS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateJobViewDataReducer(
	state = setCandidateJobViewDataInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_JOB_VIEW_DATA: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}
export function setCandidateJobsReducer(
	state = setCandidateJobsInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_JOBS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCandidateCertificateTitlesReducer(
	state = setCandidateJobTitlesInitial,
	action
) {
	switch (action.type) {
		case types.SET_CANDIDATE_CERTIFICATE_TITLES: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setAllIndustriesReducer(
	state = setAllIndustriesInitial,
	action
) {
	switch (action.type) {
		case types.SET_ALL_INDUSTRIES: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setAllFunctionsReducer(state = setAllFunctionsInitial, action) {
	switch (action.type) {
		case types.SET_ALL_FUNCTIONS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setJobDescriptionReducer(state = setJobDescriptionInitial, action) {
	switch (action.type) {
		case types.SET_JOB_DESCRIPTION: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setAllMajorMinorReducer(state = setAllMajorMinorInitial, action) {
	switch (action.type) {
		case types.SET_ALL_MAJOR_MINOR: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function flagReducer(state = setDataFlagReducerInitial, action) {
	switch (action.type) {
		case types.SET_DATA_FLAG: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function setCurrentGoalsReducer(state = setCurrentGoalsInitial, action) {
	switch (action.type) {
		case types.SET_CURRENT_GOALS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function candidateSetHealthCareGoalsReducer(state = candidateSetHealthCareGoalsInitial, action) {
	switch (action.type) {
		case types.SET_CANDIDATE_HEALTH_CARE_GOALS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function candidateSetAlternativeGoalsReducer(state = candidateSetAlternativeGoalsInitial, action) {
	switch (action.type) {
		case types.SET_CANDIDATE_ALTERNATIVE_GOALS: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}

export function candidateSetGoalsByIdReducer(state = candidateSetGoalsByIdInitial, action) {
	switch (action.type) {
		case types.SET_CANDIDATE_GOALS_BY_ID: {
			const { data } = action;
			state = { ...state, data };
		}
		default:
			return state;
	}
}