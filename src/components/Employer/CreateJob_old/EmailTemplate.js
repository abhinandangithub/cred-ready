import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "../../_Elements/Dropdown";
import { getEmailTemplate } from "../../../store/thunks/employer";
import { connect, useDispatch } from "react-redux";
import { setNewJob } from "../../../store/actions/employer";
import InputDropdown from "../../_Elements/InputDropdown";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import { Link, useParams } from "react-router-dom";

const employmentStatus = {
	heading: "Select Email Template",
	content: ["Employed", "Self Employed", "Available", "On Break"],
};

function EmailTemplate(props) {
	let { jobId } = useParams();

	const parent = React.useRef();
	const emailBodyEl = React.useRef();
	const dispatch = useDispatch();
	const [emailBody, setEmailBody] = useState("");
	const [emailValidation, setEmailValidation] = useState("");
	const [templateID, setTemplateID] = useState(0);
	const [tempName, setTempName] = useState(undefined);

	const [emailTemplates, setEmailTemplates] = useState(props.emailTemplate);
	const [disableCtrl, setDisableCtrl] = useState(false);
	let templateName = "";
	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmailTemplate());
	}, [dispatch]);

	React.useEffect(() => {
		console.log('props.emailTemplate) ', props.emailTemplate);
	}, [props.emailTemplate]);

	React.useEffect(() => {
		if (props.isSubmit) {
			if (!props.newJob.emailTemplateId || !tempName)
				setEmailValidation("Required");
		}
	}, [props.isSubmit]);

	React.useEffect(() => {
		if (!!jobId && !!props.jobToUpdate) {
			setTemplateID(props.jobToUpdate.email_template_id);
			handleTemplateChange(props.jobToUpdate.email_template_id);
			dispatch(
				setNewJob({ emailTemplateId: props.jobToUpdate.email_template_id })
			);
		} else {
			dispatch(setNewJob({ emailTemplateId: null }));
		}
		if (
			props.jobToUpdate &&
			props.jobToUpdate.count_of_applied_candidates &&
			jobId
		)
			setDisableCtrl(true);
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		console.log("props.emailTemplate ", props.emailTemplate);
		if (!!templateID) {
			document.getElementById("emailtemplate").value = props.emailTemplate.find(
				(x) =>
					x.public_template_id === templateID || x.template_id === templateID
			).template_name;
			handleTemplateChange(templateID);
		}
		setEmailTemplates(props.emailTemplate);
	}, [props.emailTemplate]);

	React.useEffect(() => {
		dispatch(setNewJob({ emailTemplateId: templateID }));
		// setEmailBody(props.emailTemplate[0].email_body);
		console.log(
			templateID,
			emailTemplates,
			emailTemplates.find((val) => val.template_id === 13)
		);
	}, [dispatch, templateID]);

	const handleTemplateChange = (item) => {
		console.log('item template ', item);
		setTempName(item);
		let msg = item === "" || item === null ? "Required" : "";
		setEmailValidation(msg);
		if (!item) setTemplateID(null);
		if (typeof item !== "number") return;

		if (!!emailBodyEl && props.emailTemplate && props.emailTemplate.length) {
			// setEmailBody(
			// 	(emailBodyEl.current.innerHTML = props.emailTemplate.find(
			// 		(x) => x.public_template_id === item || x.template_id === item
			// 	).email_body)
			// );

			let obj = props.emailTemplate.find(
				(x) => x.public_template_id === item || x.template_id === item
			);
			console.log("obj ", obj);
			if (obj && obj.email_body) {
				emailBodyEl.current.innerHTML = obj.email_body;
			}
			setTempName(obj && obj.template_name);
			console.log('item ', item);
		}
		setTemplateID(item);
	};

	const handleTemplateSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.emailTemplate.filter((val) => {
			if (val.template_name.includes(value)) {
				return {
					id: val.public_template_id,
					val: val.template_name,
				};
			}
		});
		setEmailTemplates([...filteredData]);
		let msg = value === "" || value === null ? "Required" : "";
		setEmailValidation(msg);
	};

	const createEmailTemplate = () => {
		dispatch(toggleOverlay(true));
		dispatch(
			togglePopup([
				true,
				"createEmailTemplate",
				{
					type: "edit",
					data: props.emailTemplate.find(
						(x) =>
							x.public_template_id === templateID ||
							x.template_id === templateID
					),
				},
			])
		);
	};

	return (
		<div className="email-templates" ref={parent}>
			<div className="heading">
				<h2>
					Email Template<span>*</span>
					<span className={`error-text ${!emailValidation && "hidden"}`}>
						Required
					</span>
				</h2>
			</div>
			<div className="content">
				<h2 className="sub-heading">Attach Email</h2>
				<p>Select / Modify Introduction Email Template </p>
				<div className="input_button">
					<InputDropdown
						placeholder={employmentStatus.heading}
						content={emailTemplates.map((val) => ({
							val: val.template_name,
							id: val.public_template_id || val.template_id,
						}))}
						id="emailtemplate"
						search_term
						selected={tempName}
						// selected={
						// 	templateID &&
						// 	emailTemplates.find((val) => val.template_id === templateID) &&
						// 	emailTemplates.find((val) => val.template_id === templateID)
						// 		.template_name
						// }
						onchange={(value) => {
							handleTemplateChange(value);
							// handleTemplateSearch(value);
						}}
					// disable={disableCtrl}
					/>
					<button onClick={createEmailTemplate} disabled={!templateID}>
						<FontAwesomeIcon className="icon" icon={faPencilAlt} />
					</button>
				</div>

				<h2 className="sub-heading">Email</h2>

				<div id="email-body"
					className="email_body"
					ref={emailBodyEl}
					disabled={disableCtrl}
				></div>
				{/* <textarea
					name="email"
					id="email"
					onChange={(e) => setEmailBody(e.target.value)}
					value={emailBody}
					disabled
				></textarea>
				></textarea> */}
			</div>
		</div>
	);
}

// export default EmailTemplate;

function mapStateToProps(state) {
	return {
		employmentType: state.employerReducer.employmentType.data,
		emailTemplate: state.employerReducer.emailTemplate,
		emailTemplateNames: state.employerReducer.emailTemplateNames,
		jobToUpdate: state.employerReducer.jobToUpdate,
		newJob: state.employerReducer.newJob
	};
}

export default connect(mapStateToProps)(EmailTemplate);
