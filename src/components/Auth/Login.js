import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector, connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { tryLogin } from "../../store/thunks/auth";
import { setLogin, setRedirectURL } from "../../store/actions/employer";
import { updateLoggedIn, updateRememberMe } from "../../store/actions/auth";
import {
	addOtherEducationExperience,
	fetchAllAnswers,
	fetchCandidateDetails,
} from "../../modals/candidateProfile/thunk";
import Spinner from "../_Elements/Spinner";
import { initRadioClick } from "../../assets/js/Utility";
import { strings } from "../../constants";
const { PAGE_TITLE, PAGE_TITLE_MOBILE, EMAIL_PH, PASSWORD_PH, BUTTON_TO_LOGIN, LINK_TO_FORGOT_PASSWORD_PAGE, LINK_TO_CREATE_ACCOUNT, ERROR } = strings.CANDIDATE_SIGN_IN;

function Login(props) {
	const auth = useSelector((state) => state.authReducer);
	const redirectUrl = useSelector((state) => state.employerReducer.redirectURL);
	const allData = useSelector((state) => state.candidateSetDataReducer.data);
	const flag = useSelector((state) => state.flagReducer.data);
	const otherWorkExp = useSelector((state) =>
		state.candidateSetDataReducer.data.additional_experiences
			? state.candidateSetDataReducer.data.additional_experiences.find(
				(entity) => entity.career_path === "work"
			)
			: ""
	);
	const otherEducationExp = useSelector((state) =>
		state.candidateSetDataReducer.data.additional_experiences
			? state.candidateSetDataReducer.data.additional_experiences.find(
				(entity) => entity.career_path === "EDUCATION"
			)
			: ""
	);

	const redirectURL = useSelector((state) => state.employerReducer.redirectURL);
	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();
	const { addToast } = useToasts();

	const [loginRemeber, setLoginRemeber] = useState(
		localStorage.remember_me ? JSON.parse(localStorage.remember_me) : false
	);
	console.log("localStorage.remember_me ", localStorage.remember_me);
	const [passwordShown, setPasswordShown] = useState(false);

	const onSubmit = (data) => {
		dispatch(
			tryLogin(
				{
					username: data.email,
					password: data.password,
					remember_me: loginRemeber,
				},
				props
			)
		);
		if (localStorage.getItem("jobId"));
		dispatch(fetchAllAnswers());

		if (redirectURL !== "") {
			dispatch(setLogin(true));
			props.history.push(redirectURL);
		} else {
			props.history.push("/dashboard");
		}
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const toggleLoginRemeberme = (event) => {
		if (!event.target) return;
		dispatch(updateRememberMe(event.target.checked));
		setLoginRemeber(event.target.checked);
		localStorage.remember_me = event.target.checked;
	};

	useEffect(() => {
		console.log("auth ", auth.loggedIn);

		if (auth.loggedIn.as === "error") {
			// addToast(auth.loggedIn.value, {
			// 	appearance: "error",
			// 	autoDismiss: true,
			// });
			dispatch(updateLoggedIn(["", ""]));
		} else if (auth.loggedIn.value && auth.loggedIn.value !== "") {
			dispatch(fetchCandidateDetails());
			if (auth.loggedIn.as === "employer") {
				if (redirectUrl) {
					let url = redirectUrl.split("/");
					let route = url.slice(3, url.length);

					props.history.push(route.join("/"));
					dispatch(setRedirectURL(undefined));
				} else {
					props.history.push("/");
				}
			}
			if (flag && auth.loggedIn.as === "candidate") {
				// console.log(allData);
				// console.log(otherWorkExp);
				// if (localStorage.getItem("jobId") && !allData.first_name) {
				// 	props.history.push("/profile/resume");
				// }
				if (allData.has_active_job_app && !localStorage.getItem("jobId")) {
					props.history.push("/dashboard");
				} else {
					if (!allData.resume_path) {
						props.history.push("/profile/resume");
					} else if (
						!allData.first_name ||
						!allData.last_name ||
						!allData.current_employment_status ||
						!allData.available_within
					) {
						props.history.push("/profile/personal-details");
					} else if (allData.work_experience.length < 1 || !otherWorkExp) {
						props.history.push("/profile/work-experience");
					} else if (
						allData.education_experience.length < 1 ||
						!otherEducationExp ||
						allData.certificate < 1
					) {
						props.history.push("/profile/education");
					} else if (
						localStorage.getItem("jobId") &&
						allData.first_name &&
						(allData.work_experience.length > 1 || otherWorkExp) &&
						(allData.education_experience.length > 1 ||
							otherEducationExp ||
							allData.certificate > 1)
					) {
						props.history.push("/jobs/questions");
					} else if (auth.loggedIn.as === "candidate") {
						props.history.push("/dashboard");
					} else {
						props.history.push("/dashboard");
					}
				}
			}
		}
		return () => {
			// cleanup
		};
	}, [auth, allData, flag]);

	useEffect(() => {
		initRadioClick(".log_in");
	}, []);

	return props.loading ? (
		<Spinner />
	) : (
			<form onSubmit={handleSubmit(onSubmit)} className="content log_in">
				<h2 className="welcomeText mobile">{PAGE_TITLE_MOBILE.TITLE}</h2>
				<h3 style={{ marginBottom: "40px" }} className="login_account">
					{PAGE_TITLE}
				</h3>
				{errors.email && errors.email && (
					<p className="error">Enter an valid email-id</p>
				)}
				{!errors.email && errors.password && (
					<p className="error">Please enter a valid password</p>
				)}

				<ul className="fields">
					<li>
						<label htmlFor="email">
							E-mail<span>*</span>
						</label>
						<input
							id="email"
							name="email"
							type="emai"
							autoComplete="off"
							placeholder={EMAIL_PH}
							ref={register({
								required: "Required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								},
							})}
						/>
					</li>

					<li>
						<label htmlFor="password">
							Password<span>*</span>
						</label>
						<div className="password">
							<input
								id="password"
								name="password"
								type={passwordShown ? "text" : "password"}
								autoComplete="nothing"
								placeholder={PASSWORD_PH}
								ref={register({
									required: "required",
									// pattern: {
									// 	value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
									// },
								})}
							/>
							<span
								className="toggle"
								onClick={togglePasswordVisiblity}
								id="togglePasswordVisiblity"
							>
								<FontAwesomeIcon
									icon={passwordShown ? faEye : faEyeSlash}
									className="lines"
								/>
							</span>
						</div>
					</li>
				</ul>
				<div className="help-block flex" role="radiogroup">
					<span
						className="option radio_button"
						role="radio"
						aria-checked="false"
						tabindex="0"
					>
						<input
							className="fancy-toggle checkbox blue"
							id="rememberMe"
							name="rememberMe"
							type="checkbox"
							onChange={toggleLoginRemeberme}
							checked={loginRemeber}
						/>
						<label htmlFor="rememberMe">
							<span className="input"></span>Remember Me
					</label>
					</span>
					<Link to="/forgot-password" className="forgot" id="forgotPasswordLink">
						{LINK_TO_FORGOT_PASSWORD_PAGE}
					</Link>
				</div>
				<button className="primary-btn blue" type="submit" id="loginSubmit">
					{BUTTON_TO_LOGIN}
				</button>
				<p className="donthaveaccount">
					Don't have an account?{" "}
					<Link to="/signup" id="signupLink" className="textunderline">
						{LINK_TO_CREATE_ACCOUNT}
					</Link>
				</p>
				<div className="mobile"></div>
			</form>
		);
}

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
	};
}

export default connect(mapStateToProps)(Login);
