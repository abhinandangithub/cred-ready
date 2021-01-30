import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../../../_Elements/CustomDatePicker";
import { Link } from "react-router-dom";

import "./index.scss";

function GeneralQuestions() {
	const [appliedDate, setAppliedDate] = useState();

	return (
		<div className="general_questions_page">
			<h1 className="heading">General Questions</h1>

			<ul className="general-questions">
				<li className="general-question applied">
					<h2 className="question">
						Have you applied here previously? Is so, when?
					</h2>
					<div className="options">
						<input
							className="fancy-toggle"
							name="applied"
							type="radio"
							id="appliedYes"
						/>
						<label htmlFor="appliedYes">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no"
							name="applied"
							type="radio"
							id="appliedNo"
							defaultChecked
						/>
						<label htmlFor="appliedNo">
							<sapn className="input"></sapn> No
						</label>
					</div>
					<div className="info">
						<label>When you applied?</label>
						<CustomDatePicker
							selected={appliedDate}
							onChange={(date) => setAppliedDate(date)}
							placeholderText="Select Date"
						/>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied1"
							type="radio"
							id="appliedYes1"
						/>
						<label htmlFor="appliedYes1">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no"
							name="applied1"
							type="radio"
							id="appliedNo1"
							defaultChecked
						/>
						<label htmlFor="appliedNo1">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied2"
							type="radio"
							defaultChecked
							id="appliedYes2"
						/>
						<label htmlFor="appliedYes2">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied2"
							type="radio"
							id="appliedNo2"
						/>
						<label htmlFor="appliedNo2">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied3"
							type="radio"
							id="appliedYes3"
						/>
						<label htmlFor="appliedYes3">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied3"
							type="radio"
							id="appliedNo3"
							defaultChecked
						/>
						<label htmlFor="appliedNo3">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied4"
							type="radio"
							defaultChecked
							id="appliedYes4"
						/>
						<label htmlFor="appliedYes4">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied4"
							type="radio"
							id="appliedNo4"
						/>
						<label htmlFor="appliedNo4">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied5"
							type="radio"
							id="appliedYes5"
							defaultChecked
						/>
						<label htmlFor="appliedYes5">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied5"
							type="radio"
							id="appliedNo5"
						/>
						<label htmlFor="appliedNo5">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied6"
							type="radio"
							id="appliedYes6"
						/>
						<label htmlFor="appliedYes6">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied6"
							type="radio"
							id="appliedNo6"
							defaultChecked
						/>
						<label htmlFor="appliedNo6">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied7"
							type="radio"
							id="appliedYes7"
							defaultChecked
						/>
						<label htmlFor="appliedYes7">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied7"
							type="radio"
							id="appliedNo7"
						/>
						<label htmlFor="appliedNo">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied8"
							type="radio"
							id="appliedYes8"
						/>
						<label htmlFor="appliedYes8">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied8"
							type="radio"
							id="appliedNo8"
							defaultChecked
						/>
						<label htmlFor="appliedNo8">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied9"
							type="radio"
							id="appliedYes9"
						/>
						<label htmlFor="appliedYes9">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied9"
							type="radio"
							id="appliedNo9"
							defaultChecked
						/>
						<label htmlFor="appliedNo9">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied13"
							type="radio"
							id="appliedYes13"
						/>
						<label htmlFor="appliedYes13">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied13"
							type="radio"
							id="appliedNo13"
							defaultChecked
						/>
						<label htmlFor="appliedNo13">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied10"
							type="radio"
							id="appliedYes10"
						/>
						<label htmlFor="appliedYes10">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied10"
							type="radio"
							id="appliedNo10"
							defaultChecked
						/>
						<label htmlFor="appliedNo10">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Are you over 18 years old?</h2>
					<div className="options">
						<input
							className="fancy-toggle yes "
							name="applied11"
							type="radio"
							id="appliedYes11"
						/>
						<label htmlFor="appliedYes11">
							<sapn className="input"></sapn> Yes
						</label>
						<input
							className="fancy-toggle no "
							name="applied11"
							type="radio"
							id="appliedNo11"
							defaultChecked
						/>
						<label htmlFor="appliedNo11">
							<sapn className="input"></sapn> No
						</label>
					</div>
				</li>
			</ul>

			<div className="cta">
				<Link className="primary-btn" to="/jobs/job-specefic-questions">
					Next
				</Link>
			</div>
		</div>
	);
}

export default GeneralQuestions;
