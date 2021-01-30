import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Footer() {
	return (
		<footer className="footer flex">
			<p>
				&copy; 2020 CredReady, All Rights Reserved{" "}
				{/* <Link href="/">View T&C</Link>{" "} */}
			</p>
		</footer>
	);
}

export default Footer;
