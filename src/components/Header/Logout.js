import React, { useState, useEffect } from "react";
import { setLoggedOut } from "../../store/actions/auth";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";


function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('abhi logout');
        localStorage.clear();
        Cookies.remove("JWT");
        dispatch(setLoggedOut(true));
    }, []);
    return (
        <></>
    )
}

export default Logout;