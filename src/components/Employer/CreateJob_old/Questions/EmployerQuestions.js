import React from "react";
import Input from "../../../_Elements/Input";

function EmployerQuestions(props) {
	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="employer-questions" ref={parent}>
			<div className="heading">
				<h2>Employer Questions</h2>
			</div>
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">Acceptable Shifts?</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="shift_7_3"
								name="shift"
								type="checkbox"
								defaultChecked
							/>
							<label htmlFor="shift_7_3">7am - 3pm</label>
							<input
								className="block-toggle blue"
								id="shift_3_11"
								name="shift"
								type="checkbox"
							/>
							<label htmlFor="shift_3_11">3pm - 11pm</label>
							<input
								className="block-toggle blue"
								id="shift_11_7"
								name="shift"
								type="checkbox"
							/>
							<label htmlFor="shift_11_7">11pm - 7am</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Written English Ability?</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="engAbility_none"
								name="engAbility"
								type="checkbox"
								defaultChecked
							/>
							<label htmlFor="engAbility_none">None</label>
							<input
								className="block-toggle blue"
								id="engAbility_limited"
								name="engAbility"
								type="checkbox"
							/>
							<label htmlFor="engAbility_limited">Limited</label>
							<input
								className="block-toggle blue"
								id="engAbility_working"
								name="engAbility"
								type="checkbox"
							/>
							<label htmlFor="engAbility_working">Working</label>
							<input
								className="block-toggle blue"
								id="engAbility_fluent"
								name="engAbility"
								type="checkbox"
							/>
							<label htmlFor="engAbility_fluent">Fluent & Native</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Certifications?</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="certifications_cna"
								name="certifications"
								type="checkbox"
								defaultChecked
							/>
							<label htmlFor="certifications_cna">
								Certified Nursing Assistant
							</label>
							<input
								className="block-toggle blue"
								id="certifications_hha"
								name="certifications"
								type="checkbox"
							/>
							<label htmlFor="certifications_hha">Home Health Aid</label>
							<input
								className="block-toggle blue"
								id="certifications_cma"
								name="certifications"
								type="checkbox"
							/>
							<label htmlFor="certifications_cma">
								Certified Medication Aid
							</label>
							<input
								className="block-toggle blue"
								id="certifications_others"
								name="certifications"
								type="checkbox"
							/>
							<label htmlFor="certifications_others">Others</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Are you Comfortable with the Posted Wage?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateYes"
							/>
							<label htmlFor="highSchoolGraduateYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateNo"
							/>
							<label htmlFor="highSchoolGraduateNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default EmployerQuestions;
