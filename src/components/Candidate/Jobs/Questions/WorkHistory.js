import React from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../../_Elements/CustomDatePicker";
import InputRange from "react-input-range";
import { initRadioClick } from "../../../../assets/js/Utility";

import { findIndex, isAnswer } from "./index";

function WorkHistory({ data, onchange, calHeight, noHeading, ...props }) {
	const [appliedDate, setAppliedDate] = React.useState();
	const parent = React.useRef();
	const [value1, setValue1] = React.useState(data[findIndex(data, 1)].answer);
	const [value2, setValue2] = React.useState(data[findIndex(data, 2)].answer);

	// const selectAppliedDate = (date) => {
	// 	if (date) {
	// 		let i = findIndex(data, 3); // 1 is question_id
	// 		let a = data.length > 0 && data[i].answer;
	// 		let d = date ? new Date(date) : new Date(a);
	// 		setAppliedDate(d);
	// 	} else return;
	// };

	const selectAppliedDate = () => {
		if (data.length > 0) {
			let i = findIndex(data, 3);
			let a = data[i].answer;
			if (a === "" || a === 2) return;
			let d = a.replace(/-/g, "/");
			d = new Date(d);
			setAppliedDate(d);
		}
	};

	React.useEffect(() => {
		initRadioClick(".work-history");
	}, []);

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [calHeight]);

	React.useEffect(() => {
		selectAppliedDate();
		setValue1(data[0].answer);
		setValue2(data[1].answer);
	}, [data]);

	return (
		<div className="work-history" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Work History</h2>
				</div>
			) : (
				""
			)}
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">How many jobs have you held?</h2>
						{/* <span className={`error-text ${!data[0].required && "hidden"}`}
						>Required</span> */}
						<div className="options slider">
							<InputRange
								minValue={0}
								maxValue={15}
								value={value1}
								onChange={(value) => {
									setValue1(value);
									onchange(1, value);
								}}
							/>
						</div>
						{value1 > 0 && (
							<ul className="level_2">
								<li className="general-question border">
									<h2 className="question">
										How long were you in your most recent job?
									</h2>
									{/* <span
										className={`error-text ${!data[1].required && "hidden"}`}
									>
										Required
									</span> */}
									<div className="options slider input_range_years">
										<InputRange
											minValue={0}
											maxValue={10}
											value={value2}
											formatLabel={(value) => `${value} Years`}
											onChange={(value) => {
												setValue2(value);
												onchange(2, value);
											}}
										/>
									</div>
								</li>
								<li className="general-question border start_job">
									<h2 className="question">
										When did you start your first job?
										<span className="requiredStar">*</span>
									</h2>
									<span
										className={`error-text ${!data[2].required && "hidden"}`}
									>
										Required
									</span>
									<div className="options">
										<CustomDatePicker
											selected={appliedDate}
											placeholderText="Select Date"
											onChange={(date) => {
												setAppliedDate(date);
												onchange(
													3,
													date
														? JSON.stringify(new Date(date.toString())).slice(
																1,
																11
														  )
														: ""
												);
											}}
										/>
									</div>
								</li>
								<li className="general-question border" role="radiogroup">
									<h2 className="question">
										Have you worked as a CNA before?
										<span className="requiredStar">*</span>
									</h2>
									<span
										className={`error-text ${!data[3].required && "hidden"}`}
									>
										Required
									</span>
									<div className="options">
										<span
											className="option radio_button"
											role="radio"
											aria-checked="false"
											tabindex={isAnswer(data, 4, 1) ? "0" : "-1"}
										>
											<input
												className="fancy-toggle blue yes radio"
												name="cnaBefore"
												type="radio"
												id="cnaBeforeYes"
												checked={isAnswer(data, 4, 1)}
												onChange={() => {
													onchange(4, 1);
												}}
											/>
											<label htmlFor="cnaBeforeYes">
												<span className="input"></span>Yes
											</label>
										</span>
										<span
											className="option radio_button"
											role="radio"
											aria-checked="false"
											tabindex={isAnswer(data, 4, 2) ? "0" : "-1"}
										>
											<input
												className="fancy-toggle blue"
												name="cnaBefore"
												type="radio"
												id="cnaBeforeNo"
												checked={isAnswer(data, 4, 2)}
												onChange={() => {
													onchange(4, 2);
												}}
											/>
											<label htmlFor="cnaBeforeNo">
												<span className="input"></span>No
											</label>
										</span>
									</div>
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default WorkHistory;
