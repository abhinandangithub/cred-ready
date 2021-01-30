import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./index.scss";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";
import ImgMail from "../../../../assets/email.svg";
import ImgDownload from "../../../../assets/download_resume.svg";
import {
	sendEmail,
	updateStatus,
	getAppliedCandidateDetails,
	getCandidatesList,
	getPostedJobs,
	getCandidatesByStatusAndRange,
	getCandidatesByRange,
	getCandidatesByAvailability,
} from "../../../../store/thunks/employer";
import Spinner from "../../../_Elements/Spinner";
import { useToasts } from "react-toast-notifications";

let listItems = [
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
	{
		name: "Mary Jane",
		exp: 12,
		index: 60,
	},
	{
		name: "Mary Jane",
		exp: 3,
		index: 34,
	},
	{
		name: "Mary Jane",
		exp: 7,
		index: 88,
	},
	{
		name: "Mary Jane",
		exp: 9,
		index: 27,
	},
	{
		name: "Mary Jane",
		exp: 11,
		index: 82,
	},
];

let scrollBarStyle = {
	width: "calc(100% - 15px)",
	height: "calc(100vh - 200px)",
};

function RecruitmentFunnelList(props) {
	console.log("cr abhi props ", props.info);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const { status, cri } = props.info;
	const { addToast } = useToasts();

	const closePopupOverlay = () => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false, ""));
	};

	useEffect(() => {
		// dispatch(getCandidatesList(props.info.jobId));
	}, [props.info.jobId]);

	useEffect(() => {
		const { jobId, type, previousDate, currentDate, status, cri } = props.info;
		if (type === "recruitmentFunnelChart") {
			dispatch(getCandidatesByStatusAndRange(jobId, previousDate, currentDate, status, cri));
		} else if (type === "applicantAvailability") {
			dispatch(getCandidatesByAvailability(jobId, previousDate, currentDate, cri));
		} else if (type === "range") {
			dispatch(getCandidatesByRange(jobId, previousDate, currentDate, cri));
		}
	}, [props.info.jobId]);

	useEffect(() => {
		console.log("cr abhi candidatesList ", props.candidatesList);
		const filterData = () => {
			// if (!!status && !!cri) {
			// 	let temp = props.candidatesList.filter((c) =>
			// 		c.status === status && c.readiness_index > cri.min && c.readiness_index < cri.max
			// 	);
			// 	setData(temp);
			// } else {
			// 	let temp = props.candidatesList.filter((c) =>
			// 		c.readiness_index > cri.min && c.readiness_index
			// 	);
			// 	setData(temp)
			// }
			setData(props.candidatesList);
		};
		filterData();
	}, [props.candidatesList]);

	const handleDownloadClick = (candidate, e) => {
		console.log("url ", candidate.resume_path);
		if (candidate.resume_path) {
			let name = candidate.resume_path.substr(candidate.resume_path.lastIndexOf("/") + 1);

			fetch(candidate.resume_path).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					// a.download = "resume.pdf";
					a.download = name ? name : "resume.pdf";
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

	return (
		<div className="recruitment_funnel_list">
			<h1>
				Candidate list <button className="common_plus_icon" onClick={closePopupOverlay}></button>
			</h1>

			<>
				<ul className="list">
					<li className="heading">
						<ul>
							<li>
								Name
								<br />
								Exp (in years)
							</li>
							<li>CreadReadiness</li>
						</ul>
					</li>
				</ul>

				<Scrollbars
					className="custom-scrollbar"
					style={scrollBarStyle}
					autoHide
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
				>
					{props.loading ? (
						<Spinner />
					) : (
							<ul className="list">
								{!!data && data.length && typeof (data) == "object" ? (
									data.map((item, i) => {
										let index = item.readiness_index;
										let crColor = index < 40 ? "red" : index > 70 ? "green" : "yellow";
										let icon =
											index < 40 ? (
												<FontAwesomeIcon className="down" icon={faSortDown} />
											) : index > 70 ? (
												<FontAwesomeIcon className="up" icon={faSortUp} />
											) : (
														<span className="mid">-</span>
													);

										return (
											<li key={i}>
												<ul>
													<li>
														<b>{item.candidate_name}</b>
														<br />
														<span className="years">{item.candidate_experience}s</span>
													</li>
													<li>
														<div className="cr_index_outer">
															<span className={`cr_index ${crColor}`}>{item.readiness_index}</span>
															{icon}
														</div>
														<div className="btns">
															{/* <span className="mail" onClick={(e) => console.log("mail")}>
														<img src={ImgMail} alt="Email" />
													</span> */}
															<span className="download" onClick={(e) => handleDownloadClick(item, e)}>
																<img src={ImgDownload} alt="Download" />
															</span>
														</div>
													</li>
												</ul>
											</li>
										);
									})
								) : (
										<p>No records found</p>
									)}
							</ul>
						)}
				</Scrollbars>

				<div className="cta">
					<Link to={`/jobs/candidates-list/${props.info.jobId}`} className="primary-btn blue" onClick={closePopupOverlay}>
						View details
				</Link>
				</div>
			</>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		candidatesList: state.employerReducer.candidatesList.data,
		postedJobs: state.employerReducer.postedJobs.data,
		loading: state.commonReducer.apiCallsInProgress,
	};
}

export default connect(mapStateToProps)(RecruitmentFunnelList);
