import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Dropdown } from "semantic-ui-react";

import "./index.scss";
import Input from "../../../../_Elements/Input";
import InputDropdown from "../../../../_Elements/InputDropdown";
import {
	updateCandidateDetails,
	fetchCandidateCurrentStatus,
	fetchCandidateDetails,
	updateCandidatePhone,
	updateCandidateAbout,
} from "../../../../../modals/candidateProfile/thunk";
import { getGeographyThunk } from "../../../../../store/thunks/employer";
import { handleKeyUpPhone, handleKeyDownPhone } from "../../../../../assets/js/Utility";
import { strings } from "../../../../../constants";
const {
	TO_FILL_PERSONAL_DETAILS,
	PAGE_TITLE_MOBILE,
	PAGE_SUB_TITLE_MOBILE,
	SECTION_NUMBER_MOBILE,
	FIRST_NAME,
	LAST_NAME,
	MOST_RECENT_JOB_TITLE,
	CURRENT_EMPLOYEMENT_STATUS,
	WHEN_WOULD_YOU_BE_READY_TO_BEGIN_A_NEW_ROLE,
	STREET_ADDRESS,
	CITY,
	STATE,
	ZIP_CODE,
	NAVIGATION_ON_NEXT_PAGE,
	NAVIGATION_ON_PREVIOUS_PAGE,
	ERROR_MESSAGE_ON_PAGE,
} = strings.CANDIDATE_ONBOARDING.PERSONAL_INFORMATION;

const joiningDurationData = {
	heading: "Select Durations",
	content: [
		{
			id: 0,
			value: "more than 1 year",
		},

		{
			id: 1,
			value: "Immediately",
		},
		{
			id: 2,
			value: "Less than 2 weeks",
		},
		{
			id: 3,
			value: "2-3 weeks",
		},
		{
			id: 4,
			value: "3 weeks to 1 month",
		},
		{
			id: 5,
			value: "1-3 months",
		},
		{
			id: 6,
			value: "3-6 months",
		},
		{
			id: 7,
			value: "1 year",
		},
	],
};
let onlyDigitPhone = "";
function PersonalDetails(props) {
	const dispatch = useDispatch();
	const [editAboutMe, setEditAboutMe] = React.useState(false);
	const [uniqueStates, setUniqueStates] = React.useState("");

	const [editPhone, setEditPhone] = React.useState(false);
	const data = useSelector((state) => state.candidateSetDataReducer.data);
	const [employmentStatus, setEmploymentStatus] = useState();
	const [joiningDuration, setJoiningDuration] = useState();
	const [flag, setFlag] = React.useState(false);
	const currentStatus = useSelector((state) =>
		state.candidateCurrentStatusReducer.data ? state.candidateCurrentStatusReducer.data : []
	);

	const geographyKeys = useSelector((state) => state.employerReducer.geographyKeys);
	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		phoneNo: [],
		emailId: [],
		aboutMe: [],
		firstName: [],
		currentTitle: [],
		lastName: [],
		employmentStatus: [],
		joiningDuration: [],
		streetAddress: [],
		city: [],
		state: [],
		zipCode: [],

		formValid: false,
	});
	React.useEffect(() => {
		let obj = geographyKeys
			.map((o) => {
				return o.state;
			})
			.sort(function (x, y) {
				return x > y ? 1 : x < y ? -1 : 0;
			});
		setUniqueStates([...new Set(obj)]);
	}, [geographyKeys]);
	const handleSubmit = (e) => {
		e.preventDefault();
		let oldFormData = { ...formData };
		oldFormData.formValid = true;
		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "aboutMe" &&
				(oldFormData[field][0] === "" || oldFormData[field][0] === undefined || oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				oldFormData.formValid = false;
				if (oldFormData[field][1] !== ERROR_MESSAGE_ON_PAGE) {
					oldFormData[field].push(ERROR_MESSAGE_ON_PAGE);
				}
			}
		}

		console.log(oldFormData, oldFormData.formValid);
		if (oldFormData.formValid) {
			if (formData.phoneNo.length !== 0 && props.match.params.id === "edit" && editPhone) {
				onlyDigitPhone = formData.phoneNo[0].replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").replace(/ /g, "");

				onlyDigitPhone = +onlyDigitPhone.trim();
				dispatch(updateCandidatePhone(onlyDigitPhone));
				props.history.push("/profile/preview");
			}
			if (!editPhone && !editAboutMe) props.history.push("/profile/preview");
			if (props.match.params.id === "edit" && editAboutMe) {
				dispatch(updateCandidateAbout(formData.aboutMe[0]));
				props.history.push("/profile/preview");
			}

			let obj = {
				firstName: formData ? formData.firstName[0] : "",
				lastName: formData ? formData.lastName[0] : "",
				currentTitle: formData ? formData.currentTitle[0] : "",
				// isOpenToOtherRoles: formData ? formData.isOpenToOtherRoles[0] : "",
				currentEmploymentStatusId: formData ? formData.employmentStatus[0] : "",
				availableWithin: formData ? formData.joiningDuration[0] : "",
				streetAddress: formData ? formData.streetAddress[0] : "",
				state: formData ? formData.state[0] : "",
				city: formData ? formData.city[0] : "",
				zipCode: formData ? formData.zipCode[0] : "",
			};
			/* send data to api */
			if (flag) dispatch(updateCandidateDetails(obj));
			console.log(props.match.params.id);
			if (props.match.params.id !== "edit") {
				typeof props.match.params.id === "number"
					? props.history.push(`/jobs/view/${props.match.params.id}`)
					: props.history.push("/profile/work-experience");
			}
		}

		setTimeout(() => {
			let scrollToEl = document.querySelectorAll(".error-text:not(.hidden)")[0];
			const isMobileView = getComputedStyle(document.querySelector(".profile-overview")).display === "none";

			if (scrollToEl) {
				var scrollToElParent = scrollToEl.closest("li");
			}

			if (scrollToElParent) {
				scrollToElParent.scrollIntoView();
				if (isMobileView) {
					window.scrollBy(0, -70);
				} else {
					window.scrollBy(0, -10);
				}
			}
		});

		setFormData(oldFormData);
	};
	const handleFieldChangeCityState = (field, value, property) => {
		if (field !== "phoneNo" && field !== "aboutMe") setFlag(true);
		let msg = value === "" || value === null ? "Required" : "";

		let temp = "";
		if (property === "city") {
			let obj = geographyKeys.find((val) => val.id === value);
			temp = obj ? obj[property] : value;
		} else {
			let obj = uniqueStates.find((val) => val === value);
			temp = obj ? obj : value;
		}
		let arr = [];
		arr[0] = temp;
		arr[1] = msg;
		console.log("sachin", temp);
		setFormData({
			...formData,
			[field]: arr,
		});
	};

	const handleFieldChange = (field, value) => {
		if (field !== "phoneNo" && field !== "aboutMe") setFlag(true);
		if (field === "aboutMe") setEditAboutMe(true);
		if (field === "phoneNo") setEditPhone(true);
		let msg = value === "" || value === null ? ERROR_MESSAGE_ON_PAGE : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	React.useEffect(() => {
		let intialPhone = data.contacts ? data.contacts.find((el) => el.contact_type === "phone").contact : "";
		if (!!intialPhone) {
			intialPhone = intialPhone.toString();

			if (intialPhone[0] === "+") {
				intialPhone = intialPhone.substring(1);
			}
			if (intialPhone[0] === "1") {
				let x = intialPhone.replace(/\D/g, "").match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
				intialPhone = x[1] + " (" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
			} else {
				let x = intialPhone.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				intialPhone = "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
			}
		}
		setEmploymentStatus(data && data.current_employment_status);
		setJoiningDuration(data && data.available_within);
		setFormData({
			phoneNo: [intialPhone],
			aboutMe: [data.about_me],
			emailId: [data.contacts && data.contacts.find((entity) => entity.contact_type === "email").contact],
			firstName: [data.first_name],
			currentTitle: [data.current_title],
			lastName: [data.last_name],
			employmentStatus: [
				currentStatus.find((val) => val.id === data.current_employment_status)
					? currentStatus.find((val) => val.id === data.current_employment_status).id
					: "",
			],
			joiningDuration: [joiningDurationData.content.find(val => val.value === data.available_within) ? joiningDurationData.content.find(val => val.value === data.available_within).id : ""],
			streetAddress: [data.address && data.address.street_address],
			city: [data.address && data.address.city],
			state: [data.address && data.address.state],
			zipCode: [data.address && data.address.zip_code],

			formValid: false,
		});
	}, [data]);
	React.useEffect(() => {
		dispatch(fetchCandidateCurrentStatus());
		dispatch(fetchCandidateDetails());
		dispatch(getGeographyThunk());
		window.scrollTo(0, 0);
	}, []);

	const onDropdownFieldChange = (e, data) => {
		if (data.id === "employmentStatus") setEmploymentStatus(data.value);
		if (data.id === "joiningDuration") setJoiningDuration(data.value);
		handleFieldChange(data.id, data.value);
	};

	return (
		<div className="personal-details">
			<form className="content" onSubmit={handleSubmit}>
				<div className="content">
					<h3 className="personel-details-heading">{TO_FILL_PERSONAL_DETAILS}</h3>
					<div className="_heading mobile">
						<span className="text">Profile</span>
						<span className="count">{SECTION_NUMBER_MOBILE}</span>
					</div>
					<p className="sub-heading mobile">{PAGE_SUB_TITLE_MOBILE}</p>
					<ul className="listing">
						<li>
							<label htmlFor="firstName">
								{FIRST_NAME}
								<span>*</span>
								<span className={`error-text ${!formData.firstName[1] && "hidden"}`}>Required</span>
							</label>
							<Input
								type="text"
								placeholder="First name"
								id="firstName"
								autoFocus
								defaultValue={formData.firstName[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="lastName">
								{LAST_NAME}
								<span>*</span>
								<span className={`error-text ${!formData.lastName[1] && "hidden"}`}>Required</span>
							</label>
							<Input
								type="text"
								placeholder="Last name"
								id="lastName"
								defaultValue={formData.lastName[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						{props.match.params.id === "edit" && (
							<>
								<li>
									<label htmlFor="emailId">
										E-mail <span>*</span>
										<span className={`error-text ${!formData.emailId[1] && "hidden"}`}>Required</span>
									</label>
									<Input
										type="email"
										id="emailId"
										style={{ backgroundColor: "#f1f1f1", paddingLeft: "5px" }}
										defaultValue={formData.emailId[0]}
										disabled
										onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
									/>
								</li>
								<li>
									<label htmlFor="phoneNo">
										Phone <span>*</span>
										<span className={`error-text ${!formData.phoneNo[1] && "hidden"}`}>Required</span>
									</label>
									<Input
										type="text"
										id="phoneNo"
										defaultValue={formData.phoneNo[0]}
										onKeyDown={handleKeyDownPhone}
										onKeyUp={handleKeyUpPhone}
										onInput={(e) => {
											var x = e.target.value;

											if (e.target.value[0] === "1") {
												x = x.replace(/\D/g, "").match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
												e.target.value = !x[3]
													? x[1] + x[2]
													: !x[2]
														? x[1]
														: x[1] + " (" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
											} else {
												x = x.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
												e.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
											}
										}}
										placeholder="(678) 912-3456"
										pattern="/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/"
										onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
									/>
								</li>
								<li>
									<label htmlFor="aboutMe">
										About Me <span>*</span>
										<span className={`error-text ${!formData.aboutMe[1] && "hidden"}`}>Required</span>
									</label>
									<Input
										type="text"
										placeholder="About Me"
										id="aboutMe"
										defaultValue={formData.aboutMe[0]}
										onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
									/>
								</li>
							</>
						)}

						<li>
							<label htmlFor="currentTitle">
								{MOST_RECENT_JOB_TITLE} <span>*</span>
								<span className={`error-text ${!formData.currentTitle[1] && "hidden"}`}>Required</span>
							</label>
							<Input
								type="text"
								placeholder="Title"
								id="currentTitle"
								defaultValue={formData.currentTitle[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="employmentStatus">
								{CURRENT_EMPLOYEMENT_STATUS} <span>*</span>
								<span className={`error-text ${!formData.employmentStatus[1] && "hidden"}`}>Required</span>
							</label>
							<Dropdown
								id="employmentStatus"
								placeholder="Current employment status"
								fluid
								selection
								onEmploymentStatusChange
								onChange={onDropdownFieldChange}
								value={employmentStatus}
								options={currentStatus.map((val) => ({
									key: val.id,
									value: val.id,
									text: val.employment_status,
								}))}
							/>
						</li>
						<li>
							<label htmlFor="joiningDuration">
								{WHEN_WOULD_YOU_BE_READY_TO_BEGIN_A_NEW_ROLE}
								<span>*</span>
								<span className={`error-text ${!formData.joiningDuration[1] && "hidden"}`}>Required</span>
							</label>
							<Dropdown
								id="joiningDuration"
								placeholder="Select Duration"
								fluid
								search
								selection
								onChange={onDropdownFieldChange}
								value={joiningDuration}
								options={joiningDurationData.content.map((val, i) => {
									return {
										key: val.id,
										value: val.value,
										text: val.value,
									};
								})}
							/>
						</li>
						<li>
							<label htmlFor="streetAddress">
								{STREET_ADDRESS}
								<span>*</span>
								<span className={`error-text ${!formData.streetAddress[1] && "hidden"}`}>Required</span>
							</label>
							<Input
								type="text"
								placeholder="Street address"
								id="streetAddress"
								// tabIndex="5"
								autoComplete="streetAddress"
								defaultValue={formData.streetAddress[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
								onFocus={() => {
									let activeEl = document.querySelector(".common-dropdown.active");
									if (activeEl) {
										activeEl.classList.remove("active");
										// activeEl.blur();
									}
								}}
							/>
						</li>
						<li>
							<label htmlFor="city">
								{CITY} <span>*</span>
								<span className={`error-text ${!formData.city[1] && "hidden"}`}>Required</span>
							</label>
							<InputDropdown
								placeholder={"City"}
								// content={distinct(geographyKeys, ["city"])}
								content={
									geographyKeys.length > 0
										? geographyKeys.map((val) => ({
											val: val.city,
											id: val.id,
										}))
										: ""
								}
								filter={["val"]}
								search_term="city"
								selected={formData.city[0]}
								id="city"
								// onchange={(value) => handleFieldChange("city", value)}
								onchange={(value) => handleFieldChangeCityState("city", value, "city")}
							/>
						</li>
						<li>
							<label htmlFor="state">
								{STATE} <span>*</span>
								<span className={`error-text ${!formData.state[1] && "hidden"}`}>Required</span>
							</label>
							<InputDropdown
								placeholder={"State"}
								content={uniqueStates}
								selected={formData[`state`][0]}
								id="state"
								filter={false}
								// onchange={(value) => handleFieldChange("state", value)}
								onchange={(value) => handleFieldChangeCityState("state", value, "state")}
							/>
						</li>
						<li>
							<label htmlFor="zipCode">
								{ZIP_CODE} <span>*</span>
								<span className={`error-text ${!formData.zipCode[1] && "hidden"}`}>Required</span>
							</label>
							<Input
								type="number"
								placeholder="Zip code"
								id="zipCode"
								// tabIndex="8"
								autoComplete="zipCode"
								defaultValue={formData.zipCode[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</li>
					</ul>
				</div>
				<div className="cta">
					{props.match.params.id ? (
						props.match.params.id === "edit" ? (
							<Link className="primary-btn blue" to="/profile/preview" onClick={handleSubmit}>
								Done
							</Link>
						) : (
								<Link
									className="primary-btn blue"
									to={`/jobs/application/${props.match.params.id}`}
									id="nextLink"
									onClick={handleSubmit}
								>
									Done
								</Link>
							)
					) : (
							<>
								<Link to="/profile/resume" className="primary-btn blue outline" id="previousLink" tabIndex="9">
									<span className="">{NAVIGATION_ON_PREVIOUS_PAGE}</span>
									{/* <span className="pc">Previous</span>
									<span className="mobile">Go Back</span> */}
								</Link>
								<button className="primary-btn blue" type="submit" id="nextLink" tabIndex="10">
									{NAVIGATION_ON_NEXT_PAGE}
								</button>
							</>
						)}
				</div>
			</form>
		</div>
	);
}

export default PersonalDetails;
