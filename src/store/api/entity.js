import { constructUrl, BaseUrl } from "./base";

const entityControllerRoute = "entity";

const entityRouteWithBase = constructUrl(BaseUrl, entityControllerRoute);

/**
 * Name: Fetch all employement status, Fetch all employement status by Id
 */
export const entityFetchEmployementSatusUrl = constructUrl(
  entityRouteWithBase,
  "employment_types"
);

/**
 * Name: Fetch experience type
 */
export const enitityFetchExperienceTypeUrl = constructUrl(
  entityRouteWithBase,
  "experience_type"
);

/**
 * Name: Fetch all function, Fetch function by an id
 */
export const entityFetchEntitityFunctionUrl = constructUrl(
  entityRouteWithBase,
  "function"
);

/**
 * Name: Fetch all industries, fetch industry by id
 */
export const entityFetchEntityIndustryUrl = constructUrl(
  entityRouteWithBase,
  "industry"
);

/**
 * Name: Fetch all organizations, fetch organization by id
 */
export const entityFetchEntityOrganizationUrl = constructUrl(
  entityRouteWithBase,
  "organization"
);

/**
 * Name: fetch skills by an id, fetch skills
 */
export const entityFetchSkillByIdUrl = constructUrl(
  entityRouteWithBase,
  "skill"
);

/**
 * Name: fetch skills by id, fetch skills
 */
export const entityFetchSkillsUrl = constructUrl(entityRouteWithBase, "skills");

/**
 * Name: fetch how long to start the employee
 */
export const enityFetchStartDateUrl = constructUrl(
  entityRouteWithBase,
  "start_date"
);

/**
 * Name: fetch geography
 */
export const geographyUrl = constructUrl(
  entityRouteWithBase,
  "geography"
);
