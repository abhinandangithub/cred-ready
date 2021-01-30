import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    togglePopup,
    toggleOverlay,
} from "../../../store/actions/popup_overlay";
import "./index.scss";

function UnsavedChanges(props) {
    console.log('cr abhi ', props.info);
    const dispatch = useDispatch();
    const obj = useSelector(
        (state) =>
            state.popupOverlayReducer &&
            state.popupOverlayReducer.popup &&
            state.popupOverlayReducer.popup.info
    );

    const { popup } = useSelector((state) => state.popupOverlayReducer);

    const closePopupOverlay = () => {
        dispatch(toggleOverlay(false));
        dispatch(togglePopup(false, ""));
    };

    const handleLeave = () => {
        dispatch(toggleOverlay(false));
        dispatch(togglePopup(false, ""));
        console.log('baby props.info ', props.info);
        if (props.info.path === "/jobs/create-job") {
            props.history.push('/jobs');
        } else {
            props.info.cb((e) => {
                console.log('cr abhi e ', e);
            })
        }
    };

    const cta = (
        <div className="cta">
            <button className="primary-btn blue" onClick={closePopupOverlay}>
                Cancel
			</button>
            <button className="primary-btn blue outline" onClick={handleLeave}>
                Leave
			</button>
        </div>
    );

    const renderOutput = () => {
        return (
            <>
                <h1>You have Unsaved Changes</h1>
                <div className="content">
                    <div className="highlight">
                        {/* <h2>Are you sure?</h2> */}
                        <p>
                            You have unsaved changes on this page.
                            Do you want to leave this page and discard your changes or stay on this page
                        </p>
                    </div>
                    {cta}
                </div>
            </>
        );
    };

    return <div className="delete-popup">{renderOutput()}</div>;
}

export default withRouter(UnsavedChanges);
