import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { suspendJob } from "../../../../store/thunks/employer";

import "./index.scss";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";

function SuspendJobPost(props) {
	console.log("cr abhi ", props);
	const dispatch = useDispatch();

	const closePopupOverlay = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
	};

	return (
		<div className="suspend_job_post">
			<h1>Unpublish job post?</h1>
			<div className="content">
				<p>
					Your job post will no longer be visible to candidates on the CredReady platform you will not be able to view
					candidates or publish the post
				</p>
				<div className="cta">
					<button
						className="primary-btn blue outline"
						onClick={() => {
							dispatch(suspendJob(props.jobId));
							dispatch(toggleOverlay(false));
							dispatch(togglePopup(false, ""));
						}}
					>
						Yes, Unpublish
					</button>
					<button className="primary-btn blue " onClick={closePopupOverlay}>
						No, Go Back
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(SuspendJobPost);
