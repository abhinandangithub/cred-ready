import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Textarea from "../../_Elements/Textarea";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import InputDropdown from "../../_Elements/InputDropdown/index";
import { addWorkExperience } from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { getGeographyThunk } from "../../../store/thunks/employer";

import { initRadioClick } from "../../../assets/js/Utility";

let pathName = null;

function AddWorkExperience(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	pathName = history.location.pathname;
	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const [uniqueStates, setUniqueStates] = React.useState("");
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.work_experience
	);
	const geographyKeys = useSelector(state => state.employerReducer.geographyKeys);


	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [activeTab, setActiveTab] = useState("add");
	const [allowContact, setAllowContact] = useState(true);

	const handleTabChange = (id) => {
		setActiveTab(id);
		setFormData({
			...formData,
			formValid: {
				add: false,
				verify: false,
			},
		});
	};

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		title: [],
		company: [],
		state: [],
		city: [],
		currentCompany: [],
		startDate: [],
		endDate: [],
		description: [],
		employerWebsite: [],

		supervisorName: [],
		supervisorTitle: [],
		phoneNumber: [],
		email: [],
		isContactable: [],

		formValid: {
			add: false,
			verify: false,
		},
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

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	const handleSubmit = (e, type) => {
		console.log("handleSubmit", e, type);
		e.preventDefault();
		const isMobileCta =
			getComputedStyle(document.getElementById("ctaForMobile")).display ===
			"block";

		let oldFormData = { ...formData };
		oldFormData.formValid.add = true;
		oldFormData.formValid.verify = true;

		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "employerWebsite" &&
				field !== "supervisorName" &&
				field !== "supervisorTitle" &&
				field !== "phoneNumber" &&
				field !== "email" &&
				field !== "isContactable" &&
				(oldFormData[field][0] === "" ||
					oldFormData[field][0] === undefined ||
					oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				if (oldFormData.currentCompany[0] === true && field === "endDate") {
					oldFormData[field][0] = "";
					oldFormData[field][1] = "";
					continue;
				}
				if (oldFormData[field][1] === "") {
					oldFormData[field][1] = "Required";
				} else if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
				if (
					field === "supervisorName" ||
					field === "supervisorTitle" ||
					field === "phoneNumber" ||
					field === "email"
				) {
					oldFormData.formValid.verify = false;
				} else {
					oldFormData.formValid.add = false;
				}
			}
		}

		if (activeTab === "add" && oldFormData.formValid.add && !isMobileCta) {
			setActiveTab("verify");

			return;
		}
		if (oldFormData.formValid.add && oldFormData.formValid.verify) {
			let obj = {
				title: formData.title[0],
				company: formData.company[0],
				state: formData.state[0],
				city: formData.city[0],
				isCurrentlyEmployed: formData.currentCompany[0],
				employmentFrom: formatDate(formData.startDate[0]),
				// employmentTo: formData.currentCompany[0] === true ? "" : formatDate(formData.endDate[0]),
				jobDescription: formData.description[0],
				employerWebsite: formData.employerWebsite[0],
				workexVerification: {
					supervisorName: formData.supervisorName[0],
					title: formData.supervisorTitle[0],
					phone: formData.phoneNumber[0],
					email: formData.email[0],
					isContactable: formData.isContactable[0],
				},
			};
			if (formData.currentCompany[0] === false) {
				obj.employmentTo = formatDate(formData.endDate[0]);
			}

			if (info) {
				if (typeof info.id === "number") obj.id = info.id;
			}

			// document.body.classList.remove("blendPopup");
			dispatch(addWorkExperience(obj));
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

	const handleFieldChangeCityState = (field, value, property) => {
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
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
			formValid: {
				add: false,
				verify: false,
			},
		});
	};

	React.useEffect(() => { }, [formData]);
	React.useEffect(() => {
		dispatch(getGeographyThunk());
	}, [geographyKeys])

	React.useEffect(() => {
		initRadioClick(".popup-addWorkExperience");

		if (info) {
			let i = findIndexOfObjInArr(dataArr, "work_ex_id", info.id);
			let arr = dataArr[i];

			if (arr) {
				setFormData({
					...formData,
					title: [arr.title],
					company: [arr.company],
					city: [arr.address && arr.address.city],
					state: [arr.address && arr.address.state],
					currentCompany: [arr.is_currently_employed],
					startDate: [arr.employment_from],
					endDate: [arr.employment_to],
					description: [arr.job_description],
					employerWebsite: [arr.employer_website],

					supervisorName: [arr.workex_verification.supervisorName],
					supervisorTitle: [arr.workex_verification.title],
					phoneNumber: [arr.workex_verification.phone],
					email: [arr.workex_verification.email],
					isContactable: [arr.workex_verification.isContactable],

					formValid: {
						add: false,
						verify: false,
					},
				});
				if (arr.employment_from !== undefined)
					setStartDate(new Date(arr.employment_from));
				if (arr.employment_to !== undefined)
					setEndDate(new Date(arr.employment_to));
				if (arr.employment_from === undefined) return;
				setStartDate(new Date(arr.employment_from));
				if (arr.employment_to === undefined) return;
				setEndDate(new Date(arr.employment_to));
			}
		}
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Employment Details</h1>
			) : (
					<h1>Add Employment Details</h1>
				)}

			{/* <form onSubmit={(e) => handleSubmit(e, "validSubmit")}> */}
			<div>
				<div className="popup-tabs pc">
					<div
						id="add"
						className={`tab flex ${activeTab === "add" ? "active" : ""}`}
					// onClick={(e) => handleTabChange(e.target.id)}
					>
						1
					</div>
					<div className="line" id="line"></div>
					<div
						id="verify"
						className={`tab flex ${activeTab === "verify" ? "active" : ""}`}
					// onClick={(e) => handleTabChange(e.target.id)}
					>
						2
					</div>
				</div>
				<ul className={`listing add ${activeTab === "add" ? "" : "hidden"}`}>
					<li>
						<label htmlFor="title">
							Job title <span>*</span>
							<span className={`error-text ${!formData.title[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="title"
							defaultValue={formData.title[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="company">
							Company <span>*</span>
							<span
								className={`error-text ${!formData.company[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="company"
							defaultValue={formData.company[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="city">
							City <span>*</span>
							<span className={`error-text ${!formData.city[1] && "hidden"}`}>
								Required
							</span>
						</label>
						{/* <Input
							type="text"
							id="city"
							autoComplete="hidden"
							defaultValue={formData.city[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/> */}
						<InputDropdown
							placeholder={"City"}
							content={
								geographyKeys.length > 0
									? geographyKeys.map((val) => ({
										val: val.city,
										id: val.id,
									}))
									: ""
							}
							search_term="city"
							selected={formData.city[0]}
							id="city"
							// onchange={(value) => handleFieldChange("city", value)}
							onchange={(value) => handleFieldChangeCityState("city", value, "city")}
						/>
					</li>
					<li>
						<label htmlFor="state">
							State <span>*</span>
							<span className={`error-text ${!formData.state[1] && "hidden"}`}>
								Required
							</span>
						</label>

						<InputDropdown
							placeholder={"State"}

							content={uniqueStates}

							selected={formData[`state`][0]}
							id="state"
							// onchange={(value) => handleFieldChange("state", value)}
							onchange={(value) => handleFieldChangeCityState("state", value, "state")}
						/>
					</li>
					<li className="industry">
						<label htmlFor="currentCompany">
							Current company?
							<span> * </span>
							<span
								className={`error-text ${!formData.currentCompany[1] && "hidden"
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
										checked={formData.currentCompany[0] === true}
										onChange={(e) => handleFieldChange("currentCompany", true)}
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
										checked={formData.currentCompany[0] === false}
										// defaultChecked
										onChange={(e) => handleFieldChange("currentCompany", false)}
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
							Employment <span>*</span>
							<span
								className={`error-text ${!formData.startDate[1] &&
									(formData.currentCompany[0] === false
										? !formData.endDate[1]
										: true) &&
									"hidden"
									}`}
							>
								Required
							</span>
						</label>
						<div className="date-outer">
							<span className="from">from</span>
							<div className="date">
								<CustomDatePicker
									id="startDate"
									selected={startDate}
									maxDate={new Date()}
									placeholderText="Start Date"
									onChange={(date) => {
										setStartDate(date);
										handleFieldChange("startDate", date);
									}}
								/>
							</div>
							<span className="to">to</span>
							<div className="date">
								{!formData.currentCompany[0] ? (
									<CustomDatePicker
										id="endDate"
										disabled={
											formData.currentCompany[0] === true ? true : false
										}
										popperPlacement="bottom-end"
										selected={endDate}
										maxDate={new Date()}
										placeholderText="End Date"
										minDate={startDate}
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
						<label htmlFor="employerWebsite">Employer website</label>
						<Input
							id="employerWebsite"
							defaultValue={formData.employerWebsite[0]}
							type="text"
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="description">
							Description <span>*</span>
							<span
								className={`error-text ${!formData.description[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Textarea
							id="description"
							defaultValue={formData.description[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
				</ul>

				<ul
					className={`listing verify ${activeTab === "verify" ? "" : "hidden mobile"
						}`}
				>
					<li className="verify_title mobile">Verification</li>
					<li>
						<label htmlFor="supervisorName">
							Supervisor's Name
							{/* <span>*</span>
							<span
								className={`error-text ${
									!formData.supervisorName[1] && "hidden"
								}`}
							>
								Required
							</span> */}
						</label>
						<Input
							type="text"
							id="supervisorName"
							defaultValue={formData.supervisorName[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="supervisorTitle">
							Supervisor's Title
							{/* <span>*</span>
							<span
								className={`error-text ${
									!formData.supervisorTitle[1] && "hidden"
								}`}
							>
								Required
							</span> */}
						</label>
						<Input
							type="text"
							id="supervisorTitle"
							defaultValue={formData.supervisorTitle[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="phoneNumber">
							Supervisor's Phone Number
							{/* <span>*</span>
							<span
								className={`error-text ${!formData.phoneNumber[1] && "hidden"}`}
							>
								Required
							</span> */}
						</label>
						<Input
							type="number"
							id="phoneNumber"
							defaultValue={formData.phoneNumber[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="email">
							Supervisor's Email
							{/* <span>*</span>
							<span className={`error-text ${!formData.email[1] && "hidden"}`}>
								Required
							</span> */}
						</label>
						<Input
							type="email"
							id="email"
							defaultValue={formData.email[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li role="radiogroup">
						<span
							className="option radio_button"
							role="radio"
							aria-checked="false"
							tabindex="0"
						>
							<input
								className="fancy-toggle blue"
								type="checkbox"
								name="isContactable"
								id="isContactable"
								checked={formData.isContactable[0] === true}
								onChange={(e) =>
									handleFieldChange(e.target.id, e.target.checked)
								}
							/>
							<label htmlFor="isContactable">
								<span className="input"></span>Allow recruiters to contact your
								Supervisor
							</label>
						</span>
					</li>
				</ul>

				<div className="dots pc">
					<span className={`dot ${activeTab === "add" ? "active" : ""}`}></span>
					<span
						className={`dot ${activeTab === "verify" ? "active" : ""}`}
					></span>
				</div>

				<div className="cta pc">
					<span className={`error-text ${!formData.formValid.add && "hidden"}`}>
						{activeTab === "add" &&
							!formData.formValid.verify &&
							"Verification tab is not filled correctly."}
					</span>
					<span
						className={`error-text ${!formData.formValid.verify && "hidden"}`}
					>
						{activeTab === "verify" &&
							!formData.formValid.add &&
							"Please fill required fields"}
					</span>
					{activeTab === "add" ? (
						<button
							className="primary-btn blue"
							id="submitBtn"
							type="submit"
							onClick={handleSubmit}
						>
							Next
						</button>
					) : (
							<div className="backDone">
								<button
									id="add"
									className="primary-btn blue outline back"
									onClick={(e) => handleTabChange(e.target.id)}
								>
									Back
							</button>
								<button
									className="primary-btn blue"
									id="submitBtn"
									type="submit"
									onClick={handleSubmit}
								>
									Done
							</button>
							</div>
						)}
					{/* <button className="primary-btn blue" id="submitBtn" type="submit">
						{activeTab === "add" ? "Next" : "Done"} */}
					{/* </button> */}
					<button
						className="primary-btn blue outline mobile"
						id="submitBtn"
						onClick={props.close}
					>
						Cancel
					</button>
				</div>

				<div className="cta mobile" id="ctaForMobile">
					<button
						className="primary-btn blue"
						id="submitBtn"
						type="submit"
						onClick={handleSubmit}
					>
						Done
					</button>
					<Link
						className="primary-btn blue outline mobile"
						to={pathName.substr(0, pathName.lastIndexOf("/"))}
						onClick={props.close}
					>
						Cancel
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AddWorkExperience;
