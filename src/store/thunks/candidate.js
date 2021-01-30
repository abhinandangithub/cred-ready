import Axios from "axios";
import { candidateFetchJobsAppliedUrl, candidateUpdateProfileUrl, candidateJobApplicationUrl } from "../api/candidate";
import {
  setCandidateJobApplications,
  setCandidateJobDetails
} from "../actions/candidate";
import { requestConfig } from "./utils";
import {
  beginApiCall, apiCallError
} from "../../store/actions/common.js";

export const candidateGetAppliedJobs = () => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      candidateFetchJobsAppliedUrl,
      requestConfig
    );
    if (!data) return;
  } catch (err) { }
};

export const getCandidateJobDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(beginApiCall());
    const state = getState();
    const URL = candidateFetchJobsAppliedUrl + '/' + id;
    const data = await Axios.get(URL, {
      headers: {
        'Authorization': getState().authReducer.JWT.map.jwt,
        'Content-Type': 'application/vnd.credready.com+json'
      }
    });
    if (!data) return false;
    dispatch(setCandidateJobDetails(data.data));
    dispatch(apiCallError());
  } catch (err) {
    if (err.response) console.error(`failed to get candidate job details ${err}`);
    dispatch(apiCallError());
  }
};

export const getCandidateJobApplications = () => async (dispatch, getState) => {
  try {
    dispatch(beginApiCall());
    const state = getState();
    const data = await Axios.get(candidateJobApplicationUrl, {
      headers: {
        'Authorization': getState().authReducer.JWT.map.jwt,
        'Content-Type': 'application/vnd.credready.com+json'
      }
    });
    if (!data) return false;
    dispatch(setCandidateJobApplications(data.data));
    dispatch(apiCallError());

  } catch (err) {
    dispatch(apiCallError());

    if (err.response) console.error(`failed to get candidate job applications ${err}`);
  }
};

