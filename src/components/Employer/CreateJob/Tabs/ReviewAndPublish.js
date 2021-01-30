import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import ImgUserPlaceholder from "../../../../assets/user-placeholder.jpg";

function ReviewAndPublish(props) {
	const employerProfile = useSelector((state) => state.employerReducer.profile);
	const [job, setJob] = useState(null);
	const [locationVal, setLocationVal] = useState("");

	useEffect(() => {
		setJob(props.newJob);
	}, [props.newJob]);

	useEffect(() => {
		if (!!props.newJob && !!props.locationData && props.locationData.length) {
			let location = props.locationData.find((l) => l.id === props.newJob.location);
			if (!!location) setLocationVal(location.city);
		}
	}, [props.newJob, props.locationData]);

	const renderTopInfo = (
		<div className="main_info">
			<div className="info">
				<div className="logo">
					<img
						src={
							employerProfile && employerProfile.data && employerProfile.data.org.logo_path
								? employerProfile.data.org.logo_path
								: ImgUserPlaceholder
						}
						alt="Logo"
					/>
				</div>
				<div className="text">
					<h3>{job ? job.jobTitle : ""}</h3>
					<p>{employerProfile.data && employerProfile.data.org.org_name}</p>
				</div>
			</div>
			<div className="short-info">
				<p>{job ? job.maxExp : ""} years</p>
				<p>{locationVal}</p>
			</div>
		</div>
	);
	const renderDescription = (
		<div className="main_info" style={{ marginBottom: 0 }}>
			<p>
				<span className="heading">Job Description: </span>
				<span className="text">
					<span
						dangerouslySetInnerHTML={{
							__html: job ? job.jobDescription : "",
						}}
						style={{ color: "black" }}
					></span>
				</span>
			</p>
		</div>
	);

	return (
		<div className="review_publish" id="copyLink">
			<div className="heading">
				<h2>Almost done</h2>
				<p>
					You can preview your job post below as how an applicant would see it. Make changes to the post by clicking the
					back button or the sections numbered above. Once you have reviewed the post, click publish to post the job.
				</p>
			</div>
			<div className={`job-view-cmp`}>
				<div className="left">
					{renderTopInfo}
					{renderDescription}
				</div>
				<div className="right"></div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		newJob: state.employerReducer.newJob,
		locationData: state.employerReducer.locations.data,
	};
}

export default connect(mapStateToProps)(ReviewAndPublish);
