import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import "./index.scss";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import { uploadCandidateResume } from "../../../modals/candidateProfile/thunk";

function PopulateInformation(props) {
	const dispatch = useDispatch();
	const resumeData = useSelector(state => state.popupOverlayReducer.popup.info)

	const closePopupOverlayNo = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
		let obj = new FormData();
		obj.append("resume", resumeData);
		obj.set("overwrite", false)
		dispatch(uploadCandidateResume(obj, props));
	};

	const closePopupOverlayYes = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
		let obj = new FormData();
		obj.append("resume", resumeData);
		obj.set("overwrite", true)
		dispatch(uploadCandidateResume(obj, props));
		// props.history.push("/profile/personal-details");
	}

	return (
		<div className="populate-information">
			<h1>Auto populate information?</h1>
			<div className="content">
				<p>
					Would you like us to auto populate your profile with all the updated
					information from your resume?
				</p>
				<div className="cta">
					<button
						className="primary-btn blue outline"
						onClick={closePopupOverlayNo}
					>
						No, I will do it myself
					</button>
					<button className="primary-btn blue" onClick={closePopupOverlayYes}>
						Yes, do it for me
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(PopulateInformation);
