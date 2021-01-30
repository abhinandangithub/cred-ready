import React from "react";

import { isAnswer } from "./index";
import Input from "../../../_Elements/Input";
import JobSpecificQuestions from "../JobSpecificQuestions";
import { initRadioClick } from "../../../../assets/js/Utility";

function EmployerQuestions({
	data,
	onchange,
	calHeight,
	noHeading,
	title,
	employerQuestions,
	...props
}) {
	const parent = React.useRef();
	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [calHeight]);
	console.log("abhi zeepee ", props.empQuestions, data);

	data = data
		? data.sort(function (a, b) {
			const x = a["question_id"];
			const y = b["question_id"];
			return x < y ? 1 : x > y ? -1 : 0;
		})
		: [];

	const empQues = {
		questions: props.empQuestions
			? props.empQuestions.sort(function (a, b) {
				const x = a["question_id"];
				const y = b["question_id"];
				return x < y ? 1 : x > y ? -1 : 0;
			})
			: [],
	};

	React.useEffect(() => {
		initRadioClick(".employer-questions");
	}, []);

	return (
		<div className="employer-questions" ref={parent}>
			{(!noHeading && title) ? (
				<div className="heading">
					<h2>Employer Questions</h2>
				</div>
			) : (
					""
				)}
			<div className="content">
				<ul className="general-questions">
					{employerQuestions ? (
						<JobSpecificQuestions questions={employerQuestions} noHeading title={title} />
					) : (
							""
						)}
					{data &&
						data.length > 0 &&
						empQues.questions &&
						empQues.questions.map((ques, index) => {
							return (
								<li className="general-question" key={index} role="radiogroup">
									<h2 className="question">
										{ques.question_name}
										<span className="requiredStar">*</span>
									</h2>
									{/* {JSON.stringify(data[index].answer)} */}
									<span
										className={`error-text ${data && !data[index].required && "hidden"
											}`}
									>
										Required
									</span>
									{/* <span
										className={`error-text ${!data && !data[index].required && "hidden"
											}`}
									>
										Required
									</span> */}
									<div className="options">
										{ques.question_type === "text-input" ? (
											<Input
												id={`ques${index}`}
												type="text"
												value={data[index].answer}
												// checked={isAnswer(data, 1, [1])}
												onChange={(e) => {
													onchange(ques.question_id, e.target.value);
												}}
											/>
										) : (
												<>
													{ques.option_choices.map((option, ind) => {
														if (option.question_type === "multiple") {
															return (
																<>
																	<span
																		className="option radio_button"
																		role="radio"
																		aria-checked="false"
																		tabindex={ind === 0 ? "0" : "-1"}
																	>
																		<input
																			className="fancy-toggle blue"
																			id={`ques${index}${ind}`}
																			name={`ques${index}`}
																			type="checkbox"
																			// checked={isAnswer(data, ques, [1])}
																			checked={
																				data[index].answer.indexOf(option.id) > -1
																			}
																			onChange={() => {
																				onchange(
																					ques.question_id,
																					[option.id],
																					document.getElementById(
																						`ques${index}${ind}`
																					).checked
																				);
																			}}
																		/>
																		<label htmlFor={`ques${index}${ind}`}>
																			<span className="input"></span>
																			{option.option_choice_name}
																		</label>
																	</span>
																</>
															);
														} else if (option.question_type === "boolean") {
															return (
																<>
																	<span
																		className="option radio_button"
																		role="radio"
																		aria-checked="false"
																		tabindex={ind === 0 ? "0" : "-1"}
																	>
																		<input
																			className="fancy-toggle blue"
																			id={`ques${index}${ind}`}
																			name={`ques${index}`}
																			type="radio"
																			checked={
																				data[index].answer[0] === option.id
																			}
																			onChange={() => {
																				onchange(ques.question_id, [option.id]);
																			}}
																		/>
																		<label htmlFor={`ques${index}${ind}`}>
																			<span className="input"></span>
																			{option.option_choice_name}
																		</label>
																	</span>
																</>
															);
														}
													})}
												</>
											)}
									</div>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
}

export default EmployerQuestions;
