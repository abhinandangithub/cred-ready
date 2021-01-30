import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";
import { getCandidateJobDetails } from "../../../../store/thunks/candidate";
import EmployerQuestions from "../../../Candidate/Jobs/Questions/EmployerQuestions";
import { Document, Page, pdfjs } from "react-pdf";

import {
	fetchCandidateDegreeTitles,
	fetchCandidateInstituteType,
	fetchCandidateCurrentStatus,
} from "../../../../modals/candidateProfile/thunk";
import { getGeographyThunk } from "../../../../store/thunks/employer";
import Input from "../../../_Elements/Input";
import {
	toggleOverlay,
	togglePopup,
} from "../../../../store/actions/popup_overlay";
import Spinner from "../../../_Elements/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let scrollBarStyle = {
	height: "100%",
	transition: "all 0.2s ease",
};

function JobApplied(props) {
	let { id } = useParams();
	const [labelsArr, setLabelsArr] = useState([]);
	const [valuesArr, setValuesArr] = useState([]);
	const [numPages, setNumPages] = React.useState(null);
	const degrees = useSelector(
		(state) => state.setCandidateDegreeTitlesReducer.data
	);
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);

	const geographyKeys = useSelector(state => state.employerReducer.geographyKeys);

	const institutions = useSelector((state) =>
		state.setCandidateInstitutionTypeReducer
			? state.setCandidateInstitutionTypeReducer.data
			: []
	);
	const status = useSelector((state) =>
		state.candidateCurrentStatusReducer
			? state.candidateCurrentStatusReducer.data
			: []
	);
	const showCertificate = (certificate) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "certificate", { certificate }]));
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchCandidateCurrentStatus());
		dispatch(getGeographyThunk());
		dispatch(fetchCandidateInstituteType());
		dispatch(getCandidateJobDetails(id));
	}, [id]);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setLabelsArr(
			props.candidateJobDetails &&
			props.candidateJobDetails.candidateJobApplication.marginal_associations.map(
				(val) => val.metric
			)
		);
		setValuesArr(
			props.candidateJobDetails &&
			props.candidateJobDetails.candidateJobApplication.marginal_associations.map(
				(val) => val.score
			)
		);
	}, [props.candidateJobDetails]);

	var isLoggedIn = true;

	function WorkExperienceComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>{experience.title}</h2>
					<p>
						<span className="heading">
							{experience.company
								? experience.company
								: experience.organization_name}
						</span>
						{" - "}
						<span className="text">
							{experience.location ||
								(experience.address && experience.address.city)}
						</span>
					</p>
					<p>
						<span className="text">
							{experience.employment_from
								? experience.employment_from && experience.employment_from.charAt(5) === ","
									? experience.employment_from && experience.employment_from.slice(0, 11)
									: experience.employment_from && experience.employment_from.slice(0, 12)
								: experience.employed_from && experience.employment_from.charAt(5) === ","
									? experience.employed_from && experience.employment_from.slice(0, 11)
									: experience.employed_from && experience.employment_from.slice(0, 12)}
						</span>
						{" to "}
						<span className="text">
							{experience.employment_to
								? experience.employment_to
									? experience.employment_to.charAt(5) === ","
										? experience.employment_to && experience.employment_to.slice(0, 11)
										: experience.employment_to && experience.employment_to.slice(0, 12)
									: experience.employed_till && experience.employed_till.charAt(5) === ","
										? experience.employed_till && experience.employed_till.slice(0, 11)
										: experience.employed_till && experience.employed_till.slice(0, 12)
								: "Present"}
						</span>
					</p>
					<p>
						<span className="heading">Current employment status: </span>
						<span className="text">
							{experience.is_currently_employed === true ? "Yes" : "No"}
						</span>
					</p>
					<p></p>
				</div>
			</>
		);
	}

	function OtherExperienceComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>{experience.title}</h2>
					<p>
						<span className="heading">Description : </span>
						{experience.description}
					</p>
					<p>
						<span className="heading">Organization : </span>
						{experience.company
							? experience.company
							: experience.organization_name}
					</p>
					<p>
						<span className="heading">Location : </span>
						{experience.location}
					</p>
					<p>
						<span className="text">
							FROM{" "}
							{experience.employment_from
								? experience.employment_from
								: experience.employed_from && experience.employed_from.charAt(5) === ","
									? experience.employed_from && experience.employed_from.slice(0, 11)
									: experience.employed_from && experience.employed_from.slice(0, 12)}
						</span>
						{" to "}
						<span className="text">
							{experience.employment_to
								? experience.employed_till && experience.employed_till.charAt(5) === ","
									? experience.employed_till && experience.employed_till.slice(0, 11)
									: experience.employed_till && experience.employed_till.slice(0, 12)
								: "Present"}
						</span>
					</p>
				</div>
			</>
		);
	}

	function EducationExperienceComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>
						{degrees.length > 0 &&
							degrees.map((entity) => {
								if (entity.id === parseInt(experience.title))
									return entity.title;
							})}
					</h2>
					<p>
						<span className="heading">
							{degrees.length > 0 &&
								degrees.map((entity) => {
									if (entity.id === experience.title) return entity.title;
								})}
						</span>
						<span className="heading">Description : </span>
						{experience.education_description}
						<br />
						<span className="heading">Institution : </span>
						{institutions.length > 0 &&
							institutions.map((entity) => {
								if (entity.id === experience.institution)
									return entity.institute_name;
							})}

						<br />
						<span className="heading">Major : </span>
						{experience.education_major &&
							experience.education_major.map((major) => {
								return <>{major.name + "   "}</>;
							})}
						<br />

						<span className="heading">Minor : </span>
						{experience.education_minor &&
							experience.education_minor.map((minor) => {
								return <>{minor.name + "   "}</>;
							})}
						<br />
					</p>
					<p>
						<span className="text">
							FROM{" "}
							{experience.attended_from && experience.attended_from.charAt(5) === ","
								? experience.attended_from && experience.attended_from.slice(0, 11)
								: experience.attended_from && experience.attended_from.slice(0, 12)}
						</span>
						{" to "}
						<span className="text">
							{experience.attended_till && experience.attended_till.charAt(5) === ","
								? experience.attended_till && experience.attended_till.slice(0, 11)
								: experience.attended_till && experience.attended_till.slice(0, 12)}
						</span>
					</p>
				</div>
			</>
		);
	}

	function CertificationComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>GHI Nursing Certificate</h2>
					<p>
						<span className="heading">Description: </span>
						{" - "}
						<span className="text">
							{/* Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support. */}
							{experience.description}
						</span>
					</p>
					<p>
						<span className="heading">Issued Date: </span>
						<span className="text">
							{experience.issued_date && experience.issued_date.charAt(5) === ","
								? experience.issued_date && experience.issued_date.slice(0, 11)
								: experience.issued_date && experience.issued_date.slice(0, 12)}
						</span>
					</p>
					<p>
						<span className="heading">Certificate link: </span>
						<span className="text">
							<Link to="#">{experience.certificate_link}</Link>
						</span>
					</p>
					<p className="docs">
						{experience.certificate_image_loc && (
							<>
								<span className="heading">Certificate image: </span>
								<span
									className="doc"
									to={experience.doc}
									onClick={() =>
										showCertificate(experience.certificate_image_loc)
									}
									id={"showCertificate_"}
								>
									{experience.certificate_image_loc &&
										experience.certificate_image_loc.split(".").pop() ===
										"pdf" ? (
											<Document
												file={experience.certificate_image_loc}
												onLoadSuccess={onDocumentLoadSuccess}
												loading={
													<div className="spinner_outer">
														<Spinner />
													</div>
												}
											>
												{Array.from(new Array(numPages), (el, index) => (
													<Page
														// size="A4"
														loading=""
														key={`page_${index + 1}`}
														pageNumber={index + 1}
														width={150}
													// width={width}
													/>
												))}
											</Document>
										) : (
											<img
												src={experience.certificate_image_loc}
												alt={experience.doc}
											/>
										)}
								</span>
							</>
						)}
					</p>
				</div>
			</>
		);
	}

	const renderTopInfo = (
		<div className="main_info">
			{/* <div className="logo">
            <img src={ImgWidgetLogo} alt="" />
        </div> */}
			<div className="info">
				{/* <h3>Certified Nursing Assistent</h3> */}
				<h3>
					{props.candidateJobDetails &&
						props.candidateJobDetails.jobDetails.jobTitle}
				</h3>
				{/* <p>Hospital to Five Star Nursing</p> */}
				<p>
					{props.candidateJobDetails &&
						props.candidateJobDetails.jobDetails.orgName}
				</p>
			</div>

			<div className="statusBox">
				{props.candidateJobDetails &&
					props.candidateJobDetails.candidateJobApplication &&
					props.candidateJobDetails.candidateJobApplication.status}
			</div>
			<div className="short-info">
				{/* <p>1-3 Years</p> */}
				<p>
					{props.candidateJobDetails &&
						props.candidateJobDetails.jobDetails.minExp}
					-
					{props.candidateJobDetails &&
						props.candidateJobDetails.jobDetails.maxExp}{" "}
					Years
				</p>
				<p>
					{props.candidateJobDetails &&
						props.candidateJobDetails.jobDetails.location}
				</p>
			</div>
		</div>
	);

	const renderDescription = (
		<div className="main_info">
			<p>
				<span className="heading">Job Description: </span>
				<span
					className="text"
					dangerouslySetInnerHTML={{
						__html:
							props.candidateJobDetails &&
								props.candidateJobDetails.jobDetails.jobDescription
								? props.candidateJobDetails.jobDetails.jobDescription
								: "",
					}}
				></span>
			</p>
		</div>
	);

	return loading ? (
		<Spinner />
	) : (
			<div className={`job-view-cmp flex ${isLoggedIn ? "" : "login_required"}`}>
				<div className="left">
					<Scrollbars
						className="custom-scrollbar"
						style={scrollBarStyle}
						autoHideTimeout={1000}
						autoHideDuration={600}
						renderTrackVertical={({ style, ...props }) => (
							<div
								{...props}
								className="bar"
								style={{
									...style,
								}}
							/>
						)}
						renderTrackHorizontal={({ style, ...props }) => (
							<div
								{...props}
								className="hbar"
								style={{
									...style,
								}}
							/>
						)}
					>
						{renderTopInfo}
						{renderDescription}

						<h2 className="heading_submitted_answers">
							{props.candidateJobDetails &&
								props.candidateJobDetails.candidateJobApplication &&
								props.candidateJobDetails.candidateJobApplication.status === "Draft"
								? "Drafted Application"
								: "Submitted Application"}
						</h2>

						<div className="application_page questions">
							<div className="preview_info_job">
								<div className="content">
									<div className="group">
										<div className="top">
											<h1>Resume</h1>
										</div>
										<div className="bottom">
											<p>
												{props.candidateJobDetails &&
													props.candidateJobDetails.candidate.resume_name ? (
														<Link to="#">
															{props.candidateJobDetails.candidate.resume_name}
														</Link>
													) : (
														<Link to="/profile/resume">{"Not Found"}</Link>
													)}
											</p>
										</div>
									</div>
									<div className="group">
										<div className="top">
											<h1>Personal Details</h1>
										</div>
										<div className="bottom">
											<p>
												First Name :{" "}
												{props.candidateJobDetails &&
													props.candidateJobDetails.candidate.first_name}
											</p>
											<p>
												Last Name :{" "}
												{props.candidateJobDetails &&
													props.candidateJobDetails.candidate.last_name}
											</p>
											<p>
												Current employment status :{" "}
												{props.candidateJobDetails &&
													status.map((entity) => {
														if (
															entity.id ===
															props.candidateJobDetails.candidate
																.current_employment_status
														)
															return entity.employment_status;
													})}
											</p>
											<p>
												How long would you begin a new role ? :{" "}
												{props.candidateJobDetails &&
													props.candidateJobDetails.candidate.available_within}
											</p>
											{/* <p>
                                Are you interested in a different function and industry ? :{" "}
                                {props.candidateJobDetails &&
                                    props.candidateJobDetails.candidate.is_open_to_other_roles ===
                                    true
                                    ? "Yes"
                                    : props.candidateJobDetails &&
                                        props.candidateJobDetails.candidate
                                            .is_open_to_other_roles === false
                                        ? "No"
                                        : ""}
                            </p> */}
										</div>
									</div>
									<div className="group">
										<div className="top">
											<h1>Work Experience</h1>
										</div>

										<div className="bottom">
											{props.candidateJobDetails &&
												props.candidateJobDetails.candidate.work_experience.length >
												0 ? (
													props.candidateJobDetails.candidate.work_experience.map(
														(val) => {
															return (
																<WorkExperienceComponent
																	experience={val}
																></WorkExperienceComponent>
															);
														}
													)
												) : (
													<Link to="/profile/work-experience">
														{"No Data Found"}
													</Link>
												)}
										</div>
										<div className="top other">
											<h1>Experiences Outside of Work That You Think Are Important</h1>
										</div>
										<div className="bottom">
											{props.candidateJobDetails &&
												props.candidateJobDetails.candidate.additional_experiences
													.length > 0 ? (
													props.candidateJobDetails.candidate.additional_experiences.map(
														(val) => {
															if (val.career_path === "work") {
																return (
																	<OtherExperienceComponent
																		experience={val}
																	></OtherExperienceComponent>
																);
															}
														}
													)
												) : (
													<Link to="/profile/work-experience">
														{"No Data Found"}
													</Link>
												)}
										</div>
									</div>
									<div className="group ">
										<div className="top">
											<h1>Education</h1>
										</div>
										<div className="bottom">
											{props.candidateJobDetails &&
												props.candidateJobDetails.candidate.education_experience
													.length > 0 ? (
													props.candidateJobDetails.candidate.education_experience.map(
														(val) => {
															return (
																<EducationExperienceComponent
																	experience={val}
																></EducationExperienceComponent>
															);
														}
													)
												) : (
													<Link to="/profile/education">{"No Data Found"}</Link>
												)}
										</div>
										<div className="group ">
											<div className="top other">
												<h1>Certifications</h1>
											</div>
											<div className="bottom">
												{props.candidateJobDetails &&
													props.candidateJobDetails.candidate.certificate.length >
													0 ? (
														props.candidateJobDetails.candidate.certificate.map(
															(val) => {
																return (
																	<CertificationComponent
																		experience={val}
																	></CertificationComponent>
																);
															}
														)
													) : (
														<Link to="/profile/education">{"No Data Found"}</Link>
													)}
											</div>
										</div>
										<div className="top other">
											<h1>Experiences Outside the Classroom That You Think are Important</h1>
										</div>
										<div className="bottom">
											{props.candidateJobDetails &&
												props.candidateJobDetails.candidate.additional_experiences
													.length > 0 ? (
													props.candidateJobDetails.candidate.additional_experiences.map(
														(val) => {
															if (val.career_path === "EDUCATION") {
																return (
																	<OtherExperienceComponent
																		experience={val}
																	></OtherExperienceComponent>
																);
															}
														}
													)
												) : (
													<Link to="/profile/education/">{"No Data Found"}</Link>
												)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{props.candidateJobDetails &&
							props.candidateJobDetails.submittedAnswer.employerQuestions &&
							props.candidateJobDetails.submittedAnswer.employerQuestions.length >
							0 && (
								<>
									<h2 className="heading_submitted_answers_employer">
										Response to Employer Questions
								</h2>
									<EmployerQuestions
										noHeading={true}
										employerQuestions={
											props.candidateJobDetails.submittedAnswer.employerQuestions.map((o) => {
												o.checked = false;
												if (!!o.option_choices && o.option_choices.length) {
													o.option_choices.sort(function (a, b) {
														const x = a["option_order"];
														const y = b["option_order"];
														return x > y ? 1 : x < y ? -1 : 0;
													})
												}
												return o
											}).sort(function (a, b) {
												const x = a["question_id"];
												const y = b["question_id"];
												return x < y ? 1 : x > y ? -1 : 0;
											})

										}
									/>
								</>
							)}
					</Scrollbars>
				</div>
				<div className="right">
					{renderTopInfo}
					{renderDescription}
					<div className="meter">
						<h4 className="cred-details">Your CredReadiness</h4>

						<div className="text_index">
							<p>
								The scores below indicate how prepared you are for this position.
								Based on your experience
						</p>
							<CredReadyIndex
								index={
									props.candidateJobDetails &&
									props.candidateJobDetails.candidateJobApplication
										.readiness_index
								}
							/>
						</div>

						<div className={`${isLoggedIn ? "hidden" : "login_screen"}`}>
							<p>Not enough information to calculate your CredReady score.</p>
							<p>
								<Link to="/login">Login</Link> and enter your profile details to
							view your score
						</p>
						</div>
					</div>
					<div className="marginal">
						<h4>Potential for improving CredReadiness Builders</h4>
						<MarginalAssociation labelsArr={labelsArr} valuesArr={valuesArr} />
						<div className={`${isLoggedIn ? "hidden" : "login_screen"}`}></div>
					</div>
					{props.candidateJobDetails &&
						props.candidateJobDetails.candidateJobApplication &&
						props.candidateJobDetails.candidateJobApplication.status === "Draft" ? (
							<div className="cta flex">
								<Link
									className="primary-btn blue apply"
									to={`/jobs/view/${props.candidateJobDetails &&
										props.candidateJobDetails.jobDetails &&
										props.candidateJobDetails.jobDetails.jobId
										}`}
								>
									Apply
						</Link>
							</div>
						) : (
							<div className="cta flex">
								<Link
									className="primary-btn blue apply"
									to={`/jobs/view/${props.candidateJobDetails &&
										props.candidateJobDetails.jobDetails &&
										props.candidateJobDetails.jobDetails.jobId
										}/applied`}
								>
									Update Application
						</Link>
							</div>
						)}
				</div>
			</div>
		);
}

function mapStateToProps(state) {
	return {
		candidateJobDetails: state.candidateReducer.jobDetails.data,
	};
}

export default connect(mapStateToProps)(JobApplied);
