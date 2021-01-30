import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import { Dropdown } from "semantic-ui-react";
import Textarea from "../../_Elements/Textarea";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import {
	addOtherEducationExperience,
	fetchCandidateExperienceType,
} from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";
import { initRadioClick } from "../../../assets/js/Utility";

let pathName = null;

function AddEduOtherExperience(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	pathName = history.location.pathname;
	const experiences = useSelector((state) =>
		state.setCandidateExperienceTypeReducer.data
			? state.setCandidateExperienceTypeReducer.data
			: ""
	);
	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.additional_experiences
	);
	const [experienceType, setExperienceType] = useState();

	const [startDate, setStartDate] = useState();

	const [endDate, setEndDate] = useState();

	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		experienceType: [],
		organizationName: [],
		title: [],
		isCurrentlyAssociated: [],
		startDate: [],
		endDate: [],
		location: [],
		description: [],

		formValid: false,
	});

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}
	const handleSubmit = () => {
		const isMobileCta =
			getComputedStyle(document.getElementById("ctaForMobile")).display ===
			"block";
		let oldFormData = { ...formData };
		oldFormData.formValid = true;

		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "description" &&
				(oldFormData[field][0] === "" ||
					oldFormData[field][0] === undefined ||
					oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				if (
					oldFormData.isCurrentlyAssociated[0] === true &&
					field === "endDate"
				) {
					oldFormData[field][0] = "";
					oldFormData[field][1] = "";
					continue;
				}
				oldFormData.formValid = false;
				if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
			}
		}

		if (oldFormData.formValid) {
			console.log("submitting form...");

			var obj = {
				experienceType: formData.experienceType[0],
				organizationName: formData.organizationName[0],
				title: formData.title[0],
				isCurrentlyAssociated: formData.isCurrentlyAssociated[0],
				from: formatDate(formData.startDate[0]),
				// to: formatDate(formData.endDate[0]),
				location: formData.location[0],
				description: formData.description[0],
				skills: [],
				careerPath: "EDUCATION",
			};
			if (formData.isCurrentlyAssociated[0] === false) {
				obj.to = formatDate(formData.endDate[0]);
			}

			if (info) {
				if (typeof info.id === "number") obj.id = info.id;
			}

			document.body.classList.remove("blendPopup");
			dispatch(addOtherEducationExperience(obj));
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, ""]));
			history.push(
				isMobileCta ? pathName.substr(0, pathName.lastIndexOf("/")) : pathName
			);
		}
		setTimeout(() => {
			let scrollToEl = document.querySelectorAll(".error-text:not(.hidden)")[0];
			const isMobileView =
				getComputedStyle(document.querySelector(".profile-overview"))
					.display === "none";

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
			console.log(isMobileView, scrollToEl, scrollToElParent);
		});

		setFormData(oldFormData);
	};

	const handleFieldChange = (field, value) => {
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});
	};
	const onDropdownFieldChange = (e, data) => {
		if (data.id === "experienceType")
			setExperienceType(data.value);
		handleFieldChange(data.id, data.value);
	}

	React.useEffect(() => {
		initRadioClick(".popup-addEduOtherExperience");

		dispatch(fetchCandidateExperienceType());

		if (info) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];

			if (arr) {
				setExperienceType(arr.experience_type);
				setFormData({
					...formData,
					experienceType: [arr.experience_type],
					organizationName: [arr.organization_name],
					title: [arr.title],
					isCurrentlyAssociated: [arr.is_currently_associated],
					startDate: [arr.employed_from],
					endDate: [arr.employed_till],
					location: [arr.location],
					description: [arr.description],
				});

				if (arr.employed_till !== undefined)
					setEndDate(new Date(arr.employed_till));
				if (arr.employed_from !== undefined)
					setStartDate(new Date(arr.employed_from));
				if (arr.employed_from === undefined) return;
				setStartDate(new Date(arr.employed_from));
				if (arr.employed_till === undefined) return;
				setEndDate(new Date(arr.employed_till));
			}
		}
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Other Experience</h1>
			) : (
					<h1>Add Other Experience</h1>
				)}
			<ul className="listing">
				<li>
					<label htmlFor="experienceType">
						Experience Type <span>*</span>
						<span
							className={`error-text ${!formData.experienceType[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<Dropdown
						id="experienceType"
						placeholder="Select Experience Type"
						fluid
						selection
						options={
							experiences.length > 0 &&
							experiences.map((val) => ({
								key: val.id,
								value: val.id,
								text: val.experience_type,
							}))
						}
						value={experienceType}
						onChange={onDropdownFieldChange}
					/>
				</li>
				<li>
					<label htmlFor="organizationName">
						Organization Name <span>*</span>
						<span
							className={`error-text ${!formData.organizationName[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<Input
						id="organizationName"
						type="text"
						defaultValue={formData.organizationName[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<label htmlFor="title">
						Title <span>*</span>
						<span className={`error-text ${!formData.title[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Input
						id="title"
						type="text"
						defaultValue={formData.title[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<label htmlFor="location">
						Location <span>*</span>
						<span className={`error-text ${!formData.location[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Input
						id="location"
						type="text"
						autoComplete="off"
						defaultValue={formData.location[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li className="industry">
					<label htmlFor="currentCompany">
						Is it ongoing?
						<span> * </span>
						<span
							className={`error-text ${!formData.isCurrentlyAssociated[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<div>
						<span role="radiogroup">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex="0"
							>
								<input
									className="fancy-toggle blue yes"
									id="currentCompanyYes"
									name="currentCompany"
									type="radio"
									// defaultChecked
									checked={formData.isCurrentlyAssociated[0] === true}
									onChange={(e) =>
										handleFieldChange("isCurrentlyAssociated", true)
									}
								/>
								<label htmlFor="currentCompanyYes">
									<span className="input"></span>Yes
								</label>
							</span>
						</span>
						<span role="radiogroup">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex="0"
							>
								<input
									className="fancy-toggle blue"
									id="currentCompanyNo"
									name="currentCompany"
									type="radio"
									checked={formData.isCurrentlyAssociated[0] === false}
									// defaultChecked
									onChange={(e) =>
										handleFieldChange("isCurrentlyAssociated", false)
									}
								/>
								<label htmlFor="currentCompanyNo">
									<span className="input"></span>No
								</label>
							</span>
						</span>
					</div>
				</li>
				<li>
					<label>
						Date <span>*</span>
						<span
							className={`error-text ${!formData.startDate[1] && !formData.endDate[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<div className="date-outer">
						<span className="from">from</span>
						<div className="date">
							<CustomDatePicker
								maxDate={new Date()}
								selected={startDate}
								placeholderText="Start Date"
								id="startDate"
								onChange={(date) => {
									setStartDate(date);
									handleFieldChange("startDate", date);
								}}
							/>
						</div>
						<span className="to">to</span>
						<div className="date">
							{!formData.isCurrentlyAssociated[0] ? (
								<CustomDatePicker
									selected={endDate}
									maxDate={new Date()}
									minDate={startDate}
									disabled={
										formData.isCurrentlyAssociated[0] === true ? true : false
									}
									popperPlacement="bottom-end"
									placeholderText="End Date"
									id="endDate"
									onChange={(date) => {
										setEndDate(date);
										handleFieldChange("endDate", date);
									}}
								/>
							) : (
									<span className="present">Present</span>
								)}
						</div>
					</div>
				</li>

				<li>
					<label htmlFor="description">
						Description
						{/* <span
							className={`error-text ${!formData.description[1] && "hidden"}`}
						>
							Required
						</span> */}
					</label>
					<Textarea
						id="description"
						defaultValue={formData.description[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
			</ul>
			<div className="cta">
				<button
					className="primary-btn blue"
					id="submitBtn"
					onClick={handleSubmit}
				>
					Done
				</button>
				<Link
					className="primary-btn blue outline mobile"
					id="ctaForMobile"
					to={pathName.substr(0, pathName.lastIndexOf("/"))}
					onClick={props.close}
				>
					Cancel
				</Link>
			</div>
		</div>
	);
}

export default AddEduOtherExperience;
