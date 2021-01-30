import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPen,
	faPhone,
	faMailBulk,
	faInfoCircle,
	faDownload,
	faTrash,
	faTimes,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";

import "./index.scss";
import ImgUserPlaceholder from "../../../assets/user-placeholder.jpg";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import { checkFileSize, checkMimeType } from "../../../assets/js/Utility";
import {
	updateEmailThunk,
	updatePhoneThunk,
	uploadProfileImage,
	profileDownload,
} from "../../../store/thunks/employer";
import {
	updateCandidatePhone,
	updateCandidateAbout,
	updateCandidateEmail,
	fetchCandidateCurrentStatus,
	uploadCandidateImage,
	fetchAllAnswers,
} from "../../../modals/candidateProfile/thunk";
import { showToast } from "../../../store/actions/toast";
import { strings } from "../../../constants";
import {
	handleKeyUpPhone,
	handleKeyDownPhone,
	formatPhoneText,
} from "../../../assets/js/Utility";
const { ERROR_MESSAGE_FOR_PHONE_NUMBER, DOWNLOADING_USER_PERSONAL_DETAILS, DELETING_ACCOUNT } = strings.CANDIDATE_ONBOARDING.PROFILE_OVERVIEW;

let _phone = "";
let _email = "";
let _about = "";
let onlyDigitPhone = "";

function ProfileOverview(props) {
	const dispatch = useDispatch();
	const { addToast } = useToasts();
	const [errorMessage, setErrorMessage] = useState(null);
	const phoneElRef = React.useRef();

	const allData = useSelector((state) => state.candidateSetDataReducer.data);
	const employerProfile = useSelector((state) => state.employerReducer.profile);
	const [email, setEmail] = useState(
		props.type === "candidate" &&
			allData.contacts &&
			allData.contacts.length > 0
			? allData.contacts.find((el) => el.contact_type === "email").contact
			: ""
	);
	const [about, setAbout] = useState(
		props.type === "candidate" && allData.about_me ? allData.about_me : ""
	);
	const [phone, setPhone] = useState(
		props.type === "candidate" &&
			allData.contacts &&
			allData.contacts.length > 0
			? allData.contacts.find((el) => el.contact_type === "phone").contact
			: ""
	);
	useEffect(() => {
		dispatch(profileDownload(props.type));
	}, [dispatch]);

	useEffect(() => {
		console.log("employerProfilePath ", props.employerProfilePath);
	}, [props.employerProfilePath]);

	const handleDownloadClick = () => {
		dispatch(profileDownload(props.type));
		if (props.employerProfilePath) {
			let name = props.employerProfilePath.data.substr(
				props.employerProfilePath.data.lastIndexOf("/") + 1
			);
			fetch(props.employerProfilePath.data).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = name ? name : "resume.pdf";
					a.click();
					addToast("Profile downloaded successfully.", {
						appearance: "success",
						autoDismiss: true,
					});
				});
			});
		} else {
			addToast("Error downloading your profile before completion.", {
				appearance: "error",
				autoDismiss: true,
			});
		}
	};

	const [editingPhone, setEditingPhone] = useState(false);
	const [editingEmail, setEditingEmail] = useState(false);
	const [editingAboutMe, setEditingAboutMe] = useState(false);
	const [image, setImage] = useState({
		preview:
			employerProfile.data.org.logo_path !== ""
				? employerProfile.data.org.logo_path
				: ImgUserPlaceholder,
		raw: "",
	});
	const [candidateImage, setCandidateImage] = useState({
		preview:
			allData.profile_image_path && allData.profile_image_path !== ""
				? allData.profile_image_path
				: ImgUserPlaceholder,
		raw: "",
	});

	useEffect(() => {
		// console.log("phone...........: ", phone);
		phoneElRef.current.value = phone;
	}, [phone]);

	useEffect(() => {
		setEmail(
			props.type === "candidate"
				? allData.username
					? allData.username
					: ""
				: employerProfile.data.contacts.length > 0
					? employerProfile.data.contacts.find(
						(el) => el.contact_type === "email"
					).contact
					: ""
		);
		setAbout(
			props.type === "candidate" && allData.about_me ? allData.about_me : ""
		);
		let intialPhone =
			props.type === "candidate"
				? allData.contacts
					? allData.contacts.find((el) => el.contact_type === "phone").contact
					: ""
				: employerProfile.data.contacts.length > 0
					? employerProfile.data.contacts.find(
						(el) => el.contact_type === "phone"
					).contact
					: "";

		if (!!intialPhone) {
			intialPhone = intialPhone.toString();

			if (intialPhone[0] === "+") {
				intialPhone = intialPhone.substring(1);
			}

			// if (onlyDigitPhone.toString()[0] === "1") intialPhone = "1" + intialPhone;

			if (intialPhone[0] === "1") {
				let x = intialPhone
					.replace(/\D/g, "")
					.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
				intialPhone =
					x[1] + " (" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
			} else {
				let x = intialPhone
					.replace(/\D/g, "")
					.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				intialPhone = "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
			}

			setPhone(intialPhone);
		}
		setCandidateImage({
			preview: allData.profile_image_path,
			raw: "",
		});
		setImage({
			preview: employerProfile.data.org.logo_path,
			raw: "",
		});
		dispatch(fetchAllAnswers());
		dispatch(fetchCandidateCurrentStatus());
	}, [employerProfile, allData]);

	const handleDelete = () => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		if (props.type === "candidate") {
			dispatch(togglePopup([true, "delete", { what: "profileCandidate" }]));
		} else {
			dispatch(togglePopup([true, "delete", { what: "profileEmployer" }]));
		}
		// if (props.type !== "candidate") dispatch(deleteAccount());
	};

	const handleClick = (id) => {
		if (id === "checkPhoneBtn" || id === "closePhoneBtn") {
			setEditingPhone(false);
			if (id === "checkPhoneBtn" && phone.length !== 0) {
				onlyDigitPhone = phone
					.replace(/\(/g, "")
					.replace(/\)/g, "")
					.replace(/-/g, "")
					.replace(/ /g, "");

				onlyDigitPhone = +onlyDigitPhone.trim();
				console.log("onlyDigitPhone......", onlyDigitPhone);

				if (props.type !== "candidate") {
					dispatch(updatePhoneThunk(onlyDigitPhone));
				} else {
					dispatch(updateCandidatePhone(onlyDigitPhone));
				}
			} else {
				// phoneElRef.current.value = _phone;
				setPhone(_phone);
			}
		} else if (id === "editPhoneBtn") {
			_phone = phone;
			setEditingPhone(true);
		} else if (id === "checkAboutMeBtn" || id === "closeAboutMeBtn") {
			setEditingAboutMe(false);
			if (id === "checkAboutMeBtn" && about.length !== 0) {
				if (props.type === "candidate") dispatch(updateCandidateAbout(about));
			} else {
				setAbout(_about);
			}
		} else if (id === "checkEmailBtn" || id === "closeEmailBtn") {
			setEditingEmail(false);
			if (id === "checkEmailBtn" && email.length !== 0) {
				if (props.type !== "candidate") dispatch(updateEmailThunk(email));
				dispatch(updateCandidateEmail(email));
			} else {
				setEmail(_email);
			}
		} else if (id === "editEmailBtn") {
			_email = email;
			setEditingEmail(true);
		} else if (id === "checkAboutMeBtn" || id === "closeAboutMeBtn") {
			setEditingAboutMe(false);
		} else if (id === "editAboutMeBtn") {
			_about = about;
			setEditingAboutMe(true);
		}
	};

	const handleChange = (e) => {
		console.log(e.target.files[0]);
		const formData = new FormData();
		let msg = checkFileSize(e.target.files[0], 5);
		if (props.type === "candidate") {
			if (msg !== true) {
				setErrorMessage(msg);
			} else {
				if (e.target.files.length) {
					msg = checkMimeType(e.target.files[0], "img");
					if (msg !== true) {
						setErrorMessage(msg);
						addToast(msg, {
							appearance: "error",
							autoDismiss: true,
						});
					} else {
						setCandidateImage({
							preview: URL.createObjectURL(e.target.files[0]),
							raw: e.target.files[0],
						});
						console.log(formData);
						formData.set("dp", e.target.files[0]);
						dispatch(uploadCandidateImage(formData));
					}
				}
			}
		} else {
			if (e.target.files.length) {
				setImage({
					preview: URL.createObjectURL(e.target.files[0]),
					raw: e.target.files[0],
				});
			}
			formData.set("logo", e.target.files[0]);
			console.log(formData);
			dispatch(uploadProfileImage(formData));
		}
	};

	const aboutEl = React.useRef();

	const textAreaAdjust = (e) => {
		// let target = e.target;
		if (aboutEl.current && aboutEl.current.style) {
			if (aboutEl && aboutEl.current) {
				aboutEl.current.style.height = "1px";
				aboutEl.current.style.height = aboutEl.current.scrollHeight + "px";
			}
		}
	};

	useEffect(() => {
		textAreaAdjust();
	}, [about]);

	const handleChangePhone = (e) => {
		let temp = formatPhoneText(e.target.value);
		setPhone(temp);
	};

	return (
		<div className="profile-overview pc">
			<div className="primary">
				<div className="avatar">
					{props.type === "candidate" ? (
						<img src={candidateImage.preview} alt="" />
					) : (
							<img src={image.preview} alt="" />
						)}
					<div className="edit" id="editPicBtn">
						<label htmlFor="upload-button">
							<FontAwesomeIcon className="btn" icon={faPen} />
						</label>
						<input
							type="file"
							id="upload-button"
							style={{ display: "none" }}
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>
				{props.type === "candidate" && (
					<div>
						<h1>
							{allData.first_name ? allData.first_name : ""}{" "}
							{allData.last_name ? allData.last_name : ""}
						</h1>
						<h2>{allData.current_title ? allData.current_title : ""}</h2>
					</div>
				)}

				{props.type === "employer" && (
					<>
						{/* <h2>{employerProfile.data.name}</h2> */}
						<h2>{employerProfile.data.org.org_name}</h2>
						{/* <h3>{employerProfile.data.title}</h3> */}
					</>
				)}
			</div>
			<div className="secondary">
				<ul>
					<li className="phone-error">
						{!phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) &&
							!phone.match(/^1 \(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) &&
							editingPhone && (
								<span className="ml-27 error-text">{ERROR_MESSAGE_FOR_PHONE_NUMBER}</span>
							)}
					</li>
					<li className="phone-block">
						<div className="phone-icons">
							<FontAwesomeIcon
								className="icon icon_left"
								icon={faPhone}
								style={{ transform: "rotateY(180deg)" }}
							/>
							{/* <a href={!editingPhone ? `tel: ${phoneElRef}` : '#'}> */}
							<a className="telephone" href={!editingPhone && `tel: ${phone}`}>
								<input
									type="text"
									// defaultValue={allData.contacts[0] && allData.contacts[0].contact ? allData.contacts[0].contact : ""}
									value={phone}
									ref={phoneElRef}
									className={`${editingPhone ? "edit" : ""}`}
									readOnly={editingPhone ? false : true}
									// placeholder="(678) 912-3456"
									// onChange={(e) => setPhone(e.target.value)}
									// onKeyDown={handleKeyDownPhone}
									// onKeyUp={(e) => {
									// 	setPhone(e.target.value);
									// 	handleKeyUpPhone(e);
									// }}
									// onChange={handleChangePhone}
									onInput={(e) => {
										var x = e.target.value;

										if (e.target.value[0] === "1") {
											// if (x.length === 4) x = x.substring(1);
											x = x
												.replace(/\D/g, "")
												.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
											e.target.value = !x[3]
												? x[1] + x[2]
												: !x[2]
													? x[1]
													: x[1] +
													" (" +
													x[2] +
													") " +
													x[3] +
													(x[4] ? "-" + x[4] : "");
										} else {
											x = x
												.replace(/\D/g, "")
												.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
											e.target.value = !x[2]
												? x[1]
												: "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
										}

										let phone = e.target.value;
										// phone = phone
										// 	.replace(/\(/g, "")
										// 	.replace(/\)/g, "")
										// 	.replace(/-/g, "")
										// 	.replace(/ /g, "");

										// phone = +phone.trim();

										setPhone(phone);
									}}
								/>
							</a>
							<FontAwesomeIcon
								id="editPhoneBtn"
								icon={faPen}
								className={`edit ${editingPhone ? "hidden" : ""}`}
								onClick={(e) => handleClick(e.target.id)}
							/>
							<FontAwesomeIcon
								className={`close ${editingPhone ? "" : "hidden"}`}
								id="closePhoneBtn"
								icon={faTimes}
								onClick={(e) => handleClick(e.target.id)}
							/>
							{phone.match(
								/^\s*(?:\+?(\d{1,3}))?[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d)[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d)[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d[\W\D\s]*?\d)(?: *x(\d+))?\s*$/g
							) ? (
									<FontAwesomeIcon
										className={`check ${editingPhone ? "" : "hidden"}`}
										id="checkPhoneBtn"
										icon={faCheck}
										onClick={(e) => handleClick(e.target.id)}
									/>
								) : (
									""
								)}
						</div>
					</li>
					<li>
						<FontAwesomeIcon className="icon icon_left" icon={faMailBulk} />
						<a href={`mailto: ${email}`} className="mailto">
							<textarea
								type="email"
								// defaultValue={allData.username ? allData.username : ""}
								value={email}
								className={`${editingEmail ? "edit" : ""}`}
								readOnly={editingEmail ? false : true}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</a>
						{/* <FontAwesomeIcon
							id="editEmailBtn"
							icon={faPen}
							className={`edit ${editingEmail ? "hidden" : ""}`}
							onClick={(e) => handleClick(e.target.id)}
						/> */}
						<FontAwesomeIcon
							className={`close ${editingEmail ? "" : "hidden"}`}
							id="closeEmailBtn"
							icon={faTimes}
							onClick={(e) => handleClick(e.target.id)}
						/>
						<FontAwesomeIcon
							className={`check ${editingEmail ? "" : "hidden"}`}
							id="checkEmailBtn"
							icon={faCheck}
							onClick={(e) => handleClick(e.target.id)}
						/>
					</li>
					{props.type === "candidate" && (
						<li>
							<FontAwesomeIcon className="icon icon_left" icon={faInfoCircle} />
							{/* <textarea
								defaultValue="About me"
								className={`${editingAboutMe ? "edit" : ""}`}
								readOnly={editingAboutMe ? false : true}
							></textarea> */}
							<textarea
								type="text"
								ref={aboutEl}
								value={about}
								placeholder="About me"
								onKeyUp={textAreaAdjust}
								className={`${editingAboutMe ? "edit" : ""}`}
								readOnly={editingAboutMe ? false : true}
								onChange={(e) => setAbout(e.target.value)}
							/>
							<FontAwesomeIcon
								id="editAboutMeBtn"
								icon={faPen}
								className={`edit ${editingAboutMe ? "hidden" : ""}`}
								onClick={(e) => handleClick(e.target.id)}
							/>
							<FontAwesomeIcon
								className={`close ${editingAboutMe ? "" : "hidden"}`}
								id="closeAboutMeBtn"
								icon={faTimes}
								onClick={(e) => handleClick(e.target.id)}
							/>
							<FontAwesomeIcon
								className={`check ${editingAboutMe ? "" : "hidden"}`}
								id="checkAboutMeBtn"
								icon={faCheck}
								onClick={(e) => handleClick(e.target.id)}
							/>
						</li>
					)}

					{props.type === "candidate" && allData.first_name ? (
						<li className="highlight">
							<div onClick={handleDownloadClick} id="deleteProfileBtn">
								<FontAwesomeIcon className="icon" icon={faDownload} />
								Export Personal Information
							</div>
						</li>
					) : (
							""
						)}
					{props.type === "employer" &&
						employerProfile.data &&
						employerProfile.data.name ? (
							<li className="highlight">
								<div onClick={handleDownloadClick} id="deleteProfileBtn">
									<FontAwesomeIcon className="icon" icon={faDownload} />
									Export Personal Information
							</div>
							</li>
						) : (
							""
						)}
					<li className="highlight">
						<div onClick={handleDelete} id="deleteProfileBtn">
							<FontAwesomeIcon className="icon" icon={faTrash} />
							{DELETING_ACCOUNT}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		employerProfilePath: state.employerReducer.employerProfilePath,
	};
}

export default connect(mapStateToProps)(ProfileOverview);
