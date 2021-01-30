import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import { updatePhoneOtp } from "../../../store/actions/auth";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import VerifyCode from "../../_Elements/VerifyCode";
import { calculateTimeLeft } from "../../../assets/js/Utility";
import { signUpUser, verifyUserCode } from "../../../store/thunks/auth";
import { resendVerificationCode } from "../../../store/thunks/auth";
import { strings } from "../../../constants";
const { PAGE_TITLE, DESCRIPTIVE_TEXT, SUB_DESCRIPTIVE_TEXT, TO_ENTER_VERIFICATION_CODE, BUTTON_TO_VALIDATE, ALERT_TO_USER, RESEND_CODE, ERROR } = strings.CANDIDATE_VERIFY_ACCOUNT;

let duration = 10 * 60;
let timerDuration = duration; // in seconds

function VerifyPhone(props) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducer);
	const [otp, setOtp] = useState([]);
	const [isCodeError, setIsCodeError] = useState(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerDuration));
	let timerDisplay = "";
	const [isOtpVerifying, setIsOtpVerifying] = useState(false);

	const handleClick = async () => {
		console.log("..............");
		console.log("otp ", otp);
		if (
			// otp.filter((i) => i.length > 0).length === 4
			otp.filter((i) => i !== "").length === 4
		) {
			setIsOtpVerifying(true);
			dispatch(verifyUserCode("phone", otp.join("")));
			//	dispatch(updatePhoneOtp(true));
			//	dispatch(toggleOverlay(false));
			//	dispatch(togglePopup(false));
			setIsCodeError(false);
		} else {
			setIsCodeError(true);
			setIsOtpVerifying(false);
		}
	};

	useEffect(() => {
		console.log("abhi phone ", props.isVerified.phoneOtp);
		if (props.isVerified.phoneOtp) {
			setIsOtpVerifying(false);
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
		} else {
			setIsCodeError(true);
			setIsOtpVerifying(false);
		}
	}, [props.isVerified]);

	useEffect(() => {
		setIsCodeError(false);
	}, [otp]);

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (
				e.code === "Enter" &&
				document.getElementById("submitBtn").classList.contains("blue-clr") &&
				document.getElementById("submitBtn").innerText === "Validate"
			) {
				document.getElementById("submitBtn").click();
			}
		});
		return () => {
			// console.log("Reseting OTP");
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

	const resendCode = () => {
		timerDuration = duration;
		dispatch(resendVerificationCode());
	};

	return (
		<div className="verify-email-phone-code">
			<h1>{PAGE_TITLE}</h1>
			<div className="content">
				<p className="info verify-message">
					{DESCRIPTIVE_TEXT}
					<br />
					{SUB_DESCRIPTIVE_TEXT}
				</p>
				<div className="code-box flex">
					<p>
						{auth.loggedIn.as === "employer" ? "Code " : "verification code "}
						<span>*</span>
					</p>
					<div className="code">
						<VerifyCode setOtp={(otp) => setOtp(otp)} type="Phone" />
					</div>
				</div>
				{isCodeError}

				{isCodeError && timerDisplay !== "" ? (
					<p className="error-code">{ERROR.MESSAGE}</p>
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
							Resend Verification Code
						</p>
					)}
				<button
					className={
						otp.filter((i) => i !== "").length === 4
							? "primary-btn blue-clr"
							: "primary-btn gray-clr"
					}
					disabled={isOtpVerifying}
					onClick={handleClick}
					id="submitBtn"
				>
					{!isOtpVerifying ? BUTTON_TO_VALIDATE : "Validating..."}
				</button>
			</div>
		</div>
	);
}

// export default VerifyPhone;

function mapStateToProps(state) {
	return {
		isVerified: state.authReducer.isVerified,
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(VerifyPhone);
