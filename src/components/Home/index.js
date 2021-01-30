import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
// import { Breadcrumbs } from "react-breadcrumbs-dynamic";

import "./index.scss";
import Header from "../Header";
import Navigation from "../Navigation";
import Footer from "../Footer";
// import Breadcrumbs from "../_Elements/Breadcrumbs/Breadcrumbs";

import CandidateDashboard from "../Candidate/Dashboard";
import CandidateProfile from "../Candidate/Profile";
import CandidateJobs from "../Candidate/Jobs";

import EmployerDashboard from "../Employer/Dashboard";
import EmployerProfile from "../Employer/Profile";
import EmployerPostedJobs from "../Employer/PostedJobs";
import EmployerCreateJob from "../Employer/CreateJob";
import EmployerGeneralQuestions from "../Employer/CreateJob/GeneralQuestions";
import EmployerCreateJobOld from "../Employer/CreateJob_old"; // Rakko: Abhi-Sachin you can check old logic for create job
import EmployerCandidateList from "../Employer/CandidateList";
import EmployerCandidateListFilter from "../Employer/CandidateListFilter";
import EmployerCandidateView from "../Employer/CandidateView";

import JobApplied from "../Candidate/Jobs/JobApplied";
import JobApplication from "../Candidate/Jobs/Application";
import JobApply from "../Candidate/Jobs/JobApply";
import Questions from "../Candidate/Jobs/Questions";
import JobSpecificQuestions from "../Candidate/Jobs/JobSpecificQuestions";
import Goals from "../Candidate/Goals";
import GoalView from "../Candidate/Goals/GoalView";
import ExploreGoals from "../Candidate/Goals/ExploreGoals";
import TermsAndConditions from "../TermsAndConditions";
import Cookies from "js-cookie";
import Logout from "../Header/Logout";
import { togglePopup, toggleOverlay } from "../../store/actions/popup_overlay";

let scrollBarStyle = {
	position: "fixed",
	height: "calc(100vh - 70px)",
	top: "70px",
	transition: "all 0.2s ease",
};

let width = document.body.clientWidth;

function Home(props) {
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.authReducer);
	const profile = useSelector((state) => state.employerReducer.profile.data);
	const postedJobs = useSelector((state) => state.employerReducer.postedJobs.data);

	const [navOpen, setNavOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const allData = useSelector((state) => state.candidateSetDataReducer.data);

	if (navOpen) {
		scrollBarStyle = {
			...scrollBarStyle,
			width: "calc(100vw - 230px)",
			left: "230px",
		};
	} else {
		scrollBarStyle = {
			...scrollBarStyle,
			width: "calc(100vw - 85px)",
			left: "85px",
		};
	}

	const scrollBar = React.useRef();

	const handleResize = (e) => {
		width = document.body.clientWidth;
	};

	document.body.addEventListener("click", (e) => {
		if (e.target.closest(".scroll-wrapper") && navOpen) {
			setNavOpen(false);
		}
		if (e.target.closest("header .user") === null && userMenuOpen) {
			setUserMenuOpen(false);
		}
	});

	useEffect(() => {
		document.body.addEventListener("keydown", (e) => {
			if (e.code === "Escape" || e.key === "Escape" || e.keyCode === 27) {
				if (document.querySelector(".popup-scroll-area").classList.contains("active")) {
					dispatch(togglePopup(false));
				}
				if (document.querySelector(".home+.overlay").classList.contains("active")) {
					dispatch(toggleOverlay(false));
				}
			}
		});

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		setUserMenuOpen(false);
	}, [props.history.location.pathname]);

	if (scrollBar.current) {
		scrollBar.current.view.scroll({
			top: 0,
		});
	}

	const renderContent = (
		<div className="scroll-wrapper">
			<div className="content">
				<Switch>
					{profile.name === "" || profile.name === undefined ? (
						<Redirect exact from="/" to="/profile" />
					) : auth.loggedIn.as === "employer" ? (
						postedJobs.length ? (
							<Redirect exact from="/" to="/dashboard" />
						) : (
							<Redirect exact from="/" to="/jobs" />
						)
					) : (
						<Redirect exact from="/" to="/dashboard" />
					)}

					{auth.loggedIn.as === "candidate" ? (
						<>
							<Route exact path="/dashboard" component={CandidateDashboard} />
							<Route path="/profile" component={CandidateProfile} />
							<Route exact path="/jobs" component={CandidateJobs} />
							<Route exact path="/jobs/preview/:id" component={JobApplied} />
							<Route path="/jobs/view/:id" component={JobApply} />
							<Route exact path="/jobs/application" component={JobApplication} />
							<Route exact path="/jobs/application/:id" component={JobApplication} />
							<Route
								path="/jobs/questions"
								exact
								render={(props) => <Questions showEmployerQuestions={true} {...props} />}
							/>
							<Route
								path="/jobs/questions/:id"
								exact
								render={(props) => <Questions showEmployerQuestions={true} {...props} />}
							/>
							<Route exact path="/jobs/job-specefic-questions" component={JobSpecificQuestions} />
							<Route exact path="/goals" component={Goals} />
							<Route exact path="/goals/explore-goals" component={ExploreGoals} />
							<Route exact path="/goals/current/:id" component={GoalView} />
							<Route exact path="/goals/alternate/:id" component={GoalView} />
							<Route path="/logout" component={Logout} />
						</>
					) : (
						<Switch>
							<Route exact path="/dashboard" component={EmployerDashboard} />
							<Route exact path="/jobs" component={EmployerPostedJobs} />
							<Route exact path="/job/:jobId" component={EmployerPostedJobs} />
							<Route exact path="/jobs/create-job" component={EmployerCreateJob} />
							<Route exact path="/jobs/create-job/general-questions" component={EmployerGeneralQuestions} />
							{/* <Route exact path="/jobs/create-job" component={EmployerCreateJobOld} /> */}
							<Route exact path="/jobs/create-job/:jobId" component={EmployerCreateJob} />
							<Route
								exact
								// path="/jobs/candidates-list"
								path="/jobs/candidates-list/:jobId"
								component={EmployerCandidateList}
							/>
							<Route
								exact
								// path="/jobs/candidates-list"
								path="/jobs/candidates-list-filter/:jobId"
								component={EmployerCandidateListFilter}
							/>
							{/* <Route
											exact
											path="/jobs/candidate-view"
											component={EmployerCandidateView}
										/> */}
							<Route exact path="/jobs/candidate-view/:jobId/:candidateId" component={EmployerCandidateView} />
							<Route path="/profile" component={EmployerProfile} />
							<Route path="/logout" component={Logout} />
						</Switch>
					)}
					<Route path="/term-and-conditions" component={TermsAndConditions} />
				</Switch>
			</div>
			<Footer />
		</div>
	);

	return (
		<div
			className={`home ${navOpen ? "open" : ""} ${
				props.history.location.pathname.indexOf("/jobs/view") >= 0 ||
				props.history.location.pathname.indexOf("/jobs/preview") >= 0
					? "job_view_page"
					: ""
			}`}
		>
			<Header
				onMenuClick={() => setNavOpen(!navOpen)}
				onUserMenuClick={() => setUserMenuOpen(!userMenuOpen)}
				userMenuOpen={userMenuOpen}
			/>
			<Navigation onLinkClick={() => setNavOpen(false)} />

			{props.history.location.pathname.indexOf("/jobs/view") >= 0 ||
			props.history.location.pathname.indexOf("/jobs/preview") >= 0 ? (
				renderContent
			) : (
				<Scrollbars
					className="custom-scrollbar"
					style={scrollBarStyle}
					autoHide
					ref={scrollBar}
					initialScrollTop={0}
					autoHideTimeout={1000}
					autoHideDuration={600}
					// onKeyDown={(e) => e.preventDefault()}
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
					{renderContent}
				</Scrollbars>
			)}
		</div>
	);
}

export default Home;
