import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./Details.scss";

import Tabs from "../Tabs";

import Resume from "../Tabs/Resume";
import PersonalDetails from "../Tabs/PersonalDetails";
import WorkExperience from "../Tabs/WorkExperience";
import Education from "../Tabs/Education";
import Strengths from "../Tabs/Strengths";
import Preview from "../Tabs/Preview";
import AddExpEduWorkCertNoPopup from "../../../Popup/AddExpEduWorkCert/AddExpEduWorkCertNoPopup";

function Details() {
	return (
		<div className="profile-details">
			<Tabs />

			<Switch>
				<Redirect exact from="/profile" to="/profile/resume" />
				<Route exact path="/profile/resume" component={Resume} />
				<Route exact path="/profile/resume/:id" component={Resume} />

				<Route
					exact
					path="/profile/personal-details"
					component={PersonalDetails}
				/>
				<Route
					exact
					path="/profile/personal-details/:id"
					component={PersonalDetails}
				/>
				<Route
					exact
					path="/profile/work-experience"
					component={WorkExperience}
				/>
				<Route
					path="/profile/work-experience/add-work"
					exact
					render={() => <AddExpEduWorkCertNoPopup type="addWorkExperience" />}
				/>
				<Route
					exact
					path="/profile/work-experience/add-other-work"
					render={() => <AddExpEduWorkCertNoPopup type="addOtherExperience" />}
				/>
				<Route
					exact
					path="/profile/education/add-education"
					render={() => <AddExpEduWorkCertNoPopup type="addEducation" />}
				/>
				<Route
					exact
					path="/profile/education/add-certificate"
					render={() => <AddExpEduWorkCertNoPopup type="addCertificate" />}
				/>
				<Route
					exact
					path="/profile/education/add-edu-other-work"
					render={() => (
						<AddExpEduWorkCertNoPopup type="addEduOtherExperience" />
					)}
				/>
				<Route
					path="/profile/work-experience/:id/add-work"
					exact
					render={() => <AddExpEduWorkCertNoPopup type="addWorkExperience" />}
				/>
				<Route
					exact
					path="/profile/work-experience/:id/add-other-work"
					render={() => <AddExpEduWorkCertNoPopup type="addOtherExperience" />}
				/>
				<Route
					exact
					path="/profile/education/:id/add-education"
					render={() => <AddExpEduWorkCertNoPopup type="addEducation" />}
				/>
				<Route
					exact
					path="/profile/education/:id/add-certificate"
					render={() => <AddExpEduWorkCertNoPopup type="addCertificate" />}
				/>
				<Route
					exact
					path="/profile/education/:id/add-edu-other-work"
					render={() => (
						<AddExpEduWorkCertNoPopup type="addEduOtherExperience" />
					)}
				/>
				<Route
					exact
					path="/profile/work-experience/:id"
					component={WorkExperience}
				/>
				<Route exact path="/profile/education" component={Education} />
				<Route exact path="/profile/education/:id" component={Education} />
				<Route exact path="/profile/strengths" component={Strengths} />
				<Route exact path="/profile/preview" component={Preview} />
			</Switch>
		</div>
	);
}

export default Details;
