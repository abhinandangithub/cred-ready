import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";
import { postJob } from "../../../../store/thunks/employer";
import qs from "qs";

function Tabs({ tabActive, onclick, handleNextClick, setShouldBlockNavigation, history, jobToUpdate }) {
	let { jobId } = useParams();
	const dispatch = useDispatch();
	let { isViewOnly } = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
	const [disableCtrl, setDisableCtrl] = useState(isViewOnly);

	useEffect(() => {
		if (jobToUpdate && jobToUpdate.count_of_applied_candidates && jobId) setDisableCtrl(true);
	}, [jobToUpdate]);

	const handleClick = () => {
		handleNextClick();
	};

	const handleViewJob = async () => {
		await setShouldBlockNavigation(false);
		history.push("/jobs");
	};

	return (
		<div className="tabs_outer">
			{tabActive < 3  ? <p
				className="common_underline_link"
				data-toolTip="Cancel and go back to job post."
				data-toolTip-position="right"
				onClick={() => {
					setShouldBlockNavigation(false);
					dispatch(toggleOverlay(true));
					dispatch(togglePopup([true, "cancelJobPostCreation", { setShouldBlockNavigation }]));
				}}
			>
				Cancel
			</p> : <p></p>}
			<ul className="tabs">
				<li className={`${tabActive === 0 && "active"} ${tabActive > 0 && "done"}`} onClick={() => onclick(0)}>
					<div className="top"></div>
					<div className="bottom">Job Details</div>
				</li>
				<li className={`${tabActive === 1 && "active"} ${tabActive > 1 && "done"}`} onClick={() => onclick(1)}>
					<div className="top"></div>
					<div className="bottom">Add Questions</div>
				</li>
				<li className={`${tabActive === 2 && "active"} ${tabActive > 2 && "done"}`} onClick={() => onclick(2)}>
					<div className="top"></div>
					<div className="bottom">Review and Publish</div>
				</li>
				<li
					className={`no_separater ${tabActive === 3 && "active"} ${tabActive > 3 && "done"}`}
					onClick={() => onclick(3)}
				>
					<div className="top"></div>
					<div className="bottom">Job Links</div>
				</li>
			</ul>
			{tabActive >= 3 ? (
				<button onClick={handleViewJob} className="primary-btn blue">
					View Jobs
				</button>
			) : tabActive === 2 && !disableCtrl ? (
				<button disable={disableCtrl} className="primary-btn blue" onClick={handleClick}>
					{jobId ? "Update Job" : "Publish Job"}
				</button>
			) : (
						<button className="primary-btn blue" onClick={handleClick}>
							Next
						</button>
					)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		newJob: state.employerReducer.newJob,
		jobURL: state.employerReducer.jobURL,
		jobToUpdate: state.employerReducer.jobToUpdate,
	};
}

export default connect(mapStateToProps)(Tabs);
