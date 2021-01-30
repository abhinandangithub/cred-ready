import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import FileViewer from "react-file-viewer";

import "./index.scss";
import {
	formatDate,
	checkFileSize,
	checkMimeType,
} from "../../../../../assets/js/Utility";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";
import {
	uploadCandidateResume,
	fetchCandidateDetails,
} from "../../../../../modals/candidateProfile/thunk";
import { fetchAllCandidateDataUrl } from "../../../../../modals/candidateProfile/api";
import Spinner from "../../../../_Elements/Spinner";
import { showToast } from "../../.././../../store/actions/toast";
import {strings} from "../../../../../constants";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const {DESCRIPTIVE_TEXT,SUB_DESCRIPTIVE_TEXT, FILE_UPLOAD_CONTROL, FILE_UPLOAD_CONTROL_DESCRIPTION, FILE_UPLOAD_CONTROL_TO_CHANGE,RESUME_UPDATE_DATE, NAVIGATION_TO_NEXT_PAGE, EXTRA_NAVIGATION_BUTTON_ON_MOBILE  } = strings.CANDIDATE_ONBOARDING.RESUME;
function Resume(props) {
	const dispatch = useDispatch();
	const allData = useSelector((state) =>
		state.candidateSetDataReducer.data ? state.candidateSetDataReducer.data : []
	);
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const [success, setSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFormValid, setIsFormValid] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [resume, setResume] = useState({
		name: "",
		type: "",
		path: "",
	});

	const uploadBtnRef = useRef(null);
	const reUploadBtnRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	const resumeParser = (file) => {
			dispatch(toggleOverlay(true));
			dispatch(togglePopup([true, "populateInformation", file]));
		
	};
	useEffect(() => {
		console.log("errorMessage", errorMessage);
		if (errorMessage === "") {
			setSuccess(true);
		}
		dispatch(fetchCandidateDetails());
		// setResume({
		// 	preview:
		// 		allData.resume_path && allData.resume_path !== ""
		// 			? allData.resume_path
		// 			: "",
		// 	raw: "",
		// });
	}, [errorMessage]);

	useEffect(() => {
		if (allData.resume_path) {
			setResume({
				name: allData.resume_name,
				type: allData.resume_path.split(".").pop() === "pdf" ? "pdf" : "doc",
				path: allData.resume_path,
			});
		}
	}, [allData]);

	const handleChange = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		let msg = checkFileSize(file, 6);

		if (e.target.files.length) {
			// setResume({
			// 	preview: URL.createObjectURL(e.target.files[0]),
			// 	raw: e.target.files[0],
			// });
		}
		setIsFormValid(null);

		if (msg !== true) {
			setErrorMessage(msg);
		} else {
			let isPdf = (msg = checkMimeType(file, "pdf"));
			let isDoc = checkMimeType(file, "doc");

			if (isPdf !== true && isDoc !== true) {
				setErrorMessage(msg);
			} else {
				setErrorMessage("");
				setSelectedFile(file);
				setResume({
					name: file.name,
					type: isPdf === true ? "pdf" : "doc",
					path: "",
				});
				// formData.set("resume", e.target.files[0]);
				// dispatch(uploadCandidateResume(formData));
				console.log("parserinitil");
				resumeParser(file);
			}
		}
	};

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const handleUpload = (e) => {
		let btnId = e.target.id;
		btnId === "uploadBtn"
			? uploadBtnRef.current.click()
			: reUploadBtnRef.current.click();
	};

	const renderNormal = () => {
		return (
			<div className="content content_normal">
				<div className={`error ${errorMessage ? "" : "hidden"}`}>
					<h4>Error</h4>
					<p>{errorMessage}</p>
				</div>
				<div className="info pc">
					<h4>{DESCRIPTIVE_TEXT} </h4>
					<p>{SUB_DESCRIPTIVE_TEXT}</p>
				</div>
				<div className="info mobile">
					<h4>Let's start with your Resume</h4>
					<p>
						Upload your resume and we will fill out a few fields to make your
						profile completion easier.
					
					</p>
				</div>
				<div className="upload flex pc">
					<div className="content">
						<FontAwesomeIcon className="icon" icon={faUpload} />
						<br />
						<button
							className="btn"
							id="uploadBtn"
							onClick={(e) => handleUpload(e)}
						>
							{FILE_UPLOAD_CONTROL}
						</button>
						<input
							type="file"
							ref={uploadBtnRef}
							onChange={(e) => handleChange(e)}
							id="upoloadBtn"
						/>
						<p>{FILE_UPLOAD_CONTROL_DESCRIPTION}</p>
						{isFormValid === false && (
							<p className="error-text">Resume is not selected yet.</p>
						)}
					</div>
				</div>
				<div className="upload mobile">
					<button
						className="common-add-btn outline"
						id="uploadBtn"
						onClick={(e) => handleUpload(e)}
					>
						<span></span>
						Add Resume
					</button>
					<p style={{color: "gray"}}>
					doc, docx, pdf - Max 6 MB
					</p>
					<input
						type="file"
						ref={uploadBtnRef}
						onChange={(e) => handleChange(e)}
						id="upoloadBtn"
					/>
				</div>
			</div>
		);
	};

	const renderSuccess = () => {
		if (selectedFile || resume.name !== "") {
			const date = formatDate(new Date());
			return (
				<div className="content content_success">
					<div className={`success ${(errorMessage || !(allData && allData.resume_path ))? "hidden" : ""}`}>
						<h4>Success</h4>
						<p>Resume has been successfully uploaded.</p>
					</div>
					<div className={`error ${errorMessage ? "" : "hidden"}`}>
						<h4>Error</h4>
						<p>{errorMessage}</p>
					</div>
					<div className="info">
						<h4>Attached Resume </h4>

						<div className="history flex">
							<p>
								<span className="name">{resume.name}</span> -{" "}
								<span className="date">{RESUME_UPDATE_DATE} {date}</span>
							</p>
							<button
								className="re-upload-btn"
								id="reUploadBtn"
								onClick={(e) => handleUpload(e)}
							>
								{FILE_UPLOAD_CONTROL_TO_CHANGE}
							</button>
							<input
								type="file"
								ref={reUploadBtnRef}
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>

					<div className="preview">
						{resume.type !== "pdf" ? (
							<iframe
								title="title"
								onload={console.log("LOADED.......!")}
								style={{ width: "100%", height: "900px", border: "none" }}
								src={`https://docs.google.com/gview?url=${resume.path}&embedded=true`}
							></iframe>
						) : (
								<AutoSizer disableHeight>
									{({ width }) => (
										<Document
											file={resume.path}
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
													// width={1000}
													width={width}
												/>
											))}
										</Document>
									)}
								</AutoSizer>
							)}
					</div>
				</div>
			);
		}
	};



	return loading ? (
		<Spinner /> ) : (

		<div className="resume">
			{success || (allData && allData.resume_path)
				? renderSuccess()
				: renderNormal()}
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
								className="primary-btn blue next"
								to="/profile/personal-details"
								id="nextLink"
							>
								{NAVIGATION_TO_NEXT_PAGE}
						</Link>
							<Link
								className="primary-btn blue outline mobile"
								to="/profile/personal-details"
								id="nextLink"
							>
								{EXTRA_NAVIGATION_BUTTON_ON_MOBILE}
						</Link>
						</>
					)}
			</div>
		</div>
	);
}

export default Resume;
