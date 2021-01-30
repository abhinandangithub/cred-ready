import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import userData from "../../../../_data/userData.json";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import {
	fetchCandidateDetails,
	fetchAllCertificateTitles,
	fetchCandidateInstituteType,
	fetchCandidateDegreeTitles,
} from "../../../../../modals/candidateProfile/thunk";
import {
	toggleOverlay,
	togglePopup,
} from "../../../../../store/actions/popup_overlay";
import Spinner from "../../../../_Elements/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
let pathName = null;

function Education(props) {
	const history = useHistory();
	pathName = history.location.pathname;

	const dispatch = useDispatch();
	const [numPages, setNumPages] = React.useState(null);

	const certificateTitles = useSelector(
		(state) => state.setCandidateCertificateTitlesReducer.data
	);
	const degreeTitles = useSelector(
		(state) => state.setCandidateDegreeTitlesReducer.data
	);
	const allInstitutes = useSelector(
		(state) => state.setCandidateInstitutionTypeReducer.data
	);

	const showCertificate = (certificate) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "certificate", { certificate }]));
	};

	const handleEdit = (id, type, info) => {
		if (info) {
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, type, { id, purpose: "edit" }]));
		} else {
			dispatch(toggleOverlay(true));
			dispatch(togglePopup([true, type, { id, purpose: "edit" }]));
		}
	};

	const handleDelete = (id, type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: type, id: id }]));
	};
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	// const renderEducation = userData.profile.education.map((data, i) => {
	const renderEducation = props.eduExpData.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>
					{degreeTitles &&
						degreeTitles.map((entity) => {
							if (entity.id === parseInt(data.title)) return entity.title;
						})}
				</h2>
				<p>{data.education_description}</p>
				{data.institution ? (
					<p>
						<span className="heading">Institute: </span>
						<span className="text">
							{allInstitutes &&
								allInstitutes.map((entity) => {
									if (entity.id === data.institution)
										return entity.institute_name;
								})}
						</span>
					</p>
				) : (
						""
					)}
				{(data.attended_from || data.attended_till) ? <p>
					{data.attended_from && data.attended_from.charAt(5) === ","
						? data.attended_from && data.attended_from.slice(0, 11)
						: data.attended_from && data.attended_from.slice(0, 12)}{" "}
					to{" "}
					{data.attended_till && data.attended_till.charAt(5) === ","
						? data.attended_till && data.attended_till.slice(0, 11)
						: data.attended_till && data.attended_till.slice(0, 12)}
				</p> : ""}
				{data.education_major.length > 0 ? (
					<p>
						<span className="heading">Major:</span>
						{data.education_major.map((entity) => entity.name)}
					</p>
				) : (
						""
					)}
				{data.education_minor.length > 0 ? (
					<p>
						<span className="heading">Minor: </span>
						<span className="text">
							{data.education_minor &&
								data.education_minor.map((entity) => entity.name)}
						</span>
					</p>
				) : (
						""
					)}

				<FontAwesomeIcon
					className="action-btn edit pc"
					icon={faPen}
					id={"educationEdit_" + i}
					onClick={() => handleEdit(data.id, "addEducation")}
				/>
				<Link
					to={pathName + "/add-education"}
					className="mobile"
					onClick={() => handleEdit(data.id, "addEducation", { isEdit: true })}
				>
					<FontAwesomeIcon className="action-btn edit" icon={faPen} />
				</Link>
				<FontAwesomeIcon
					className="action-btn delete"
					icon={faTrash}
					id={"educationDelete_" + i}
					onClick={() => handleDelete(data.id, "education")}
				/>
			</div>
		);
	});

	// const renderOtherExperiences = userData.profile.workExperiences.map(
	const renderOtherExperiences = props.otherExpData.map((data, i) => {
		if (data.career_path === "EDUCATION") {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.organization_name} - <span>{data.location}</span>
					</h3>
					{(data.employed_from || data.employed_till) ? <h4>
						<span>
							{data.employed_from && data.employed_from.charAt(5) === ","
								? data.employed_from && data.employed_from.slice(0, 11)
								: data.employed_from && data.employed_from.slice(0, 12)}
						</span>{" "}
						-{" "}
						<span>
							{data.employed_till
								? data.employed_till.charAt(5) === ","
									? data.employed_till && data.employed_till.slice(0, 11)
									: data.employed_till && data.employed_till.slice(0, 12)
								: "Present"}
						</span>
					</h4> : ""}
					<p className="description">
						<span className="heading">Description: </span>
						<span className="text">{data.description}</span>
					</p>
					<FontAwesomeIcon
						className="action-btn edit pc"
						icon={faPen}
						id={"otherExperienceEdit_" + i}
						onClick={() => handleEdit(data.id, "addEduOtherExperience")}
					/>
					<Link
						to={pathName + "/add-edu-other-work"}
						className="mobile"
						onClick={() =>
							handleEdit(data.id, "addEduOtherExperience", { isEdit: true })
						}
					>
						<FontAwesomeIcon className="action-btn edit" icon={faPen} />
					</Link>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						id={"otherExperienceDelete_" + i}
						onClick={() => handleDelete(data.id, "otherExperience")}
					/>
				</div>
			);
		}
		return "";
	});

	// const renderCertifications = userData.profile.certifications.map(
	const renderCertifications = props.certificateData.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>
					{certificateTitles &&
						certificateTitles.map((entity) => {
							if (entity.id === data.title_id) return entity.title_name;
						})}
				</h2>
				<p>
					<span className="heading">Issuer: </span>
					{data.issuer}
				</p>
				<p>
					<span className="heading">Issued Date: </span>
					{data.issued_date && data.issued_date.charAt(5) === ","
						? data.issued_date && data.issued_date.slice(0, 11)
						: data.issued_date && data.issued_date.slice(0, 12)}
				</p>
				<p>
					<span className="heading">Certificate Link: </span>
					{data.certificate_link}
				</p>
				<p>
					<span className="heading">Description: </span>
					<span className="text">{data.description}</span>
				</p>
				<p className="docs">
					{data.certificate_image_loc && (
						<>
							<span className="heading">Certificate image: </span>
							<span
								className="doc"
								to={data.doc}
								onClick={() => showCertificate(data.certificate_image_loc)}
								id={"showCertificate_" + i}
							>
								{data.certificate_image_loc &&
									data.certificate_image_loc.split(".").pop() === "pdf" ? (
										<Document
											file={data.certificate_image_loc}
											onLoadSuccess={onDocumentLoadSuccess}
											loading={
												<div className="spinner_outer">
													<Spinner />
												</div>
											}
										>
											{Array.from(new Array(numPages), (el, index) => (
												<Page
													// size="A4"
													loading=""
													key={`page_${index + 1}`}
													pageNumber={index + 1}
													width={150}
												// width={width}
												/>
											))}
										</Document>
									) : (
										<img src={data.certificate_image_loc} alt={data.doc} />
									)}
							</span>
						</>
					)}
				</p>

				<FontAwesomeIcon
					className="action-btn edit pc"
					icon={faPen}
					id={"certificateEdit_" + i}
					onClick={() => handleEdit(data.id, "addCertificate")}
				/>
				<Link
					to={pathName + "/add-certificate"}
					className="mobile"
					onClick={() =>
						handleEdit(data.id, "addCertificate", { isEdit: true })
					}
				>
					<FontAwesomeIcon className="action-btn edit" icon={faPen} />
				</Link>
				<FontAwesomeIcon
					className="action-btn delete"
					icon={faTrash}
					id={"certificateDelete_" + i}
					onClick={() => handleDelete(data.id, "certificate")}
				/>
			</div>
		);
	});
	React.useEffect(() => {
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchCandidateInstituteType());
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="education">
			<div className="_heading mobile">
				<span className="text">Education</span>
				<span className="count">3/4</span>
			</div>
			<p className="sub-heading mobile">Add relevant educational details</p>

			{/* PC */}
			<div className="pc">
				<Accordion
					active
					title="Education"
					type="addEducation"
					id="addEducation"
					addButton="Add Education"
				>
					{renderEducation}
					{/* {props.eduExpData.length > 0 ? renderEducation : <Spinner />} */}
				</Accordion>
				<Accordion
					active
					title="Certification"
					type="addCertificate"
					id="addCertificate"
					addButton="Add Certificate"
				>
					{renderCertifications}
				</Accordion>
				<Accordion
					active
					title="Other Experiences"
					type="addEduOtherExperience"
					id="addEduOtherExperience"
					addButton="Add Other Experiences"
				>
					{renderOtherExperiences}
				</Accordion>
			</div>

			{/* MOBILE */}
			<div className="mobile">
				<Accordion
					active
					title="Education"
					type="addEducation"
					id="addEducation"
					addButton="Add Education"
					blendPopup
				>
					{renderEducation}
				</Accordion>
				<Accordion
					active
					title="Certification"
					type="addCertificate"
					id="addCertificate"
					addButton="Add Certificate"
					blendPopup
				>
					{renderCertifications}
				</Accordion>
				<Accordion
					active
					title="Other Experiences"
					type="addEduOtherExperience"
					id="addEduOtherExperience"
					addButton="Add Other Experiences"
					blendPopup
				>
					{renderOtherExperiences}
				</Accordion>
			</div>

			<div className="cta">
				{props.match.params.id ? (
					<Link
						className="primary-btn blue"
						to={`/jobs/view/${props.match.params.id}`}
						id="nextLink"
					>
						Done
					</Link>
				) : (
						<>
							<Link
								to="/profile/work-experience"
								className="primary-btn blue outline"
								id="previousLink"
							>
								<span className="">Previous</span>
								{/* <span className="pc">Previous</span>
								<span className="mobile">Go Back</span> */}
							</Link>
							<Link
								to="/profile/preview"
								className="primary-btn blue"
								id="nextLink"
							>
								Next
						</Link>
						</>
					)}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		eduExpData: state.candidateSetDataReducer.data
			? state.candidateSetDataReducer.data.education_experience
			: [],
		otherExpData: state.candidateSetDataReducer.data
			? state.candidateSetDataReducer.data.additional_experiences
			: [],
		certificateData: state.candidateSetDataReducer.data
			? state.candidateSetDataReducer.data.certificate
			: [],
	};
}

const mapDispatchToProps = {
	fetchCandidateDetails: fetchCandidateDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
