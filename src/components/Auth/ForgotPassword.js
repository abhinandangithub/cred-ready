import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VerifyCode from "../_Elements/VerifyCode";
import { calculateTimeLeft } from "../../assets/js/Utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import {
	authVcodeRequestPostUrl,
	authForgotPasswordUrl,
	authResetPasswordUrl,
	authVcodeVerifyPostUrl,
} from "../../store/api/auth";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import Spinner from "../_Elements/Spinner";
import { strings } from "../../constants.js";
const { PAGE_TITLE, DESCRIPTIVE_TEXT, TO_ENTER_VERIFICATION_CODE, ALERT_TO_USER, RESENT_CODE, BUTTON_TO_SEND_VERIFY_CODE } = strings.CANDIDATE_FORGOT_PASSWORD_VERIFICATION;
const { CANDIDATE_RESET_PASSWORD } = strings;
const { FORGOT_PASSWORD, EMAIL_PH, BUTTON_TO_NAVIGATE_BACK, BUTTON_TO_SEND_VERIFICATION_CODE } = strings.CANDIDATE_FORGOT_PASSWORD;
let duration = 10 * 60; // in seconds
let timerDuration = duration;

function ForgotPassword() {
	const { addToast } = useToasts();
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState([]);
	const [isCodeError, setIsCodeError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerDuration));
	const [isEmailValid, setisEmailValid] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	const [isOtpValid, setisOtpValid] = useState(false);
	const [isPasswordReset, setisPasswordReset] = useState(false);
	const [passwordShown, setPasswordShown] = useState({
		new: false,
		confirm: false,
	});
	const [isEmailInputValid, setisEmailInputValid] = useState(false);
	const [passwordErrMsg, setpasswordErrMsg] = useState("");

	let timerDisplay = "";

	const togglePasswordVisiblity = (e) => {
		if (e.target.id === "password1") {
			setPasswordShown({
				...passwordShown,
				new: !passwordShown.new,
			});
		} else {
			setPasswordShown({
				...passwordShown,
				confirm: !passwordShown.confirm,
			});
		}
	};

	useEffect(() => {
		setIsCodeError(false);
	}, [otp]);

	useEffect(() => {
		return () => {
			timerDuration = duration;
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			timerDuration--;
			setTimeLeft(calculateTimeLeft(timerDuration));
		}, 1000);
	}, [timerDuration]);

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}
		timerDisplay = `${timeLeft["m"]} : ${timeLeft["s"]}`;
	});

	const sendVerificationCode = async () => {
		console.log("sendVerificationCode");

		try {
			setLoading(true);
			const { data } = await Axios.post(
				authForgotPasswordUrl,
				{ username: userEmail },
				{ headers: { "Content-type": "application/vnd.credready.com+json" } }
			);

			if (!data.message) return;
			setisEmailValid(true);
			if (data && data.data) {
				addToast(data.data, {
					appearance: "success",
					autoDismiss: true,
				});
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
			addToast(err.response && err.response.data && err.response.data.data, {
				appearance: "error",
				autoDismiss: true,
			});
			setisEmailValid(false);
		}
	};

	const verifyCode = async () => {
		console.log("verifyCode ", otp.join(""));

		// if (otp.join("").length === 4 && otp.join("") === "0000") {
		// 	setIsCodeError(false);
		// 	setisOtpValid(true);
		// } else if (timerDisplay !== "") {
		// 	setIsCodeError(true);
		// }

		if (otp.join("").length === 4) {
			try {
				let body = {
					type: "email",
					contact: userEmail,
					verification_code: otp.join(""),
				};
				setLoading(true);
				const { data } = await Axios.post(authVcodeVerifyPostUrl, body, {
					headers: { "Content-type": "application/vnd.credready.com+json" },
				});
				setLoading(false);

				if (!data.message) return;
				setisOtpValid(true);
				setIsCodeError(false);
				if (data && data.data) {
					addToast(data.data, {
						appearance: "success",
						autoDismiss: true,
					});
				}
			} catch (err) {
				setLoading(false);
				setIsCodeError(true);
				setisOtpValid(false);
				addToast(err.response && err.response.data && err.response.data.data, {
					appearance: "error",
					autoDismiss: true,
				});
			}
		} else if (timerDisplay !== "") {
			setIsCodeError(true);
		}
	};

	const resetPassword = async () => {
		console.log("sendVerificationCode");
		let password1 = document.getElementById("password1").value;
		let password2 = document.getElementById("password2").value;
		const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;

		if (!re.test(password1)) {
			setpasswordErrMsg(
				"The New password needs to be a least 8 characters with at least one upper case, one lowercase, 1 number and 1 special character.."
			);
		} else if (!re.test(password2)) {
			setpasswordErrMsg(
				"The Confirm password needs to be a least 8 characters with at least one upper case, one lowercase, 1 number and 1 special character.."
			);
		} else if (password1 !== password2) {
			setpasswordErrMsg("Password does not match.");
		} else {
			try {
				let body = {
					password: password1,
					username: userEmail,
				};
				setLoading(true);
				const { data } = await Axios.post(authResetPasswordUrl, body, {
					headers: { "Content-type": "application/vnd.credready.com+json" },
				});
				setLoading(false);

				if (!data.message) return;
				setisPasswordReset(true);
				if (data && data.data) {
					addToast(data.data, {
						appearance: "success",
						autoDismiss: true,
					});
				}
			} catch (err) {
				setLoading(false);

				setisPasswordReset(false);
				addToast(err.response && err.response.data && err.response.data.data, {
					appearance: "error",
					autoDismiss: true,
				});
			}
		}
	};

	const resendCode = () => {
		console.log("resendCode");
		timerDuration = duration;
		sendVerificationCode()
	};

	const renderEmail = (
		<>
			<h3>{PAGE_TITLE}</h3>
			<p className="sub_heading verify-message">
				{FORGOT_PASSWORD}
			</p>
			<ul className="fields">
				<li>
					<label htmlFor="email">
						E-mail <span>*</span>
					</label>
					<input
						id="email"
						name="email"
						type="emai"
						autoComplete="off"
						placeholder={EMAIL_PH}
						onChange={(e) => {
							const re = /^[\+-\]+[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
							setUserEmail(e.target.value);
							if (re.test(String(e.target.value).toLowerCase())) {
								setisEmailInputValid(true);
							} else {
								setisEmailInputValid(false);
							}
						}}
					/>
				</li>
			</ul>

			<div className="cta">
				<Link to="/login" className="primary-btn outline">
					{BUTTON_TO_NAVIGATE_BACK}
				</Link>
				<button
					className={`primary-btn blue ${isEmailInputValid ? "" : "disabled"}`}
					onClick={sendVerificationCode}
				>
					{BUTTON_TO_SEND_VERIFICATION_CODE}
				</button>
			</div>
		</>
	);
	const renderOTP = (
		<>
			<h3>{PAGE_TITLE}</h3>
			<p className="sub_heading verify-message">
				{DESCRIPTIVE_TEXT}
			</p>
			<div className="code-box flex">
				<p>
					Enter verification code sent to your email <span>*</span>
				</p>
				<div className="code">
					<VerifyCode setOtp={(otp) => setOtp(otp)} type="Email" />
				</div>
			</div>
			{isCodeError && timerDisplay !== "" ? (
				<p className="error-code">Code is incorrect, please try again!</p>
			) : (
					""
				)}
			{timerDisplay !== "" ? (
				<p className="status">
					{ALERT_TO_USER}
					<span className="time"> {timerDisplay} minutes</span>
				</p>
			) : (
					<p
						className="status resend"
						id="resendVerificationCodeLink"
						onClick={resendCode}
					>
						{RESENT_CODE}
					</p>
				)}

			<div className="cta">
				<Link to="/login" className="primary-btn outline">
					{BUTTON_TO_NAVIGATE_BACK}
				</Link>
				<button className="primary-btn blue disabled!" onClick={verifyCode}>
					{BUTTON_TO_SEND_VERIFY_CODE}
				</button>
			</div>
		</>
	);
	const renderReset = (
		<>
			<h3>{CANDIDATE_RESET_PASSWORD.PAGE_TITLE}</h3>
			<p className="sub_heading">
				{/* We have sent a verification code to your email. <br />
				To proceed, enter the verification code below.....?? */}
			</p>

			{passwordErrMsg !== "" && <p className="error">{passwordErrMsg}</p>}

			<ul className="fields">
				<li>
					<label htmlFor="password1">
						New Password <span>*</span>
					</label>
					<div className="password">
						<input
							id="password1"
							name="password"
							type={passwordShown.new ? "text" : "password"}
							autoComplete="nothing"
							placeholder={CANDIDATE_RESET_PASSWORD.NEW_PASSWORD_PH}
							onChange={() => setpasswordErrMsg("")}
						/>
						<span
							className="toggle"
							onClick={togglePasswordVisiblity}
							id="password1"
						>
							<FontAwesomeIcon
								icon={passwordShown.new ? faEye : faEyeSlash}
								className="lines"
							/>
						</span>
					</div>
				</li>
				<li>
					<label htmlFor="password2">
						Confirm Password <span>*</span>
					</label>
					<div className="password">
						<input
							id="password2"
							name="password2"
							type={passwordShown.confirm ? "text" : "password"}
							autoComplete="nothing"
							placeholder={CANDIDATE_RESET_PASSWORD.CONFIRM_PASSWORD_PH}
							onChange={() => setpasswordErrMsg("")}
						/>
						<span
							className="toggle"
							onClick={togglePasswordVisiblity}
							id="password2"
						>
							<FontAwesomeIcon
								icon={passwordShown.confirm ? faEye : faEyeSlash}
								className="lines"
							/>
						</span>
					</div>
				</li>
			</ul>

			<div className="cta">
				<button className="primary-btn blue" onClick={resetPassword}>
					{CANDIDATE_RESET_PASSWORD.BUTTON_TYO_RESET_PASSWORD}
				</button>
			</div>
		</>
	);
	const renderSuccess = (
		<>
			<h3>{CANDIDATE_RESET_PASSWORD.PAGE_TITLE_SUCCESS.TITLE}</h3>
			<p className="sub_heading" style={{ marginBottom: "10px" }}>
				{CANDIDATE_RESET_PASSWORD.PAGE_TITLE_SUCCESS.DESCRIPTIVE_TEXT}<br />
				{CANDIDATE_RESET_PASSWORD.PAGE_TITLE_SUCCESS.SUB_DESCRIPTIVE_TEXT}
			</p>

			<div className="cta">
				<Link className="primary-btn blue" to="/login">
					{CANDIDATE_RESET_PASSWORD.PAGE_TITLE_SUCCESS.BACK_TO_LOGIN}
				</Link>
			</div>
		</>
	);

	return loading ? (
		<Spinner />
	) : (
			<div className="content forgot_password">
				{isPasswordReset
					? renderSuccess
					: isOtpValid
						? renderReset
						: isEmailValid
							? renderOTP
							: renderEmail}
				<div className="mobile"></div>
			</div>
		);
}

export default ForgotPassword;
