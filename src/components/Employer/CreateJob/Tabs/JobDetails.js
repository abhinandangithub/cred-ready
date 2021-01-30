import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import InputRange from "react-input-range";
import { Dropdown } from "semantic-ui-react";
import RichTextEditor from "react-rte";
import { Multiselect } from "multiselect-react-dropdown";
import { jobToUpdateArray } from "../../../../store/actions/employer";

import { getEmploymentType, getIndustry, getFunction, getLocations } from "../../../../store/thunks/employer";
import { setNewJob, setQuestionBankQuestion } from "../../../../store/actions/employer";
import Input from "../../../_Elements/Input";
import { getSkills } from "../../../../store/thunks/employer";
import TooltipIcon from "../../../../assets/tooltip.svg";
import { strings } from "../../../../constants";
import qs from "qs";

const {
	TITLE,
	SUGGESTIONS_TO_POST_JOB,
	DESCRIPTION_TEXT,
	BASIC_JOB_DETAILS,
	JOB_TITLE,
	JOB_LOCATIONS,
	EMPLOYMENT_TYPE,
	JOB_FUNCTION_CLASSIFICATION,
	NUMBER_OF_POSITIONS,
	JOB_DESCRIPTION,
	CERTIFICATES,
	EXPERIENCE_REQUIRED,
	SELECT_EXPERIENCE,
} = strings.EMPLOYER_POST_JOB;

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

function JobDetails(props) {
	const parent = React.useRef();
	let { jobId } = useParams();
	const [location, setLocation] = useState(props.locationData);
	const [employmentType, setEmploymentType] = useState(props.employmentTypeData);
	const [industryType, setIndustryType] = useState(props.industryData);
	const [functions, setFunctions] = useState(props.functionData);
	const [updaeJob, setUpdatejob] = useState(props.jobToUpdate);
	let { isViewOnly } = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
	const [disableCtrl, setDisableCtrl] = useState(isViewOnly);
	const dispatch = useDispatch();
	const [employmentVal, setEmploymentVal] = useState("");
	const [functionVal, setFunctionVal] = useState("Certified Nursing Assistant");
	const [locationVal, setLocationVal] = useState("");
	const [value, setValue] = React.useState(4);
	const [certificates, setCertificates] = React.useState([]);
	const [certValidation, setCertValidation] = useState("");

	useEffect(() => {
		if (props.jobToUpdate && props.jobToUpdate.count_of_applied_candidates && jobId) setDisableCtrl(true);
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		setLocation(props.locationData);
	}, [props.locationData]);

	React.useEffect(() => {
		setEmploymentType(props.employmentTypeData);
	}, [props.employmentTypeData]);

	React.useEffect(() => {
		setIndustryType(props.industryData);
		dispatch(setNewJob({ industry: 21 }));
	}, [props.industryData]);

	React.useEffect(() => {
		setFunctions(props.functionData);
		//dispatch(setNewJob({ function: 1126 }));
	}, [props.functionData]);

	React.useEffect(() => {
		if (!!props.jobToUpdate && !!jobId) {
			dispatch(setNewJob({ jobTitle: props.jobToUpdate.job_title }));
			dispatch(setNewJob({ employmentType: props.jobToUpdate.employment_type }));
			dispatch(setNewJob({ industry: props.jobToUpdate.industry_id }));
			dispatch(setNewJob({ function: props.jobToUpdate.function_id }));
			dispatch(setNewJob({ location: props.jobToUpdate.address && props.jobToUpdate.address.id }));
			dispatch(setNewJob({ openPositions: props.jobToUpdate.open_positions }));
			dispatch(setQuestionBankQuestion(props.jobToUpdate.questions));
			dispatch(setNewJob({ jobQuestionnaireMap: props.jobToUpdate.questions }));
			setFormData({
				title: [props.jobToUpdate.job_title],
				employment: [props.jobToUpdate.employment_type],
				industry: [props.jobToUpdate.industry],
				function: [props.jobToUpdate.function],
				position: [props.jobToUpdate.open_positions],

				location: [
					{
						city: [
							props.jobToUpdate.address &&
							props.jobToUpdate.address.street_address +
							", " +
							props.jobToUpdate.address.city +
							", " +
							props.jobToUpdate.address.state +
							", " +
							props.jobToUpdate.address.zip_code +
							", ",
						],
					},
				],
			});
		}
	}, [props.jobToUpdate]);

	const [formData, setFormData] = React.useState(() => {
		let initialState = {};
		initialState.title = [];
		initialState.employment = [];
		initialState.industry = [
			{
				id: 21,
				industry_name: "Healthcare",
				is_active: true,
				is_approved: true,
			},
		];

		initialState.function = ["Certified Nursing Assistant"];

		initialState.position = [];
		initialState.location = [];

		return initialState;
	});

	React.useEffect(() => {
		console.log("cr abhi props.newJob ", props.newJob);
		let initialState = { ...formData };
		initialState.title = [props.newJob.jobTitle];
		// initialState.employment = [props.newJob.employmentType];
		initialState.industry = [props.newJob.industry];
		initialState.function = [props.newJob.function ? props.newJob.function : "Certified Nursing Assistant"];
		initialState.position = [props.newJob.openPositions];
		initialState.location = [props.newJob.location];
		setValue(props.newJob.maxExp ? props.newJob.maxExp : 4);
		// setCertificates(props.newJob.jobCertificateMap);
		setRichTextEditorvalue(
			RichTextEditor.createValueFromString(props.newJob.jobDescription ? props.newJob.jobDescription : "", "html")
		);
		setFormData(initialState);
	}, [props.newJob]);

	React.useEffect(() => {
		if (!!props.newJob && !!employmentType && employmentType.length) {
			let temp = employmentType.find((o) => o.id === props.newJob.employmentType);
			if (!!temp) {
				setEmploymentVal(temp.employment_status);
			}
		}
	}, [props.newJob, employmentType]);

	React.useEffect(() => {
		if (!!props.jobToUpdate && !!employmentType && employmentType.length) {
			let temp = employmentType.find((o) => o.id === props.jobToUpdate.employment_type);
			if (!!temp) {
				setEmploymentVal(temp.employment_status);
			}
		}
	}, [props.jobToUpdate, employmentType]);

	React.useEffect(() => {
		if (!!props.newJob && !!functions && functions.length) {
			let temp = functions.find((o) => o.id === props.newJob.function);
			if (!!temp) {
				setFunctionVal(temp.function_name);
			}
		}
	}, [props.newJob, functions]);

	React.useEffect(() => {
		if (!!props.jobToUpdate && !!functions && functions.length) {
			let temp = functions.find((o) => o.id === props.jobToUpdate.function_id);
			if (!!temp) {
				setFunctionVal(temp.function_name);
			}
		}
	}, [props.jobToUpdate, functions]);

	React.useEffect(() => {
		if (!!props.newJob && !!location && location.length) {
			setLocationVal(props.newJob.location);
		}
	}, [props.newJob, location]);

	React.useEffect(() => {
		if (!!props.newJob && !!props.skills && props.skills.length && !jobId) {
			let temp = props.newJob.jobCertificateMap;
			if (!!temp && temp.length) {
				console.log("cr abhi temp ", temp);
				let skills = temp.map((skilll_id) => {
					return props.skills.find((val) => val.id === skilll_id);
				});
				console.log("cr abhi temp ", skills, props.skills, temp, props.newJob.jobCertificateMap);
				if (!!skills && skills.length && skills[0] !== undefined) {
					setCertificates(skills);
				} else {
					setCertificates([]);
				}
			}
		}
	}, [props.newJob, props.skills]);

	React.useEffect(() => {
		async function validate() {
			if (props.isNextClick) {
				let initialState = {};
				initialState.title = [props.newJob.jobTitle, props.newJob.jobTitle ? "" : "Required"];
				initialState.employment = [props.newJob.employmentType, props.newJob.employmentType ? "" : "Required"];
				initialState.industry = [props.newJob.industry, props.newJob.industry ? "" : "Required"];
				initialState.function = [props.newJob.function ? props.newJob.function : "Certified Nursing Assistant", ""];
				initialState.position = [props.newJob.openPositions, props.newJob.openPositions ? "" : "Required"];
				initialState.location = [props.newJob.location, props.newJob.location ? "" : "Required"];
				setFormData(initialState);
				if (!props.newJob.jobDescription) setJobDesc("Required");
			}
		}
		validate();
	}, [props.isNextClick]);

	const handleChangeLocation = (e, data) => {
		setLocationVal(data.value);
		handleFieldChange("location", data.value);
		if (typeof data.value === "number") {
			if (!!jobId && !!props.jobToUpdate) {
				let temp = props.jobToUpdate;
				let tempLocation = location.find((o) => o.id === data.value)
				if (!!tempLocation)
					dispatch(jobToUpdateArray({ ...temp, address: tempLocation }));
			} else {
				dispatch(setNewJob({ location: data.value }));
			}
		} else {
			dispatch(setNewJob({ location: null }));
		}
	};

	const handleChangeEmpType = (e, data) => {
		if (!!data && data.value) {
			setEmploymentVal(data.value);
			handleFieldChange("employment", data.value);
			let employment_obj = employmentType.find((o) => o.employment_status === data.value);
			if (typeof employment_obj.id === "number") {
				if (!!jobId && !!props.jobToUpdate) {
					let temp = props.jobToUpdate;
					dispatch(jobToUpdateArray({ ...temp, employment_type: employment_obj.id }));
				} else {
					dispatch(setNewJob({ employmentType: employment_obj.id }));
				}
			} else {
				dispatch(setNewJob({ employmentType: null }));
			}
		}
	};

	const handleChangeFunction = (e, data) => {
		if (!!data && data.value) {
			setFunctionVal(data.value);
			handleFieldChange("function", data.value);
			let function_obj = functions.find((o) => o.function_name === data.value);
			if (typeof function_obj.id === "number") {
				if (!!jobId && !!props.jobToUpdate) {
					let temp = props.jobToUpdate;
					dispatch(jobToUpdateArray({ ...temp, function_id: function_obj.id }));
				} else {
					dispatch(setNewJob({ function: function_obj.id }));
				}
			} else {
				dispatch(setNewJob({ function: null }));
			}
		}
	};

	const handleChangeJobTile = (e) => {
		handleFieldChange(e.target.id, e.target.value);
		if (!!jobId && !!props.jobToUpdate) {
			let temp = props.jobToUpdate;
			dispatch(jobToUpdateArray({ ...temp, job_title: e.target.value }));
		} else {
			dispatch(setNewJob({ jobTitle: e.target.value }));
		}
	};

	const handleChangeOpenPosition = (e) => {
		handleFieldChange("position", e.target.value);
		if (!!jobId && !!props.jobToUpdate) {
			let temp = props.jobToUpdate;
			dispatch(jobToUpdateArray({ ...temp, open_positions: e.target.value }));
		} else {
			dispatch(setNewJob({ openPositions: e.target.value }));
		}
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

	/* **************** */
	/* JOB DESCRIPTION */
	/* **************** */
	const [jobDesc, setJobDesc] = useState("");
	const [richTextEditorvalue, setRichTextEditorvalue] = React.useState(RichTextEditor.createEmptyValue());

	React.useEffect(() => {
		if (!!jobId && !!props.jobToUpdate) {
			setRichTextEditorvalue(RichTextEditor.createValueFromString(props.jobToUpdate.job_description, "html"));
			dispatch(
				setNewJob({
					jobDescription: props.jobToUpdate.job_description ? props.jobToUpdate.job_description.toString("html") : "",
				})
			);
		} else {
			// dispatch(setNewJob({ jobDescription: null }));
		}
		if (props.jobToUpdate && props.jobToUpdate.count_of_applied_candidates && jobId) setDisableCtrl(true);
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		let jdButtons = document.querySelectorAll(".job_description button");
		jdButtons.forEach((btn) => {
			btn.setAttribute("tabindex", -1);
		});
	}, []);

	const onRichTextEditorChange = (value) => {
		// console.log(!!value.getEditorState().getCurrentContent().getPlainText().trim(), value.getEditorState().getCurrentContent().hasText());
		let editorValue = value.getEditorState().getCurrentContent().getPlainText().trim();
		console.log(value.toString("html"));
		// let msg =
		// 	value.toString("html") === "" || value.toString("html") === null || value.toString("html") === "<p><br></p>"
		// 		? "Required"
		// 		: "";
		let msg =
			!editorValue
				? "Required"
				: "";
		setJobDesc(msg);
		setRichTextEditorvalue(value);
		dispatch(setNewJob({ jobDescription: value.toString("html") }));
	};

	React.useEffect(() => {
		if (!!jobId && !!props.jobToUpdate) {
			setValue(props.jobToUpdate.max_experience);
			setCertificates(props.jobToUpdate.certificates);
			dispatch(setNewJob({ jobCertificateMap: props.jobToUpdate.certificates }));
			dispatch(
				setNewJob({
					minExp: props.jobToUpdate.min_experience,
					maxExp: props.jobToUpdate.max_experience,
				})
			);
		} else {
			// dispatch(setNewJob({ jobCertificateMap: [] }));
			// dispatch(setNewJob({ minExp: null, maxExp: null }));
		}
		if (props.jobToUpdate && props.jobToUpdate.count_of_applied_candidates && jobId) setDisableCtrl(true);
	}, [props.jobToUpdate]);

	const handleSelect = (selectedList, selectedItem) => {
		let msg = selectedList.length === 0 ? "Required" : "";
		setCertValidation(msg);
		if (!!jobId && !!props.jobToUpdate) {
			let temp = props.jobToUpdate;
			dispatch(jobToUpdateArray({ ...temp, certificates: selectedList }));
		} else {
			dispatch(setNewJob({ jobCertificateMap: selectedList }));
		}
	};

	const handleRemove = (selectedList, selectedItem) => {
		let msg = selectedList.length === 0 ? "Required" : "";
		setCertValidation(msg);
		if (!!jobId && !!props.jobToUpdate) {
			let temp = props.jobToUpdate;
			dispatch(jobToUpdateArray({ ...temp, certificates: selectedList }));
		} else {
			dispatch(setNewJob({ jobCertificateMap: selectedList }));
		}
	};

	return (
		<>
			<div className="job_details" ref={parent}>
				<div className="heading">
					<h2>{TITLE}</h2>
					<p>{DESCRIPTION_TEXT}</p>
				</div>
				<div className="content">
					<h3>{BASIC_JOB_DETAILS}</h3>
					<ul>
						<li>
							<label>
								{JOB_TITLE} <span>*</span>
								<span className={`error-text ${!formData.title[1] && "hidden"}`}>Required</span>
							</label>
							<Input
								type="text"
								id="title"
								value={formData.title[0]}
								onChange={handleChangeJobTile}
								// onChange={(e) => props.onchange('title', e.target.value)}
								autoFocus
								disabled={disableCtrl}
							/>
						</li>
						<li>
							<label>
								{JOB_LOCATIONS} <span>*</span>
								<span className={`error-text ${!formData.location[1] && "hidden"}`}>Required</span>
							</label>
							<Dropdown
								placeholder="Zip or city, state"
								fluid
								selection
								onChange={handleChangeLocation}
								value={locationVal}
								disabled={disableCtrl}
								options={location.map((val) => ({
									key: val.id,
									text: val.street_address + ", " + val.city + ", " + val.state + ", " + val.zip_code,
									value: val.id,
								}))}
							/>
						</li>
						<li>
							<label>
								{EMPLOYMENT_TYPE} <span>*</span>
								<span className={`error-text ${!formData.employment[1] && "hidden"}`}>Required</span>
							</label>

							<Dropdown
								placeholder="Employment Type"
								fluid
								selection
								disabled={disableCtrl}
								//defaultValue={formData.employment[0] ? formData.employment[0].employment_status : ""}
								value={employmentVal}
								onChange={handleChangeEmpType}
								options={employmentType.map((val) => ({
									key: val.id,
									text: val.employment_status,
									value: val.employment_status,
								}))}
							/>
						</li>

						<li>
							<label>
								{JOB_FUNCTION_CLASSIFICATION}
								<span> *</span>
								<span className={`error-text ${!formData.function[1] && "hidden"}`}>Required</span>
								<span className="ml5" data-toolTip="Select the functional area for the job requirement">
									<img src={TooltipIcon} alt="Tooltip" />
								</span>
							</label>
							<Dropdown
								className="semantic-ui-element"
								placeholder="Select Function"
								fluid
								selection
								disabled={disableCtrl}
								// defaultValue={formData.function[0] ? formData.function[0].function_name : ""}
								value={functionVal}
								onChange={handleChangeFunction}
								options={functions.map((val) => ({
									key: val.id,
									text: val.function_name,
									value: val.function_name,
								}))}
							/>
						</li>
						<li>
							<label>{NUMBER_OF_POSITIONS}</label>
							<Input
								type="text"
								disabled={disableCtrl}
								id="position"
								value={formData.position[0]}
								onChange={handleChangeOpenPosition}
							//onChange={(e) => props.onchange('position', e.target.value)}
							/>
						</li>
						<li></li>
					</ul>
					<div className="job_description" ref={parent}>
						<label>
							{JOB_DESCRIPTION} <span> *</span>
							<span className={`error-text ${!jobDesc && "hidden"}`}>Required</span>
						</label>
						<div className="content" id="job-desc">
							<RichTextEditor
								toolbarConfig={toolbarConfig}
								id="description"
								value={richTextEditorvalue ? richTextEditorvalue : ""}
								disabled={disableCtrl}
								onChange={(value) => onRichTextEditorChange(value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="experience_certificates" ref={parent}>
				<div className="content">
					<h3>
						{CERTIFICATES}
						<span
							className="ml5"
							data-toolTip="These are the desired certificates for each applicant. Holding these certificates is not mandatory in order for candidates to apply."
						>
							<img src={TooltipIcon} alt="Tooltip" />
						</span>
					</h3>
					<Multiselect
						style={{
							multiselectContainer: {
								width: "35%",
								height: "50%",
								marginBottom: "2%",
							},
						}}
						placeholder="Type to search for a certificate or select from the list"
						options={props.skills} // Options to display in the dropdown
						// selectedValues={props.skills.filter(val => val.id === 16859)} // Preselected value to persist in dropdown
						// selectedValues={
						// 	certificates && certificates.length ? certificates : props.skills.filter((val) => val.id === 16859)
						// }
						selectedValues={
							certificates && certificates.length ? certificates : []
						}
						onSelect={(selectedList, selectedItem) => handleSelect(selectedList, selectedItem)} // Function will trigger on select event
						onRemove={(selectedList, selectedItem) => handleRemove(selectedList, selectedItem)} // Function will trigger on remove event
						displayValue="title_name" // Property name to display in the dropdown options
						disable={disableCtrl}
					/>
					<h3>
						{EXPERIENCE_REQUIRED}
						<span> *</span>
					</h3>
					<p>{SELECT_EXPERIENCE}</p>
					<div className="input_range_years" style={{ padding: "0 30px" }}>
						<InputRange
							minValue={0}
							maxValue={10}
							value={value}
							formatLabel={(value) => `${value} years`}
							onChange={(value) => {
								setValue(value);
								if (!!jobId && !!props.jobToUpdate) {
									let temp = props.jobToUpdate;
									dispatch(jobToUpdateArray({ ...temp, max_experience: value }));
								} else {
									dispatch(setNewJob({ minExp: 0, maxExp: value }));
								}
							}}
							disabled={disableCtrl}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {
		jobToUpdate: state.employerReducer.jobToUpdate,
		newJob: state.employerReducer.newJob,
		employmentType: state.employerReducer.employmentType.data,
		functionType: state.employerReducer.functionType.data,
		industry: state.employerReducer.industry.data,
		locations: state.employerReducer.locationNames,
		locationData: state.employerReducer.locations.data,
		employmentTypeData: state.employerReducer.employmentKeys,
		industryData: state.employerReducer.industryKeys,
		functionData: state.employerReducer.functionKeys,
		skills: state.employerReducer.skills.data,
	};
}

export default connect(mapStateToProps)(JobDetails);
