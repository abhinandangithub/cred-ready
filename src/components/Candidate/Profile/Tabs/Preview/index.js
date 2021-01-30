import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPen,
	faPhone,
	faMailBulk,
	faInfoCircle,
	faTrash,
	faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { connect, useSelector, useDispatch } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import "./index.scss";
import { Link, useHistory } from "react-router-dom";
import {
	fetchCandidateDetails,
	fetchCandidateCurrentStatus,
	fetchAllCertificateTitles,
	fetchCandidateInstituteType,
	fetchCandidateDegreeTitles,
} from "../../../../../modals/candidateProfile/thunk";
import { profileDownload } from "../../../../../store/thunks/employer";
import {
	toggleOverlay,
	togglePopup,
} from "../../../../../store/actions/popup_overlay";
import UploadIcon from "../../../../../assets/upload-blue.jpg";
import { getGeographyThunk } from "../../../../../store/thunks/employer";
import { showToast } from "../../../../../store/actions/toast";
import Spinner from "../../../../_Elements/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
let _phone = null;

function Preview(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [checkedConditions, setCheckedConditions] = React.useState(true);
	const [numPages, setNumPages] = React.useState(null);
	const [isMobile, setIsMobile] = React.useState(false);

	const personelDetailsData = useSelector((state) =>
		state.candidateSetDataReducer ? state.candidateSetDataReducer.data : []
	);
	const geographyKeys = useSelector(state => state.employerReducer.geographyKeys);


	const [phone, setPhone] = React.useState("");

	React.useEffect(() => {
		if (personelDetailsData.contacts) {
			_phone = personelDetailsData.contacts.find(
				(entity) => entity.contact_type === "phone"
			).contact;

			if (_phone) {
				_phone = _phone.toString();

				if (_phone[0] === "+") {
					_phone = _phone.substring(1);
				}

				if (_phone[0] === "1") {
					let x = _phone
						.replace(/\D/g, "")
						.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
					_phone = x[1] + " (" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
					setPhone(_phone);
				} else {
					let x = _phone
						.replace(/\D/g, "")
						.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
					_phone = "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");

					setPhone(_phone);
				}
			}
		}
	}, [personelDetailsData.contacts]);

	// React.useEffect(() => {}, [phone]);

	const otherWorkExp = useSelector((state) =>
		state.candidateSetDataReducer.data.additional_experiences
			? state.candidateSetDataReducer.data.additional_experiences.find(
				(entity) => entity.career_path === "work"
			)
			: ""
	);
	const otherEducationExp = useSelector((state) =>
		state.candidateSetDataReducer.data.additional_experiences
			? state.candidateSetDataReducer.data.additional_experiences.find(
				(entity) => entity.career_path === "EDUCATION"
			)
			: ""
	);

	const status = useSelector((state) =>
		state.candidateCurrentStatusReducer
			? state.candidateCurrentStatusReducer.data
			: []
	);

	const institutions = useSelector((state) =>
		state.setCandidateInstitutionTypeReducer
			? state.setCandidateInstitutionTypeReducer.data
			: []
	);
	const degrees = useSelector((state) =>
		state.setCandidateDegreeTitlesReducer
			? state.setCandidateDegreeTitlesReducer.data
			: []
	);
	const certificates = useSelector((state) =>
		state.setCandidateCertificateTitlesReducer
			? state.setCandidateCertificateTitlesReducer.data
			: []
	);
	const showCertificate = (certificate) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "certificate", { certificate }]));
	};

	React.useEffect(() => {
		props.fetchCandidateInstituteType();
		dispatch(fetchCandidateDetails());
		dispatch(getGeographyThunk());
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchAllCertificateTitles());
		window.scrollTo(0, 0);
	}, []);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const storageHandler = () => {
		if (!personelDetailsData.first_name || !personelDetailsData.last_name) {
			dispatch(
				showToast({
					message: "Complete Your Profile to Apply for This Job",
					type: "warning",
					isShow: true,
				})
			);
		} else {
			history.push("/profile/questions");
		}
	};

	const noStorageHandler = () => {
		history.push("/goals");
	};
	const handleDownloadClick = () => {
		dispatch(profileDownload("candidate"));
		if (props.employerProfilePath) {
			let name = props.employerProfilePath.data.substr(
				props.employerProfilePath.data.lastIndexOf("/") + 1
			);
			console.log("name ", name);
			fetch(props.employerProfilePath.data).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = name ? name : "resume.pdf";
					a.click();
					dispatch(
						showToast({
							message: "Profile downloaded successfully.",
							type: "success",
							isShow: true,
						})
					);
				});
			});
		} else {
			dispatch(
				showToast({
					message: "Error downloading your profile before completion.",
					type: "error",
					isShow: true,
				})
			);
		}
	};

	const handleDelete = () => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: "profileCandidate" }]));

		// if (props.type !== "candidate") dispatch(deleteAccount());
	};

	return (
		<div className="preview_info">
			<div className="_heading mobile">
				<span className="text">Preview</span>
				<span className="count">4/4</span>
			</div>
			<div className="content">
				<div className="group profile mobile">
					<div className="top">
						<FontAwesomeIcon
							className="action-btn edit"
							icon={faPen}
							onClick={() => history.push(`/profile/personal-details/edit`)}
						/>
						<div className="left">
							<img src={personelDetailsData.profile_image_path} alt="" />
							<div className="edit" id="editPicBtn">
								<label htmlFor="upload-button">
									<FontAwesomeIcon className="btn" icon={faPen} />
								</label>
								<input
									type="file"
									id="upload-button"
									style={{ display: "none" }}
								// onChange={(e) => handleChange(e)}
								/>
							</div>
						</div>
						<div className="right">
							<h1>
								{personelDetailsData.first_name} {personelDetailsData.last_name}
							</h1>
							<h2>{personelDetailsData.current_title}</h2>
						</div>
					</div>
					<div className="bottom">
						<ul>
							<li>
								<FontAwesomeIcon
									className="icon icon_left"
									icon={faPhone}
									style={{ transform: "rotateY(180deg)" }}
								/>
								<span>{_phone && _phone.indexOf("()") >= 0 ? "" : _phone}</span>
							</li>
							<li>
								<FontAwesomeIcon className="icon icon_left" icon={faMailBulk} />
								<textarea
									value={personelDetailsData.username}
									readOnly
								></textarea>
							</li>
							<li>
								<FontAwesomeIcon
									className="icon icon_left"
									icon={faInfoCircle}
								/>
								<span>{personelDetailsData.about_me}</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="group">
					<div className="top">
						<h1>Resume</h1>
						<FontAwesomeIcon
							className="action-btn edit pc"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/resume`)}
						/>
						<img
							className="mobile"
							src={UploadIcon}
							onClick={() => history.push(`/profile/resume`)}
							alt=""
						></img>
					</div>
					<div className="bottom">
						{personelDetailsData.resume_name ? (
							<p>
								<Link to="/profile/resume">
									{personelDetailsData.resume_name}
								</Link>
							</p>
						) : (
								<div className="resume_not">
									<span className="msg">No resumes uploaded yet.</span>
									<span className="hint">
										We accept doc, docx, pdf formats upto 6 MB
								</span>
								</div>
							)}
					</div>
				</div>
				<div className="group">
					<div className="top">
						<h1>Personal Details</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/personal-details`)}
						/>
					</div>
					<div className="bottom">
						<p>
							<span className="heading pc">First Name:</span>{" "}
							<span className="pc">{personelDetailsData.first_name}</span>
						</p>
						<p>
							<span className="heading pc">Last Name:</span>{" "}
							<span className="pc">{personelDetailsData.last_name}</span>
						</p>
						<p>
							<span className="heading">Current Employment Status:</span>{" "}
							{status.map((entity) => {
								if (entity.id === personelDetailsData.current_employment_status)
									return entity.employment_status;
							})}
						</p>
						<p>
							<span className="heading">
								How long would you begin a new role?
							</span>{" "}
							{personelDetailsData.available_within}
						</p>
						<p>
							<span className="heading mobile">Street:</span>{" "}
							<span className="mobile">
								{personelDetailsData &&
									personelDetailsData.address &&
									personelDetailsData.address.street_address}
							</span>
						</p>
						<p>
							<span className="heading mobile">City:</span>{" "}
							<span className="mobile">
								{personelDetailsData &&
									personelDetailsData.address && personelDetailsData.address.city
								}
							</span>
						</p>

						<p>
							<span className="heading mobile">State:</span>{" "}
							<span className="mobile">
								{personelDetailsData &&
									personelDetailsData.address &&
									personelDetailsData.address.state
								}
							</span>
						</p>
						<p>
							<span className="heading mobile">Zip Code:</span>{" "}
							<span className="mobile">
								{personelDetailsData &&
									personelDetailsData.address &&
									personelDetailsData.address.zip_code}
							</span>
						</p>
					</div>
				</div>
				<div className="group">
					<div className="top">
						<h1>Work Experience</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/work-experience`)}
						/>
					</div>
					<div className="insider">
						{personelDetailsData &&
							personelDetailsData.work_experience &&
							personelDetailsData.work_experience.length >= 1
							? personelDetailsData.work_experience.map((exp, index) => {
								return (
									<div className="details" key={index}>
										<h2>{exp.title}</h2>
										<p>
											<span className="text">
												{" "}
												{/* <span className="heading">From</span>{" "} */}
												{exp.employment_from && exp.employment_from.charAt(5) === ","
													? exp.employment_from && exp.employment_from.slice(0, 11)
													: exp.employment_from && exp.employment_from.slice(0, 12)}
											</span>
											<span className="heading">{" - "}</span>
											<span className="text">
												{exp.employment_to
													? exp.employment_to.charAt(5) === ","
														? exp.employment_to && exp.employment_to.slice(0, 11)
														: exp.employment_to && exp.employment_to.slice(0, 12)
													: "Present"}
											</span>
										</p>
										<p>
											<span className="heading">Description: </span>
											{exp.job_description}
										</p>
										<p>
											<span className="heading">Organization: </span>
											{exp.company}
										</p>
										<p>
											<span className="heading">Location: </span>
											{exp.location || (exp.address && exp.address.city)}
										</p>
										<p>
											<span className="heading">Employer Website: </span>
											{exp.employer_website}
										</p>
										<p>
											<span className="heading">
												Current Employment Status:{" "}
											</span>
											<span className="text">
												{exp.is_currently_employed === true ? "Yes" : "No"}
											</span>
										</p>
									</div>
								);
							})
							: ""}
					</div>
					<div className="top other">
						<h1>Other Experiences</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/work-experience`)}
						/>
					</div>
					<div className="bottom">
						{personelDetailsData &&
							personelDetailsData.additional_experiences &&
							personelDetailsData.additional_experiences.length >= 1
							? personelDetailsData.additional_experiences.map((exp, index) => {
								if (exp.career_path === "work") {
									return (
										<div className="details" key={index}>
											<h2>{exp.title}</h2>
											<p>
												<span className="text">
													{/* <span className="heading">From</span>{" "} */}
													{exp.employed_from && exp.employed_from.charAt(5) === ","
														? exp.employed_from && exp.employed_from.slice(0, 11)
														: exp.employed_from && exp.employed_from.slice(0, 12)}
												</span>
												<span>{" - "}</span>
												<span className="text">
													{exp.employed_till
														? exp.employed_till && exp.employed_till.charAt(5) === ","
															? exp.employed_till && exp.employed_till.slice(0, 11)
															: exp.employed_till && exp.employed_till.slice(0, 12)
														: "Present"}
												</span>
											</p>
											<p>
												<span className="heading">Description: </span>
												{exp.description}
											</p>
											<p>
												<span className="heading">Organization: </span>
												{exp.organization_name}
											</p>
											<p>
												<span className="heading">Location: </span>
												{exp.location}
											</p>
										</div>
									);
								}
							})
							: ""}
					</div>
				</div>
				<div className="group ">
					<div className="top">
						<h1>Education</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/education`)}
						/>
					</div>
					<div className="bottom">
						{personelDetailsData &&
							personelDetailsData.education_experience &&
							personelDetailsData.education_experience.length >= 1
							? personelDetailsData.education_experience.map((exp, index) => {
								return (
									<div className="details" key={index}>
										<h2>
											{degrees.length > 0 &&
												degrees.map((entity) => {
													if (entity.id === parseInt(exp.title))
														return entity.title;
												})}
										</h2>
										<p>
											<span className="text">
												{/* <span className="heading">From</span>{" "} */}
												{exp.attended_from && exp.attended_from.charAt(5) === ","
													? exp.attended_from && exp.attended_from.slice(0, 11)
													: exp.attended_from && exp.attended_from.slice(0, 12)}{" "}
											</span>
											<span>{" - "}</span>
											<span className="text">
												{exp.attended_till && exp.attended_till.charAt(5) === ","
													? exp.attended_till && exp.attended_till.slice(0, 11)
													: exp.attended_till && exp.attended_till.slice(0, 12)}
											</span>
										</p>
										<p>
											<span className="heading">
												{degrees.length > 0 &&
													degrees.map((entity) => {
														if (entity.id === exp.title) return entity.title;
													})}
											</span>
											{exp.institution ? (
												<>
													<span className="heading">Institution: </span>
													{institutions.length > 0 &&
														institutions.map((entity) => {
															if (entity.id === exp.institution)
																return entity.institute_name;
														})}
													<br />{" "}
												</>
											) : (
													""
												)}
											{exp.education_major.length > 0 ? (
												<>
													<span className="heading">Major: </span>
													{exp.education_major &&
														exp.education_major.map((major) => {
															return <>{major.name + "   "}</>;
														})}
													<br />
												</>
											) : (
													""
												)}

											{exp.education_minor.length > 0 ? (
												<>
													<span className="heading">Minor: </span>
													{exp.education_minor &&
														exp.education_minor.map((minor) => {
															return <>{minor.name + "   "}</>;
														})}
													<br />
													<span className="heading">Description: </span>
													{exp.education_description}
												</>
											) : (
													""
												)}
										</p>
									</div>
								);
							})
							: ""}
					</div>
					<div className="top other">
						<h1>Certifications</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/education`)}
						/>
					</div>
					{personelDetailsData &&
						personelDetailsData.certificate &&
						personelDetailsData.certificate.length >= 1
						? personelDetailsData.certificate.map((entity, index) => {
							return (
								<div className="bottom" key={index}>
									<div className="details">
										<h2>
											{certificates.length > 0 &&
												certificates.map((cert) => {
													if (cert.id === entity.title_id)
														return cert.title_name;
												})}
										</h2>
										<p>
											<span className="heading">Description: </span>
											<span className="text">{entity.description}</span>
										</p>
										<p>
											<span className="heading">Issued Date: </span>
											<span className="text">
												{entity.issued_date && entity.issued_date.charAt(5) === ","
													? entity.issued_date && entity.issued_date.slice(0, 11)
													: entity.issued_date && entity.issued_date.slice(0, 12)}
											</span>
										</p>
										<p>
											<span className="heading">Issuer: </span>
											<span className="text">{entity.issuer}</span>
										</p>
										<p>
											<span className="heading">Certificate link: </span>
											<span className="text">
												<Link to="/">{entity.certificate_link}</Link>
											</span>
										</p>
										<p className="docs">
											{entity.certificate_image_loc && (
												<>
													<span className="heading">Certificate image: </span>
													<span
														className="doc"
														to={entity.doc}
														onClick={() =>
															showCertificate(entity.certificate_image_loc)
														}
														id={"showCertificate_" + index}
													>
														{entity.certificate_image_loc &&
															entity.certificate_image_loc.split(".").pop() ===
															"pdf" ? (
																<Document
																	file={entity.certificate_image_loc}
																	onLoadSuccess={onDocumentLoadSuccess}
																	loading={
																		<div className="spinner_outer">
																			<Spinner />
																		</div>
																	}
																>
																	{Array.from(
																		new Array(numPages),
																		(el, index) => (
																			<Page
																				// size="A4"
																				loading=""
																				key={`page_${index + 1}`}
																				pageNumber={index + 1}
																				width={150}
																			// width={width}
																			/>
																		)
																	)}
																</Document>
															) : (
																<img
																	src={entity.certificate_image_loc}
																	alt={entity.doc}
																/>
															)}
													</span>
												</>
											)}
										</p>
									</div>
								</div>
							);
						})
						: ""}
					{/* <div className="details">
						<h2>GHI Nursing Certificate</h2>
						<p>
							<span className="heading">Description: </span>
							{" - "}
							<span className="text">
								Patient Care & Safety, Medical Terminology, Electronic Medical
								Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
								Medication Administration, Patient Advocacy and Support.
								</span>
						</p>
						<p>
							<span className="heading">Issued Date: </span>
							{" to "}
							<span className="text">2014</span>
						</p>
						<p>
							<span className="heading">Certificate link: </span>
							<span className="text">
								<Link to="/">https://www.certificatelink.com/certi.pdf</Link>
							</span>
						</p>
						<p>
							<span className="heading">Certificate Image: </span>
							<span className="text">Image here</span>
						</p>
					</div> */}
					<div className="top other">
						<h1>Other Experiences</h1>
						<FontAwesomeIcon
							className="action-btn edit"
							id="edit-icon"
							icon={faPen}
							onClick={() => history.push(`/profile/education`)}
						/>
					</div>
					<div className="bottom">
						{personelDetailsData &&
							personelDetailsData.additional_experiences &&
							personelDetailsData.additional_experiences.length >= 1
							? personelDetailsData.additional_experiences.map((exp, index) => {
								if (exp.career_path === "EDUCATION") {
									return (
										<div className="details" key={index}>
											<h2>{exp.title}</h2>
											<p>
												<span className="text">
													{/* <span className="heading">From</span>{" "} */}
													{exp.employed_from && exp.employed_from.charAt(5) === ","
														? exp.employed_from && exp.employed_from.slice(0, 11)
														: exp.employed_from && exp.employed_from.slice(0, 12)}
												</span>
												<span>{" - "}</span>
												<span className="text">
													{exp.employed_till
														? exp.employed_till.charAt(5) === ","
															? exp.employed_till && exp.employed_till.slice(0, 11)
															: exp.employed_till && exp.employed_till.slice(0, 12)
														: "Present"}
												</span>
											</p>
											<p>
												<span className="heading">Description: </span>
												{exp.description}
											</p>
											<p>
												<span className="heading">Organization: </span>
												{exp.organization_name}
											</p>
											<p>
												<span className="heading">Location: </span>
												{exp.location}
											</p>
										</div>
									);
								}
							})
							: ""}
					</div>
				</div>
			</div>

			{!isMobile ? (
				<>
					<div className="check-boxes">
						<div className="check-box">
							<input
								className="fancy-toggle blue"
								type="checkbox"
								name="termsandconditions"
								id="allowContact"
								defaultChecked
							/>
							<label htmlFor="allowContact">
								<span className="input"></span>
								Allow recruiters to contact you for more details
							</label>
						</div>
						<div className="check-box">
							<input
								className="fancy-toggle blue"
								type="checkbox"
								name="termsandconditions"
								id="confirm"
							// onClick={() => {
							// 	setCheckedConditions(!checkedConditions);
							// }}
							/>
							<label htmlFor="confirm">
								<span className="input"></span>I confirm that the information
								given in this form is true, complete and accurate.
							</label>
						</div>
					</div>
					<div className="cta">
						{checkedConditions ? (
							localStorage.getItem("jobId") ? (
								<button
									onClick={storageHandler}
									className="primary-btn blue"
									id="profileQuestionsLink"
								>
									Proceed to questions
								</button>
							) : (
									<>
										<button
											onClick={noStorageHandler}
											className="primary-btn blue pc"
											id="profileQuestionsLink"
										>
											Save Profile
									</button>
										<button
											onClick={() => setIsMobile(true)}
											className="primary-btn blue mobile"
											id="profileQuestionsLink"
										>
											Complete Profile
									</button>
									</>
								)
						) : (
								""
							)}
						{/* <Link className="primary-btn blue mobile" to="/jobs">
					Complete profile
				</Link> */}
					</div>
				</>
			) : (
					<>
						<div className="download_delete mobile">
							{personelDetailsData.first_name ? (
								<a to="#" onClick={handleDownloadClick}>
									<FontAwesomeIcon icon={faDownload} />
									Export Personal Information
								</a>
							) : (
									""
								)}
							<a to="#" onClick={handleDelete}>
								<FontAwesomeIcon icon={faTrash} />
							Delete Account
						</a>
						</div>
					</>
				)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		candidateData: state.candidateSetDataReducer.data,
		institutionsData: state.setCandidateInstitutionTypeReducer.data,
		employerProfilePath: state.employerReducer.employerProfilePath,
	};
}

const mapDispatchToProps = {
	fetchCandidateDetails: fetchCandidateDetails,
	fetchCandidateCurrentStatus: fetchCandidateCurrentStatus,
	fetchCandidateInstituteType: fetchCandidateInstituteType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
