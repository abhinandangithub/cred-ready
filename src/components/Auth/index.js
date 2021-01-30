import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useToasts } from "react-toast-notifications";

import "./index.scss";
import Login from "./Login";
import Signup from "./Signup";
import ThankYou from "./ThankYou";
import ForgotPassword from "./ForgotPassword";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyAndPolicy from "./PrivacyAndPolicy";
import ImgLogo from "../../assets/logo.png";
import ImgLogoMobile from "../../assets/logo-blue.png";
import { strings } from "../../constants";
const { WELCOME_NOTE } = strings.CANDIDATE_SIGN_UP;
function LoginSignupPage(props) {
	const { addToast } = useToasts();
	const auth = useSelector((state) => state.authReducer);
	const [show_tnc, setShow_tnc] = React.useState(false);
	const [show_pnp, setShow_pnp] = React.useState(false);
	const token = Cookies.get("JWT");

	/* redirect user to User Profile page if phone otp is verified */
	useEffect(() => {
		if (auth.isVerified.phoneOtp && token === undefined) {
			// props.history.push("/thank-you");
			props.history.push("/login");
			// addToast("Thank you for verifying your details.", {
			// 	appearance: 'success',
			// 	autoDismiss: true,
			// })
		}
	}, [auth.isVerified.phoneOtp, props.history]);

	useEffect(() => {
		window.scrollTo(0, 0);
		// initRadioClick();
	}, []);

	return (
		<div
			className={`auth-page flex ${props.match.path === "/signup" ? "sign_up" : ""
				}`}
		>
			<div className="left flex">
				<a href="/" className="logo">
					<img src={ImgLogo} alt="Cred Ready" />
				</a>
				<div className="content">
					<h2>{WELCOME_NOTE.WELCOME}</h2>
					<h1>{WELCOME_NOTE.PLATFORM_NAME}</h1>
					<p>
						{WELCOME_NOTE.DESCRIPTION}
					</p>
				</div>
			</div>
			<div className="right flex">
				<a href="/" className="logo">
					<img src={ImgLogoMobile} alt="Cred Ready" className="img" />
				</a>
				{show_tnc && <TermsAndConditions show_tnc={setShow_tnc} />}
				{show_pnp && <PrivacyAndPolicy show_pnp={setShow_pnp} />}
				<Route path="/login" exact component={Login} />
				<Route
					path="/signup"
					exact
					render={(props) => (
						<Signup
							show_tnc={(val) => setShow_tnc(val)}
							show_pnp={(val) => setShow_pnp(val)}
							{...props}
						/>
					)}
				/>
				<Route path="/thank-you" exact component={ThankYou} />
				<Route path="/forgot-password" exact component={ForgotPassword} />
			</div>
		</div>
	);
}

export default LoginSignupPage;
