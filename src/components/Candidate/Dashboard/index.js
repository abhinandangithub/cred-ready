import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.scss";
import userData from "../../_data/userData.json";
import widgetLogo from "../../../assets/widget-logo.jpg";
import WidgetCurrentGoal from "../../_Elements/Widgets/CurrentGoal";
import WidgetLatestOpenings from "../../_Elements/Widgets/LatestOpenings";
import CredReadyIndex from "../../_Elements/CredReadyIndex";
import { getCandidateJobApplications } from "../../../store/thunks/candidate";
import {
	fetchCandidateCurrentStatus,
	fetchCurrentGoals,
} from "../../../modals/candidateProfile/thunk";
import Spinner from "../../_Elements/Spinner";

function Dashboard(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const allCurrentGoals = useSelector(
		(state) => state.setCurrentGoalsReducer.data
	);
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const [currentGoal, setCurrentGoal] = React.useState(
		allCurrentGoals && allCurrentGoals.map((entity) => entity.goal)
	);
	const [showOpenings, setshowOpenings] = React.useState(false);
	const [latestOpening, setLatestOpening] = React.useState(props.relatedJobs);
	const [application, setApplication] = React.useState(
		props.candidateJobApplications ? props.candidateJobApplications : []
	);

	const handleSearch = (searchSting, key) => {
		if (props.relatedJobs) {
			let temp = props.relatedJobs.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			setLatestOpening(temp);
		}
		if (props.candidateJobApplications) {
			let temp = props.candidateJobApplications.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			setApplication(temp);
		}
		if (userData.goals.current.length > 0 && key !== "location") {
			if (key === "jobTitle") key = "name";
			let temp =
				allCurrentGoals &&
				allCurrentGoals
					.map((entity) => entity.goal)
					.filter((val) =>
						val[key].toLowerCase().includes(searchSting.toLowerCase())
					);
			console.log("sachinTemp", temp);
			setCurrentGoal(temp);
		}
	};

	const currentGoals = currentGoal.map((goal, i) => {
		return <WidgetCurrentGoal currentGoal={goal} key={i} />;
	});

	const latestOpenings = latestOpening.map((opening, i) => {
		return <WidgetLatestOpenings job={opening} key={i} />;
	});

	useEffect(() => {
		setCurrentGoal(
			allCurrentGoals && allCurrentGoals.map((entity) => entity.goal)
		);
	}, [allCurrentGoals]);

	useEffect(() => {
		dispatch(getCandidateJobApplications());
		dispatch(fetchCurrentGoals());
	}, []);

	useEffect(() => {
		setApplication(props.candidateJobApplications);
		setLatestOpening(props.relatedJobs);
	}, [props.candidateJobApplications, props.relatedJobs]);

	// useEffect(() => { }, [showOpenings]);
	const [activeApplication, setActiveApplication] = React.useState(0);

	return (
		<div className="dashboard-candidate">
			<div className="common-main-heading">
				<h2>Applications</h2>
				{/* <button className="btn">Sort by</button> */}
			</div>
			<div className="search-panel">
				<div className="searches">
					<input
						type="text"
						placeholder="Search by Job Title"
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

			<div className="application-status">
				<div className="common-main-heading no-icon">
					<h2>Application Status</h2>
					{/* <button className="btn">View All &gt;</button> */}
				</div>

				{loading ? (
					<Spinner />
				) : application.length === 0 ? (
					"No Applications Found"
				) : (
					<div className="listing flex">
						<div className="left">
							<ul>
								{application.map((application, i) => {
									return (
										<li
											onClick={() =>
												history.push(`/jobs/preview/${application.jobId}`)
											}
											onMouseOver={() => setActiveApplication(i)}
											className={
												application.length === 1
													? "active"
													: activeApplication === i
													? "active"
													: ""
											}
											key={i}
										>
											{/* <div className="logo">
											<img src={widgetLogo} alt="Logo" />
										</div> */}
											<div className="text">
												<h2>{application.jobTitle}</h2>
												{/* <p
												dangerouslySetInnerHTML={{
													__html: application.jobDescription,
												}}
											></p> */}
												<p>
													{application.orgName} - {application.location}
												</p>
												<p>
													Applied on:{" "}
													{application.appliedOn &&
													application.appliedOn.charAt(5) === ","
														? application.appliedOn.slice(0, 11)
														: application.appliedOn.slice(0, 12)}
												</p>
											</div>
											<div className="btn_outer">
												<button className="primary-btn blue outline">
													{application.currentAppStatus}
												</button>
												<CredReadyIndex
													index={parseInt(application.readinessIndex)}
												/>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="right flex pc">
							{parseInt(
								props.candidateJobApplications[activeApplication] &&
									props.candidateJobApplications[activeApplication]
										.readinessIndex
							) ? (
								<CredReadyIndex
									index={parseInt(
										props.candidateJobApplications[activeApplication] &&
											props.candidateJobApplications[activeApplication]
												.readinessIndex
									)}
								/>
							) : (
								<Spinner />
							)}
						</div>
					</div>
				)}
			</div>

			<div className="current-goals mobile">
				<div className="common-main-heading no-icon">
					<h2
						onClick={() => setshowOpenings(false)}
						className={showOpenings ? "" : "active"}
					>
						Current Goals
					</h2>
					<h2
						onClick={() => setshowOpenings(true)}
						className={showOpenings ? "active" : ""}
					>
						Latest Openings
					</h2>
				</div>
				<div className={`widgets ${showOpenings ? "hidden" : ""}`}>
					{currentGoals}
				</div>
				<div className={`widgets ${showOpenings ? "" : "hidden"}`}>
					{latestOpenings}
				</div>
			</div>

			<div className="current-goals pc">
				<div className="common-main-heading no-icon">
					<h2>Current Goals</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				{loading ? (
					<Spinner />
				) : currentGoals.length === 0 ? (
					<>
						"No Goals Found" <br />
						<br />
						<br />
						<br />
					</>
				) : (
					<div className="widgets">{currentGoals}</div>
				)}
			</div>

			<div className="alternate-goals pc">
				<div className="common-main-heading no-icon">
					<h2>Latest Openings</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				{latestOpenings && latestOpenings.length > 0 ? (
					<div className="widgets">{latestOpenings}</div>
				) : (
					"No Jobs Found"
				)}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		candidateJobApplications:
			state.candidateReducer.jobApplications.data.appliedJobs,
		relatedJobs: state.candidateReducer.jobApplications.data.relatedJobs,
	};
}

// export default Dashboard;
export default connect(mapStateToProps)(Dashboard);
