import React from "react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";

import "../JobApplied/index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import {
	fetchJobDescription,
	fetchjobViewData,
	fetchAllAnswers,
	fetchCandidateDetails,
} from "../../../../modals/candidateProfile/thunk";
import Spinner from "../../../_Elements/Spinner";
import { showToast } from "../../../../store/actions/toast";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";
import Application from "../Application";

let scrollBarStyle = {
	height: "100%",
	transition: "all 0.2s ease",
};

let scrollBarStyleRight = {
	height: "calc(100% - 60px)",
	transition: "all 0.2s ease",
};
const { useRef } = React;

function JobApply(props) {
	const dispatch = useDispatch();
	const childRef = useRef();
	const [refresh, doRefresh] = React.useState(0);
	const [isHover, setisHover] = React.useState(false);
	const [update, setUpdate] = React.useState(false);
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const [waiting, setWaiting] = React.useState(false);
	const allData = useSelector((state) => state.setJobDescriptionReducer.data);
	const allJobData = useSelector(
		(state) => state.setCandidateJobViewDataReducer.data
	);
	const jobDetails = allData;
	var candidateData = useSelector(
		(state) => state.candidateSetDataReducer.data
	);
	var index =
		allJobData.candidateJobApplication &&
		allJobData.candidateJobApplication.readiness_index;
	var titles =
		allJobData.candidateJobApplication &&
		allJobData.candidateJobApplication.marginal_associations.map(
			(entity) => entity.metric
		);
	var values =
		allJobData.candidateJobApplication &&
		allJobData.candidateJobApplication.marginal_associations.map(
			(entity) => entity.score
		);
	let show_Graphs = allJobData.jobDetails ? true : false;
	React.useEffect(() => {
		dispatch(fetchAllAnswers());
		setTimeout(function () {
			dispatch(fetchjobViewData(props.match.params.id));
			setTimeout(function () {
				setWaiting(true);
			}, 1500);
		}, 2000);
		dispatch(fetchJobDescription(props.match.params.id));
		dispatch(fetchCandidateDetails());
		window.scrollTo(0, 0);
	}, []);

	const parentButton = () => {
		setUpdate(true);
	};

	const resetUpdate = () => {
		setUpdate(false);
	};
	const reset = () => {
		doRefresh(0);
	};
	const renderTopInfo = (
		<div className="main_info">
			{/* <div className="logo">
				<img src={ImgWidgetLogo} alt="" />
			</div> */}
			<div className="info">
				<h3>{jobDetails ? jobDetails.job_title : ""}</h3>
				<p>
					{jobDetails &&
						jobDetails.organization &&
						jobDetails.organization.org_name}
				</p>
			</div>
			<div className="short-info">
				<p>
					{jobDetails ? jobDetails.min_experience : ""}-
					{jobDetails ? jobDetails.max_experience : ""} Years
				</p>
				<p>
					{jobDetails ? jobDetails.address && jobDetails.address.state : ""}
				</p>
			</div>
		</div>
	);
	const renderDescription = (
		<div className="main_info">
			<p>
				<span className="heading">Job Description: </span>
				<span className="text">
					<span
						dangerouslySetInnerHTML={{
							__html: jobDetails ? jobDetails.jobDescription : "",
						}}
						style={{ color: "black" }}
					></span>
					<span
						dangerouslySetInnerHTML={{
							__html: allData && allData.job_description,
						}}
					></span>
				</span>
			</p>
		</div>
	);

	const onClickHandler = () => {
		if (
			!candidateData.first_name ||
			!candidateData.last_name ||
			!candidateData.current_employment_status ||
			!candidateData.available_within
		) {
			dispatch(
				showToast({
					message: "Complete Your Profile to Apply for This Job",
					type: "warning",
					isShow: true,
				})
			);
		} else {
			console.log("sachinView", refresh);
			if (allJobData && allJobData.jobDetails) {
				if (update === true) {
					doRefresh((prev) => "update" + prev + 1);
				} else doRefresh((prev) => prev + 1);
			} else {
				props.history.push(`/jobs/questions/${props.match.params.id}`);
			}
		}
	};

	return loading ? (
		<Spinner />
	) : (
			<div className={`job-view-cmp flex ${show_Graphs ? "" : "hide_Graphs"}`}>
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
						{allJobData && allJobData.jobDetails ? (
							<Application
								refresh={refresh}
								updateButton={parentButton}
								reset={reset}
								resetUpdate={resetUpdate}
							/>
						) : (
								""
							)}
					</Scrollbars>
				</div>

				<div className="right">
					{/* <Scrollbars
					className="custom-scrollbar"
					style={scrollBarStyleRight}
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
					renderTrackHorizontal={({ style, ...props }) => (
						<div
							{...props}
							className="hbar"
							style={{
								...style,
							}}
						/>
					)}
				> */}
					{renderTopInfo}
					{renderDescription}

					{waiting === false ? (
						<p style={{ color: "black" }}>
							We are calculating your CredReadiness and Marginal Association
							please wait...
						</p>
					) : !show_Graphs ? (
						<p style={{ color: "black" }}>
							You need to give answers for some questions to see Marginal
							Association and CredReadiness
						</p>
					) : (
								""
							)}
					<div className="meter">
						<h4 className="cred-details">Your CredReady details</h4>

						<div className="text_index">
							<p>
								The scores below indicate how prepared you are for this position.
								Based on your experience
						</p>
							<CredReadyIndex index={index} />
						</div>

						<div
							className={`${props.isLoggedIn ? "hidden" : "graph_overlay"}`}
						></div>
					</div>

					<div className="marginal">
						<h4>Potential for improving CredReadiness</h4>
						<MarginalAssociation titles={titles} values={values} height1="30%" />
						<div
							className={`${props.isLoggedIn ? "hidden" : "graph_overlay"}`}
						></div>
					</div>
					{/* </Scrollbars> */}

					<div className="cta flex" style={{ bottom: !waiting ? "-70px" : "0" }}>
						{index < 75 && isHover ? (
							<p
								className={
									window.location.pathname.includes("applied") && update === false
										? "hidden"
										: ""
								}
								style={{ color: "red" }}
							>
								You have lower readiness index than expected. Having higher
								readiness index improves the chances of being hired.
								<br /> Are you sure you want to apply?
							</p>
						) : null}
						{waiting ? (
							<button
								className={
									window.location.pathname.includes("applied") && update === false
										? "hidden"
										: index < 75 && update === false
											? "primary-btn blue "
											: "primary-btn blue "
								}
								to={
									allJobData && allJobData.jobDetails
										? `/jobs/view/${props.match.params.id}`
										: `/jobs/questions/${props.match.params.id}`
								}
								onMouseEnter={() => setisHover(true)}
								onMouseLeave={() => setisHover(false)}
								onClick={() => {
									onClickHandler();
								}}
							>
								{allJobData && allJobData.jobDetails
									? update === true
										? "Update my CredReadiness"
										: "Apply for the job"
									: "Proceed"}
							</button>
						) : (
								<Spinner />
							)}
					</div>
				</div>
			</div>
		);
}

export default JobApply;
