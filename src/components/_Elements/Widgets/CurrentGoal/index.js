import React from "react";
import { Link } from "react-router-dom";

import "../index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import ImgWidgetMenu from "../../../../assets/widget-menu.jpg";
import CredReadyIndex from "../../CredReadyIndex";

function CurrentGoal(props) {
	const type = props.currentGoal ? props.currentGoal : props.alternateGoal;
	const link = props.currentGoal
		? `/goals/current/${type.id}`
		: `/goals/alternate/${type.id}`;

	return (
		<Link className="widget widget-explore-goals" id="mygoals-card" to={link}>
			<div className="top">
				{/* <div className="logo">
					<img src={ImgWidgetLogo} alt={type.logo} />
				</div> */}
				<div className="info">
					<h3>{type.name}</h3>
					<p>{type.subHeading}</p>
				</div>
				{/* <button className="menu">
					<img src={ImgWidgetMenu} alt="Widget Menu" />
				</button> */}
			</div>
			<div className="bottom">
				{/* {
					(props.credreadyness === null) ? "" : <div className="index">
						<CredReadyIndex index={type.crIndex} />
					</div>
				} */}

				<div className="content">
					<p>{type.job_summary}</p>
					{/* <p>
						<span className="heading">Job Openings: </span>
						<span className="text">{type.jobOpenings}</span>
					</p> */}
					{/* <p>
						<span className="heading">Wage: </span>
						<span className="text">
							${type.wage.start} - ${type.wage.end}
						</span>
					</p>
					<p>
						<span className="heading">{type.updates}</span>
					</p> */}
				</div>
			</div>
			{props.currentGoal ? "" : <div className="cta">
				<Link className="primary-btn blue" to={link}>
					Select
				</Link>
			</div>}
		</Link>
	);
}

export default CurrentGoal;
