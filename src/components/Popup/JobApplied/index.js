import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import "./index.scss";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";

function JobApplied(props) {
	const dispatch = useDispatch();

	const handleClick = (link) => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false));
		props.history.push(link);
	};

	return (
		<div className="job-applied">
			<h1>Thank you !</h1>
			<div className="content">
				<p>
					Thanks for applying. <br />
					You will receive a confirmation email soon.
				</p>
				<div className="cta">
					<button
						className="primary-btn blue outline"
						onClick={() => handleClick("/jobs")}
					>
						View My Jobs
					</button>
					<button
						className="primary-btn blue"
						onClick={() => handleClick("/goals")}
					>
						View My Goals
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(JobApplied);
