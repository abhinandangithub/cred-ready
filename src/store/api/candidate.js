import { constructUrl, BaseUrl } from "./base";

const candidateRoute = "candidate";

/**
 * URL with base and candidate route
 */
const candidateRouteWithBase = constructUrl(BaseUrl, candidateRoute);

/*
  PUT Url to update about details of candidate 
*/
//need to confirm this url candidate/candidate/email
export const candidateUpdateAboutMeUrl = constructUrl(
  candidateRouteWithBase,
  "candidate/aboutme"
);

/*
 *PUT Url to update email, Name update
 */
export const candiateUpdateEmail = constructUrl(
  candidateRouteWithBase,
  "candidate/email"
);

/**
 * Name: update user phone
 */
export const candidateUpdatePhoneUrl = constructUrl(
  candidateRouteWithBase,
  "candidate/phone"
);

/**
 * Name: save additional experience
 */
export const candidatePostAddExperiencUrl = constructUrl(
  candidateRouteWithBase,
  "additional_experience"
);

/**
 * Name: save canidate strengths
 */
export const candidateSPosttrengthsUrl = constructUrl(
  candidateRouteWithBase,
  "candidate_strengths"
);

/**
 * Name: fetch certificate title by id
 */
export const candidateFetchCertificateUrl = constructUrl(
  candidateRouteWithBase,
  "certificateTitle"
);

/**
 * fetch ceritifcation title by ID
 */
export const candidatePostcertificateDetailsUrl = constructUrl(
  candidateRouteWithBase,
  "certificate_details"
);

/**
 * Name: fetch all certificate titles
 */
export const candidateFetchAllCertificatesUrl = constructUrl(
  candidateRouteWithBase,
  "certificate_title"
);

/**
 * Name: fetch degree by id
 */
export const candidateFetchDegree = constructUrl(
  candidateRouteWithBase,
  "degree"
);

/**
 * Name: fetch all degrees
 */
export const candidateFetchAllDegrees = constructUrl(
  candidateRouteWithBase,
  "degrees"
);

/**
 * Name: save Education Experience
 */
export const candidatePostEducation = constructUrl(
  candidateRouteWithBase,
  "education_experience"
);

/**
 * Name: fetch all institute, fetch institute by id
 */
export const candidateFettAllInstitutesUrl = constructUrl(
  candidateRouteWithBase,
  "institute"
);

/**
 * Name: fetch all strengths, fetch strength by id
 */
export const candidateFetchStrengthsUrl = constructUrl(
  candidateRouteWithBase,
  "strength"
);

/**
 * Name: update candidate profile
 */
export const candidateUpdateProfileUrl = constructUrl(
  candidateRouteWithBase,
  "update_candidate_profile"
);

/**
 * Name: save candidate work experience
 */
export const candidatePostWorkExperienceUrl = constructUrl(
  candidateRouteWithBase,
  "work_experience"
);

/**
 * Name: fetch candidate applied jobs
 */
export const candidateFetchJobsAppliedUrl = constructUrl(
  candidateRouteWithBase,
  "jobs/applied"
);

/**
 * Name: Upload user picture
 */
export const candidateUpdatePictureUpload = constructUrl(
  candidateRouteWithBase,
  "profile/displaypicture/upload"
);

/**
 * Name: Upload user resume
 */
export const candidateUploadResumeUrl = constructUrl(
  candidateRouteWithBase,
  "profile/resume/upload"
);
/**
 * Name: Candidate job applications
 */
export const candidateJobApplicationUrl = constructUrl(
  candidateRouteWithBase,
  "jobs/dashboard/applications"
);

export const profileCandidateDownloadUrl = constructUrl(
  candidateRouteWithBase,
  "profile/download"
);