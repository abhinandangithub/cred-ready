import React from "react";
import { useDispatch } from "react-redux";
import { togglePopup, toggleOverlay } from "../../../store/actions/popup_overlay";
import { withRouter } from "react-router-dom";

import "./index.scss";

function CancelJobPostCreation(props) {
	const dispatch = useDispatch();
	console.log("cr abhi ", props);
	const closePopupOverlay = () => {
		props.setShouldBlockNavigation(true);
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
	};

	return (
		<div className="delete-popup cancel_job_post_creation">
			<h1>Cancel Job post creation?</h1>
			<div className="content">
				<div className="highlight">
					<p>Your changes will not be saved. You will have to create the job post from scratch</p>
				</div>
				<div className="cta">
					<button className="primary-btn blue outline" onClick={closePopupOverlay}>
						No, Go Back
					</button>
					<button
						className="primary-btn blue"
						onClick={() => {
							closePopupOverlay();
							props.history.push("/jobs");
						}}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(CancelJobPostCreation);
