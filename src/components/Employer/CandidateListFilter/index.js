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
import { object } from "prop-types";
const queryString = require('query-string');
const faker = require("faker");

function CandidateList(props) {
	let { jobId } = useParams();
	let queryParams = queryString.parse(props.location.search);

	const [selectedStatus, setSelectedStatus] = useState([]);
	const [selectedExperience, setSelectedExperience] = useState([]);
	const [selectedLastUpdate, setSelectedLastUpdate] = useState([]);
	const [selectedRedinessIndex, setSelectedRedinessIndex] = useState([]);
	const [selectedCid, setSelectedCid] = useState(null);

	const { addToast } = useToasts();
	const [sortName, setSortName] = useState(true);
	const [sortCredReadiness, setCredReadiness] = useState(true);
	const [sortExperience, setSortExperience] = useState(true);
	const [sortTitle, setSortTitle] = useState(true);
	const [sortIndex, setSortIndex] = useState(true);
	const [sortOrg, setSortOrg] = useState(true);
	const [sortDate, setSortDate] = useState(true);
	const [sortStatus, setSortStatus] = useState(true);
	const [isFilterApplied, setIsFilterApplied] = useState(true);
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
	const [originalCandidateList, setOriginalCandidateList] = useState(props.candidatesList);
	const [searchCandidateList, setSearchCandidateList] = useState(props.candidatesList);

	const handleUpdateStatus = (e, job_app_id) => {
		dispatch(
			updateStatus({
				jobAppId: job_app_id,
				status: e,
			})
		);
		let candidateListTemp = candidateList.map((val) => {
			if (val.job_app_id == job_app_id) {
				val.status = e;
			}
			return val;
		});
		setCandidateList(candidateListTemp);
	};

	const handleSendEmail = (candidate_id, template_id) => {
		dispatch(
			sendEmail({
				candidateId: candidate_id,
				emailTemplateId: template_id,
				job_id: jobId,
			})
		);
	};

	const handleDownloadClick = (candidate) => {
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
	};

	const handleRowClick = (e) => {
		dispatch(getAppliedCandidateDetails(e.candidate_id, e.job_id));
	};

	useEffect(() => {
		dispatch(getCandidatesList(jobId));
		dispatch(getPostedJobs());
	}, [dispatch]);

	const [filtersList, setFiltersList] = useState([
		{
			title: "Status",
			options: [
				"New",
				"Applied",
				"Viewed",
				"Emailed",
				"Phone",
				"Interviewed",
				"Hired",
				"Rejected",
				"Offered",
			],
			optionsObj: [
				{ name: "New", checked: false },
				{ name: "Applied", checked: false },
				{ name: "Viewed", checked: false },
				{ name: "Emailed", checked: false },
				{ name: "Phone", checked: false },
				{ name: "Interviewed", checked: false },
				{ name: "Hired", checked: false },
				{ name: "Rejected", checked: false },
				{ name: "Offered", checked: false },
			],
		},
		{
			title: "Experience",
			options: ["10+ years", "6 to 9 years", "3 to 5 years", "0 to 2 years"],
			optionsObj: [{ name: "10+ years", checked: false },
			{ name: "6 to 9 years", checked: false },
			{ name: "3 to 5 years", checked: false },
			{ name: "0 to 2 years", checked: false }],
		},
		{
			title: "Last Update",
			options: ["1 Week",
				"2 Weeks",
				"3 Weeks",
				"4 Weeks +"],
			optionsObj: [{ name: "1 Week", checked: false },
			{ name: "2 Weeks", checked: false },
			{ name: "3 Weeks", checked: false },
			{ name: "4 Weeks +", checked: false }],
		},
		{
			title: "CredReadiness Range",
			options: [
				"70 to 100 (Ready)",
				"41 to 70 (Almost Ready)",
				"0 to 40 (Getting Started)",
			],
			optionsObj: [
				{ name: "70 to 100 (Ready)", checked: false },
				{ name: "41 to 70 (Almost Ready)", checked: false },
				{ name: "0 to 40 (Getting Started)", checked: false }
			],
		},
	]);

	useEffect(() => {
		if (!!queryParams && Object.keys(queryParams).length) {
			if (!!queryParams.status) {
				let temp = queryParams.status.split(',');
				setSelectedStatus([...selectedStatus, ...temp]);
				temp.map((status) => {
					let list = filtersList;
					let indexOfName = list[0].options.indexOf(status);
					list[0]["optionsObj"][indexOfName].checked = true;
					setFiltersList(list);
				});
			}
			if (!!queryParams.exp) {
				let temp = queryParams.exp.split(',');
				let res = [];
				for (let x = 0; x < temp.length; x++) {
					res.push(filtersList[1].options[Number(temp[x])]);
				}
				setSelectedExperience([...selectedExperience, ...res]);
				temp.map((exp) => {
					let list = filtersList;
					list[1]["optionsObj"][exp].checked = true;
					setFiltersList(list);
				});
			}
			if (!!queryParams.lu) {
				let temp = queryParams.lu.split(',');
				let res = [];
				for (let x = 0; x < temp.length; x++) {
					res.push(filtersList[2].options[Number(temp[x])]);
				}
				setSelectedLastUpdate([...selectedLastUpdate, ...res]);
				temp.map((exp) => {
					let list = filtersList;
					list[2]["optionsObj"][exp].checked = true;
					setFiltersList(list);
				});
			}
			if (!!queryParams.cri) {
				let temp = queryParams.cri.split(',');
				let res = [];
				for (let x = 0; x < temp.length; x++) {
					res.push(filtersList[3].options[Number(temp[x])]);
				}
				setSelectedRedinessIndex([...selectedRedinessIndex, ...res]);
				temp.map((exp) => {
					let list = filtersList;
					list[3]["optionsObj"][exp].checked = true;
					setFiltersList(list);
				});
			}
			if (!!queryParams && queryParams.cid) {
				let temp = queryParams.cid.split(',');
				setSelectedCid(temp);
			}
		}
	}, []);

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
		if (!!selectedCid) {
			let res = [];
			let temp = [];
			selectedCid.map((cusId) => {
				temp = props.candidatesList.find((obj) => obj.candidate_id == cusId)
				if (!!temp)
					res.push(temp);
			});
			setCandidateList(res);
			setOriginalCandidateList(res);
			setSearchCandidateList(res);
		} else {
			setCandidateList(props.candidatesList);
			setOriginalCandidateList(props.candidatesList);
			setSearchCandidateList(props.candidatesList);
			handleApplyFilters(props.candidatesList);
		}
	}, [props.candidatesList]);

	const handleFilterSelect = (option, id, title, index, checked) => {
		// if (document.getElementById(id).checked)
		if (!checked) {
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
		// if (!document.getElementById(id).checked)
		if (checked) {
			if (title === "Status") {
				setSelectedStatus(selectedStatus.filter((val) => val !== option));
			}
			if (title === "Experience") {
				setSelectedExperience(
					selectedExperience.filter((val) => val !== option)
				);
			}
			if (title === "Last Update") {
				setSelectedLastUpdate(
					selectedLastUpdate.filter((val) => val !== option)
				);
			}
			if (title === "CredReadiness Range") {
				setSelectedRedinessIndex(
					selectedRedinessIndex.filter((val) => val !== option)
				);
			}
		}
		let temp = filtersList;
		let indexOfName = temp[index].options.indexOf(option);
		temp[index]["optionsObj"][indexOfName].checked = !checked;
		console.log('abhi temp[index] ', temp[index]);
		setFiltersList(temp);
	};

	const clearAll = () => {
		console.log("abhi ", props.candidatesList);
		let temp = filtersList.map((filter, i) => {
			let trimTitle = filter.title.replace(/ /g, "");
			filter.optionsObj.map((option, i) => {
				// document.getElementById(trimTitle + '_' + i).checked = false;
				option.checked = false;
			})
		});
		setFilterOptions(temp);
		setCandidateList(props.candidatesList);
		setSelectedStatus([]);
		setSelectedExperience([]);
		setSelectedLastUpdate([]);
		setSelectedRedinessIndex([]);
	}

	const handleApplyFilters = (listData) => {
		setFilterOptions(false);
		let candidatesListStatusFiltered =
			selectedStatus.length !== 0
				? listData.filter((val) => {
					for (let i = 0; i < selectedStatus.length; i++) {
						if (val.status == selectedStatus[i]) {
							return val;
						}
					}
				})
				: listData;

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
							let lastWeek = new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate() - 7
							);
							if (date >= lastWeek && date <= today) {
								return val;
							}
						}
						if (selectedLastUpdate[i] == "2 Weeks") {
							let date = new Date(val.modified_on);
							let lastWeek = new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate() - 7
							);
							let lastTwoWeeks = new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate() - 14
							);
							if (date >= lastTwoWeeks && date <= lastWeek) {
								return val;
							}
						}
						if (selectedLastUpdate[i] == "3 Weeks") {
							let date = new Date(val.modified_on);
							let lastTwoWeeks = new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate() - 14
							);
							let lastThreeWeeks = new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate() - 21
							);
							if (date >= lastThreeWeeks && date <= lastTwoWeeks) {
								return val;
							}
						}
						if (selectedLastUpdate[i] == "4 Weeks +") {
							let date = new Date(val.modified_on);
							let lastFourWeeks = new Date(
								today.getFullYear(),
								today.getMonth(),
								today.getDate() - 28
							);
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
							if (
								parseInt(val.readiness_index) >= 71 &&
								parseInt(val.readiness_index) <= 100
							) {
								return val;
							}
						}
						if (selectedRedinessIndex[i] == "41 to 70 (Almost Ready)") {
							if (
								parseInt(val.readiness_index) >= 41 &&
								parseInt(val.readiness_index) <= 70
							) {
								return val;
							}
						}
						if (selectedRedinessIndex[i] == "0 to 40 (Getting Started)") {
							if (
								parseInt(val.readiness_index) >= 0 &&
								parseInt(val.readiness_index) <= 40
							) {
								return val;
							}
						}
					}
				})
				: candidatesListLastUpdateFiltered;

		setCandidateList(candidatesListRedIndexFiltered);
		setOriginalCandidateList(candidatesListRedIndexFiltered);
		setSearchCandidateList(candidatesListRedIndexFiltered);
		// if (isFilterApplied && candidatesListRedIndexFiltered && candidatesListRedIndexFiltered.length && !!selectedCid) {
		if (isFilterApplied && candidatesListRedIndexFiltered && candidatesListRedIndexFiltered.length) {
			setOriginalCandidateList(candidatesListRedIndexFiltered);
			setSearchCandidateList(candidatesListRedIndexFiltered);
			setIsFilterApplied(false);
		}
	};

	const handleFreeSearch = (searchString) => {
		let filtredList = searchCandidateList.filter((val) =>
			val.candidate_name.toLowerCase().includes(searchString.toLowerCase())
		)
		setCandidateList(filtredList);
		//	searchCandidateList(filtredList);
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
			"New",
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

	const [isMobileView, setIsMobileView] = useState(false);

	useEffect(() => {
		if (!!document.querySelector(".menu_outer")) {
			console.log('abhi isMobileView ', isMobileView, getComputedStyle(document.querySelector(".menu_outer")).display);
			setIsMobileView(getComputedStyle(document.querySelector(".menu_outer")).display ===
				"none");
		}
	}, [isMobileView])

	const renderCandidateList = candidateList && candidateList.length ? candidateList.map((candidate, i) => {
		let index = candidate.readiness_index;
		let crColor = index < 40 ? "red" : index > 70 ? "green" : "yellow";
		return (
			<ul key={i} id="candidate-list" >
				<li>
					{/* <input className="fancy-toggle" id={`row_${i}`} type="checkbox" /> */}
					<label htmlFor={`row_${i}`}>
						<span className="input"></span>
					</label>
				</li>
				<li>
					{/* <Link to="/jobs/candidate-view"> */}
					<Link
						onClick={() => handleRowClick(candidate)}
						to={
							"/jobs/candidate-view/" +
							candidate.job_id +
							"/" +
							candidate.candidate_id
						}
					>
						{/* <img src={faker.image.avatar()} alt="User" /> */}
						<img src={ImgUser} alt="User" />
						{candidate.candidate_name}
					</Link>
				</li>
				<li>{candidate.title}</li>
				<li>{candidate.candidate_experience}</li>
				<li>
					<span className={`cr_index ${crColor}`}>
						{candidate.readiness_index}
					</span>
				</li>
				<li>{candidate.current_organization}</li>
				<li>{candidate.modified_on}</li>
				<li>
					<Dropdown
						placeholder={status.heading}
						content={status.content}
						selected={candidate.status}
						onchange={(item) => handleUpdateStatus(item, candidate.job_app_id)}
					/>
				</li>
				<li>
					<Link
						className="mail"
						onClick={() =>
							handleSendEmail(
								candidate.candidate_id,
								candidate.email_template_id
							)
						}
					>
						<img src={ImgMail} alt="Email" />
					</Link>
					<Link
						className="download"
						onClick={() => handleDownloadClick(candidate)}
					>
						<img src={ImgDownload} alt="Download" />
					</Link>
				</li>
			</ul>
		);
	}) : "";

	const sortList = (attr, dir) => {
		let temp = [];
		if (dir) {
			temp = originalCandidateList.sort(function (a, b) {
				const x = a[attr];
				const y = b[attr];
				return x < y ? 1 : x > y ? -1 : 0;
			});
		} else {
			temp = originalCandidateList.sort(function (a, b) {
				const x = a[attr];
				const y = b[attr];
				return x < y ? -1 : x > y ? 1 : 0;
			});
		}

		let x = temp.map(y => {
			return y;
		})
		setCandidateList(x);
	}


	// console.log(props.candidatesList.length);
	return isMobileView ? <div>You can only view a candidate's profile on your device. Please use the web version of this application to view all details.</div> :
		props.loading ? (
			<Spinner />
		) : (
				<div className="candidate-list">
					<div className="top-heading">
						<h1>
							{/* Candidates for “Certified Nursing Assistant - in Warren New Jersey” */}
							Candidates for {jobTitle}
						</h1>
						<h3>CredReadiness Index for this job is {props.candidatesList && props.candidatesList.length ? props.candidatesList[0].readiness_index : 75}</h3>
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
									placeholder="Search by Name"
									onChange={(e) => handleFreeSearch(e.target.value)}
								/>
								<button
									className="primary-btn blue filter_btn"
									onClick={() => setFilterOptions(!filterOptions)}
								>
									<img src={ImgFilter} alt="Filter" />
								</button>
								<div className={`options ${filterOptions ? "on" : "off"}`}>
									<div className="listing">
										{filtersList.map((filter, index) => {
											let trimTitle = filter.title.replace(/ /g, "");
											return (
												<ul key={index}>
													<li>{filter.title}</li>
													{filter.optionsObj.map((option, i) => {
														return (
															<li key={i}>
																<input
																	id={`${trimTitle}_${i}`}
																	type="checkbox"
																	className="fancy-toggle blue"
																	onChange={() =>
																		handleFilterSelect(
																			option.name,
																			`${trimTitle}_${i}`,
																			filter.title,
																			index,
																			option.checked
																		)
																	}
																	checked={option.checked}
																/>
																<label htmlFor={`${trimTitle}_${i}`}>
																	<span className="input"></span>
																	{option.name}
																</label>
															</li>
														);
													})}
												</ul>
											);
										})}
									</div>
									<div className="cta">
										<a className="clear-all"
											onClick={() => clearAll()}>
											Clear all
									</a>
										<button
											className="primary-btn blue outline"
											onClick={() => setFilterOptions(false)}
										>
											Cancel
								</button>
										<button
											className="primary-btn blue"
											// onClick={() => handleApplyFilters(originalCandidateList)}
											onClick={() => handleApplyFilters(props.candidatesList)}
										>
											Done
								</button>
									</div>
								</div>
							</div>
						</div>
						{/* {JSON.stringify(originalCandidateList)} */}
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
											<li onClick={() => {
												sortList('candidate_name', sortName)
												setSortName(!sortName);
											}}>
												<img src={ImgUser} alt="User" />
												Name
										<SortIcon active={sortName ? "up" : "down"} />
											</li>
											<li onClick={() => {
												sortList('title', sortTitle)
												setSortTitle(!sortTitle);
											}}>
												Current Position
										<SortIcon active={sortTitle ? "up" : "down"} />
											</li>
											<li onClick={() => {
												sortList('candidate_experience', sortExperience)
												setSortExperience(!sortExperience);
											}}>
												Exp (in years)
										<SortIcon active={sortExperience ? "up" : "down"} />
											</li>
											<li onClick={() => {
												sortList('readiness_index', sortIndex)
												setSortIndex(!sortIndex);
											}}
											>CredReadiness
										<SortIcon active={sortIndex ? "up" : "down"} />
											</li>
											<li onClick={() => {
												sortList('current_organization', sortOrg)
												setSortOrg(!sortOrg);
											}}>
												Current Organization
										<SortIcon active={sortOrg ? "up" : "down"} />
											</li>
											<li onClick={() => {
												sortList('modified_on', sortDate)
												setSortDate(!sortDate);
											}}>Last Update
										<SortIcon active={sortDate ? "up" : "down"} />
											</li>
											<li onClick={() => {
												sortList('status', sortStatus)
												setSortStatus(!sortStatus);
											}}>
												Status
										<SortIcon active={sortStatus ? "up" : "down"} />
											</li>
											<li>Action</li>
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
