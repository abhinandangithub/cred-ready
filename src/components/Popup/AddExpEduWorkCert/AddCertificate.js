import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Textarea from "../../_Elements/Textarea";
import InputDropdown from "../../_Elements/InputDropdown";
import { Dropdown } from "semantic-ui-react";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import {
	addEducationCertificate,
	fetchAllCertificateTitles,
	fetchAllFunctions,
	fetchAllIndustries,
} from "../../../modals/candidateProfile/thunk";
import { checkFileSize, checkMimeType } from "../../../assets/js/Utility";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";


const title = {
	heading: "Select Title",
	content: ["Title 1", "Title 2", "Title 3", "No Title"],
};

const functions = {
	heading: "Select Function",
	content: ["Function 1", "Function 2", "Function 3", "No Function"],
};

const issuer = {
	heading: "Select Issuer",
	content: ["Issuer 1", "Issuer 2", "Issuer 3", "No Issuer"],
};
let pathName = null;

function AddCertificate(props) {
	const history = useHistory();
	pathName = history.location.pathname;
	const dispatch = useDispatch();
	const [issueDate, setIssueDate] = useState();
	const [errorMessage, setErrorMessage] = useState(null);
	const [industry, setIndustry] = useState();
	const [functionType, setFunctionType] = useState();
	const [selectedFile, setSelectedFile] = useState(null);
	const [certificateImage, setCertificateImage] = useState({
		preview: "",
		raw: "",
	});

	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.certificate
	);

	const AllTitles = useSelector(
		(state) => state.setCandidateCertificateTitlesReducer.data
	);
	const AllIndustries = useSelector(
		(state) => state.setAllIndustriesReducer.data
	);
	const uploadBtnRef = useRef(null);
	const handleUpload = (btnId) => {
		uploadBtnRef.current.click();
	};
	// console.log(AllIndustries, AllFunctions);

	const handleChange = (e) => {
		const file = e.target.files[0];

		let msg = checkFileSize(file, 10);

		if (msg !== true) {
			setErrorMessage(msg);
		} else {
			let customMessage =
				"Unsupported certificate format. Please upload the image in JPEG, JPG, PNG, GIF or PDF format.";
			let isPdf = (msg = checkMimeType(file, "pdf"));
			let isImg = checkMimeType(file, "img");
			if (isPdf !== true && isImg !== true) {
				setErrorMessage(customMessage);
			} else {
				setErrorMessage("");
				setSelectedFile(file);

				setCertificateImage({
					preview: URL.createObjectURL(file),
					raw: file,
				});
			}
		}
	};

	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		industry: [],
		title: [],
		issuer: [],
		function: [],
		issueDate: [],
		description: [],
		certificateLink: [],

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
				field !== "function" &&
				field !== "certificateLink" &&
				(oldFormData[field][0] === "" ||
					oldFormData[field][0] === undefined ||
					oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				oldFormData.formValid = false;
				if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
			}
		}

		if (oldFormData.formValid) {
			console.log("submitting form...");
			const obj = new FormData();
			obj.set("certificateImage", certificateImage.raw);
			if (info && (typeof (info.id) === "number")) {
				obj.set(
					"certificate",
					JSON.stringify({
						id: info.id,
						certificateLink: formData.certificateLink[0],
						description: formData.description[0],
						functionId: formData.function[0],
						industryId: formData.industry[0],
						issuedDate: formatDate(formData.issueDate[0]),
						issuer: formData.issuer[0],
						title: formData.title[0],
					})
				);

			} else {
				obj.set(
					"certificate",
					JSON.stringify({
						certificateLink: formData.certificateLink[0],
						description: formData.description[0],
						functionId: formData.function[0],
						industryId: formData.industry[0],
						issuedDate: formatDate(formData.issueDate[0]),
						issuer: formData.issuer[0],
						title: formData.title[0],
					})
				);
			}
			console.log("Sachin", obj.get("certificate").charAt(3));
			document.body.classList.remove("blendPopup");
			dispatch(addEducationCertificate(obj));
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, ""]));
			history.push(
				isMobileCta ? pathName.substr(0, pathName.lastIndexOf("/")) : pathName
			);
		}
		setTimeout(() => {
			let scrollToEl = document.querySelectorAll(
				".error-text:not(.hidden)"
			)[0];
			const isMobileView =
				getComputedStyle(document.querySelector(".profile-overview")).display ===
				"none";

			if (scrollToEl) {
				var scrollToElParent =
					scrollToEl.closest("li")
			}

			if (scrollToElParent) {
				scrollToElParent.scrollIntoView();
				if (isMobileView) {
					window.scrollBy(0, -70);
				}
				else {
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

	React.useEffect(() => {
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchAllFunctions());
		dispatch(fetchAllIndustries());

		if (info) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];

			if (arr) {
				setCertificateImage({
					preview: arr.certificate_image_loc,
					raw: "",
				});
				setIndustry(arr.industry_id);
				setFunctionType(arr.function_id);
				setFormData({
					...formData,

					industry: [arr.industry_id],
					title: [arr.title_id],
					issuer: [arr.issuer],
					function: [arr.function_id],
					issueDate: [arr.issued_date],
					description: [arr.description],
					certificateLink: [arr.certificate_link],
				});

				setIssueDate(new Date(arr.issued_date));
			}
		}
		window.scrollTo(0, 0);
	}, []);

	const onDropdownFieldChange = (e, data) => {
		console.log(data);
		if (data.id === "industry")
			setIndustry(data.value);
		if (data.id === "function")
			setFunctionType(data.value);
		handleFieldChange(data.id, data.value);
	}

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Certificate</h1>
			) : (
					<h1>Add Certificate</h1>
				)}

			<ul className="listing">
				<li>
					<label>
						Industry <span>*</span>
						<span className={`error-text ${!formData.industry[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Dropdown
						id="industry"
						placeholder="Select Industry"
						fluid
						selection
						search
						value={industry}
						options={
							AllIndustries.length > 0
								? AllIndustries.map((val) => ({
									text: val.industry_name,
									key: val.id,
									value: val.id,
								}))
								: []
						}
						onChange={onDropdownFieldChange}
					/>
				</li>
				<li>
					<label>
						Certificate Title <span>*</span>
						<span className={`error-text ${!formData.title[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Dropdown
						placeholder="Select Title"
						fluid
						selection
						search
						value={functionType}
						options={
							AllTitles.length > 0
								? AllTitles.map((val) => ({
									text: val.title_name,
									key: val.id,
									value: val.id
								}))
								: ""
						}
						id="title"
						onChange={onDropdownFieldChange}
					/>
				</li>
				<li>
					<label>
						Issuer <span>*</span>
						<span className={`error-text ${!formData.issuer[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Input
						id="issuer"
						defaultValue={formData.issuer[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<label>
						Issue Date <span>*</span>
						<span
							className={`error-text ${!formData.issueDate[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<div className="date-outer">
						<div className="date">
							<CustomDatePicker
								selected={issueDate}
								maxDate={new Date()}
								placeholderText="Select Date"
								id="issueDate"
								onChange={(date) => {
									setIssueDate(date);
									handleFieldChange("issueDate", date);
								}}
							/>
						</div>
					</div>
				</li>
				<li>
					<label>
						Certificate Link
						{/* <span>*</span>
						<span
							className={`error-text ${!formData.certificateLink[1] && "hidden"}`}
						>
							Required
						</span> */}
					</label>
					<Input
						type="text"
						id="certificateLink"
						placeholder="Paste URL link in this box"
						defaultValue={formData.certificateLink[0]}
						onChange={(e) =>
							handleFieldChange("certificateLink", e.target.value)
						}
					/>
				</li>
				<li>
					<label>Certificate Image</label>
					<div className="upload">
						<div className="content">
							<Input
								type="text"
								value={
									certificateImage.preview &&
									certificateImage.preview.slice(
										5,
										certificateImage.preview.length
									)
								}
								id="certificateImage"
								cls={`${errorMessage ? "error" : ""}`}
							/>
							<button
								className="upload-btn"
								onClick={handleUpload}
								id="uploadBtn"
							>
								Upload
							</button>
							<input
								ref={uploadBtnRef}
								type="file"
								onChange={(e) => handleChange(e)}
								className="hidden"
								id="uploadFileInput"
							/>
						</div>
						<p className={`${errorMessage ? "" : "hidden"}`}>{errorMessage}</p>
					</div>
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
		cerificatedata: state.candidateSetDataReducer.certificate
			? state.candidateSetDataReducer.certificate
			: "",
	};
}

export default connect(mapStateToProps)(AddCertificate);
