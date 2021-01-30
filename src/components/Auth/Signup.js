import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector, connect } from "react-redux";
import { togglePopup, toggleOverlay } from "../../store/actions/popup_overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getVerificationCode } from "../../store/thunks/auth";
import { getOrgNames } from "../../store/thunks/employer";
import { updateLoggedIn, updateSignupDetails } from "../../store/actions/auth";
import Spinner from "../_Elements/Spinner";
import { updateTermsAndConditions } from "../../store/actions/auth";
import InputDropdown from "../_Elements/InputDropdown";
import { handleKeyUpPhone, handleKeyDownPhone } from "../../assets/js/Utility";
import { initRadioClick } from "../../assets/js/Utility";
import { strings } from "../../constants";
const { PAGE_TITLE, PAGE_TITLE_MOBILE, ARE_YOU_A, EMAIL_PH, PHONE_PH, PASSWORD_PH, PASSWORD_DESCRIPTION_TEXT, BUTTON_TO_CREATE_ACCOUNT, WELCOME_NOTE, ERROR } = strings.CANDIDATE_SIGN_UP;
function Signup(props) {
	const dispatch = useDispatch();
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const auth = useSelector((state) => state.authReducer);
	const { register, handleSubmit, errors, formState, getValues } = useForm();

	const [signupType, setSignupType] = useState("candidate");
	const [passwordShown, setPasswordShown] = useState(false);
	const [functions, setFunctions] = useState(props.functionData);
	const [orgId, setOrgId] = useState();
	const [orgName, setOrgName] = useState();
	const [orgPhone, setOrgPhone] = useState();
	const [agree, setAgree] = useState(false);

	useEffect(() => {
		dispatch(getOrgNames());
	}, [dispatch]);

	useEffect(() => {
		setFunctions(props.functionData);
	}, [props.functionData]);

	useEffect(() => {
		initRadioClick(".content.sign_up");
	}, []);

	const handleFunctionSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.functionData.filter((val) => {
			if (val.org_name.toLowerCase().includes(value.toLowerCase())) {
				return {
					id: val.orgId,
					val: val.org_name,
				};
			}
		});
		setFunctions([...filteredData]);
	};

	const handleChangeFunction = (id) => {
		setOrgId(id);
		if (!!id && typeof id === "number") {
			let name = functions.find((val) => orgId === val.orgId);
			setOrgName(name);
		} else {
			setOrgName(id);
		}
	};

	const onSubmit = (data) => {
		if (
			document.querySelector("#function input") &&
			signupType === "employer" &&
			document.querySelector("#function input").value === ""
		)
			return null;

		data.user_type = signupType === "candidate" ? "jobseeker" : signupType;

		if (signupType === "employer") {
			if (typeof orgId !== "number") {
				data.organisation = orgId;
			} else {
				data.orgId = orgId;
			}
		}

		data.phone = data.phone
			.replace(/\(/g, "")
			.replace(/\)/g, "")
			.replace(/-/g, "")
			.replace(/ /g, "");

		data.phone = data.phone.trim();
		dispatch(getVerificationCode(data));
		// dispatch(toggleOverlay(true));
		// //dispatch(togglePopup([true, "termsAndConditions"]));
		// dispatch(togglePopup([true, "phoneOtp"]));
		// dispatch(updateLoggedIn([false, signupType]));
		// dispatch(updateSignupDetails(data));

		let boolValue = data.termsandconditions && data.allowContact;

		boolValue = data.termsandconditions;

		dispatch(updateTermsAndConditions(boolValue));
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleSignupTypeToggle = (id) => {
		setSignupType(id);
	};

	const showErrorMessage = (obj) => {
		if (
			document.querySelector("#function input") &&
			signupType === "employer" &&
			document.querySelector("#function input").value === ""
		) {
			document.querySelector("#function input").focus();
			return <p className="error">Organization Name is required.</p>;
		} else if (errors.email) {
			return <p className="error">{ERROR.EMAIL_ERROR}</p>;
		} else if (errors.phone) {
			return <p className="error">{ERROR.PHONE_ERROR}</p>;
		} else if (errors.password) {
			return (
				<p className="error">
					{ERROR.PASSWORD_ERROR}
				</p>
			);
		} else if (errors.agree) {
			return <p className="error">{ERROR.TERMS_AND_CONDITIONS_ERROR}</p>;
		}
	};

	return loading ? (
		<Spinner />
	) : (
			<form onSubmit={handleSubmit(onSubmit)} className="content sign_up">
				<h2 className="welcomeText mobile">{PAGE_TITLE_MOBILE.TITLE}</h2>
				<h3 className="login_account">{PAGE_TITLE}</h3>

				{showErrorMessage()}

				<ul className="fields">
					<li>
						<label>Are you a</label>
						<div className="user-type">
							<input
								className="block-toggle blue"
								id="candidateRadioInput"
								name="userType"
								type="radio"
								checked={signupType === "candidate"}
								// defaultChecked
								onChange={(e) => handleSignupTypeToggle("candidate")}
							/>
							<label htmlFor="candidateRadioInput">{ARE_YOU_A.CANDIDATE}</label>
							<span>Or</span>
							<input
								className="block-toggle blue"
								id="employerRadioInput"
								name="userType"
								type="radio"
								checked={signupType === "employer"}
								onChange={(e) => handleSignupTypeToggle("employer")}
							/>
							<label htmlFor="employerRadioInput">{ARE_YOU_A.EMPLOYER}</label>
						</div>
					</li>

					{signupType === "employer" ? (
						<li>
							<label htmlFor="function">
								Organization Name<span>*</span>
							</label>
							<InputDropdown
								placeholder="Identify your organization (start typing to search)"
								content={
									functions &&
									functions.map((val) => ({
										val: val.org_name,
										id: val.orgId,
									}))
								}
								allow_random
								search_term
								intellisense
								id="function"
								selected={
									(functions &&
										typeof orgId === "number" &&
										functions.find((val) => val.orgId === orgId).org_name) ||
									orgName
								}
								//value={orgName}
								onchange={(value) => {
									handleChangeFunction(value);
									// handleFunctionSearch(value);
								}}
							/>
						</li>
					) : null}
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
							// defaultValue="a@gmail.com"
							ref={register({
								required: "Required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								},
							})}
						/>
					</li>
					<li>
						<label htmlFor="phone">
							Phone number<span>*</span>
						</label>
						<input
							id="phone"
							name="phone"
							type="text"
							autoComplete="nothing"
							placeholder={PHONE_PH}
							onInput={(e) => {
								var x = e.target.value;

								if (e.target.value[0] === "1") {
									// if (x.length === 4) x = x.substring(1);
									x = x
										.replace(/\D/g, "")
										.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
									e.target.value = !x[3]
										? x[1] + x[2]
										: !x[2]
											? x[1]
											: x[1] + " (" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
								} else {
									x = x.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
									e.target.value = !x[2]
										? x[1]
										: "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
								}
							}}
							// onKeyDown={handleKeyDownPhone}
							// onKeyUp={handleKeyUpPhone}
							// onChange={handleKeyDownPhone}
							// onChange={(e) => {
							// 	let phone = e.target.value;
							// 	setOrgPhone(phone);
							// }}
							// autoFocus
							// value={orgPhone}
							// defaultValue={orgPhone ? orgPhone : ""}
							// pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
							ref={register({
								required: "required",
								pattern: {
									value: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
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
								autoComplete="off"
								placeholder={PASSWORD_PH}
								// defaultValue="12#@sdfSDF"
								ref={register({
									required: "required",
									pattern: {
										value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/,
									},
								})}
							/>
							<span className="toggle" onClick={togglePasswordVisiblity}>
								<FontAwesomeIcon
									icon={passwordShown ? faEye : faEyeSlash}
									className="lines"
								/>
							</span>
						</div>
						<p className="hint">
							{PASSWORD_DESCRIPTION_TEXT}
						</p>
						<div className="agree" role="radiogroup">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex="0"
							>
								<input
									className="fancy-toggle checkbox blue"
									id="termsandconditions"
									name="agree"
									type="checkbox"
									onChange={() => setAgree(!agree)}
									checked={agree}
									// defaultChecked
									ref={register({
										required: "Required",
									})}
								/>
								<label htmlFor="termsandconditions">
									<span className="input"></span>
									<span style={{ color: "#6b6c6f", fontSize: "15px" }}>
										I agree to the &nbsp;
									<Link
											to="#"
											className="textunderline"
											onClick={() => props.show_tnc(true)}
										>
											Terms and Conditions
									</Link>
									&nbsp; and &nbsp;
									<Link
											to="#"
											className="textunderline"
											onClick={() => props.show_pnp(true)}
										>
											Privacy Policy
									</Link>
									</span>
								</label>
							</span>
						</div>
						{/* {signupType === "candidate" && (
						<div className="agree allow">
							<input
								className="fancy-toggle checkbox blue"
								id="allowContact"
								name="allowContact"
								type="checkbox"
							/>
							<label htmlFor="allowContact">
								<span className="input"></span>Allow recruiters to contact you
								for more details
							</label>
						</div>
					)} */}
					</li>
				</ul>

				{signupType === "employer" ? (
					<button
						className={
							getValues().email &&
								getValues().phone &&
								getValues().password &&
								getValues().agree &&
								orgId
								? "primary-btn blue"
								: "primary-btn gray-clr"
						}
						type="submit"
					>
						Create
					</button>
				) : (
						<button
							className={
								getValues().email &&
									getValues().phone &&
									getValues().password &&
									getValues().agree
									? "primary-btn blue"
									: "primary-btn gray-clr"
							}
							type="submit"
						>
							{BUTTON_TO_CREATE_ACCOUNT}
						</button>
					)}
				{/* <button className="primary-btn blue" type="submit">
					Create
			</button> */}

				<p className="donthaveaccount">
					Have an account?{" "}
					<Link className="textunderline" to="/login" id="loginLink">
						Login here
				</Link>
				</p>
				<div className="mobile"></div>
			</form>
		);
}

function mapStateToProps(state) {
	return {
		functionType: state.employerReducer.orgType.data,
		functionData: state.employerReducer.orgKeys,
	};
}

export default connect(mapStateToProps)(Signup);
