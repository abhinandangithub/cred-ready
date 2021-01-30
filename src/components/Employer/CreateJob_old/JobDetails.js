import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
	getEmploymentType,
	getIndustry,
	getFunction,
	getLocations,
} from "../../../store/thunks/employer";
import { setNewJob } from "../../../store/actions/employer";
import { Link, useParams } from "react-router-dom";

import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";
import InputDropdown from "../../_Elements/InputDropdown";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";

const employmentTypes = {
	heading: "Employment Type",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const industry = {
	heading: "Select Industry",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const _function = {
	heading: "Select Function",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

function CreateJob(props) {

	const parent = React.useRef();
	let { jobId } = useParams();
	const [location, setLocation] = useState(props.locationData);
	const [employmentType, setEmploymentType] = useState(
		props.employmentTypeData
	);
	const [industryType, setIndustryType] = useState(props.industryData);
	const [functions, setFunctions] = useState(props.functionData);
	const [updaeJob, setUpdatejob] = useState(props.jobToUpdate);
	const [disableCtrl, setDisableCtrl] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(jobToUpdate(jobId));
		if (props.jobToUpdate && props.jobToUpdate.count_of_applied_candidates && jobId)
			setDisableCtrl(true)
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmploymentType());
		dispatch(getIndustry());
		dispatch(getFunction());
		dispatch(getLocations());
	}, [dispatch]);

	React.useEffect(() => {
		setLocation(props.locationData);
	}, [props.locationData]);

	React.useEffect(() => {
		setEmploymentType(props.employmentTypeData);
	}, [props.employmentTypeData]);

	React.useEffect(() => {
		setIndustryType(props.industryData);
		dispatch(setNewJob({ industry: 21 }))
	}, [props.industryData]);

	React.useEffect(() => {
		setFunctions(props.functionData);
		dispatch(setNewJob({ function: 1126 }));
	}, [props.functionData]);

	React.useEffect(() => {
		if (!!props.jobToUpdate && !!jobId) {
			console.log('props.jobToUpdate ', props.jobToUpdate);
			console.log('props.jobToUpdate.industry ', props.jobToUpdate.industry, props.jobToUpdate.industry && props.jobToUpdate.industry.id);
			console.log('props.jobToUpdate.industry ', props.jobToUpdate.function_name);

			dispatch(setNewJob({ jobTitle: props.jobToUpdate.job_title }));
			dispatch(setNewJob({ employmentType: props.jobToUpdate.employment_type }));
			dispatch(setNewJob({ industry: props.jobToUpdate.industry_id }))
			dispatch(setNewJob({ function: props.jobToUpdate.function_id }));
			dispatch(setNewJob({ location: props.jobToUpdate.address && props.jobToUpdate.address.id }));
			dispatch(setNewJob({ openPositions: props.jobToUpdate.open_positions }));

			// setUpdatejob(props.jobToUpdate);
			setFormData({
				title: [props.jobToUpdate.job_title],
				employment: [
					props.employmentTypeData &&
					props.employmentTypeData.length > 0 &&
					props.employmentTypeData.find(
						(val) => val.id === props.jobToUpdate.employment_type
					),
				],
				industry: [
					props.jobToUpdate.industry
				],
				function: [
					props.jobToUpdate.function
				],
				position: [props.jobToUpdate.open_positions],
				// location: [props.jobToUpdate.address]

				// location: [props.jobToUpdate.address && props.jobToUpdate.address.street_address + ", " +
				// 	props.jobToUpdate.address.city + ", " +
				// 	props.jobToUpdate.address.state + ", " +
				// 	props.jobToUpdate.address.zip_code + ", "]

				location: [{
					city: [props.jobToUpdate.address && props.jobToUpdate.address.street_address + ", " +
						props.jobToUpdate.address.city + ", " +
						props.jobToUpdate.address.state + ", " +
						props.jobToUpdate.address.zip_code + ", "]
				}]
			})
		} else {
			dispatch(setNewJob({ jobTitle: null }));
			dispatch(setNewJob({ employmentType: null }));
			dispatch(setNewJob({ industry: null }))
			dispatch(setNewJob({ function: null }));
			dispatch(setNewJob({ location: null }));
			dispatch(setNewJob({ openPositions: null }));
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
				is_approved: true
			}
		];

		initialState.function = [
			{
				id: 1126,
				function_name: "Certified Nursing Assistant",
				is_active: true,
				is_approved: true
			}
		];

		initialState.position = [];
		initialState.location = [];

		console.log(initialState);
		return initialState;
	});


	React.useEffect(() => {
		async function validate() {
			if (props.isSubmit) {
				let initialState = {};
				initialState.title = [props.newJob.jobTitle, props.newJob.jobTitle ? "" : "Required"];
				initialState.employment = [props.newJob.employmentType, props.newJob.employmentType ? "" : "Required"];
				initialState.industry = [props.newJob.industry, props.newJob.industry ? "" : "Required"];
				initialState.function = [props.newJob.function, props.newJob.function ? "" : "Required"];
				initialState.position = [props.newJob.openPositions, props.newJob.openPositions ? "" : "Required"];
				initialState.location = [props.newJob.location, props.newJob.location ? "" : "Required"];
				setFormData(initialState);
			}
		}
		validate();
	}, [props.isSubmit]);

	const handleChangeEmpType = (item, id) => {
		//	if (typeof item !== "number") return;

		handleFieldChange(id, item);
		if (typeof item === "number") {
			dispatch(setNewJob({ employmentType: item }));
		} else {
			dispatch(setNewJob({ employmentType: null }));
		}
	};

	const handleChangeIndustry = (item, id) => {
		handleFieldChange(id, item);
		if (typeof item === "number") {
			dispatch(setNewJob({ industry: item }))
		} else {
			dispatch(setNewJob({ industry: null }))
		}
	};
	const handleChangeFunction = (item, id) => {
		console.log('function ', item);
		handleFieldChange(id, item);
		if (typeof item === "number") {
			dispatch(setNewJob({ function: item }));
		} else {
			dispatch(setNewJob({ function: null }));
		}
	};
	const handleChangeJobTile = (e) => {
		handleFieldChange(e.target.id, e.target.value);
		dispatch(setNewJob({ jobTitle: e.target.value }));
	};
	const handleChangeLocation = (e) => {
		// if (typeof e !== "number") return;
		// dispatch(setNewJob({ location: e }));
		console.log('location ', e);
		handleFieldChange("location", e);
		if (typeof e === "number") {
			dispatch(setNewJob({ location: e }));
		} else {
			dispatch(setNewJob({ location: null }));
		}
	};
	const handleChangeOpenPosition = (e) => {
		handleFieldChange("position", e.target.value);
		dispatch(setNewJob({ openPositions: e.target.value }));
	};

	const handleFieldChange = (field, value) => {
		console.log('abhi job ', field, value);
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});

		console.log('formData ', formData);

	};

	return (
		<div className="job-details" ref={parent}>
			<div className="heading">
				<h2>
					Job Details <span>*</span>
				</h2>
			</div>
			<div className="content">
				<ul>
					<li>
						<label>
							Posted Job Title <span>*</span>
							<span className={`error-text ${!formData.title[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Input type="text"
							onChange={handleChangeJobTile}
							id="title"
							value={formData.title[0]}
							// onChange={(e) => handleChangeJobTile(e.target.id, e.target.value)}
							autoFocus
							disabled={disableCtrl} />
					</li>
					<li>
						<label>
							Job Location <span>*</span>
							<span className={`error-text ${!formData.location[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Dropdown
							placeholder="Zip or city, state"
							content={location.map((val) => ({
								val:
									val.street_address +
									", " +
									val.city +
									", " +
									val.state +
									", " +
									val.zip_code,
								id: val.id,
							}))}
							id="location"
							search_term
							selected={formData.location[0] &&
								// formData.location[0].street_address + ", " +
								// formData.location[0].city + ", " +
								// formData.location[0].state + ", " +
								// formData.location[0].zip_code + ", "
								formData.location[0].city


							}
							onchange={(value) => {
								handleChangeLocation(value);
							}}
							disable={disableCtrl}
						// onchange={(value) => {
						// 	handleChangeLocation(value);
						// }}
						/>
					</li>
					<li>
						<label>
							Employment Type <span>*</span>
							<span className={`error-text ${!formData.employment[1] && "hidden"}`}>
								Required
							</span>
						</label>

						<Dropdown
							placeholder={employmentTypes.heading}
							content={employmentType.map((val) => ({
								val: val.employment_status,
								id: val.id,
							}))}
							search_term="employment_status"
							id="employment"
							selected={formData.employment[0] && formData.employment[0].employment_status}
							onchange={(value) => {
								handleChangeEmpType(value, "employment");
							}}
						// disable={disableCtrl}
						/>
					</li>
					<li>
						<label>
							Industry <span>*</span>
							<span className={`error-text ${!formData.industry[1] && "hidden"}`}>
								Required
							</span>
						</label>

						<Dropdown
							placeholder={industry.heading}
							content={industryType.map((val) => ({
								val: val.industry_name,
								id: val.id,
							}))}
							id="industry"
							search_term="industry_name"
							selected={formData.industry[0] && formData.industry[0].industry_name}
							onchange={(value) => {
								handleChangeIndustry(value, "industry");
								// handleIndustrySearch(value);
							}}
							disable={disableCtrl}
						/>
					</li>
					<li>
						<label>
							Job Function Classification <span>*</span>
							<span className={`error-text ${!formData.function[1] && "hidden"}`}>
								Required
							</span>
						</label>

						<Dropdown
							placeholder={_function.heading}
							content={functions.map((val) => ({
								val: val.function_name,
								id: val.id,
							}))}
							search_term="function_name"
							id="function"
							selected={formData.function[0] && formData.function[0].function_name}
							onchange={(value) => {
								handleChangeFunction(value, "function");
							}}
							disable={disableCtrl}
						/>
					</li>
					<li>
						<label>How many Open Positions Are There?</label>
						<Input type="text"
							// disabled={disableCtrl} 
							id="position" value={formData.position[0]} onChange={handleChangeOpenPosition} />
					</li>
				</ul>
			</div>
		</div>
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
	};
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);
