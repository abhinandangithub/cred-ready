import React from "react";

function CourseWork({ calHeight }) {
	const parent = React.useRef();

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [calHeight]);

	return (
		<div className="course_works" ref={parent}>
			<div className="heading">
				<h2>Coursework</h2>
			</div>
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">Are you a High School graduate?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateYes"
								disabled
							/>
							<label htmlFor="highSchoolGraduateYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle blue"
								name="highSchoolGraduate"
								type="radio"
								id="highSchoolGraduateNo"
								disabled
							/>
							<label htmlFor="highSchoolGraduateNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Which of these High School courses have you taken?</h2>
						<div className="options">
							<input id="course_1" type="checkbox" className="block-toggle blue" disabled />
							<label htmlFor="course_1">Biology I</label>
							<input id="course_2" type="checkbox" className="block-toggle blue" disabled />
							<label htmlFor="course_2">Chemistry I</label>
							<input id="course_3" type="checkbox" className="block-toggle blue" disabled />
							<label htmlFor="course_3">Geometry</label>
							<input id="course_4" type="checkbox" className="block-toggle blue" disabled />
							<label htmlFor="course_4">Algebra II</label>
						</div>
						<ul className="level_2">
							<li className="general-question border">
								<h2 className="question">What was the final year you took Biology I ?</h2>
								<div className="options">
									<input className="fancy-toggle blue  radio" name="year1" type="radio" id="year1" disabled />
									<label htmlFor="year1">
										<span className="input"></span>1st year
									</label>
									<input className="fancy-toggle blue radio" name="year1" type="radio" id="year2" disabled />
									<label htmlFor="year2">
										<span className="input"></span>2nd year
									</label>
									<input className="fancy-toggle blue radio" name="year1" type="radio" id="year3" disabled />
									<label htmlFor="year3">
										<span className="input"></span>3rd year
									</label>
									<input className="fancy-toggle blue radio" name="year1" type="radio" id="year4" disabled />
									<label htmlFor="year4">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
							<li className="general-question border">
								<h2 className="question">What was the final year you took Geometry ?</h2>
								<div className="options">
									<input className="fancy-toggle blue  radio" name="year2" type="radio" id="year5" disabled />
									<label htmlFor="year5">
										<span className="input"></span>1st year
									</label>
									<input className="fancy-toggle blue radio" name="year2" type="radio" id="year6" disabled />
									<label htmlFor="year6">
										<span className="input"></span>2nd year
									</label>
									<input className="fancy-toggle blue radio" name="year2" type="radio" id="year7" disabled />
									<label htmlFor="year7">
										<span className="input"></span>3rd year
									</label>
									<input className="fancy-toggle blue radio" name="year2" type="radio" id="year8" disabled />
									<label htmlFor="year8">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
						</ul>
					</li>
					<li className="general-question">
						<h2 className="question">Did you take a Foreign language?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="foreignLanguage"
								type="radio"
								id="foreignLanguageYes"
								disabled
							/>
							<label htmlFor="foreignLanguageYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle blue radio"
								name="foreignLanguage"
								type="radio"
								id="foreignLanguageNo"
								disabled
							/>
							<label htmlFor="foreignLanguageNo">
								<span className="input"></span>No
							</label>
						</div>
						<ul className="level_2">
							<li className="general-question border">
								<h2 className="question">Which language?</h2>
								<div className="options coloumn">
									<input id="lanuguage_1" type="checkbox" className="block-toggle blue" disabled />
									<label htmlFor="lanuguage_1">French</label>
									<input id="lanuguage_2" type="checkbox" className="block-toggle blue" disabled />
									<label htmlFor="lanuguage_2">Spanish</label>
									<input id="lanuguage_3" type="checkbox" className="block-toggle blue" disabled />
									<label htmlFor="lanuguage_3">German</label>
									<input id="lanuguage_4" type="checkbox" className="block-toggle blue" disabled />
									<label htmlFor="lanuguage_4">Latin</label>
									<input id="lanuguage_4" type="checkbox" className="block-toggle blue" disabled />
									<label htmlFor="lanuguage_4">Other</label>
								</div>
							</li>
						</ul>
						<ul className="level_3">
							{/* <li className="general-question border">
								<h2 className="question">
									How many years of foreign language?
								</h2>
								<div className="options">
									<input
										className="fancy-toggle blue  radio"
										name="foreign1"
										type="radio"
										id="foreign1"
										disabled
									/>
									<label htmlFor="foreign1">
										<span className="input"></span>1 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign2"
										disabled
									/>
									<label htmlFor="foreign2">
										<span className="input"></span>2 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign3"
										disabled
									/>
									<label htmlFor="foreign3">
										<span className="input"></span>3 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign4"
										disabled
									/>
									<label htmlFor="foreign4">
										<span className="input"></span>4 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign4"
										disabled
									/>
									<label htmlFor="foreign4">
										<span className="input"></span>5 year
									</label>
									<input
										className="fancy-toggle blue radio"
										name="foreign1"
										type="radio"
										id="foreign4"
										disabled
									/>
									<label htmlFor="foreign4">
										<span className="input"></span>6 year
									</label>
								</div>
							</li> */}
							<li className="general-question border">
								<h2 className="question">What was the final year you took French?</h2>
								<div className="options">
									<input className="fancy-toggle blue  radio" name="french2" type="radio" id="french5" disabled />
									<label htmlFor="french5">
										<span className="input"></span>1st year
									</label>
									<input className="fancy-toggle blue radio" name="french2" type="radio" id="french6" disabled />
									<label htmlFor="french6">
										<span className="input"></span>2nd year
									</label>
									<input className="fancy-toggle blue radio" name="french2" type="radio" id="french7" disabled />
									<label htmlFor="french7">
										<span className="input"></span>3rd year
									</label>
									<input className="fancy-toggle blue radio" name="french2" type="radio" id="french8" disabled />
									<label htmlFor="french8">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
							<li className="general-question border">
								<h2 className="question">What was the final year you took German?</h2>
								<div className="options">
									<input className="fancy-toggle blue  radio" name="german2" type="radio" id="german5" disabled />
									<label htmlFor="german5">
										<span className="input"></span>1st year
									</label>
									<input className="fancy-toggle blue radio" name="german2" type="radio" id="german6" disabled />
									<label htmlFor="german6">
										<span className="input"></span>2nd year
									</label>
									<input className="fancy-toggle blue radio" name="german2" type="radio" id="german7" disabled />
									<label htmlFor="german7">
										<span className="input"></span>3rd year
									</label>
									<input className="fancy-toggle blue radio" name="german2" type="radio" id="german8" disabled />
									<label htmlFor="german8">
										<span className="input"></span>4th year
									</label>
								</div>
							</li>
						</ul>
					</li>
					<li className="general-question">
						<h2 className="question">Do you have any education beyond a high school degree?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="afterHighSchoolDegree"
								type="radio"
								id="afterHighSchoolDegreeYes"
								disabled
							/>
							<label htmlFor="afterHighSchoolDegreeYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle blue radio"
								name="afterHighSchoolDegree"
								type="radio"
								id="afterHighSchoolDegreeNo"
								disabled
							/>
							<label htmlFor="afterHighSchoolDegreeNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CourseWork;
