import React from "react";

import "./index.scss";
import JobLinks from "../../../Employer/CreateJob/Tabs/JobLinks";

function ShareJobPost(props) {
	return (
		<div className="share_job_post">
			<JobLinks noHeading />
		</div>
	);
}

export default ShareJobPost;
