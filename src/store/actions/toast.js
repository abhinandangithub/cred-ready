import * as types from "./actionTypes/toast";

export function showToast(val) {
    return { type: types.SET_TOAST, value: val };
}
