import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getPostedJobs, sendNotification, getCandidatesList } from "../../../store/thunks/employer";
import { clearSelectedJobs, jobToUpdate } from "../../../store/actions/employer";
import Spinner from "../../_Elements/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapMarker, faCalendar, faEllipsisV, faShareAlt, faLessThan } from "@fortawesome/free-solid-svg-icons";

import { Link, useParams } from "react-router-dom";
import { setPostedJobURL } from "../../../store/actions/employer";

import "./index.scss";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";
import { setNewJob } from "../../../store/actions/employer";
import { jobToUpdateArray } from "../../../store/actions/employer";
import { strings } from "../../../constants";
import { toggleOverlay, togglePopup } from "../../../store/actions/popup_overlay";

const {
	NO_POSTED_JOB,
	SUGGESTIONS_TO_POST_JOB,
	SUB_SUGGESTIONS_TO_POST_JOB_TEXT,
	PAGE_TITLE,
	JOB_OPENINGS,
	BUTTON_TO_POST_JOB,
	RECIEVE_EMAIL_NOTIFICATIONS,
	RECIEVE_SMS_NOTIFICATIONS,
	VIEW_CANDIDATES,
	CERTIFICATES,
	DESCRIPTION,
	COPY_LINK,
} = strings.EMPLOYER_POSTED_JOB;

function PostedJobs(props) {
	const [jobs, setJobs] = useState(props.postedJobs);
	const dispatch = useDispatch();
	let { jobId } = useParams();
	const { addToast } = useToasts();
	const [showOnlyActiveJobs, setShowOnlyActiveJobs] = useState(false);

	useEffect(() => {
		if (!!jobId) {
			let temp = jobs.find((o) => o.job_id === Number(jobId));
			if (temp) {
				setJobs([temp]);
			}
		}
	}, [jobs]);

	useEffect(() => {
		if (showOnlyActiveJobs) {
			let temp = props.postedJobs.filter((j) =>
				j.is_active ? true : false
			);
			setJobs(temp);
		} else {
			setJobs(props.postedJobs);
		}
	}, [showOnlyActiveJobs]);

	useEffect(() => {
		dispatch(getPostedJobs());
		dispatch(clearSelectedJobs());
		window.scrollTo(0, 0);
	}, [dispatch]);

	useEffect(() => {
		setJobs(props.postedJobs);
	}, [props.postedJobs]);

	const handleSendEmail = (e, job_id) => {
		// if(e.target.checked) {
		let jobs = props.postedJobs.map((j) => {
			if (j.job_id === job_id) {
				j.is_following_on_email = e.target.checked;
			}
			return j;
		});
		setJobs(jobs);
		dispatch(
			sendNotification({
				jobId: job_id,
				optStatus: e.target.checked,
				source: "Email",
			})
		);
		// }
	};

	const handleSendSMS = (e, job_id) => {
		// if(e.target.checked) {
		let jobs = props.postedJobs.map((j) => {
			if (j.job_id === job_id) {
				j.is_following_on_sms = e.target.checked;
			}
			return j;
		});
		setJobs(jobs);
		dispatch(
			sendNotification({
				jobId: job_id,
				optStatus: e.target.checked,
				source: "SMS",
			})
		);
		// }
	};

	const handleViewCandidates = (job_id) => {
		dispatch(getCandidatesList(job_id));
	};

	const handleSearch = (searchSting) => {
		setJobs(props.postedJobs.filter((val) => val.job_title.toLowerCase().includes(searchSting.toLowerCase())));
	};

	const resetJobFields = (isViewOnly = false) => {
		dispatch(setNewJob({ jobTitle: null }));
		dispatch(setNewJob({ employmentType: null }));
		dispatch(setNewJob({ industry: null }));
		dispatch(setNewJob({ function: 1126 }));
		dispatch(setNewJob({ location: null }));
		dispatch(setNewJob({ openPositions: null }));
		dispatch(setNewJob({ jobDescription: null }));
		dispatch(setNewJob({ minExp: null }));
		dispatch(setNewJob({ maxExp: null }));
		dispatch(setNewJob({ jobCertificateMap: [{ id: 16859 }] }));
		dispatch(jobToUpdateArray(null));
		if (!isViewOnly) dispatch(setPostedJobURL(null));
	};

	const handleEdit = (id, count) => {
		console.log('cr abhi count ', count);
		if (count == 0) {
			resetJobFields(true);
			// dispatch(setPostedJobURL(window.location.origin + "/postings/" + id));
			dispatch(setPostedJobURL(null));
			dispatch(jobToUpdate(id));
			props.history.push(`/jobs/create-job/${id}`);
		} else {
			addToast("You cannot edit a job once a candidate has already applied to it. Please create a new one to proceed.", {
				appearance: "warning",
				autoDismiss: true,
			});
		}
	};

	const handleView = (id) => {
		// resetJobFields(true);
		// dispatch(setPostedJobURL(window.location.origin + "/postings/" + id));
		// dispatch(jobToUpdate(id));
		// props.history.push(`/jobs/create-job/${id}?isViewOnly=true`);
		// props.history.push(`/jobs/create-job/${id}?isViewOnly=true`);
		// props.history.push(`/postings/${id}`);
		window.open(`/postings/${id}`, "_blank");
	};

	const copyLinkHandler = (jobId) => {
		addToast("Link is copied.", {
			appearance: "success",
			autoDismiss: true,
		});
		const el = document.createElement("textarea");
		el.value = window.location.origin + "/postings/" + jobId;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
	};

	const handlePostJob = () => {
		resetJobFields();
		props.history.push("/jobs/create-job");
	};

	const jobsList = [1, 2];

	const List = ({ job, isSuspend }) => {
		return (
			<>
				<div className="heading-parent">
					<h2 className="heading">
						{job.job_title} {isSuspend ? null : <span className="suspend_title">Un-published</span>}
					</h2>
					{/* <div className="copy_link_button">
						<button
							className="upload-btn"
							onClick={() => {
								copyLinkHandler(job.job_id);
							}}
							id="uploadBtn"
						>
							{COPY_LINK}
						</button>
					</div> */}
				</div>

				<div className="description flex-end">
					<div>
						<p>
							<span>{DESCRIPTION}: </span>
						</p>
						<div dangerouslySetInnerHTML={{ __html: job.job_description }}></div>
					</div>
				</div>

				<ul className="common-skills-list">
					<li>{CERTIFICATES}: </li>
					{!!job.certificates && job.certificates.length
						? job.certificates.map((val, i) => {
							return <li key={i}>{val.title_name}</li>;
						})
						: ""}
				</ul>
				<p className="job-openings">
					<span>{JOB_OPENINGS}: </span>
					{job.open_positions}
				</p>
				<div className="list-btn">
					<ul className="info">
						{/* <li>Warren, NY</li> */}
						<li>
							<FontAwesomeIcon className="icon" icon={faMapMarker} />
							{!!job.address && job.address.city}, {!!job.address && job.address.state}
						</li>
						{/* <li>January 21, 2020</li> */}
						<li>
							<FontAwesomeIcon className="icon" icon={faCalendar} />
							{job.modified_on ? new Date(job.modified_on).toDateString() : ""}
						</li>
						<li>
							<FontAwesomeIcon className="icon" icon={faUser} />
							{job.modified_by}
						</li>
						<li>Candidates applied {job.count_of_applied_candidates}</li>
					</ul>
					<Link
						to={"/jobs/candidates-list/" + job.job_id}
						className="primary-btn blue"
						onClick={() => handleViewCandidates(job.job_id)}
					>
						{VIEW_CANDIDATES}
					</Link>
				</div>
				<div className="checkboxes">
					<input
						id={"EMAIL" + job.job_id}
						type="checkbox"
						className="fancy-toggle blue"
						onChange={(e) => handleSendEmail(e, job.job_id)}
						checked={job.is_following_on_email}
						disabled={!isSuspend}
					/>
					<label
						htmlFor={"EMAIL" + job.job_id}
						data-toolTip="Select this option to receive emails from CredReady with links to view new candidates as soon as they apply."
					>
						<span className="input"></span>
						{RECIEVE_EMAIL_NOTIFICATIONS}
					</label>
					<input
						id={"SMS" + job.job_id}
						type="checkbox"
						className="fancy-toggle blue"
						onChange={(e) => handleSendSMS(e, job.job_id)}
						checked={job.is_following_on_sms}
						disabled={!isSuspend}
					/>
					<label
						htmlFor={"SMS" + job.job_id}
						data-toolTip="Select this option to receive text messages from CredReady with links to view new candidates when they apply."
					>
						<span className="input"></span>
						{RECIEVE_SMS_NOTIFICATIONS}
					</label>
				</div>

				<span className="action-btn share" data-toolTip="Share job post">
					<FontAwesomeIcon
						icon={faShareAlt}
						onClick={() => {
							dispatch(setPostedJobURL(window.location.origin + "/postings/" + job.job_id));
							dispatch(toggleOverlay(true));
							dispatch(togglePopup([true, "shareJobPost"]));
						}}
					/>
				</span>
				<div className="edit_section">
					<FontAwesomeIcon className="action-btn edit" icon={faEllipsisV} tabIndex="0" />
					<ul className="panel">
						<li onClick={() => handleView(job.job_id)}>View</li>
						<li disabled={job.count_of_applied_candidates > 0} onClick={() => handleEdit(job.job_id, job.count_of_applied_candidates)}>Edit</li>
						<li onClick={() => copyLinkHandler(job.job_id)}>Copy Link</li>
						<li
							onClick={() => {
								dispatch(toggleOverlay(true));
								dispatch(togglePopup([true, "suspendJobPost", { jobId: job.job_id }]));
							}}
						>
							Un-Publish
						</li>
					</ul>
				</div>
			</>
		);
	};

	const renderJobsList = (
		<>
			<div className="common-heading-button">
				<h1 className="heading">{PAGE_TITLE}</h1>
				{/* <Link to="/jobs/create-job" className="btn" onclick={handlePostJob}>
					<span></span>Post Job
				</Link> */}
				<Link className="btn" onClick={handlePostJob}>
					<span></span>
					{BUTTON_TO_POST_JOB}
				</Link>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Search by Job Title" onChange={(e) => handleSearch(e.target.value)} />
					{/* <input type="text" placeholder="Search by Skills" /> */}
				</div>
			</div>

			<div className="listings">
				<ul>
					{/* {jobsList.map((_, i) => {
						return <li key={i}>{list}</li>;
					})} */}
					{jobs.map((_, i) => {
						// console.log(_);
						return (
							<li key={i} className={_.is_active ? "" : "suspend"}>
								<List job={_} isSuspend={_.is_active}></List>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);

	const renderEmptyList = (
		<div className="no-jobs">
			<div className="common-heading-button">
				<h1 className="heading">{NO_POSTED_JOB}</h1>
			</div>
			<div className="content">
				<p>
					{SUGGESTIONS_TO_POST_JOB}
					<br />
					{SUB_SUGGESTIONS_TO_POST_JOB_TEXT}
				</p>
				<div className="common-heading-button">
					{/* <Link to="/jobs/create-job" className="btn">
						<span></span>
						{BUTTON_TO_POST_JOB}
					</Link> */}
					<Link className="btn" onClick={handlePostJob}>
						<span></span>
						{BUTTON_TO_POST_JOB}
					</Link>
				</div>
			</div>
		</div>
	);

	return props.loading ? (
		<Spinner />
	) : (
			<div className="posted-jobs-page">{props.postedJobs.length === 0 ? renderEmptyList : renderJobsList}</div>
		);
}

function mapStateToProps(state) {
	return {
		postedJobs: state.employerReducer.postedJobs.data.sort(function (a, b) {
			return new Date(b.modified_on) - new Date(a.modified_on);
		}),
		loading: state.commonReducer.apiCallsInProgress
	};
}

// export default PostedJobs;
export default connect(mapStateToProps)(PostedJobs);
