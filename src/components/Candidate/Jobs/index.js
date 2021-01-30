import React, { useEffect, useState } from "react";

import "./index.scss";
import userData from "../../_data/userData.json";
import WidgetAppliedRelatedJobs from "../../_Elements/Widgets/AppliedRelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import {
	candidateGetAppliedJobs,
	fetchCandidateDetails,
	fetchCandidateJobs,
} from "../../../modals/candidateProfile/thunk";
import Spinner from "../../_Elements/Spinner";
import { strings } from "../../../constants";


function Jobs() {
	const dispatch = useDispatch();
	const allJobs = useSelector((state) => state.setCandidateJobsReducer.data);
	const [isAlternateGoalsActive, setisAlternateGoalsActive] = React.useState(
		false
	);
	let [appliedJob, setAppliedJob] = useState(
		allJobs.appliedJobs ? allJobs.appliedJobs : []
	);
	let [relatedJob, setRelatedJob] = useState(
		allJobs.relatedJobs ? allJobs.relatedJobs : []
	);

	useEffect(() => {
		setAppliedJob(allJobs.appliedJobs);
	}, [allJobs.appliedJobs]);

	useEffect(() => {
		setRelatedJob(allJobs.relatedJobs);
	}, [allJobs.relatedJobs]);

	const handleSearch = (searchSting, key = "jobTitle") => {
		console.log("appliedJob ", searchSting, key, appliedJob);
		if (!!allJobs && allJobs.appliedJobs && allJobs.appliedJobs.length) {
			let temp = allJobs.appliedJobs.filter((val) => {

				if (val[key].toLowerCase().includes(searchSting.toLowerCase()) || val['jobDescription'].toLowerCase().includes(searchSting.toLowerCase()))
					return val;
			}
			);
			console.log("appliedJob temp ", temp);
			setAppliedJob(temp);
		}
		if (!!allJobs && allJobs.relatedJobs && allJobs.relatedJobs.length) {
			let temp = allJobs.relatedJobs.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			console.log("relatedJobs temp ", temp);
			setRelatedJob(temp);
		}
	};

	const appliedJobs = appliedJob ? (
		appliedJob.length ? (
			appliedJob.map((job, i) => {
				return <WidgetAppliedRelatedJobs applied={job} key={i} />;
			})
		) : (
				"No records found"
			)
	) : (
			<Spinner />
		);

	const relatedJobs = relatedJob ? (
		relatedJob.length ? (
			relatedJob.map((job, i) => {
				return <WidgetAppliedRelatedJobs related={job} key={i} />;
			})
		) : (
				"No records found"
			)
	) : (
			<Spinner />
		);

	useEffect(() => {
		dispatch(fetchCandidateDetails());
		dispatch(candidateGetAppliedJobs());
		dispatch(fetchCandidateJobs());
	}, []);

	return (
		<div className="jobs">
			<div className="search-panel">
				<div className="common-main-heading">
					<h2>My Jobs</h2>
					{/* <button className="btn">Sort by</button> */}
				</div>
				<div className="searches">
					<input
						type="text"
						placeholder="Search by Job Details"
						onChange={(e) => handleSearch(e.target.value, "jobTitle")}
					/>
					<input
						type="text"
						placeholder="Search by Location"
						onChange={(e) => handleSearch(e.target.value, "location")}
					/>
					{/* <input type="text" placeholder="Search by Salary" /> */}
				</div>
			</div>

			<div className="current-goals mobile">
				<div className="common-main-heading no-icon">
					<button className={`primary-btn blue ${isAlternateGoalsActive ? "outlined" : ""}`} onClick={() => setisAlternateGoalsActive(false)}>
						Applied Jobs
					</button>
					<button className={`primary-btn blue ${!isAlternateGoalsActive ? "outlined" : ""}`} onClick={() => setisAlternateGoalsActive(true)}>
						Related Jobs
					</button>
				</div>
				<div className={`widgets ${isAlternateGoalsActive ? "hidden" : ""}`}>
					{appliedJobs}
				</div>
				<div className={`widgets ${isAlternateGoalsActive ? "" : "hidden"}`}>
					{relatedJobs}
				</div>
			</div>

			<div className="applied-jobs pc">
				<div className="common-main-heading no-icon">
					<h2>Applied Jobs</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				<div className="widgets">{appliedJobs}</div>
			</div>

			<div className="related-jobs pc">
				<div className="common-main-heading no-icon">
					<h2>Related Jobs</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				<div className="widgets">{relatedJobs}</div>
			</div>
		</div>
	);
}

export default Jobs;
