import React, { useReducer } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ImgDashboard from "../../assets/dashboard.png";
import ImgJobs from "../../assets/jobs.png";
import ImgGoals from "../../assets/goals.png";
import ImgProfile from "../../assets/profile.png";
import { clearEmployerState, setNewJob, jobToUpdateArray } from "../../store/actions/employer";
import { clearAuthState } from "../../store/actions/auth";
import { clearCandidateState } from "../../store/actions/candidate";
import { togglePopup, toggleOverlay } from "../../store/actions/popup_overlay";
import Cookies from "js-cookie";
import { strings } from "../../constants";
import "./index.scss";

const { MENU_FOR_CANDIDATE_ONBOARDING, MENU_FOR_NAVIGATING_DASHBOARD, MENU_TO_NAVIGATE_TO_EMPLOYER_POSTED_JOB, MENU_TO_CANDIDATE_JOBS, MENU_FOR_CANDIDATE_GOALS, MENU_FOR_CANDIDATE_APPLICATION, TO_LOG_OUT } = strings.CANDIDATE_ONBOARDING.OVERLAY;

function Navigation(props) {
	const [open, toggleOpen] = useReducer((open) => !open, false);
	const auth = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const [isMobileView, setIsMobileView] = React.useState();

	const handleLinkClick = () => {
		console.log("handleLinkClick");
		document.body.classList.remove("blendPopup");
		dispatch(toggleOverlay(false));
		dispatch(togglePopup(false));
		props.onLinkClick();
	};

	const resetJobFields = () => {
		dispatch(setNewJob({ jobTitle: null }));
		dispatch(setNewJob({ employmentType: null }));
		dispatch(setNewJob({ industry: null }));
		dispatch(setNewJob({ function: 1126 }));
		dispatch(setNewJob({ location: null }));
		dispatch(setNewJob({ openPositions: null }));
		dispatch(setNewJob({ jobDescription: null }));
		dispatch(setNewJob({ minExp: null }));
		dispatch(setNewJob({ maxExp: null }));
		dispatch(setNewJob({ jobCertificateMap: [{ id: 16859 }] }));
		dispatch(jobToUpdateArray(null));
	};

	const handlePostJob = () => {
		resetJobFields();
		props.history.push("/jobs/create-job");
	};

	const onLogout = () => {
		localStorage.clear();
		dispatch(clearEmployerState(null));
		dispatch(clearAuthState(null));
		dispatch(clearCandidateState(null));
		Cookies.remove("JWT");
	};
	const handleResize = (e) => {
		if (!!document.querySelector(".menu_outer")) {
			setIsMobileView(getComputedStyle(document.querySelector(".menu_outer")).display === "none");
		}
	};
	window.addEventListener("resize", handleResize);

	React.useEffect(() => {
		if (!!document.querySelector(".menu_outer")) {
			setIsMobileView(getComputedStyle(document.querySelector(".menu_outer")).display === "none");
		}
		// return () => {
		// 	window.removeEventListener("resize", handleResize);
		// };
	}, [isMobileView]);
	return (
		<nav className="navigation">
			<ul className="top">
				{auth.loggedIn.as === "candidate" && (
					<li>
						<NavLink className="flex" to="/goals" onClick={handleLinkClick}>
							<span className="icon flex">
								<img src={ImgGoals} alt="Link 3" />
								<span>{MENU_FOR_CANDIDATE_GOALS}</span>
							</span>
							<span className="text">{MENU_FOR_CANDIDATE_GOALS}</span>
						</NavLink>
					</li>
				)}
				{auth.loggedIn.as === "employer" && isMobileView ? null : (
					<li>
						<NavLink className="flex" to={"/dashboard"} onClick={handleLinkClick}>
							<span className="icon flex">
								<img src={ImgDashboard} alt={auth.loggedIn.as === "candidate" ? MENU_FOR_CANDIDATE_APPLICATION : MENU_FOR_NAVIGATING_DASHBOARD} />
								<span> {auth.loggedIn.as === "candidate" ? "Applications" : MENU_FOR_NAVIGATING_DASHBOARD}</span>
							</span>
							<span className="text">{auth.loggedIn.as === "candidate" ? MENU_FOR_CANDIDATE_APPLICATION : MENU_FOR_NAVIGATING_DASHBOARD}</span>
						</NavLink>
					</li>
				)}
				{auth.loggedIn.as === "employer" && isMobileView ? null : (
					<li>
						{auth.loggedIn.as === "candidate" ? (
							<NavLink className="flex" to="/jobs" onClick={handleLinkClick}>
								<span className="icon flex">
									<img src={ImgJobs} alt="Link 2" />
									<span>{MENU_TO_CANDIDATE_JOBS}</span>
								</span>
								<span className="text">{MENU_TO_CANDIDATE_JOBS}</span>
							</NavLink>
						) : (
								<NavLink className="flex" to="/jobs" onClick={toggleOpen}>
									<span className="icon flex">
										<img src={ImgJobs} alt="Link 2" />
										<span>{MENU_TO_NAVIGATE_TO_EMPLOYER_POSTED_JOB}</span>
									</span>
									<span className="text">{MENU_TO_NAVIGATE_TO_EMPLOYER_POSTED_JOB}</span>
								</NavLink>
							)}
						{auth.loggedIn.as === "employer" && open && (
							<ul>
								<li>
									<Link className="flex" exact onClick={() => { handleLinkClick(); handlePostJob() }}>
										<span className="icon flex">
											<img src={ImgJobs} alt="Link 2" />
											<span onClick={handlePostJob}>Post a Job</span>
										</span>
										<span className="text">Post a Job</span>
									</Link>
								</li>
								<li>
									<NavLink className="flex" to="/jobs" exact onClick={handleLinkClick}>
										<span className="icon flex">
											<img src={ImgJobs} alt="Link 2" />
											<span>Posted Jobs</span>
										</span>
										<span className="text">Posted Jobs</span>
									</NavLink>
								</li>
							</ul>
						)}
					</li>
				)}
				{auth.loggedIn.as === "employer" && isMobileView ? null : (
					<li>
						<NavLink
							className="flex"
							to={auth.loggedIn.as === "candidate" ? "/profile" : "/profile"}
							onClick={handleLinkClick}
						>
							<span className="icon flex">
								<img src={ImgProfile} alt="Link 4" />
								<span>{MENU_FOR_CANDIDATE_ONBOARDING}</span>
							</span>
							<span className="text">{MENU_FOR_CANDIDATE_ONBOARDING}</span>
						</NavLink>
					</li>
				)}
				<li className="mobile">
					<NavLink
						className="flex"
						to="/login"
						onClick={() => {
							handleLinkClick();
							onLogout();
						}}
					>
						<span className="text">{TO_LOG_OUT}</span>
					</NavLink>
				</li>
			</ul>
			{/* <ul className="bottom">
				<li>
					<NavLink className="flex" to="/term-and-conditions">
						<span className="icon flex">
							<img src={ImgTnc} alt="Link 1" />
							<span>T & C</span>
						</span>
						<span className="text">Term & Conditions</span>
					</NavLink>
				</li>
			</ul> */}
		</nav>
	);
}

export default withRouter(Navigation);
