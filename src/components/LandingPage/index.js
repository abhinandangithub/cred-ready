import React from "react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";
import ImgLogo from "../../assets/logo-blue.png";
import JobView from "./JobView";

let scrollBarStyle = {
	width: "100%",
	height: "100%",
};

function index(props) {
	const {
		match: { params },
	} = props;
	localStorage.setItem("jobId", params.id);

	return (
		<div className="landing_page">
			<header>
				<Link to="#" className="logo">
					<img src={ImgLogo} alt="CredReady" />
				</Link>
			</header>
			<main>
				<Scrollbars
					className="custom-scrollbar"
					style={scrollBarStyle}
					// autoHide
					autoHideTimeout={1000}
					autoHideDuration={600}
					renderTrackVertical={({ style, ...props }) => (
						<div
							{...props}
							className="bar"
							style={{
								...style,
							}}
						/>
					)}
				>
					<JobView />
				</Scrollbars>
			</main>
			<footer>© 2020 CredReady, All Rights Reserved</footer>
		</div>
	);
}

export default index;
