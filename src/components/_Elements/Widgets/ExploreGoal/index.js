import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import "../index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import ImgWidgetMenu from "../../../../assets/widget-menu.jpg";
import CredReadyIndex from "../../CredReadyIndex";
import { fetchHealthCareGoals } from "../../../../modals/candidateProfile/thunk";

function ExploreGoal(props) {
	const dispatch = useDispatch();
	const [pageData, setPageData] = React.useState(props.currentGoal)
	const type = props.goal ? props.goal : props.job;
	const ID = props.currentGoal && props.currentGoal.id;
	React.useEffect(() => {
		dispatch(fetchHealthCareGoals());
	}, [])

	return (
		<Link className="widget widget-explore-goals" id="mygoals-card" to={`/goals/alternate/${ID}`} >
			<div className="top">
				{/* <div className="logo">
					<img src={ImgWidgetLogo} alt={type.logo} />
				</div> */}
				<div className="info">
					<h3>{pageData && pageData.name}</h3>
					{/* <p>{pageData && pageData.subHeading}</p> */}
				</div>
				{/* <button className="menu">
					<img src={ImgWidgetMenu} alt="Widget Menu" />
				</button> */}
			</div>
			<div className="bottom">
				{/* <div className="index">
					<CredReadyIndex index={type && type.crIndex} />
				</div> */}
				<div className="content">
					<p>{pageData && pageData.job_summary}</p>
					{/* <p>
						<span className="heading">Job Openings: </span>
						<span className="text">{pageData && pageData.jobOpenings}</span>
					</p> */}
					{/* <p>
						<span className="heading">Wage: </span>
						<span className="text">
							${pageData && pageData.wage && pageData.wage.start} - ${pageData && pageData.wage && pageData.wage.end}
						</span>
					</p> */}
				</div>
			</div>
			<div className="cta">
				<Link className="primary-btn blue" to={`/goals/alternate/${ID}`}>
					Select
				</Link>
			</div>
		</Link>
	);
}

export default ExploreGoal;
