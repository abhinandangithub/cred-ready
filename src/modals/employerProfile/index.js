import * as types from "./types";

export const initialState = {
    employerData: {
        "industries": []
    }
};

export default function employerSetDataReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_INDUSTRIES:
            {
                console.log('reducer ', action);
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}
