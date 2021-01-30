import * as actionTypes from "../actions/actionTypes/toast";
import { updateObject } from "../utility";

const initialState = {
    toast: {
        message: "no message",
        type: "warning",
        isShow: false
    }
};

export default function reducer(
    state = initialState,
    action
) {
    if (action.type == actionTypes.SET_TOAST) {
        console.log('state ', state, action);
        return updateObject(state, {
            toast: {
                message: action.value.message,
                type: action.value.type,
                isShow: action.value.isShow
            }
        });
    }
    return state;
}
