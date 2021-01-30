import React from "react";
import { Link } from "react-router-dom";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import Spinner from "../../../_Elements/Spinner";
import {
	addCurrentGoal,
	fetchGoalsById,
} from "../../../../modals/candidateProfile/thunk";

function GoalView(props) {
	const dispatch = useDispatch();
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const goalsDetails = useSelector(
		(state) => state.candidateSetGoalsByIdReducer.data
	);
	let urlLink = props.match.url;
	console.log(urlLink.charAt(7));

	const addCurrentGoalHandler = () => {
		let Id = props.match.params.id;
		dispatch(addCurrentGoal(Id, props));
	};
	React.useEffect(() => {
		dispatch(fetchGoalsById(props.match.params.id));
		window.scrollTo(0, 0);
	}, []);

	return loading ? (
		<Spinner />
	) : (
			<div className="goal-view-cmp">
				<div className="outerPart">
					<div className="goalsPart">
						{urlLink.charAt(7) === "c" ? "My Goals" : " Alternate Goals"}
					</div>
					{`>`}
					<div className="exploreGoalsPart">
						{goalsDetails.name}
					</div>
				</div>
				{urlLink.charAt(7) === "c" ? (
					""
				) : (

						<div className="common-heading-button">
							<h1 className="heading" style={{ visibility: "hidden" }}>
								Goals
							</h1>
							<button className="btn plus" onClick={addCurrentGoalHandler}>
								Add to My Goals
							</button>
						</div>
					)}
				<h2 className="pay">
					{goalsDetails.name}
				</h2>

				<div className="top">
					{/* <div className="index-marginal flex">
					<div className="index">
						<h2>CredReadiness</h2>
						<CredReadyIndex index={80} noSubHeading />
					</div>
					<div className="marginal">
						<h2>Marginal Association</h2>
						<MarginalAssociation />
					</div>
				</div> */}
					{/* <p>
					<span className="left">Industry: Patient care</span>
					<span className="left">Wage: $32,000</span>
					<span className="right">Job Openings: 3</span>
				</p> */}
					<ul className="table">
						<li className="heading">{goalsDetails.name}</li>
						<li>
							<span>{goalsDetails.job_summary}</span>
						</li>
					</ul>
					{/* </div> */}
					{/* <div className="bottom"> */}
					<h2 className="pay"></h2>
					<ul className="table">
						<li className="heading">Quick Facts: {goalsDetails.name}</li>
						<li>
							<span>Median Pay Hourly</span>
							{
								goalsDetails.goalDetails &&
									goalsDetails.goalDetails.median_pay_hourly
									?
									<span>${goalsDetails.goalDetails &&
										goalsDetails.goalDetails.median_pay_hourly} per hour</span> : <span>-</span>
							}
						</li>
						<li>
							<span>Median Pay Yearly</span>
							{
								goalsDetails.goalDetails &&
									goalsDetails.goalDetails.median_pay_yearly ?
									<span>${goalsDetails.goalDetails &&
										goalsDetails.goalDetails.median_pay_yearly} per year</span> : <span>-</span>
							}
						</li>
						<li>
							<span>Typical Entry-Level Education</span>
							<span>
								{goalsDetails.goalDetails &&
									goalsDetails.goalDetails.entry_level_education}
							</span>
						</li>
						<li>
							<span>Work Experience in a Related Occupation</span>
							<span>
								{goalsDetails.goalDetails &&
									goalsDetails.goalDetails.work_experience}
							</span>
						</li>
						<li>
							<span>On-the-job Training</span>
							<span>
								{goalsDetails.goalDetails &&
									goalsDetails.goalDetails.otj_training}
							</span>
						</li>
						{/* <li>
						<span>Number of Jobs, 2018-2028</span>
						<span>{goalsDetails.goalDetails && goalsDetails.goalDetails.employment}</span>
					</li> */}
						<li>
							<span>Projected growth (2018-2028)</span>
							<span>
								{goalsDetails.goalDetails &&
									goalsDetails.goalDetails.projected_growth}
							</span>
						</li>
						<li>
							<span>Employment (2018)</span>
							<span>
								{goalsDetails.goalDetails && goalsDetails.goalDetails.employment}
							</span>
						</li>
					</ul>
				</div>
			</div>
		);
}

export default GoalView;
