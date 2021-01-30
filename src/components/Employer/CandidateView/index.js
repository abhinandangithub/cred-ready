import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./index.scss";
import ImgUserPlaceholder from "../../../assets/user-placeholder.jpg";
import CredReadyIndex from "../../_Elements/CredReadyIndex";
import ImgWidget2 from "../../../assets/widget-2.jpg";
import JobSpecificQuestions from "../../Candidate/Jobs/JobSpecificQuestions";
import Accordion from "../../_Elements/Accordion";
import { connect, useDispatch } from "react-redux";
import { getAppliedCandidateDetails } from "../../../store/thunks/employer";
import { useToasts } from "react-toast-notifications";
import Spinner from "../../_Elements/Spinner";
import MarginalAssociation from "../../_Elements/Charts/MarginalAssociation";
import { sendEmail } from "../../../store/thunks/employer";
import ImgMail from "../../../assets/email1.svg";
import ImgDownload from "../../../assets/download_resume.svg";
import Breadcrumbs from "../../_Elements/Breadcrumbs";

function CandidateView(props) {
	const dispatch = useDispatch();
	const [job, setJob] = useState(undefined);
	let { jobId, candidateId } = useParams();

	const { addToast } = useToasts();

	const breadcrumbs = [
		{
			to: "/",
			label: "My Jobs",
		},
		{
			to: "/",
			label: "Candidate View",
		},
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(getAppliedCandidateDetails(candidateId, jobId));
	}, [dispatch]);

	useEffect(() => {
		console.log("appliedCandidateDetails ", jobId, candidateId, props.job);
		setJob(props.job);
	}, [dispatch, props.job]);

	const handleSendEmail = () => {
		dispatch(
			sendEmail({
				candidateId: candidateId,
				emailTemplateId: job.jobDetails.emailTemplateId,
				job_id: jobId,
			})
		);
	};

	const handleDownloadClick = () => {
		console.log("url ", job.candidate.resume_path);
		if (job.candidate.resume_path) {
			fetch(job.candidate.resume_path).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = job.candidate.resume_name || "resume.pdf";
					a.click();
				});
			});
		} else {
			addToast("Could not find resume", {
				appearance: "warning",
				autoDismiss: true,
			});
		}
	};

	const changePhoneFormat = (phone) => {
		console.log(phone);
		phone = phone.toString();

		if (phone[0] === "+") {
			phone = phone.substring(1);
		}

		if (phone[0] === "1") {
			let x = phone
				.replace(/\D/g, "")
				.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
			phone = x[1] + " (" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
		} else {
			let x = phone.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
			phone = "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
		}
		console.log("------------------");
		console.log(phone);
		return phone;
	};

	return props.loading || job === undefined ? (
		<Spinner />
	) : (
			<div className="candidate-view">
				<div className="candidate-navigation">
					<a className="my-jobs" href="/jobs">
						My Jobs {"> "}
					</a>
					<a href> Candidate View</a>
				</div>
				{/* <Breadcrumbs items={breadcrumbs} /> */}
				<div className="common-heading-button flex">
					<h1 className="heading">Candidate View</h1>
					<Link className="btn pc" onClick={() => handleDownloadClick()}>
						Download Resume
				</Link>
				</div>
				<div className="main-info">
					<div className="top flex">
						<div className="left">
							<img
								src={
									job.candidate.profile_image_path
										? job.candidate.profile_image_path
										: ImgUserPlaceholder
								}
								alt="UserName"
							/>
						</div>
						<div className="right">
							<h2>
								{job.candidate.first_name} {job.candidate.last_name}
							</h2>
							<h4>{job.candidate.current_title}</h4>
							{/* <h3>Certified Nursing Assistant</h3> */}
							<ul className="contact_details flex">
								{job.candidate.contacts[0].contact_type === "phone" && (
									<li className="phone">
										<a
											href={`tel: ${changePhoneFormat(
												job.candidate.contacts[0].contact
											)}`}
										>
											{changePhoneFormat(job.candidate.contacts[0].contact)}
										</a>
									</li>
								)}
								{job.candidate.contacts[1].contact_type === "phone" && (
									<li className="phone">
										<a
											href={`tel: ${changePhoneFormat(
												job.candidate.contacts[1].contact
											)}`}
										>
											{changePhoneFormat(job.candidate.contacts[1].contact)}
										</a>
									</li>
								)}
								{job.candidate.contacts[0].contact_type === "email" && (
									<li className="email">
										<a href={`mailto: ${job.candidate.contacts[0].contact}`}>
											{job.candidate.contacts[0].contact}
										</a>
									</li>
								)}
								{job.candidate.contacts[1].contact_type === "email" && (
									<li className="email">
										<a href={`mailto: ${job.candidate.contacts[1].contact}`}>
											{job.candidate.contacts[1].contact}
										</a>
									</li>
								)}

								<li className="city pc">{job.candidate.address.city}</li>
								<li className="exp pc">{job.candidate.exp_in_years}</li>
								{/* <li className="dist pc">{job.candidate.job_distance || ""} </li> */}
								<li className="street pc">
									{/* {job.candidate.address.street_address} */}
									{job.jobDetails.orgName}
								</li>
							</ul>
						</div>
					</div>
					<div className=" bottom">
						<ul className="contact_details flex mobile">
							<li className="city">{job.candidate.address.city}</li>
							<li className="exp">{job.candidate.exp_in_years}</li>
							{/* <li className="dist">{job.candidate.job_distance || "**"} </li> */}
							{/* <li className="street">{job.candidate.address.street_address}</li> */}
							<li className="street">{job.jobDetails.orgName}</li>
						</ul>
						<ul className="common-skills-list">
							<li>Certifications: </li>
							{/* <li>Helping with meals</li>
						<li>Grooming</li>
						<li>Bathing</li>
						<li>Changing diapers</li>
						<li>Dressing</li> */}
							{!!job.candidate.certificate && job.candidate.certificate.length
								? job.candidate.certificate.map((val, i) => {
									return <li key={i}>{val.certificate_title.title_name}</li>;
								})
								: ""}
						</ul>
					</div>
				</div>
				<div className="widgets flex">
					<div className="widget">
						<div className="heading">CredReadiness </div>
						<div className="content">
							<CredReadyIndex
								index={job.candidateJobApplication.readiness_index}
								noHeading
								noSubHeading
							/>
							{/* <img src={ImgWidget1} alt="" /> */}
						</div>
					</div>
					<div className="widget">
						<div className="heading">Potential for improving CredReadiness Builders</div>
						{job.candidateJobApplication.marginal_associations &&
							job.candidateJobApplication.marginal_associations.length ? (
								<div className="content">
									{/* <CredReadyIndex index="80" /> */}
									{/* <img src={ImgWidget2} alt="" /> */}
									<MarginalAssociation
										titles={job.candidateJobApplication.marginal_associations.map(
											(j) => {
												return j.metric;
											}
										)}
										values={job.candidateJobApplication.marginal_associations.map(
											(j) => {
												return j.score;
											}
										)}
									/>
								</div>
							) : (
								""
							)}
					</div>
				</div>
				{/* <Accordion className="blank" type="blank"> */}
				{job.candidate.work_experience.map((j) => {
					return (
						<div>
							<Accordion className="blank" type="blank">
								<ul className="info flex for-click">
									<li className="_title">
										<span>Job Title:&nbsp;</span> <span>{j.title}</span>
									</li>
									<li className="pc">
										<span>Duration:&nbsp;</span>
										<span>
											{j.employment_from && j.employment_from.charAt(5) === ","
												? j.employment_from.slice(0, 11)
												: j.employment_from &&
												j.employment_from.slice(0, 12)}{" "}
											{j.employment_to && j.employment_to.charAt(5) === ","
												? j.employment_to.slice(0, 11)
												: j.employment_to && j.employment_to.slice(0, 12)}
										</span>
									</li>
									<li className="pc">
										<span>Organization:&nbsp;</span> <span>{j.company}</span>
									</li>
								</ul>
								<ul className="info flex">
									<li className="mobile">
										<span>Duration:&nbsp;</span>
										<span>
											{j.employment_from
												? new Date(j.employment_from).toDateString()
												: ""}
										&nbsp;&nbsp;
										{j.employment_to
												? new Date(j.employment_to).toDateString()
												: ""}
										</span>
									</li>
									<li className="mobile">
										<span>Organization:&nbsp;</span> <span>{j.company}</span>
									</li>
									{/* <li>
										Industry : <span>Homecare / hospitality</span>
									</li>
									<li>
										Function : <span>Certified Nursing Assistant / Nursing Staff</span>
									</li> */}
									<li className="full">
										<span>Description:&nbsp;</span>
										<span>{j.job_description}</span>
									</li>
									{j.workex_verification.supervisorName ? (
										<li>
											<span>Supervisor Name:&nbsp;</span>
											<span>{j.workex_verification.supervisorName}</span>
										</li>
									) : (
											""
										)}
									{j.workex_verification.phone ? (
										<li className="phone">
											<span>Supervisor Phone Number:&nbsp;</span>
											<span>{j.workex_verification.phone}</span>
										</li>
									) : (
											""
										)}
								</ul>
							</Accordion>
						</div>
					);
				})}
				{/* </Accordion> */}
				<JobSpecificQuestions questions={job.submittedAnswer.employerQuestions && job.submittedAnswer.employerQuestions.map((o) => {
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
				})} />
				<div className="cta flex">
					<p>
						Applied On :{" "}
						{job.candidate.modified_on &&
							job.candidate.modified_on.charAt(5) === ","
							? job.candidate.modified_on.slice(0, 11)
							: job.candidate.modified_on &&
							job.candidate.modified_on.slice(0, 12)}
					</p>
					<button
						className="primary-btn blue pc"
						onClick={() => handleSendEmail()}
					>
						Send Email
				</button>
				</div>
				<div className="cta flex mobile">
					{/* <button className="primary-btn blue" onClick={() => handleSendEmail()}>
						Download Resume
							   Send Email
				</button> */}
					<Link
						className="send-email primary-btn blue"
						onClick={() => handleSendEmail()}
					>
						<img src={ImgMail} height="15px" alt="Download" /> Send Email
				</Link>

					<br />
					<Link
						className="primary-btn blue outline"
						onClick={() => handleDownloadClick()}
					>
						<img src={ImgDownload} height="15px" alt="Download" /> Download Resume
				</Link>
				</div>
			</div>
		);
}

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
		job: state.employerReducer.appliedCandidateDetails.data,
	};
}

// export default CandidateList;
export default connect(mapStateToProps)(CandidateView);
