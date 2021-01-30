import * as types from "./types.js";

export const candidateSetData = (data) => ({
    type: types.CANDIDATE_PROFILE_SET_DATA,
    data,
});

export const candidateSetCurrentStatus = (data) => ({
    type: types.CANDIDATE_CURRENT_STATUS,
    data,
})

export const setAppliedJobsData = (data) => ({
    type: types.SET_CANDIDATE__APPLIED_JOBS,
    data,
})

export const setCandidateExperienceType = (data) => ({
    type: types.SET_CANDIDATE_EXPERIENCE_TYPE,
    data,
})

export const setCandidateDegreeTitles = (data) => ({
    type: types.SET_CANDIDATE_DEGREE_TITLES,
    data,
})

export const setCandidateInstitutionType = (data) => ({
    type: types.SET_CANDIDATE_INSTITUTION_TYPE,
    data,
})

export const candidateSetAllAnswers = (data) => ({
    type: types.SET_CANDIDATE_ALL_ANSWERS,
    data,
})

export const candidateSetJobViewData = (data) => ({
    type: types.SET_CANDIDATE_JOB_VIEW_DATA,
    data,
})

export const setCandidateJobs = (data) => ({
    type: types.SET_CANDIDATE_JOBS,
    data,
})

export const setCandidateCertificateData = (data) => ({
    type: types.SET_CANDIDATE_CERTIFICATE_TITLES,
    data,
})

export const setAllIndustries = (data) => ({
    type: types.SET_ALL_INDUSTRIES,
    data,
})

export const setAllFunctions = (data) => ({
    type: types.SET_ALL_FUNCTIONS,
    data,
})

export const setJobDescription = (data) => ({
    type: types.SET_JOB_DESCRIPTION,
    data,
})

export const setAllMajorMinor = (data) => ({
    type: types.SET_ALL_MAJOR_MINOR,
    data,
})

export const setDataFlag = (data) => ({
    type: types.SET_DATA_FLAG,
    data,
})

export const setCurrentGoals = (data) => ({
    type: types.SET_CURRENT_GOALS,
    data,
})

export const candidateSetHealthCareGoals = (data) => ({
    type: types.SET_CANDIDATE_HEALTH_CARE_GOALS,
    data,
})

export const candidateSetAlternativeGoals = (data) => ({
    type: types.SET_CANDIDATE_ALTERNATIVE_GOALS,
    data,
})

export const candidateSetGoalsById = (data) => ({
    type: types.SET_CANDIDATE_GOALS_BY_ID,
    data,
})