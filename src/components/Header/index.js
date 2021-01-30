import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faBars,
	faTimes,
	faAngleDown,
	faHome,
	faUser,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import ImgLogo from "../../assets/logo-blue.png";
import ImgUserPlaceholder from "../../assets/user-placeholder.jpg";
import { updateLoggedIn, clearAuthState, setLoggedOut } from "../../store/actions/auth";
import { clearEmployerState } from "../../store/actions/employer";
import { clearCandidateState } from "../../store/actions/candidate";

import "./index.scss";
import { setDataFlag } from "../../modals/candidateProfile/actions";
import { fetchCandidateDetails } from "../../modals/candidateProfile/thunk";
import { strings } from "../../constants";
import { getProfileThunk } from "../../store/thunks/employer";
const { TO_LOG_OUT, NAVIGATE_TO_CHANGE_PROFILE } = strings.CANDIDATE_ONBOARDING.OVERLAY;

function Header(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const allData = useSelector((state) => state.candidateSetDataReducer.data);
	const employerProfile = useSelector((state) => state.employerReducer.profile);

	useEffect(() => {
		dispatch(getProfileThunk());
	}, [dispatch]);

	const [picSource, setPicSource] = React.useState(allData.profile_image_path);
	const onLogout = () => {
		localStorage.clear();
		// props.history.push("/login");
		// dispatch(clearEmployerState(null));
		// dispatch(clearAuthState(null));
		// dispatch(clearCandidateState(null));
		// dispatch(setDataFlag(false));
		Cookies.remove("JWT");
		dispatch(setLoggedOut(true));
		//window.location.replace(window.location.origin + '/login').reload();
		// Cookies.remove("JWT");
	};

	React.useEffect(() => {
		setPicSource(allData.profile_image_path);
	}, [allData]);

	return (
		<header className="header flex">
			<div className="left flex">
				<div className="menu_outer">
					<button className="menu" onClick={props.onMenuClick}>
						<FontAwesomeIcon icon={faBars} className="lines" />
						<FontAwesomeIcon icon={faAngleLeft} className="arrow" />
						<FontAwesomeIcon icon={faTimes} className="close" />
					</button>
				</div>
				<a href="https://www.credready.com/" className="logo" target="_blank">
					<img src={ImgLogo} alt="CredReady" />
				</a>
			</div>
			<div className="right flex">
				{/* {
					auth.loggedIn.as === "candidate" ?
						<a className="notification flex" href="https://www.credready.com/" target="_blank">
							<div className="icon">
								<svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
            </svg>
            <span className="count flex">4</span>
								<FontAwesomeIcon icon={faHome} className="close" /> Home
					</div>
						</a> : ""
				} */}
				<div className={`user flex ${props.userMenuOpen === true ? "active" : ""}`} onClick={props.onUserMenuClick}>
					<div className="user-info flex">
						{auth.loggedIn.as === "candidate" ? (
							<img className="pic" src={picSource ? picSource : ImgUserPlaceholder} alt="John Doe" />
						) : (
							<img
								className="pic"
								src={
									employerProfile && employerProfile.data && employerProfile.data.org.logo_path
										? employerProfile.data.org.logo_path
										: ImgUserPlaceholder
								}
								alt="John Doe"
							/>
						)}
						<div className="user-name">{/* Your Name */}</div>
						<FontAwesomeIcon className="arrow" icon={faAngleDown} />
					</div>
					<ul className="user-nav">
						<li>
							<Link to={auth.loggedIn.as === "candidate" ? "/profile/personal-details" : "/profile/edit"}>
								<FontAwesomeIcon icon={faUser} /> {NAVIGATE_TO_CHANGE_PROFILE}
							</Link>
						</li>
						<li>
							<Link to="/logout">
								<FontAwesomeIcon icon={faSignOutAlt} /> {TO_LOG_OUT}
							</Link>
						</li>
					</ul>
				</div>
				<div className="menu_outer">
					<button className="menu" onClick={props.onMenuClick}>
						<FontAwesomeIcon icon={faBars} className="lines" />
						<FontAwesomeIcon icon={faAngleLeft} className="arrow" />
						<FontAwesomeIcon icon={faTimes} className="close" />
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
