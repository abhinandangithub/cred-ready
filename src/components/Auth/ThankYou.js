import React from "react";
import { Link } from "react-router-dom";

function ThankYou(props) {
	return (
		<div className="thank-you">
			<h1>
				Thank you for verifying your details.
				<br />
				Please login to continue.
			</h1>
			<Link to="/login" className="primary-btn" id="thankYouBtn">
				Ok
			</Link>
		</div>
	);
}

export default ThankYou;
