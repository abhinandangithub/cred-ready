import * as actionTypes from "../actions/actionTypes/common";
import { updateObject } from "../utility";

const initialState = {
  apiCallsInProgress: 0
};

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function reducer(
  state = initialState,
  action
) {
  if (action.type == actionTypes.BEGIN_API_CALL) {
    console.log('state ', state);
    return updateObject(state, {
      apiCallsInProgress: state.apiCallsInProgress + 1
    });
  } else if (
    action.type === actionTypes.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return updateObject(state, {
      apiCallsInProgress: state.apiCallsInProgress - 1
    });
  }

  return state;
}
