import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
	sendEmail,
	updateStatus,
	getAppliedCandidateDetails,
	getCandidatesList,
	getPostedJobs,
} from "../../../store/thunks/employer";

import "./index.scss";
import Dropdown from "../../_Elements/Dropdown";
import SortIcon from "../../_Elements/SortIcon";
import Pagination from "../../_Elements/Pagination";
import ImgUser from "../../../assets/user-placeholder.jpg";
import ImgMail from "../../../assets/email.svg";
import ImgDownload from "../../../assets/download_resume.svg";
import ImgFilter from "../../../assets/filter.svg";
import Input from "../../_Elements/Input";
import Spinner from "../../_Elements/Spinner";
import { dateFormats } from "highcharts";
import { useToasts } from "react-toast-notifications";
import { togglePopup, toggleOverlay } from "../../../store/actions/popup_overlay";

const queryString = require("query-string");
const faker = require("faker");

function CandidateList(props) {
	let { jobId } = useParams();
	let queryParams = queryString.parse(props.location.search);

	const [selectedStatus, setSelectedStatus] = useState([]);
	const [selectedExperience, setSelectedExperience] = useState([]);
	const [selectedLastUpdate, setSelectedLastUpdate] = useState([]);
	const [selectedRedinessIndex, setSelectedRedinessIndex] = useState([]);
	const { addToast } = useToasts();
	const [sortName, setSortName] = useState(true);
	const [sortCredReadiness, setCredReadiness] = useState(true);
	const [sortExperience, setSortExperience] = useState(true);
	const [sortTitle, setSortTitle] = useState(true);
	const [sortIndex, setSortIndex] = useState(true);
	const [sortOrg, setSortOrg] = useState(true);
	const [sortDate, setSortDate] = useState(true);
	const [sortStatus, setSortStatus] = useState(true);

	// let selectedStatus = [];
	const dispatch = useDispatch();
	const [jobTitle, setJobTitle] = useState(() => {
		let job = props.postedJobs.map((val) => {
			if (val.job_id == jobId) {
				return val.job_title;
			} else {
				return "";
			}
		});
		console.log(job);
		return job;
	});
	const [candidateList, setCandidateList] = useState(props.candidatesList);

	const handleUpdateStatus = (e, job_app_id, isShowToast = true) => {
		dispatch(
			updateStatus(
				{
					jobAppId: job_app_id,
					status: e,
				},
				isShowToast
			)
		);
		let candidateListTemp = candidateList.map((val) => {
			if (val.job_app_id == job_app_id) {
				val.status = e;
			}
			return val;
		});
		setCandidateList(candidateListTemp);
	};

	const handleSendEmail = (candidate_id, template_id, status, job_id, e) => {

		// dispatch(toggleOverlay(true));
		// dispatch(togglePopup([true, "createEmailTemplate", { type: "add", status, template_id, candidate_id, sendEmail: true, job_id }]));

		dispatch(
			sendEmail({
				candidateId: candidate_id,
				emailTemplateId: template_id,
				job_id: jobId,
			})
		);
		if (status === "New" || status === "Applied" || status === "Viewed") {
			handleUpdateStatus("Emailed", job_id, false);
		}
		e.stopPropagation();
	};

	const handleDownloadClick = (candidate, e) => {
		console.log("url ", candidate.resume_path);
		if (candidate.resume_path) {
			fetch(candidate.resume_path).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = "resume.pdf";
					a.click();
				});
			});
		} else {
			addToast("Could not find resume", {
				appearance: "warning",
				autoDismiss: true,
			});
		}
		e.stopPropagation();
	};

	const handleRowClick = (candidate) => {
		if (candidate.status === "New" || candidate.status === "Applied") {
			handleUpdateStatus("Viewed", candidate.job_app_id, false);
		}

		props.history.push("/jobs/candidate-view/" + candidate.job_id + "/" + candidate.candidate_id);

		// dispatch(getAppliedCandidateDetails(e.candidate_id, e.job_id));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(getCandidatesList(jobId));
		dispatch(getPostedJobs());
	}, [dispatch]);

	// useEffect(() => {
	// 	console.log(queryParams);
	// 	if (!!queryParams && Object.keys(queryParams).length) {
	// 		if (!!queryParams.status) {
	// 			let temp = queryParams.status.split(',');
	// 			setSelectedStatus([...selectedStatus, ...temp]);
	// 		}
	// 		if (!!queryParams.exp) {
	// 			setSelectedExperience([...selectedExperience, filtersList[1].options[queryParams.exp]]);
	// 		}
	// 		if (!!queryParams.lu) {
	// 			setSelectedLastUpdate([...selectedLastUpdate, filtersList[2].option[queryParams.lu]]);
	// 		}
	// 		if (!!queryParams.cri) {
	// 			setSelectedRedinessIndex([...selectedRedinessIndex, filtersList[3].options[queryParams.cri]]);
	// 		}
	// 	}
	// }, []);

	useEffect(() => {
		const jobTitleTemp = props.postedJobs.map((val) => {
			if (val.job_id == jobId) {
				return val.job_title;
			} else {
				return "";
			}
		});
		setJobTitle(jobTitleTemp);
	}, [props.postedJobs]);

	useEffect(() => {
		setCandidateList(props.candidatesList);
		//	handleApplyFilters();
	}, [props.candidatesList]);

	const handleFilterSelect = (option, id, title) => {
		if (document.getElementById(id).checked) {
			if (title === "Status") {
				setSelectedStatus([...selectedStatus, option]);
			}
			if (title === "Experience") {
				setSelectedExperience([...selectedExperience, option]);
			}
			if (title === "Last Update") {
				setSelectedLastUpdate([...selectedLastUpdate, option]);
			}
			if (title === "CredReadiness Range") {
				setSelectedRedinessIndex([...selectedRedinessIndex, option]);
			}
		}
		if (!document.getElementById(id).checked) {
			if (title === "Status") {
				setSelectedStatus(selectedStatus.filter((val) => val !== option));
			}
			if (title === "Experience") {
				setSelectedExperience(selectedExperience.filter((val) => val !== option));
			}
			if (title === "Last Update") {
				setSelectedLastUpdate(selectedLastUpdate.filter((val) => val !== option));
			}
			if (title === "CredReadiness Range") {
				setSelectedRedinessIndex(selectedRedinessIndex.filter((val) => val !== option));
			}
		}
	};

	const clearAll = () => {
		console.log("abhi ", props.candidatesList);
		filtersList.map((filter, i) => {
			let trimTitle = filter.title.replace(/ /g, "");
			filter.options.map((option, i) => {
				document.getElementById(trimTitle + "_" + i).checked = false;
			});
		});
		setCandidateList(props.candidatesList);
		setSelectedStatus([]);
		setSelectedExperience([]);
		setSelectedLastUpdate([]);
		setSelectedRedinessIndex([]);
		// setFilterOptions(false);
	};

	const handleApplyFilters = () => {
		setFilterOptions(false);
		let candidatesListStatusFiltered =
			selectedStatus.length !== 0
				? props.candidatesList.filter((val) => {
					for (let i = 0; i < selectedStatus.length; i++) {
						if (val.status == selectedStatus[i]) {
							return val;
						}
					}
				})
				: props.candidatesList;

		let candidatesListExpFiltered =
			selectedExperience.length !== 0
				? candidatesListStatusFiltered.filter((val) => {
					for (let i = 0; i < selectedExperience.length; i++) {
						if (selectedExperience[i] == "10+ years") {
							let exp = val.candidate_experience.substring(0, 2);
							if (parseInt(exp) >= 10) {
								return val;
							}
						}
						if (selectedExperience[i] == "6 to 9 years") {
							let exp = val.candidate_experience.substring(0, 2);
							if (parseInt(exp) >= 6 && parseInt(exp) <= 9) {
								return val;
							}
						}
						if (selectedExperience[i] == "3 to 5 years") {
							let exp = val.candidate_experience.substring(0, 2);
							if (parseInt(exp) >= 3 && parseInt(exp) <= 5) {
								return val;
							}
						}
						if (selectedExperience[i] == "0 to 2 years") {
							let exp = val.candidate_experience.substring(0, 2);
							if (parseInt(exp) >= 0 && parseInt(exp) <= 2) {
								return val;
							}
						}
					}
				})
				: candidatesListStatusFiltered;

		let candidatesListLastUpdateFiltered =
			selectedLastUpdate.length !== 0
				? candidatesListExpFiltered.filter((val) => {
					for (let i = 0; i < selectedLastUpdate.length; i++) {
						const today = new Date();
						if (selectedLastUpdate[i] == "1 Week") {
							let date = new Date(val.modified_on);
							let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
							if (date >= lastWeek && date <= today) {
								return val;
							}
						}
						if (selectedLastUpdate[i] == "2 Weeks") {
							let date = new Date(val.modified_on);
							let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
							let lastTwoWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
							if (date >= lastTwoWeeks && date <= lastWeek) {
								return val;
							}
						}
						if (selectedLastUpdate[i] == "3 Weeks") {
							let date = new Date(val.modified_on);
							let lastTwoWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
							let lastThreeWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21);
							if (date >= lastThreeWeeks && date <= lastTwoWeeks) {
								return val;
							}
						}
						if (selectedLastUpdate[i] == "4 Weeks +") {
							let date = new Date(val.modified_on);
							let lastFourWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28);
							if (date >= lastFourWeeks) {
								return val;
							}
						}
					}
				})
				: candidatesListExpFiltered;

		let candidatesListRedIndexFiltered =
			selectedRedinessIndex.length !== 0
				? candidatesListLastUpdateFiltered.filter((val) => {
					for (let i = 0; i < selectedRedinessIndex.length; i++) {
						if (selectedRedinessIndex[i] == "70 to 100 (Ready)") {
							if (parseInt(val.readiness_index) >= 71 && parseInt(val.readiness_index) <= 100) {
								return val;
							}
						}
						if (selectedRedinessIndex[i] == "41 to 70 (Almost Ready)") {
							if (parseInt(val.readiness_index) >= 41 && parseInt(val.readiness_index) <= 70) {
								return val;
							}
						}
						if (selectedRedinessIndex[i] == "0 to 40 (Getting Started)") {
							if (parseInt(val.readiness_index) >= 0 && parseInt(val.readiness_index) <= 40) {
								return val;
							}
						}
					}
				})
				: candidatesListLastUpdateFiltered;

		setCandidateList(candidatesListRedIndexFiltered);
	};

	const handleFreeSearch = (searchString) => {
		setCandidateList(
			props.candidatesList.filter(
				(val) =>
					(val.candidate_name && val.candidate_name.toLowerCase().includes(searchString.toLowerCase())) ||
					(val.current_organization && val.current_organization.toLowerCase().includes(searchString.toLowerCase())) ||
					(val.title && val.title.toLowerCase().includes(searchString.toLowerCase()))
			)
		);
	};

	const [filterOptions, setFilterOptions] = React.useState(false);

	const crRange = {
		heading: "CreadReadines Range",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const status = {
		heading: "Status",
		content: [
			"Viewed",
			// "New",
			"Emailed",
			"Phone",
			"Interviewed",
			"Offered",
			"Hired",
			"Rejected",
		],
	};
	const experience = {
		heading: "Experience",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const currentOrganisation = {
		heading: "Current Organisation",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};

	const filtersList = [
		{
			title: "Status",
			options: [
				//	"New",
				"Applied",
				"Viewed",
				"Emailed",
				"Phone",
				"Interviewed",
				// "Job",
				"Hired",
				"Rejected",
				"Offered",
				// "New",
			],
		},
		{
			title: "Experience",
			options: ["10+ years", "6 to 9 years", "3 to 5 years", "0 to 2 years"],
		},
		{
			title: "Last Update",
			options: ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks +"],
		},
		{
			title: "CredReadiness Range",
			options: ["70 to 100 (Ready)", "41 to 70 (Almost Ready)", "0 to 40 (Getting Started)"],
		},
	];

	const renderCandidateList = candidateList.map((candidate, i) => {
		let index = candidate.readiness_index;
		let crColor = index < 40 ? "red" : index > 70 ? "green" : "yellow";
		return (
			<ul key={i} id="candidate-list" onClick={() => handleRowClick(candidate)}>
				<li>
					{/* <input className="fancy-toggle" id={`row_${i}`} type="checkbox" /> */}
					<label htmlFor={`row_${i}`}>
						<span className="input"></span>
					</label>
				</li>
				<li>
					{/* <Link to="/jobs/candidate-view"> */}
					<Link
						id="candidate-list-name"
					// to={
					// 	"/jobs/candidate-view/" +
					// 	candidate.job_id +
					// 	"/" +
					// 	candidate.candidate_id
					// }
					>
						{/* <img src={faker.image.avatar()} alt="User" /> */}
						<img src={ImgUser} alt="User" />
						{candidate.candidate_name}
					</Link>
				</li>
				<li className="disp-left">
					<span>{candidate.title}</span>
				</li>
				<li className="disp-left">
					<span>{candidate.candidate_experience}</span>
				</li>
				<li className="disp-left">
					<span className={`cr_index ${crColor}`}>{candidate.readiness_index}</span>
				</li>
				<li className="disp-left current_organization">
					<span title={candidate.current_organization}>{candidate.current_organization}</span>
				</li>
				<li>
					<span>{candidate.modified_on ? new Date(candidate.modified_on).toDateString() : ""}</span>
				</li>
				<li onClick={(e) => e.stopPropagation()} className="email">
					<Dropdown
						placeholder={status.heading}
						content={status.content}
						selected={candidate.status}
						onchange={(item) => handleUpdateStatus(item, candidate.job_app_id)}
					/>
				</li>
				<li className="on-hover-show">
					<Link
						className="mail"
						onClick={(e) =>
							handleSendEmail(
								candidate.candidate_id,
								candidate.email_template_id,
								candidate.status,
								candidate.job_app_id,
								e
							)
						}
					>
						<img src={ImgMail} alt="Email" />
					</Link>
					<Link className="download" onClick={(e) => handleDownloadClick(candidate, e)}>
						<img src={ImgDownload} alt="Download" />
					</Link>
				</li>
			</ul>
		);
	});

	const sortList = (attr, dir) => {
		let temp = [];
		if (dir) {
			temp = props.candidatesList.sort(function (a, b) {
				const x = a[attr];
				const y = b[attr];
				return x < y ? 1 : x > y ? -1 : 0;
			});
		} else {
			temp = props.candidatesList.sort(function (a, b) {
				const x = a[attr];
				const y = b[attr];
				return x < y ? -1 : x > y ? 1 : 0;
			});
		}

		let x = temp.map((y) => {
			return y;
		});
		setCandidateList(x);
	};

	// console.log(props.candidatesList.length);
	return props.loading ? (
		<Spinner />
	) : (
			<div className="candidate-list">
				<div className="top-heading">
					<div className="candidate-navigation">
						<a className="my-jobs" href="/jobs">
							My Jobs >
					</a>
						<a href="#">Candidate List</a>
					</div>

					<h1>
						{/* Candidates for “Certified Nursing Assistant - in Warren New Jersey” */}
						Candidates for {jobTitle}
					</h1>
					<h3>
						CredReadiness Index for this job is{" "}
						{props.candidatesList && props.candidatesList.length ? props.candidatesList[0].readiness_index : 75}
					</h3>
				</div>
				{/* <div className="search-panel">
					<div className="searches">
						<input type="text" placeholder="Candidate Name" />
						<Dropdown placeholder={crRange.heading} content="slider" />
						<Dropdown placeholder={status.heading} content={status.content} onchange={handleUpdateStatus} />
						<Dropdown
							placeholder={experience.heading}
							content={experience.content}
						/>
						<Dropdown
							placeholder={currentOrganisation.heading}
							content={currentOrganisation.content}
						/>
					</div>
				</div> */}
				<div className="lists-outer">
					<div className="heading flex">
						<h2>List of Candidates</h2>
						{/* <p>Showing Result 1-10 of 200</p> */}
						<div className="search_filter flex">
							<Input
								type="text"
								placeholder="Search by Name/Position/Organization"
								onChange={(e) => handleFreeSearch(e.target.value)}
							/>
							<button
								className="primary-btn blue email_btn outline"
								onClick={() => {
									dispatch(toggleOverlay(true));
									dispatch(togglePopup([true, "createEmailTemplate", { type: "add", data: undefined }]));
								}}
							>
								Email Templates
						</button>
							<button className="primary-btn blue filter_btn" onClick={() => setFilterOptions(!filterOptions)}>
								<img src={ImgFilter} alt="Filter" />
							</button>
							<div className={`options ${filterOptions ? "on" : "off"}`}>
								<div className="listing">
									{filtersList.map((filter, i) => {
										let trimTitle = filter.title.replace(/ /g, "");
										return (
											<ul key={i}>
												<li>{filter.title}</li>
												{filter.options.map((option, i) => {
													return (
														<li key={i}>
															<input
																id={`${trimTitle}_${i}`}
																type="checkbox"
																className="fancy-toggle blue"
																onChange={() => handleFilterSelect(option, `${trimTitle}_${i}`, filter.title)}
															/>
															<label htmlFor={`${trimTitle}_${i}`}>
																<span className="input"></span>
																{option}
															</label>
														</li>
													);
												})}
											</ul>
										);
									})}
								</div>
								<div className="cta">
									<a className="clear-all" onClick={() => clearAll()}>
										Clear all
								</a>
									{/* <a className="clear-all">
										Clear all
									</a> */}
									<button className="primary-btn blue outline" onClick={() => setFilterOptions(false)}>
										Cancel
								</button>
									<button className="primary-btn blue" onClick={() => handleApplyFilters()}>
										Done
								</button>
								</div>
							</div>
						</div>
					</div>
					{props.candidatesList.length > 0 ? (
						<>
							{/* <div className="actions">
						<div className="left">
							<Link onClick={handleSendEmail} >Send Email</Link>
								&nbsp;&nbsp;{" |  "}&nbsp;&nbsp;
						<Link onClick={handleUpdateStatus}>Change Status</Link>
						</div>
						<div className="right">
							<input
								className="fancy-toggle"
								id="viewRejectedCandidate"
								type="checkbox"
							/>
							<label htmlFor="viewRejectedCandidate">
								<span className="input"></span>View Rejected Candidates
						</label>
						</div>
					</div> */}
							<ul className="lists">
								<li className="list">
									<ul className="head">
										<li>
											{/* <input className="fancy-toggle" id="1" type="checkbox" /> */}
											<label htmlFor="1">
												<span className="input"></span>
											</label>
										</li>
										<li
											onClick={() => {
												sortList("candidate_name", sortName);
												setSortName(!sortName);
											}}
										>
											<img src={ImgUser} alt="User" />
											Name
										<SortIcon active={sortName ? "up" : "down"} />
										</li>
										<li
											onClick={() => {
												sortList("title", sortTitle);
												setSortTitle(!sortTitle);
											}}
										>
											Current Position
										<SortIcon active={sortTitle ? "up" : "down"} />
										</li>
										<li
											onClick={() => {
												sortList("candidate_experience", sortExperience);
												setSortExperience(!sortExperience);
											}}
										>
											Exp (in years)
										<SortIcon active={sortExperience ? "up" : "down"} />
										</li>
										<li
											onClick={() => {
												sortList("readiness_index", sortIndex);
												setSortIndex(!sortIndex);
											}}
										>
											CredReadiness
										<SortIcon active={sortIndex ? "up" : "down"} />
										</li>
										<li
											onClick={() => {
												sortList("current_organization", sortOrg);
												setSortOrg(!sortOrg);
											}}
										>
											Current Organization
										<SortIcon active={sortOrg ? "up" : "down"} />
										</li>
										<li
											onClick={() => {
												sortList("modified_on", sortDate);
												setSortDate(!sortDate);
											}}
										>
											Last Update
										<SortIcon active={sortDate ? "up" : "down"} />
										</li>
										<li
											onClick={() => {
												sortList("status", sortStatus);
												setSortStatus(!sortStatus);
											}}
											className="email"
										>
											Status
										<SortIcon active={sortStatus ? "up" : "down"} />
										</li>
										<li>{/* Action */}</li>
									</ul>
									{renderCandidateList}
								</li>
							</ul>
						</>
					) : (
							<p>No candidates found for this job </p>
						)}
				</div>
				{/* <Pagination /> */}
			</div>
		);
	// )
}

function mapStateToProps(state) {
	return {
		candidatesList: state.employerReducer.candidatesList.data,
		postedJobs: state.employerReducer.postedJobs.data,
		loading: state.commonReducer.apiCallsInProgress,
	};
}

// export default CandidateList;
export default connect(mapStateToProps)(CandidateList);
