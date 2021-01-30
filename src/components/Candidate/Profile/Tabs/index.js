import React from "react";
import { NavLink } from "react-router-dom";

import ImgResume from "../../../../assets/upload.jpg";
import ImgPersonalDetails from "../../../../assets/personal-details.png";
import ImgWorkExperience from "../../../../assets/work-experience.png";
import ImgEducation from "../../../../assets/education.png";
// import ImgStrengths from "../../../../assets/strengths.png";
import ImgPreview from "../../../../assets/preview.png";

import "./index.scss";

const Tabs = (props) => {
	return (
		<ul className="tabs flex pc">
			<li>
				<NavLink to="/profile/resume" className="flex" id="profileResumeLink">
					<img src={ImgResume} alt="Resume" />
					Resume
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/profile/personal-details"
					className="flex"
					id="profilePersonalDetailsLink"
				>
					<img src={ImgPersonalDetails} alt="Personal Details" />
					Personal Details
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/profile/work-experience"
					className="flex"
					id="profileWordExperienceLink"
				>
					<img src={ImgWorkExperience} alt="Work Experience" />
					Work Experience
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/profile/education"
					className="flex"
					id="profileEducationLink"
				>
					<img src={ImgEducation} alt="Education" />
					Education
				</NavLink>
			</li>
			{/* <li>
				<NavLink
					to="/profile/strengths"
					className="flex"
					id="profileStrengthsLink"
				>
					<img src={ImgStrengths} alt="Strengths" />
					Strengths
				</NavLink>
			</li> */}
			<li>
				<NavLink to="/profile/preview" className="flex" id="profilePreviewLink">
					<img src={ImgPreview} alt="Preview" />
					Preview
				</NavLink>
			</li>
		</ul>
	);
};

export default Tabs;
