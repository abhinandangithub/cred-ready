import { constructUrl, BaseUrl } from "./base";

const employerRoute = "employer";

/**
 * URL with base and candidate route
 */
const employerRouteWithBase = constructUrl(BaseUrl, employerRoute);

/**
 * Name: fetch all compnay size range
 */
export const employerFetchComapnySizeUrl = constructUrl(
  employerRouteWithBase,
  "company_size_range"
);

/**
 * Name: fetch company size range by an id
 */
export const employerFetchHireRangesUrl = constructUrl(
  employerRouteWithBase,
  "hire_require_range"
);

/**
 * Name: Update user email
 */
export const employerUpdateEmailUrl = constructUrl(
  employerRouteWithBase,
  "email"
);

/**
 * Name: fetch job by id
 */
export const employeFecthJobByIdUrl = constructUrl(
  employerRouteWithBase,
  "fetch/job"
);

/**
 * Name: fetch question bank
 */
export const employeFetchQuestionbankUrl = constructUrl(
  employerRouteWithBase,
  "fetch/questionbank"
);

/**
 * Name: fetch email templates
 */
export const employeFetchTemplateEmailsUrl = constructUrl(
  employerRouteWithBase,
  "fetch/templates/email"
);

/**
 * Name: fetch all hire required ranges, fetch hires_required_range
 */
export const employeFetchHireRequiredRangesUrl = constructUrl(
  employerRouteWithBase,
  "hires_require_range"
);

/**
 * Name: Post a job
 */
export const employerPostJob = constructUrl(employerRouteWithBase, "job");


export const employerUpdateJob = constructUrl(employerRouteWithBase, "job/update");

/**
 * Name: fetch a job by id
 */
export const employerFetchJobById = constructUrl(
  employerRouteWithBase,
  "job/appliedcandidates/fetch"
);

/**
 * Name: fetch a job by id and other filters
 */
export const employerFetchJobByFilters = constructUrl(
  employerRouteWithBase,
  "dashboard/candidates"
);

/**
 * Name: send email to a candidate for a job
 *  */
export const employerSendCandidateEmailUrl = constructUrl(
  employerRouteWithBase,
  "job/appliedcandidates/semdmail"
);

/**
 * Name: update application status of a candidate
 */
export const employerUpdateApplicationStatusOfCandidateUrl = constructUrl(
  employerRouteWithBase,
  "job/candidate/status"
);

/**
 * Name: Delete a job
 */
export const employerDeleteJobUrl = constructUrl(
  employerRouteWithBase,
  "job/delete"
);

/**
 * Name: fetch a job by id
 * */
// Note: found apis with same purpose need to take clarification before using this
export const employerFetchJobByIdUrl = constructUrl(
  employerRouteWithBase,
  "job/fetch"
);

/**
 * Name: Fetch all posted jobs
 */
export const employerFetchAllPostedJobsUrl = constructUrl(
  employerRouteWithBase,
  "job/fetch/all"
);

/**
 * Name: Opt to get Email/sms to getnotification for job
 */
export const employerJobFollowUpUrl = constructUrl(
  employerRouteWithBase,
  "job/follow"
);

/**
 * Name: Update a job
 */
export const employerUpdateJobUrl = constructUrl(
  employerRouteWithBase,
  "job/update"
);

/**
 * Name; update company logo
 */
export const employerUpdateCompanyLogoUrl = constructUrl(
  employerRouteWithBase,
  "organization/logo/upload"
);

/**
 * Name: update user phone
 */
export const employerUpdateUserPhoneUrl = constructUrl(
  employerRouteWithBase,
  "phone"
);

/**
 * Name: update employer profile
 */
export const employerUpdateProfileUrl = constructUrl(
  employerRouteWithBase,
  "profile"
);

/**
 * Name: delete a question from a job
 */
export const employerDeleteQuestionFromJobUrl = constructUrl(
  employerRouteWithBase,
  "private/question"
);

/**
 * Name: delete all questions from a job
 */
export const employerDeleteQuestionsFromJobUrl = constructUrl(
  employerRouteWithBase,
  "question/delete/all"
);

/**
 * Name: update a question in a question bank
 */
export const employerUpdateJobQuestionUrl = constructUrl(
  employerRouteWithBase,
  "question/update"
);

/**
 * Name: add a question in the question bank
 */
// Note: api is duplicate, get verification before using
export const employerAddQuestionInQuestionBank = constructUrl(
  employerRouteWithBase,
  "question/update"
);

/**
 * Name: delete employer account
 */
export const employerDeleteAccountUrl = constructUrl(
  employerRouteWithBase,
  "account/delete"
);
/**
 * Name: delete employer account
 */
export const employerFetchCandidatesByJobId = constructUrl(
  employerRouteWithBase,
  "job/candidate/fetch"
);

/**
 * Name: get email template
 */
export const employeGetEmailTemplate = constructUrl(
  employerRouteWithBase,
  "fetch/templates/email"
);


/**
 * Name: add email template
 */
export const employeAddEmailTemplate = constructUrl(
  employerRouteWithBase,
  "templates/email"
);


/**
 * Name: update email template
 */
export const employeUpdateEmailTemplate = constructUrl(
  employerRouteWithBase,
  "templates/email"
);

/**
 * Name: get create question
 */
export const employeCreateQuestion = constructUrl(
  employerRouteWithBase,
  "question/create"
);
/**
 * Name: get create question
 */
export const employerUpdateQuestion = constructUrl(
  employerRouteWithBase,
  "question/update"
);
/**
 * Name: send mail to candidate
 */
export const employeCandidateSendEmail = constructUrl(
  employerRouteWithBase,
  "job/candidate/sendmail"
);
/**
 * Name: Fetch organization locations
 */
export const employeFecthOrgLocations = constructUrl(
  employerRouteWithBase,
  "organization/locations"
);
/**
 * Name: Fetch job preview details
 */
export const employeFecthJobPreviewDetails = constructUrl(
  employerRouteWithBase,
  "job/preview"
);


export const orgNameUrl = constructUrl(
  employerRouteWithBase,
  "organization"
);

export const profileDownloadUrl = constructUrl(
  employerRouteWithBase,
  "profile/download"
);

export const dashboardUrl = constructUrl(
  employerRouteWithBase,
  "dashboard"
);

export const dashboardMetricsUrl = constructUrl(
  employerRouteWithBase,
  "organization/jobs"
);

export const suspendJobUrl = constructUrl(
  employerRouteWithBase,
  "job/suspend"
);