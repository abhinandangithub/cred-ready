import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import "./index.scss";
import ImgWidgetLogo from "../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../_Elements/CredReadyIndex";
import ImgMarginalAssociation from "../../../assets/widget-2.jpg";
import { getJobDetails } from "../../../store/thunks/employer";
import Cookies from "js-cookie";
import Spinner from "../../_Elements/Spinner";

function JobView(props) {
	let { id } = useParams();
	var isLoggedIn = false;
	const history = useHistory();
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const dispatch = useDispatch();
	const jwt = Cookies.get("JWT");
	let user = undefined;
	if (jwt) {
		user = JSON.parse(jwt).map.user_type;
	}
	useEffect(() => {
		if (jwt && user !== "employer") {
			history.push(`/jobs/view/${id}`);
		}
		dispatch(getJobDetails(id));
		window.scrollTo(0, 0);
	}, [id]);
	return loading ? (
		<Spinner />
	) : (
			<div
				className={`job-view-cmp flex ${props.isLoggedIn ? "" : "login_required"
					}`}
			>
				<div className="left">
					<div className="top">
						<div className="logo">
							<img
								src={
									props.jobDetails.logo_path
										? props.jobDetails.logo_path
										: ImgWidgetLogo
								}
								alt=""
							/>
						</div>
						<div className="info">
							<h3>{props.jobDetails.job_title}</h3>
							<p>{props.jobDetails.org_name}</p>
						</div>
						<div className="short-info">
							{/* <p>
								{props.jobDetails.min_experience +
									"-" +
									props.jobDetails.max_experience +
									" years"}
							</p> */}
							<p>
								{props.jobDetails.max_experience +
									" years"}
							</p>
							<p>{props.jobDetails.location}</p>
						</div>
					</div>
					<div className="bottom">
						<p>
							<h3>Job Description: </h3>
							<span className="text">
								<span
									dangerouslySetInnerHTML={{
										__html: props.jobDetails.job_description,
									}}
								></span>
							</span>
						</p>
						<ul className="common-skills-list">
							<li>Certificates: </li>
							{!!props.jobDetails.certificates &&
								props.jobDetails.certificates.length > 0 &&
								props.jobDetails.certificates.map((val, i) => {
									return <li key={i}>{val.title_name}</li>;
								})}
						</ul>
						<p>
							{/* <span className="heading">Skills: </span> */}
							<span className="text">
								{/* {props.jobDetails.strengths.map((value) => value.name + ', ')} */}
							</span>
						</p>
						<div className="cta flex">
							{user !== "employer" ? (
								props.isLoggedIn ? (
									<>
										<p>Are you interested in applying for this position?</p>
										<Link className="primary-btn" to="/jobs/application">
											Apply
									</Link>
									</>
								) : (
										<>
											<p>
												Your CredReadiness for this job is unknown, login to check
												if you are CredReady for this job
									</p>
											<Link className="primary-btn blue" to="/signup">
												Login to apply
									</Link>
										</>
									)
							) : (
									""
								)}
						</div>
					</div>
				</div>
				{user !== "employer" ? (<div className="right">
					<div className="meter">
						<>
							<h4 className="cred-details">Your CredReadiness</h4>
							The scores below indicate how prepared you are for this position.
							Based on your experience
					</>
						<CredReadyIndex index={82} />
						<div className={`${props.isLoggedIn ? "hidden" : "login_screen"}`}>
							<p>Not enough information to calculate your CredReady score.</p>
							<h2 className="pay"></h2>
							<p>Login and enter your profile details to view your score</p>
							<div className="cta flex position">
								<Link className="primary-btn blue landing" to="/signup">
									Login to view
							</Link>
							</div>
						</div>
					</div>
					<div className="marginal">
						<h3>Potential for improving CredReadiness Builders</h3>
						<img src={ImgMarginalAssociation} alt="Marginal Association" />
						<div
							className={`${props.isLoggedIn ? "hidden" : "login_screen"}`}
						></div>
					</div>
				</div>) : ""}
			</div>
		);
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.employerReducer.isLoggedIn,
		loggedInAs: state.authReducer.loggedIn,
		jobDetails: state.employerReducer.jobDetails.data,
	};
}

export default connect(mapStateToProps)(JobView);
