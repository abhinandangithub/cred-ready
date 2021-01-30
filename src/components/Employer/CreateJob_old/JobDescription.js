import React, { useState } from "react";
import RichTextEditor from "react-rte";
import { useDispatch, connect } from "react-redux";
import { setNewJob } from "../../../store/actions/employer";
import { Link, useParams } from "react-router-dom";

const toolbarConfig = {
	// Optionally specify the groups to display (displayed in the order listed).
	display: [
		"INLINE_STYLE_BUTTONS",
		"BLOCK_TYPE_BUTTONS",
		// "LINK_BUTTONS",
		// "BLOCK_TYPE_DROPDOWN",
		// "HISTORY_BUTTONS",
	],
	INLINE_STYLE_BUTTONS: [
		{ label: "Bold", style: "BOLD", className: "custom-css-class" },
		{ label: "Italic", style: "ITALIC" },
		{ label: "Underline", style: "UNDERLINE" },
	],
	BLOCK_TYPE_DROPDOWN: [
		{ label: "Normal", style: "unstyled" },
		{ label: "Heading Large", style: "header-one" },
		{ label: "Heading Medium", style: "header-two" },
		{ label: "Heading Small", style: "header-three" },
	],
	BLOCK_TYPE_BUTTONS: [
		{ label: "UL", style: "unordered-list-item" },
		{ label: "OL", style: "ordered-list-item" },
	],
};

function CreateJob(props) {
	let { jobId } = useParams();
	const [disableCtrl, setDisableCtrl] = useState(false);
	const [jobDesc, setJobDesc] = useState("");

	const parent = React.useRef();
	const dispatch = useDispatch();
	const [richTextEditorvalue, setRichTextEditorvalue] = React.useState(
		RichTextEditor.createEmptyValue()
	);

	React.useEffect(() => {
		if (!!jobId && !!props.jobToUpdate) {
			setRichTextEditorvalue(RichTextEditor.createValueFromString(props.jobToUpdate.job_description, 'html'))
			dispatch(setNewJob({ jobDescription: props.jobToUpdate.job_description ? props.jobToUpdate.job_description.toString("html") : "" }));
		} else {
			dispatch(setNewJob({ jobDescription: null }));
		}
		if (props.jobToUpdate && props.jobToUpdate.count_of_applied_candidates && jobId)
			setDisableCtrl(true)
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		if (props.isSubmit) {
			if (!props.newJob.jobDescription)
				setJobDesc("Required");
		}
	}, [props.isSubmit]);

	const onRichTextEditorChange = (value) => {
		console.log(value.toString("html"));
		let msg = value.toString("html") === "" || value.toString("html") === null || value.toString("html") === "<p><br></p>" ? "Required" : "";
		setJobDesc(msg);
		setRichTextEditorvalue(value);
		dispatch(setNewJob({ jobDescription: value.toString("html") }));
	};

	return (
		<div className="job-description" ref={parent}>
			<div className="heading">
				<h2>
					Job Description <span>*</span>
					<span className={`error-text ${!jobDesc && "hidden"}`}>
						Required
					</span>
				</h2>
			</div>
			<div className="content" id="job-desc">
				<RichTextEditor
					toolbarConfig={toolbarConfig}
					id="description"
					value={richTextEditorvalue}
					//	disabled={disableCtrl}
					onChange={(value) => onRichTextEditorChange(value)}
				/>
			</div>
		</div>
	);
}

// export default CreateJob;

function mapStateToProps(state) {
	return {
		jobToUpdate: state.employerReducer.jobToUpdate,
		newJob: state.employerReducer.newJob
	};
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);
