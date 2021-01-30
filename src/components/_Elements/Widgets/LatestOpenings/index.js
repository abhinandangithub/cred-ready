import React from "react";
import { Link, withRouter } from "react-router-dom";

import "../index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import ImgWidgetMenu from "../../../../assets/widget-menu.jpg";

function LatestOpenings(props) {
	return (
		<div className="widget widget-latest-opening" onClick={() => props.history.push(`/jobs/view/${props.job.jobId}`)}>
			<div className="top">
				<div className="logo">
					<img src={ImgWidgetLogo} alt={"sdf"} />
				</div>
				<div className="info">
					<h3>{props.job.jobTitle}</h3>
					<p>{props.job.orgName}</p>
				</div>
				<button className="menu">
					<img src={ImgWidgetMenu} alt="Widget Menu" />
				</button>
			</div>
			<div className="bottom">
				<div className="content">
					<div className="info flex">
						{/* <span className="experience">1-3 Yrs</span> */}
						<span className="experience">
							{props.job.minExp + "-" + props.job.maxExp + " Yrs "}
						</span>
						{/* <span className="locatoin">Warren, NJ</span> */}
						<span className="locatoin">{props.job.location}</span>
					</div>
					{/* <p>{props.job.jobDescription}</p> */}
					<p
						className="text ellip"
						dangerouslySetInnerHTML={{
							__html: props.job.jobDescription && props.job.jobDescription,
						}}
					></p>
				</div>
			</div>
			<div className="cta flex">
				<Link to={`/jobs/view/${props.job.jobId}`} id="view-job-openings" className="primary-btn blue">
					View
				</Link>
			</div>
		</div>
	);
}

export default withRouter(LatestOpenings);
