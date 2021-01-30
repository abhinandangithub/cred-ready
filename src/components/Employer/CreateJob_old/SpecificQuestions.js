import React from "react";

import "./Questions/index.scss";
import PersonalityAssessment from "./Questions/PersonalityAssessment";
import CourseWork from "./Questions/CourseWork";
import WorkHistory from "./Questions/WorkHistory";
import CommuteQuestions from "./Questions/CommuteQuestions";
import GeneralQuestions from "./Questions/GeneralQuestions";
import JobSpecificQuestions from "./Questions/JobSpecificQuestions";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { postJob } from "../../../store/thunks/employer";
import { useToasts } from "react-toast-notifications";

function SpecificQuestions(props) {
	let { jobId } = useParams();
	const { addToast } = useToasts();

	const parent = React.useRef();
	const [activeTab, setActiveTab] = React.useState(0);

	React.useEffect(() => {
		if (props.isSubmit)
			handlePostJob()
	}, [props.isSubmit]);

	const handleTabClick = (i) => {
		setActiveTab(i);
	};
	const dispatch = useDispatch();

	const handlePostJob = () => {
		console.log('abhi props.jobData ', props.jobData);
		let message = "";
		if (!props.jobData.jobTitle) {
			message = "<p>Please select job title.</p>";
		}
		if (!props.jobData.location) {
			message += "<p>Please select location.</p>";
		}
		if (!props.jobData.employmentType) {
			message += "<p>Please select employment type. </p> ";
		}
		if (!props.jobData.function) {
			message += "<p>Please select function.</p>";
		}
		if (!props.jobData.industry) {
			message += "<p>Please select industry.</p>";
		}
		if (!props.jobData.jobDescription || props.jobData.jobDescription == "<p><br></p>") {
			message += "<p>Please select job description.</p>";
		}
		if (!props.jobData.emailTemplateId) {
			message += "<p>Please select email template.  </p> ";
		}
		if (!!message) {
			addToast(<div dangerouslySetInnerHTML={{ __html: message }}></div>, {
				appearance: "warning",
				autoDismiss: 6000,
				placement: "top-center",
			});
			// setTimeout(() => {
			// 	let scrollToEl = document.querySelectorAll(
			// 		".error-text:not(.hidden)"
			// 	)[0];

			// 	if (scrollToEl) {
			// 		var scrollToElParent =
			// 			scrollToEl.closest("li")
			// 	}

			// 	if (scrollToElParent) {
			// 		scrollToElParent.scrollIntoView();
			// 	}
			// });

			setTimeout(() => {
				let scrollToEl = document.querySelectorAll(".error-text:not(.hidden)")[0]
					? document
						.querySelectorAll(".error-text:not(.hidden)")[0]
						.closest(".heading") || document
							.querySelectorAll(".error-text:not(.hidden)")[0]
					: null;
				if (scrollToEl) {
					scrollToEl.scrollIntoView();
				}
			}, 1);
		} else {
			dispatch(postJob(jobId));
			props.onEnableLink();
		}
	};

	return (
		<>
			<div className="specific-questions" ref={parent}>
				<div className="heading">
					<ul>
						<li
							onClick={() => handleTabClick(0)}
							className={activeTab === 0 ? "active" : ""}
						>
							Employer Questions
						</li>
						<li
							onClick={() => handleTabClick(1)}
							className={activeTab === 1 ? "active" : ""}
						>
							CredReady Questions
						</li>
						<li
							onClick={() => handleTabClick(2)}
							className={activeTab === 2 ? "active" : ""}
						>
							General Questions
						</li>
					</ul>
				</div>
				<div className="content questions_employer">
					{activeTab === 0 ? (
						<JobSpecificQuestions />
					) : activeTab === 1 ? (
						<div>
							<p>
								These questions are used to calculate CredReadiness and cannot
								be changed.
							</p>
							<PersonalityAssessment />
							<CourseWork />
							<WorkHistory />
							<CommuteQuestions />
						</div>
					) : (
								<div>
									<p>
										General Questions can not be changed
							</p>
									<GeneralQuestions />
								</div>
							)}
				</div>
			</div>

			{/* T/F: {props.jobData.emailTemplateId &&
				props.jobData.employmentType && props.jobData.function &&
				props.jobData.industry && props.jobData.jobDescription &&
				props.jobData.jobCertificateMap.length && props.jobData.jobTitle &&
				props.jobData.location}<br></br>*/}
			{/* 
			wmail: {props.jobData.emailTemplateId}><br></br>
			employmentType: {props.jobData.employmentType}<br></br>
			function:{props.jobData.function}<br></br>
			industry:{props.jobData.industry}<br></br>
			jobDescription:{props.jobData.jobDescription}<br></br>
			jobCertificateMap:{props.jobData.jobCertificateMap.length} <br></br>
			jobTitle:{props.jobData.jobTitle}<br></br>
			location:{props.jobData.location}<br></br> */}

			{/* <div className="cta">
				<button
					//to="/jobs/create-job"
					// style={{
					// 	pointerEvents: props.jobData.emailTemplateId &&
					// 		props.jobData.employmentType && props.jobData.function &&
					// 		props.jobData.industry && props.jobData.jobDescription &&
					// 		props.jobData.jobCertificateMap.length && props.jobData.jobTitle &&
					// 		props.jobData.location ? 'visible' : 'none'
					// }}
					className="primary-btn blue"
					onClick={handlePostJob}
				>
					{jobId ? "Update Job" : "Post Job"}
				</button>
			</div> */}
		</>
	);
}

//export default SpecificQuestions;

function mapStateToProps(state) {
	return {
		jobToUpdate: state.employerReducer.jobToUpdate,
		jobData: state.employerReducer.newJob,
	};
}

export default connect(mapStateToProps)(SpecificQuestions);
