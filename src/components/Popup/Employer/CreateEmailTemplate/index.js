import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import RichTextEditor from "react-rte";
import ContentEditable from "react-contenteditable";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";
import {
	addEmailTemplate, sendEmail, getEmailTemplate,
	updateEmailTemplate, updateStatus, getAppliedCandidateDetails, getCandidatesList, getPostedJobs
} from "../../../../store/thunks/employer";


const tags = [
	{
		label: "Job Title",
		text: "job_title",
	},
	{
		label: "Recruiter Name",
		text: "recruiter_name",
	},
	{
		label: "Location",
		text: "location",
	},
	{
		label: "Job Description",
		text: "job_description",
	},
	{
		label: "Candidate First Name",
		text: "candidate_first_name",
	},
	{
		label: "Candidate Last Name",
		text: "candidate_last_name",
	},
	{
		label: "Years Experience Required",
		text: "years_experience_required",
	},
	// {
	// 	label: "Skills",
	// 	text: "skills",
	// },
	{
		label: "Certificates",
		text: "certificates",
	},
];

let scrollBarStyle = {
	width: "245px",
	height: "auto",
};

let _cursorInfo = {
	el: null,
	pos: -1,
};

let defaultText = `<p>Hello {candidate_first_name} {candidate_last_name}</p>
<p>We are looking out for {job_title} for our organization located at {location}.</p>
<div><br/></div>
<p>Regards,</p>
<p>{recruiter_name}</p>`;
defaultText = "";

function CreateEmailTemplate(props) {
	const myEditorEl = useRef();
	const contentEditable = React.createRef();
	const dispatch = useDispatch();
	const { popup } = useSelector((state) => state.popupOverlayReducer);
	const [type, setType] = React.useState(popup.info.type);
	const [isSendEmail, setIsSendEmail] = React.useState(popup.info.sendEmail);

	const [templateId, setTemplateId] = React.useState(popup.info.template_id);

	const [activeTemp, setActiveTemp] = React.useState(null);
	const [tempNames, setTempNames] = React.useState(props.emailTemplate);

	// type = "add";

	React.useEffect(() => {
		dispatch(getEmailTemplate());
	}, [dispatch]);

	React.useEffect(() => {
		console.log("props.emailTemplate ", popup.info.template_id, props.emailTemplate);
		setTempNames(props.emailTemplate);
	}, [props.emailTemplate]);

	function getCaretPosition() {
		if (window.getSelection && window.getSelection().getRangeAt) {
			var range = window.getSelection().getRangeAt(0);
			var selectedObj = window.getSelection();
			var rangeCount = 0;
			var childNodes = selectedObj.anchorNode.parentNode.childNodes;
			let index = null;
			for (var i = 0; i < childNodes.length; i++) {
				if (childNodes[i] === selectedObj.anchorNode) {
					index = i;
					break;
				}
				if (childNodes[i].outerHTML) {
					rangeCount += childNodes[i].outerHTML.length;
					index = i;
				} else if (childNodes[i].nodeType === 3) {
					rangeCount += childNodes[i].textContent.length;
					index = i;
				}
			}

			_cursorInfo = {
				el: childNodes[index].parentElement,
				pos: range.startOffset + rangeCount,
			};

			if (_cursorInfo.el.tagName === "LI") _cursorInfo.pos = -1;

			return _cursorInfo;
		}

		_cursorInfo = {
			el: null,
			pos: -1,
		};
		return -1;
	}

	const handleDefaultChecked = (tag) => {
		return formData.body[0].includes(tag.text);
	};

	const handleInputChange = (e, tag) => {
		let editor = document.getElementById("myEditor");

		if (e.target.checked) {
			let textToInsert = ` {${tag.text}} `;

			if (_cursorInfo.pos > -1) {
				let elHtml = _cursorInfo.el.innerHTML.replace(/&nbsp;+/g, " ");

				let output = [elHtml.slice(0, _cursorInfo.pos), textToInsert, elHtml.slice(_cursorInfo.pos)].join("");

				_cursorInfo.el.innerHTML = output;
			} else {
				let output = [editor.innerHTML.slice(0, 0), textToInsert, editor.innerHTML.slice(0)].join("");

				editor.innerHTML = output;
			}

			_cursorInfo.pos = -1;
			setFormData({
				...formData,
				body: [editor.innerHTML],
			});
		} else {
			let textToSearch = `${tag.text}`;
			let stringWithTag = myEditorEl.current.lastHtml;
			let regex = new RegExp("\\{" + textToSearch + "\\}", "g");
			let output = stringWithTag.replace(regex, " ");

			setFormData({
				...formData,
				body: [output],
			});
		}
	};

	const [bodyError, setBodyError] = React.useState(null);

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		name: [],
		email: [],
		body: [defaultText],

		formValid: false,
	});

	useEffect(() => {
		if (!!props.info.data) {
			setFormData({
				name: [props.info.data.template_name],
				email: [props.info.data.from_email || "test@gmail.com"],
				body: [props.info.data.email_body],
				formValid: true,
			});
		} else {
			setFormData({
				name: [],
				email: [],
				body: [defaultText],
				formValid: false,
			});
		}
	}, [props.info.data]);

	useEffect(() => {
		if (bodyError === true && formData.body[0].trim().length > 0) {
			setBodyError(false);
		} else if (bodyError === false && formData.body[0].trim().length === 0) {
			setBodyError(true);
		}
		return () => { };
	}, [formData]);

	const handleSubmit = (type = "add", template) => {
		let oldFormData = { ...formData };
		oldFormData.formValid = true;
		oldFormData.body[0] = myEditorEl.current.lastHtml.replace(/&nbsp;+/g, " ");

		if (bodyError === null && formData.body[0].trim().length === 0) {
			setBodyError(true);
		}

		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				(oldFormData[field][0] === "" || oldFormData[field][0] === undefined || oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				oldFormData.formValid = false;
				if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
			}
		}

		if (oldFormData.formValid && !bodyError) {
			if (type === "add") {
				dispatch(addEmailTemplate(formData));
			} else {
				let obj = { ...formData, templateId: templateId };
				dispatch(updateEmailTemplate(obj));
			}
			if (isSendEmail) {
				dispatch(
					sendEmail({
						candidateId: props.info.candidate_id,
						emailTemplateId: templateId,
						job_id: props.info.job_id,
					})
				);
			}
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
		}

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

	const updateTemplate = (template) => {
		// console.log("updateTemplate");
		handleSubmit("edit", template);
	};

	const addTemplate = (template) => {
		// console.log("addTemplate");
		handleSubmit("add", template);
	};

	const createNewTemplate = () => {
		setType("add");
		setActiveTemp(null);
		setFormData({
			name: [],
			email: [],
			body: [defaultText],
			formValid: true,
		});
	}

	const handleChange = (template, i) => {
		setTemplateId(template.template_id || template.public_template_id);
		setType("edit");
		setActiveTemp(i);
		setFormData({
			name: [template.template_name],
			email: [template.from_email || "test@gmail.com"],
			body: [template.email_body],
			formValid: true,
		});
	}
	return (
		<div className="create-email-template">
			{/* {type === "add" ? (
				<h1>Add Email Template</h1>
			) : (
					<h1>Edit Email Template</h1>
				)} */}

			<div className="content">
				<Scrollbars
					className="custom-scrollbar"
					style={scrollBarStyle}
					// autoHide
					autoHideTimeout={1000}
					autoHideDuration={600}
					renderTrackVertical={({ style, ...props }) => (
						<div
							{...props}
							className="bar"
							style={{
								...style,
							}}
						/>
					)}
				>
					<h2 className="title">Select Template</h2>
					<ul className="names">
						<li className="primary-btn outline blue" onClick={() => createNewTemplate()}>+ Create new template</li>
						{tempNames.map((temp, i) => (
							<li key={i} className={i === activeTemp ? "active" : null} onClick={() => handleChange(temp, i)}>
								{temp.template_name}
							</li>
						))}
					</ul>
				</Scrollbars>
				<ul className="fields">
					<li className="half">
						<div className="left">
							<label htmlFor="name">
								Template Name <span>*</span>
								<span className={`error-text ${!formData.name[1] && "hidden"}`}>Required</span>
							</label>
							<input
								type="text"
								id="name"
								defaultValue={formData.name[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</div>
						<div className="right">
							<label htmlFor="email">
								From Email Address <span>*</span>
								<span className={`error-text ${!formData.email[1] && "hidden"}`}>Required</span>
							</label>
							<input
								type="email"
								id="email"
								defaultValue={formData.email[0]}
								onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
							/>
						</div>
					</li>
					<li>
						<label htmlFor="from_email">CC Email Address</label>
						<input
							type="email"
							id="from_email"
						// defaultValue={formData.email[0]}
						// onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="body">
							Tags
							{/* <span>*</span> */}
						</label>
						<ul>
							{tags.map((tag, i) => {
								let isChecked = handleDefaultChecked(tag);
								return (
									<li key={i}>
										<input
											className="block-toggle blue checkbox"
											id={`tag_${i}`}
											name="tag"
											type="checkbox"
											// disabled
											checked={isChecked}
											onChange={(e) => handleInputChange(e, tag)}
										/>
										<label htmlFor={`tag_${i}`} data-text={tag.text}>
											{tag.label}
										</label>
									</li>
								);
							})}
						</ul>
					</li>
					<li>
						<label htmlFor="myEditor">
							Email
							{/* <span>*</span> */}
						</label>

						<span className={`error-text body ${!bodyError && "hidden"}`}>Required</span>
						<ContentEditable
							ref={myEditorEl}
							innerRef={contentEditable}
							defaultValue={formData.body[0]}
							onChange={(e) => {
								// console.log(myEditorEl.current.lastHtml);
							}}
							// onBlur={() =>
							// 	handleFieldChange("body", myEditorEl.current.lastHtml)
							// }
							html={formData.body[0]}
							disabled={false}
							tagName="div"
							className="my_editor"
							id="myEditor"
							onMouseUp={getCaretPosition}
							onKeyUp={() => {
								getCaretPosition();

								if (myEditorEl.current.lastHtml.length > 0 && bodyError === true) {
									setBodyError(false);
									setFormData({
										...formData,
										body: [myEditorEl.current.lastHtml],
									});
								} else if (myEditorEl.current.lastHtml.length === 0 && bodyError === false) {
									setBodyError(true);
									setFormData({
										...formData,
										body: [myEditorEl.current.lastHtml],
									});
								}
							}}
						/>
					</li>
					<li>
						{type === "add" ? (
							<div className="cta">
								<button className="primary-btn blue" onClick={addTemplate}>
									{isSendEmail ? "Send" : "Add"}
								</button>
							</div>
						) : (
								<div className="cta">
									<button className="primary-btn blue" onClick={updateTemplate}>
										{isSendEmail ? "Send" : "Save Changes"}
									</button>
								</div>
							)}
					</li>
				</ul>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		emailTemplate: state.employerReducer.emailTemplate,
		emailTemplateNames: state.employerReducer.emailTemplateNames
	};
}

export default connect(mapStateToProps)(CreateEmailTemplate);
