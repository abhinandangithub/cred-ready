import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import Tabs from "./Tabs";
import JobDetails from "./Tabs/JobDetails";
import AddQuestions from "./Tabs/AddQuestions";
import ReviewAndPublish from "./Tabs/ReviewAndPublish";
import JobLinks from "./Tabs/JobLinks";
import { useParams, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Spinner from "../../_Elements/Spinner";
import { setPostedJobURL, setNewJob } from "../../../store/actions/employer";
import {
	getEmploymentType,
	getSkills,
	getIndustry,
	getFunction,
	getLocations,
	getPostedJobs,
	postJob,
	getProfileThunk,
} from "../../../store/thunks/employer";
import { Prompt } from "react-router";
import qs from "qs";
import { useToasts } from "react-toast-notifications";

function CreateJobNew({ newJob, jobURL, loading, history, profile }) {
	let { jobId } = useParams();
	const dispatch = useDispatch();
	let { isViewOnly, activeTab } = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
	const [disableCtrl, setDisableCtrl] = useState(isViewOnly);
	const [isSubmit, setIsSubmit] = useState(false);
	const [tabActive, setTabActive] = useState(0);
	const [isNextClick, setIsNextClick] = useState(false);
	const [showPage, setShowPage] = useState(false);

	const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
	const { addToast } = useToasts();

	const [formData, setFormData] = useState(() => {
		let jobDetails = {};
		jobDetails.title = [];
		jobDetails.employment = [];
		jobDetails.industry = [
			{
				id: 21,
				industry_name: "Healthcare",
				is_active: true,
				is_approved: true,
			},
		];

		jobDetails.function = [
			{
				id: 1126,
				function_name: "Certified Nursing Assistant",
				is_active: true,
				is_approved: true,
			},
		];

		jobDetails.position = [];
		jobDetails.location = [];

		console.log(jobDetails);
		return { jobDetails };
	});

	useEffect(() => {
		(async () => {
			if (!!profile && !profile.name) {
				await setShouldBlockNavigation(false);
				addToast("Please update profile to post a job.", {
					appearance: "warning",
					autoDismiss: true,
				});
				history.push('/profile/edit');
			} else {
				// await setShowPage(true);
			}
		})();
	}, [profile]);

	useEffect(() => {
		return () => {
			dispatch(setPostedJobURL(null));
		};
	}, []);

	useEffect(() => {
		if (!!activeTab) setTabActive(parseInt(activeTab));
	}, [activeTab]);

	useEffect(() => {
		if (!!jobURL && isSubmit) {
			setTabActive(4);
		}
	}, [jobURL]);

	useEffect(() => {
		if (!!jobId) {
			if (!activeTab)
				dispatch(getPostedJobs("update", jobId));
			// dispatch(setPostedJobURL(window.location.origin + "/postings/" + jobId));
		}
		// dispatch(getProfileThunk());
	}, [dispatch, jobId]);

	useEffect(() => {
		dispatch(getProfileThunk());
	}, []);

	useEffect(() => {
		dispatch(getEmploymentType());
		dispatch(getIndustry());
		dispatch(getFunction());
		dispatch(getLocations());
		dispatch(getSkills());
		// dispatch(setNewJob({ function: 1126 }));
		// dispatch(setNewJob({ minExp: 0, maxExp: 4 }));
	}, [dispatch]);

	const [isJdValid, seIsJdValid] = useState(false);
	const handleFieldChangeJD = (id, answer) => {
		console.log("cr id, answer ", id, answer);

		let msg = answer === "" || answer === null ? "Required" : "";

		let arr = [];
		arr[0] = answer;
		arr[1] = msg;

		let _formData = { ...formData };
		_formData["jobDetails"][id] = arr;
		setFormData(_formData);
		seIsJdValid(true);
	};

	const isJobDetailsValid = () => {
		let jobDesc = newJob.jobDescription;
		let removeSpaces = "test";
		if (newJob.jobDescription !== "" && newJob.jobDescription !== null &&
			newJob.jobDescription !== '<p><br></p>') {
			let removeP = jobDesc.replaceAll("<p>", "");
			let removCloseP = removeP.replaceAll("</p>", "");
			removeSpaces = removCloseP.replaceAll("&nbsp;", "");
		}

		if (
			!!newJob &&
			newJob.jobTitle &&
			newJob.location &&
			newJob.employmentType &&
			newJob.function &&
			newJob.jobDescription !== "" && newJob.jobDescription !== null &&
			newJob.jobDescription !== '<p><br></p>' && newJob.jobDescription !== '<p>&nbsp;</p>' && !!removeSpaces
		) {
			return true;
		} else {
			addToast("Please fill required fields.", {
				appearance: "warning",
				autoDismiss: true,
			});
			return false;
		}
	};

	const handleNextClick = () => {
		if (!disableCtrl) {
			setIsNextClick(true);
			if (tabActive === 0) {
				if (isJobDetailsValid()) {
					setIsNextClick(false);
					setTabActive(tabActive + 1);
				}
			}
			if (tabActive === 1) {
				setTabActive(tabActive + 1);
			}
			if (tabActive === 2) {
				setIsSubmit(true);
				dispatch(setPostedJobURL(null));
				setShouldBlockNavigation(false);
				dispatch(postJob(jobId));
			}
		} else {
			setTabActive(tabActive + 1);
		}
	};

	const handleTabClick = (index) => {
		console.log("cr abhi next BBB", index);
		setIsNextClick(true);
		if (index === 0) {
			setTabActive(index);
		}
		if (index === 1) {
			if (isJobDetailsValid()) {
				setIsNextClick(false);
				setTabActive(index);
			}
			// setTabActive(index);
		}
		if (index === 2) {
			if (isJobDetailsValid()) {
				setIsNextClick(false);
				setTabActive(index);
			}
		}
		if (index === 3) {
			if (isJobDetailsValid() && jobURL) {
				setIsNextClick(false);
				setTabActive(4);
			}
		}
	};

	return (
		<>
			<Prompt when={shouldBlockNavigation}
				// message="You have unsaved changes, are you sure you want to leave?"
				message={location =>
					`${location.pathname}`
				}
			/>
			<div className="create_job_page">
				<Tabs
					setShouldBlockNavigation={setShouldBlockNavigation}
					tabActive={tabActive}
					onclick={(index) => handleTabClick(index)}
					handleNextClick={handleNextClick}
					history={history}
				/>
				{loading ? (
					<Spinner />
				) : (
						<>
							<div className="container_outer">
								<div className="container">
									{tabActive === 0 ? (
										<JobDetails
											isNextClick={isNextClick}
											data={formData.jobDetails}
											onchange={(id, answer) => {
												handleFieldChangeJD(id, answer);
											}}
										/>
									) : tabActive === 1 ? (
										<AddQuestions history={history} setShouldBlockNavigation={setShouldBlockNavigation} />
									) : tabActive === 2 ? (
										<ReviewAndPublish />
									) : (
													<JobLinks />
												)}
								</div>
								{tabActive === 1 ? (
									<p className="common_underline_link" onClick={() => setTabActive(0)}>
										<FontAwesomeIcon icon={faAngleLeft} />
										Job Details
								</p>
								) : tabActive === 2 ? (
									<p className="common_underline_link" onClick={() => setTabActive(1)}>
										<FontAwesomeIcon icon={faAngleLeft} />
										Questions
								</p>
								) : null}
							</div>
						</>
					)}
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {
		newJob: state.employerReducer.newJob,
		jobURL: state.employerReducer.jobURL,
		loading: state.commonReducer.apiCallsInProgress,
		profile: state.employerReducer.profile.data
	};
}

export default connect(mapStateToProps)(CreateJobNew);
