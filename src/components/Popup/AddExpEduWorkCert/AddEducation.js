import React, { useState } from "react";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./AddExpEduWorkCert.scss";
import { Dropdown } from "semantic-ui-react";

import Textarea from "../../_Elements/Textarea";
import InputDropdown from "../../_Elements/InputDropdown";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import {
	addEducationExperience,
	fetchCandidateInstituteType,
	fetchCandidateDegreeTitles,
	fetchAllMajorMinor,
} from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";
import { initRadioClick } from "../../../assets/js/Utility";

const degreeTitle = {
	heading: "Select Title of Degree",
	content: ["Degree 1", "Degree 2", "Degree 3", "No Degree"],
};

let pathName = null;

function AddEducation(props) {
	const history = useHistory();
	pathName = history.location.pathname;
	const majorMinorData = useSelector(
		(state) => state.setAllMajorMinorReducer.data
	);
	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.education_experience
	);

	const candidateInstiType = useSelector((state) => state.setCandidateInstitutionTypeReducer.data);
	const candidateDegreeTitles = useSelector((state) => state.setCandidateDegreeTitlesReducer.data);
	var data = candidateInstiType;

	const dispatch = useDispatch();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [institution, setInstitution] = useState();
	const [title, setTitle] = useState();
	const [schoolId, setSchoolId] = useState();
	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		degreeTitle: [], // 'value' is id
		institution: [], // 'value' is id
		startDate: [],
		endDate: [],
		majors: [[null]], // 'value' is array of id's
		minors: [[null]], // 'value' is array of id's
		// strengths: [],
		comments: [], // 'value' is string
		degreeGranted: [],

		formValid: false,
	});

	const handleAddMajorMinor = (type, operator, i) => {
		let arr = type === "majors" ? [...formData.majors] : [...formData.minors];

		if (operator === "add") {
			arr[0].push(null);
		} else if (operator === "remove") {
			arr[0].splice(i, 1);
		}
		arr[1] = "";

		setFormData({
			...formData,
			[type]: arr,
			formValid: false,
		});
	};

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
		let _formData = { ...formData };
		_formData.formValid = true;
		for (var field in _formData) {
			if (field === "majors" && formData.degreeTitle[0] !== 129) {
				for (let i = 0; i < _formData[field][0].length; i++) {
					if (_formData[field][0][i] === null) {
						_formData.formValid = false;
						if (_formData[field][1] === "") {
							_formData[field][1] = "Required";
						} else if (_formData[field][1] !== "Required") {
							_formData[field].push("Required");
						}
					}
				}
			}
			if (
				_formData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "minors" &&
				field !== "comments" &&
				(field !== "institution" || (formData.degreeTitle[0] !== 129)) &&
				field !== "majors" &&
				(_formData[field][0] === "" ||
					_formData[field][0] === undefined ||
					_formData[field][0] === null)
			) {
				_formData[field][0] = "";
				_formData.formValid = false;
				if (_formData[field][1] !== "Required") {
					_formData[field].push("Required");
				}
			}
			else if (_formData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "minors" &&
				field !== "comments" && (typeof (_formData["degreeTitle"][0]) !== "number")) {
				_formData.formValid = false;
				_formData["degreeTitle"][1] = "Required";
			}
		}

		if (_formData.formValid) {
			var obj = {
				titleOfDegree: _formData.degreeTitle[0],
				institution: _formData.institution[0],
				attendedFrom: formatDate(_formData.startDate[0]),
				attendedTill: formatDate(_formData.endDate[0]),
				majors:
					typeof _formData.majors[0][0] === "number" ? _formData.majors[0] : [],
				minors:
					typeof _formData.minors[0][0] === "number" ? _formData.minors[0] : [],
				educationDescription: _formData.comments[0],
				isUnfinished: _formData.degreeGranted[0],
			};

			if (info) {
				if (typeof info.id === "number") obj.id = info.id;
			}

			document.body.classList.remove("blendPopup");
			dispatch(addEducationExperience(obj));
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

		setFormData(_formData);
	};

	const handleFieldChange = (field, value) => {
		let msg = value === "" || value === null ? "Required" : "";

		if (field === "degreeTitle") {
			setSchoolId(value);
		}

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		if (field === "majors") {
			arr = [...formData.majors];
			arr[0][value.index] = value.id;
		} else if (field === "minors") {
			arr = [...formData.minors];
			arr[0][value.index] = value.id;
		}

		if (value !== false && field === "degreeGranted") {
			arr[1] = "";
		}

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	const onDropdownFieldChange = (e, data) => {
		if (data.id === "degreeTitle")
			setTitle(data.value);
		if (data.id === "institution")
			setInstitution(data.value);
		handleFieldChange(data.id, data.value);
	}

	React.useEffect(() => {
		initRadioClick(".popup-addEducation");
		if (candidateInstiType.length === 0)
			dispatch(fetchCandidateInstituteType());
		if (candidateDegreeTitles.length === 0)
			dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchAllMajorMinor());

		if (info && dataArr) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];

			if (arr) {
				let mj = [];
				let mn = [];

				for (let i = 0; i < arr.education_major.length; i++) {
					mj.push(arr.education_major[i].id);
				}
				if (arr.education_minor.length) {
					for (let i = 0; i < arr.education_minor.length; i++) {
						mn.push(arr.education_minor[i].id);
					}
				}
				if (mn.length === 0) {
					mn = [null];
				}
				if (mj.length === 0) {
					mj = [null];
				}
				setTitle(parseInt(arr.title));
				setInstitution(arr.institution);
				setFormData({
					...formData,
					degreeTitle: [parseInt(arr.title)],
					institution: [arr.institution],
					startDate: [arr.attended_from],
					endDate: [arr.attended_till],
					majors: [mj],
					minors: [mn],
					// strengths: [arr.],
					comments: [arr.education_description],
					degreeGranted: [arr.is_unfinished],
				});
				setSchoolId(arr.title);
				if (arr.attended_till !== undefined)
					setEndDate(new Date(arr.attended_till));
				if (arr.attended_from !== undefined)
					setStartDate(new Date(arr.attended_from));
				if (arr.attended_from === undefined) return;
				setStartDate(new Date(arr.attended_from));
				if (arr.attended_till === undefined) return;
				setEndDate(new Date(arr.attended_till));
			}
		}
		window.scrollTo(0, 0);
	}, []);
	const renderMajorMinor = (type, m, i) => {
		let _i =
			type === "majors"
				? formData.majors[0].length - 1 - i
				: formData.minors[0].length - 1 - i;
		return (
			<div className="input" key={i}>
				<InputDropdown
					placeholder={type === "majors" ? "Add Major" : "Add Minor"}
					content={majorMinorData.map((val) => {
						if (formData.majors[0].indexOf(val.id) > -1 || formData.minors[0].indexOf(val.id) > -1) {
							return {};
						} else {
							return {
								val: val.name,
								id: val.id,
							};
						}
					})}
					search_term
					selected={
						m && majorMinorData[findIndexOfObjInArr(majorMinorData, "id", m)]
							? majorMinorData[findIndexOfObjInArr(majorMinorData, "id", m)]
								.name
							: ""
					}
					onchange={(value) => {
						if (typeof value !== "number") return;

						handleFieldChange(type, {
							index: i,
							id: value,
						});
					}}
				/>
				{_i === 0 ? (
					<button
						className="circle-btn"
						id="addMajorBtn"
						onClick={() => handleAddMajorMinor(type, "add")}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				) : (
						<button
							className="circle-btn"
							id="addMajorBtn"
							onClick={() => handleAddMajorMinor(type, "remove", i)}
						>
							<FontAwesomeIcon icon={faMinus} />
						</button>
					)}
			</div>
		);
	};

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Education</h1>
			) : (
					<h1>Add Education</h1>
				)}

			<ul className="listing">
				<li>
					<label>
						Degree or High School Diploma <span>*</span>
						<span
							className={`error-text ${!formData.degreeTitle[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<Dropdown
						id="degreeTitle"
						placeholder="Select Title of Degree"
						fluid
						search
						selection
						value={title}
						options={candidateDegreeTitles.map((val) => ({
							text: val.title,
							key: val.id,
							value: val.id

						}))}
						onChange={onDropdownFieldChange}
					/>
				</li>
				{formData.degreeTitle[0] === 129 || schoolId === "129" ? (
					""
				) : (
						<li>
							<label>
								Institution <span>*</span>
								<span
									className={`error-text ${!formData.institution[1] && "hidden"}`}
								>
									Required
							</span>
							</label>
							<Dropdown
								id="institution"
								placeholder="Select Institution"
								fluid
								search
								selection
								options={candidateInstiType.map((val) => ({
									text: val.institute_name,
									key: val.id,
									value: val.id
								}))}
								value={institution}
								onChange={onDropdownFieldChange}

							/>
						</li>
					)}
				<li>
					<label>
						Attended <span>*</span>
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
								selected={startDate}
								placeholderText="Start Date"
								maxDate={new Date()}
								id="startDate"
								onChange={(date) => {
									setStartDate(date);
									handleFieldChange("startDate", date);
								}}
							/>
						</div>
						<span className="to">to</span>
						<div className="date">
							<CustomDatePicker
								maxDate={new Date()}
								selected={endDate}
								minDate={startDate}
								popperPlacement="bottom-end"
								placeholderText="End Date"
								id="endDate"
								onChange={(date) => {
									setEndDate(date);
									handleFieldChange("endDate", date);
								}}
							/>
						</div>
					</div>
				</li>
				{formData.degreeTitle[0] === 129 || schoolId === "129" ? (
					""
				) : (
						<>
							<li className="major-minor">
								<div className="label">
									<label>
										Major <span>*</span>
										<span
											className={`error-text ${!formData.majors[1] && "hidden"}`}
										>
											Required
									</span>
									</label>
								</div>
								<div className="inputs">
									{formData.majors[0].map((m, i) => {
										return renderMajorMinor("majors", m, i);
									})}
								</div>
							</li>
							<li className="major-minor">
								<div className="label">
									<label>
										Minor
									{/* <span className={`error-text ${!formData.minors[1] && "hidden"}`}>
								Required
							</span> */}
									</label>
								</div>
								<div className="inputs">
									{formData.minors[0].map((m, i) => {
										return renderMajorMinor("minors", m, i);
									})}
								</div>
							</li>
						</>
					)}
				{/* <li>
					<label htmlFor="strengths">
						Strengths <span>*</span>
						<span
							className={`error-text ${!formData.strengths[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<Input
						id="strengths"
						type="text"
						defaultValue={formData.strengths[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li> */}
				<li>
					<label htmlFor="comments">
						Additional Comments
						{/* <span className={`error-text ${!formData.comments[1] && "hidden"}`}>
							Required
						</span> */}
					</label>
					<Textarea
						id="comments"
						defaultValue={formData.comments[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				{/* <li className="block">
					<div className="top">
						<input
							className="fancy-toggle checkbox"
							type="checkbox"
							name="termsandconditions"
							id="degreeGranted"
							onChange={(e) => handleFieldChange(e.target.id, e.target.checked)}
						/>
						<label htmlFor="degreeGranted">
							<span className="input"></span>Degree Granted <span>&nbsp;*</span>
						</label>
					</div>
					<span
						className={`error-text ${!formData.degreeGranted[1] && "hidden"}`}
					>
						Required
					</span>
				</li> */}
				<li className="industry">
					<label htmlFor="degreeGranted">
						Degree granted?
						<span> * </span>
						<span
							className={`error-text ${!formData.degreeGranted[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<div className="degree_yes_no">
						<span role="radiogroup">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex="0"
							>
								<input
									className="fancy-toggle blue yes"
									id="degreeGrantedYes"
									name="degreeGranted"
									type="radio"
									checked={formData.degreeGranted[0] === true}
									onChange={(e) => handleFieldChange("degreeGranted", true)}
								/>
								<label htmlFor="degreeGrantedYes">
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
									id="degreeGrantedNo"
									name="degreeGranted"
									type="radio"
									checked={formData.degreeGranted[0] === false}
									onChange={(e) => handleFieldChange("degreeGranted", false)}
								/>
								<label htmlFor="degreeGrantedNo">
									<span className="input"></span>No
								</label>
							</span>
						</span>
					</div>
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

function mapStateToProps(state) {
	return {
		candidateInstiType: state.setCandidateInstitutionTypeReducer.data,
		candidateDegreeTitles: state.setCandidateDegreeTitlesReducer.data,
	};
}

export default AddEducation;
