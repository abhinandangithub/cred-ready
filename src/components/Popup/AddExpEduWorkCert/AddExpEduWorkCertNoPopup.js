import React from "react";

import AddWorkExperience from "./AddWorkExperience";
import AddOtherExperience from "./AddOtherExperience";
import AddEducation from "./AddEducation";
import AddCertificate from "./AddCertificate";
import AddEduOtherExperience from "./AddEduOtherExperience";

function AddExpEduWorkCertNoPopup({ type }) {
	return type === "addWorkExperience" ? (
		<AddWorkExperience />
	) : type === "addOtherExperience" ? (
		<AddOtherExperience />
	) : type === "addEducation" ? (
		<AddEducation />
	) : type === "addCertificate" ? (
		<AddCertificate />
	) : (
		<AddEduOtherExperience />
	);
}

export default AddExpEduWorkCertNoPopup;
