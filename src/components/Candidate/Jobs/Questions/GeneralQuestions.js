import React from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../../_Elements/CustomDatePicker";

import { isAnswer } from "./index";
import { findIndex } from "./index";
import { initRadioClick } from "../../../../assets/js/Utility";

function GeneralQuestions({ data, onchange, calHeight, noHeading }) {
	const [appliedDate, setAppliedDate] = React.useState();
	const [separatedDate, setSeparatedDate] = React.useState();
	const [isActiveInner, setIsActiveInner] = React.useState(false);

	const appliedNoEl = React.useRef(null);

	const selectSeparatedDate = () => {
		if (data.length > 0) {
			let i = findIndex(data, 6);
			let a = data[i].followup_sub_answer;
			let b = data[i].answer;
			let c = data[i].sub_answer;
			if (a === "" || b !== 2 || c !== 2) return;
			let d = a.replace(/-/g, "/");
			d = new Date(d);
			setSeparatedDate(d);
		}
	};
	const selectAppliedDate = () => {
		if (data.length > 0) {
			let i = findIndex(data, 1);
			let a = data[i].answer;
			if (a === "" || a === 2) return;
			let d = a.replace(/-/g, "/");
			d = new Date(d);
			setAppliedDate(d);
		}
	};

	const parent = React.useRef();

	React.useEffect(() => {
		initRadioClick(".general-questions-page");
	}, []);

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
		selectAppliedDate();
		selectSeparatedDate();
		setIsActiveInner(isAnswer(data, 6, 2));
	}, [calHeight, data]);

	return (
		<div className="general-questions-page" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>General Questions</h2>
				</div>
			) : (
				""
			)}
			<div className="content">
				<ul className="general-questions">
					<li className="general-question applied" role="radiogroup">
						<h2 className="question">
							Have you applied here previously? Is so, when?
							<span className="requiredStar">*</span>
						</h2>
						<span className={`error-text ${!data[0].required && "hidden"}`}>
							Required
						</span>
						<div className="info">
							<label>When you applied?</label>
							<div className="date_no">
								<CustomDatePicker
									selected={appliedDate}
									placeholderText="Select Date"
									onChange={(date) => {
										appliedNoEl.current.checked = false;
										setAppliedDate(date);
										onchange(1, date ? date.toString() : "");
									}}
								/>
								<span style={{ margin: "0 15px" }}>Or</span>
								<span
									className="option radio_button"
									role="radio"
									aria-checked="false"
									tabindex={isAnswer(data, 1, 2) ? "0" : "-1"}
								>
									<input
										className="fancy-toggle blue"
										ref={appliedNoEl}
										name="applied"
										type="radio"
										id="appliedBefore"
										checked={isAnswer(data, 1, 2)}
										onChange={() => {
											setAppliedDate(null);
											onchange(1, 2);
										}}
									/>
									<label htmlFor="appliedBefore">
										<span className="input"></span>No
									</label>
								</span>
							</div>
						</div>
					</li>
					<li className="general-question" role="radiogroup">
						<h2 className="question">
							Are you over 18 years old?<span className="requiredStar">*</span>
						</h2>
						{/* <label htmlFor="firstName">
							Are you over 18 years old?
							 <span>*</span> 
						
						</label> */}
						<span className={`error-text ${!data[1].required && "hidden"}`}>
							Required
						</span>
						<div className="options">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 2, 1) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue yes radio"
									name="over18Years"
									type="radio"
									id="over18YearsYes"
									checked={isAnswer(data, 2, 1)}
									onChange={() => onchange(2, 1)}
								/>
								<label htmlFor="over18YearsYes">
									<span className="input"></span>Yes
								</label>
							</span>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 2, 2) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue radio"
									name="over18Years"
									type="radio"
									id="over18YearsNo"
									checked={isAnswer(data, 2, 2)}
									onChange={() => onchange(2, 2)}
								/>
								<label htmlFor="over18YearsNo">
									<span className="input"></span>No
								</label>
							</span>
						</div>
					</li>
					<li className="general-question" role="radiogroup">
						<h2 className="question">
							Are you eligible to work in the U.S.?
							<span className="requiredStar">*</span>
						</h2>
						<span className={`error-text ${!data[2].required && "hidden"}`}>
							Required
						</span>
						<div className="options">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 3, 1) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue yes radio"
									name="eligible"
									type="radio"
									id="eligibleYes"
									checked={isAnswer(data, 3, 1)}
									onChange={() => onchange(3, 1)}
								/>
								<label htmlFor="eligibleYes">
									<span className="input"></span>Yes
								</label>
							</span>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 3, 2) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue radio"
									name="eligible"
									type="radio"
									id="eligibleNo"
									checked={isAnswer(data, 3, 2)}
									onChange={() => onchange(3, 2)}
								/>
								<label htmlFor="eligibleNo">
									<span className="input"></span>No
								</label>
							</span>
						</div>
					</li>
					<li className="general-question" role="radiogroup">
						<h2 className="question">
							Will you require relocation assistance?
							<span className="requiredStar">*</span>
							<span className={`error-text ${!data[3].required && "hidden"}`}>
								Required
							</span>
						</h2>
						<div className="options">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 4, 1) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue yes radio"
									name="requireRelocation"
									type="radio"
									id="requireRelocationYes"
									checked={isAnswer(data, 4, 1)}
									onChange={() => onchange(4, 1)}
								/>
								<label htmlFor="requireRelocationYes">
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
									name="requireRelocation"
									type="radio"
									id="requireRelocationNo"
									checked={isAnswer(data, 4, 2)}
									onChange={() => onchange(4, 2)}
								/>
								<label htmlFor="requireRelocationNo">
									<span className="input"></span>No
								</label>
							</span>
						</div>
					</li>
					<li className="general-question" role="radiogroup">
						<h2 className="question">
							Do you require or will you require a work authorization?
							<span className="requiredStar">*</span>
						</h2>
						<span className={`error-text ${!data[4].required && "hidden"}`}>
							Required
						</span>
						<div className="options">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 5, 1) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue yes radio"
									name="workAuthorization"
									type="radio"
									id="workAuthorizationYes"
									checked={isAnswer(data, 5, 1)}
									onChange={() => onchange(5, 1)}
								/>
								<label htmlFor="workAuthorizationYes">
									<span className="input"></span>Yes
								</label>
							</span>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 1, 2) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue"
									name="workAuthorization"
									type="radio"
									id="workAuthorizationNo"
									checked={isAnswer(data, 5, 2)}
									onChange={() => onchange(5, 2)}
								/>
								<label htmlFor="workAuthorizationNo">
									<span className="input"></span>No
								</label>
							</span>
						</div>
					</li>
					<li className="general-question" role="radiogroup">
						<h2 className="question">
							If you believe you belong to any of the categories of protected
							veterans listed above, please indicate by checking the appropriate
							box below. If you are not a veteran, select box 1 OR select the
							box(s) that apply to your veteran status.
						</h2>
						{/* <span className={`error-text ${!data[5].required && "hidden"}`}>
							Required
						</span> */}
						<div className="options vetran-status coloumn">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 6, 1) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue yes radio full"
									name="isVeteran"
									type="radio"
									id="isVeteran"
									checked={isAnswer(data, 6, 1)}
									onChange={() => {
										onchange(6, 1);
										setIsActiveInner(false);
										setSeparatedDate(null);
									}}
								/>
								<label htmlFor="isVeteran">
									<span className="input"></span>I am not a veteran. (I did not
									serve in the military.)
								</label>
							</span>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 6, 2) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle yes radio blue full"
									name="isVeteran"
									type="radio"
									id="protectedVeteran"
									checked={isAnswer(data, 6, 2) || isActiveInner}
									onChange={() => {
										onchange(6, 2);
										setIsActiveInner(true);
									}}
								/>
								<label htmlFor="protectedVeteran">
									<span className="input"></span>
									<p>
										I belong to the following classifications of protected
										veterans (Choose all that apply):
									</p>
								</label>
							</span>
							<ul>
								<li>
									<span
										className="option radio_button"
										role="radio"
										aria-checked="false"
										tabindex={isAnswer(data, 1, 2) ? "0" : "-1"}
									>
										<input
											disabled={!isActiveInner}
											className="fancy-toggle yes radio blue full"
											name="vetranType"
											type="radio"
											id="disabledVeteran"
											checked={
												isAnswer(data, 6, {
													sub_answer: 1,
												}) && isActiveInner
											}
											onChange={() => {
												setSeparatedDate(null);
												onchange(6, {
													sub_answer: 1,
												});
												setIsActiveInner(true);
											}}
										/>
										<label htmlFor="disabledVeteran">
											<span className="input"></span>DISABLED VETERAN
										</label>
									</span>
									<span
										className="option radio_button"
										role="radio"
										aria-checked="false"
										tabindex={
											isAnswer(data, 6, {
												sub_answer: 2,
											}) && isActiveInner
												? "0"
												: "-1"
										}
									>
										<input
											className="fancy-toggle yes radio blue full"
											name="vetranType"
											disabled={!isActiveInner}
											type="radio"
											id="separatedVeteran"
											checked={
												isAnswer(data, 6, {
													sub_answer: 2,
												}) && isActiveInner
											}
											onChange={() => {
												selectSeparatedDate();
												onchange(6, {
													sub_answer: 2,
												});
												setIsActiveInner(true);
											}}
										/>
										<label htmlFor="separatedVeteran">
											<span className="input"></span>
											RECENTLY SEPARATED VETERAN
										</label>
									</span>
									<CustomDatePicker
										className="separeted_veteran"
										selected={separatedDate}
										placeholderText="Select Date"
										disabled={
											!isAnswer(data, 6, {
												sub_answer: 2,
											}) || !isActiveInner
										}
										onChange={(date) => {
											console.log(date);
											setSeparatedDate(date);
											onchange(6, date ? date.toString() : "");
										}}
									/>
									<span
										className="option radio_button"
										role="radio"
										aria-checked="false"
										tabindex={
											isAnswer(data, 6, {
												sub_answer: 3,
											}) && isActiveInner
												? "0"
												: "-1"
										}
									>
										<input
											className="fancy-toggle yes radio blue full"
											disabled={!isActiveInner}
											name="vetranType"
											type="radio"
											id="activeVeteran"
											checked={
												isAnswer(data, 6, {
													sub_answer: 3,
												}) && isActiveInner
											}
											onChange={() => {
												setSeparatedDate(null);
												onchange(6, {
													sub_answer: 3,
												});
												setIsActiveInner(true);
											}}
										/>
										<label htmlFor="activeVeteran">
											<span className="input"></span>
											ACTIVE WARTIME OR CAMPAIGN BADGE VETERAN
										</label>
									</span>
									<span
										className="option radio_button"
										role="radio"
										aria-checked="false"
										tabindex={
											isAnswer(data, 6, {
												sub_answer: 4,
											}) && isActiveInner
												? "0"
												: "-1"
										}
									>
										<input
											className="fancy-toggle yes radio blue full"
											disabled={!isActiveInner}
											name="vetranType"
											type="radio"
											id="medalVeteran"
											checked={
												isAnswer(data, 6, {
													sub_answer: 4,
												}) && isActiveInner
											}
											onChange={() => {
												setSeparatedDate(null);
												onchange(6, {
													sub_answer: 4,
												});
												setIsActiveInner(true);
											}}
										/>
										<label htmlFor="medalVeteran">
											<span className="input"></span>
											ARMED FORCES SERVICE MEDAL VETERAN
										</label>
									</span>
								</li>
							</ul>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 6, 3) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle yes radio blue full"
									name="isVeteran"
									type="radio"
									id="notProtectedVeteran"
									checked={isAnswer(data, 6, 3)}
									onChange={() => {
										setSeparatedDate(null);
										onchange(6, 3);
										setIsActiveInner(false);
									}}
								/>
								<label htmlFor="notProtectedVeteran">
									<span className="input"></span>I am NOT a protected veteran.
									(I served in the military but do not fall into any veteran
									categories listed above.)
								</label>
							</span>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 6, 4) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle yes radio blue full"
									name="isVeteran"
									type="radio"
									id="noVeteranStatus"
									checked={isAnswer(data, 6, 4)}
									onChange={() => {
										setSeparatedDate(null);
										onchange(6, 4);
										setIsActiveInner(false);
									}}
								/>
								<label htmlFor="noVeteranStatus">
									<span className="input"></span>I choose not to identify my
									veteran status.
								</label>
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default GeneralQuestions;
