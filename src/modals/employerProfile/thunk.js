import axios from "axios";
import { employerSetData } from './actions';

import {
    getInustries
} from "./api";

export const getIndustries = () => async (dispatch, getState) => {
    let token = getState().authReducer.JWT;
    try {
        const response = await axios.get(getInustries, {
            // headers: {
            //     Authorization: token
            // }
        });
        dispatch(employerSetData(response))

        // new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(['test']);
        //         dispatch(employerSetData(['test']))
        //     }, 100);
        // })

    } catch (err) {
        console.log(err);
    }
}