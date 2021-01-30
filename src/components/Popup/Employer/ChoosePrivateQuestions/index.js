import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";
import {
	getQuestionBank,
	deleteQuestion,
} from "../../../../store/thunks/employer";
import {
	setQuestionBankQuestion,
	setNewJob,
} from "../../../../store/actions/employer";

import Input from "../../../_Elements/Input";

import "./index.scss";

function ChoosePrivateQuestions(props) {
	const dispatch = useDispatch();
	const [questionBanks, setQuestionBanks] = useState(props.questionBank);
	let [questionToSave, setQuestionToSave] = useState(props.questionsSelected);
	const createNewQuestion = () => {
		dispatch(togglePopup([true, "createNewQuestion", { type: "private" }]));
	};

	useEffect(() => {
		dispatch(getQuestionBank());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setQuestionBankQuestion(questionToSave));
		dispatch(setNewJob({ jobQuestionnaireMap: questionToSave }));
	}, [questionToSave]);

	useEffect(() => {
		if (props.questionBank.length && props.questionsSelected) {
			let temp = props.questionBank.map((q) => {
				questionToSave.map((s) => {
					if (q.question_id === s.question_id) q.checked = true;
				});
				return q;
			});
			setQuestionBanks(temp);
		}
	}, [props.questionBank, props.questionsSelected]);

	const handleCheckEvent = (event, question) => {
		// if (document.getElementById(event.target.id).checked) {
		// 	if (questionToSave.length !== 0) {
		// 		if (
		// 			questionToSave.find((x) => x.question_id !== event.target.id)
		// 				.question_id.length !== 0
		// 		) {
		// 			questionToSave.push(question);
		// 		}
		// 	} else {
		// 		questionToSave.push(question);
		// 	}
		// } else {
		// 	questionToSave = questionToSave.map((val) => {
		// 		if (val.question_id != event.target.id) {
		// 			return val;
		// 		} else {
		// 			return null;
		// 		}
		// 	});
		// 	questionToSave = questionToSave.filter((e) => e !== null);
		// }

		question.checked = !question.checked;

		if (question.checked) {
			if (questionToSave.length !== 0) {
				if (
					questionToSave.find((x) => x.question_id != event.target.id)
						.length !== 0
				) {
					// questionToSave.push(question);
					setQuestionToSave((prev) => {
						return [...prev, question];
					});
				}
			} else {
				// questionToSave.push(question);
				setQuestionToSave((prev) => {
					return [...prev, question];
				});
			}
		} else {
			let temp = questionToSave.filter((val) => {
				if (val.question_id != event.target.id) {
					return val;
				}
			});
			setQuestionToSave(temp);
		}

		let temp = questionBanks.map((o) => {
			if (question.question_id === o.question_id) o.checked = question.checked;
			return o;
		});

		setQuestionBanks(temp);
	};

	const handleQuestionAdd = () => {
		console.log("data ", questionToSave);
		console.log("create");
		dispatch(setQuestionBankQuestion(questionToSave));
		dispatch(setNewJob({ jobQuestionnaireMap: questionToSave }));
		// dispatch(createQuestion({
		// 	"category": "Employer Questions",
		// 	"forPublicReview": true,
		// 	"jobTitle": "CNA",
		// 	"questionName": "How would you define yourself?",
		// 	"questionType": "text-input"
		// }));
		dispatch(toggleOverlay(false));
		dispatch(togglePopup([false, "addNewQuestion"]));
	};

	const handleEdit = (e, question) => {
		dispatch(
			togglePopup([
				true,
				"createNewQuestion",
				{ type: "private", action: "edit", question: question },
			])
		);
	};
	const handleDelete = (e, question) => {
		// console.log(question);

		// dispatch(toggleOverlay(true));
		// dispatch(togglePopup([true, "delete", { what: "deleteQuestion" }]));

		alert("Are you sure you want to delete this question?");

		dispatch(deleteQuestion(question.question_id));
		setQuestionBanks(
			props.questionBank.filter(
				(val) => val.question_id !== question.question_id
			)
		);
		let temp = questionToSave.filter((val) => {
			if (val.question_id != question.question_id) {
				return val;
			}
		});
		setQuestionToSave(temp);
		dispatch(setQuestionBankQuestion(questionToSave));
		dispatch(setNewJob({ jobQuestionnaireMap: questionToSave }));
	};

	const handleJobTitleSearch = (searchJobTitle) => {
		setQuestionBanks(
			props.questionBank.filter((val) =>
				val.question_name.toLowerCase().includes(searchJobTitle.toLowerCase())
			)
		);
	};

	return (
		<div className="choose-private-question">
			<h1>
				Select Questions to Include
				<button
					className="common-add-btn"
					id="private-question"
					onClick={createNewQuestion}
				>
					<span></span>Create New Question
				</button>
			</h1>
			<div className="content">
				<div className="search-panel">
					<div className="searches">
						<input
							type="text"
							placeholder="Type to Search Questions or Create A New Question Using Button Above"
							onChange={(e) => {
								handleJobTitleSearch(e.target.value);
							}}
						/>
						{/* <input type="text" placeholder="Skills" /> */}
					</div>
				</div>

				<ul className="general-questions">
					{questionBanks.map((question, i) => {
						return (
							<li className="general-question" key={i}>
								<h2 className="question">{question.question_name}</h2>
								<div className="options">
									{question.question_type === "text-input" ? (
										<>
											<Input type="text" />
											<label htmlFor="question3">
												<span className="input"></span>
											</label>

											<FontAwesomeIcon
												className="action-btn edit"
												icon={faPen}
												// id={"workExperienceEdit_" + i}
												onClick={(e) => handleEdit(e, question)}
											/>
											<FontAwesomeIcon
												className="action-btn delete"
												icon={faTrash}
												// id={"workExperienceDelete_" + i}
												onClick={(e) => handleDelete(e, question)}
											/>
										</>
									) : question.question_type === "mcq" ? (
										<>
											{question.option_choices.map((option, i) => {
												if (option.question_type === "multiple") {
													return (
														<div key={i}>
															<input
																key={i}
																className="block-toggle blue"
																id={`${option.id}${option.question_id}`}
																name={`${option.question_id}`}
																type="checkbox"
																disabled
															/>
															<label
																htmlFor={`${option.id}${option.question_id}`}
															>
																{option.option_choice_name}
															</label>
														</div>
													);
												} else if (option.question_type === "boolean") {
													return (
														<div key={i}>
															<input
																key={i}
																className={`fancy-toggle blue ${i === 0 ? "yes" : "yes"
																	}`}
																id={`${option.id}${option.question_id}`}
																name={`${option.question_id}`}
																type="radio"
																disabled
															/>
															<label
																htmlFor={`${option.id}${option.question_id}`}
															>
																<span className="input"></span>
																{option.option_choice_name}
															</label>
														</div>
													);
												}
											})}
										</>
									) : null}
								</div>
								<input
									className="fancy-toggle"
									name="question"
									type="checkbox"
									checked={question.checked}
									onChange={(event) => handleCheckEvent(event, question)}
									id={question.question_id}
								/>

								<label htmlFor={question.question_id}>
									<span className="input"></span>
								</label>

								<FontAwesomeIcon
									className="action-btn edit"
									icon={faPen}
									onClick={(e) => handleEdit(e, question)}
								/>
								<FontAwesomeIcon
									className="action-btn delete"
									icon={faTrash}
									onClick={(e) => handleDelete(e, question)}
								/>
							</li>
						);
					})}
				</ul>
				<div className="cta">
					<button
						className="primary-btn blue"
						onClick={() => handleQuestionAdd()}
					>
						Done
					</button>
				</div>
			</div>
		</div>
	);
}

// export default ChoosePrivateQuestions;

function mapStateToProps(state) {
	return {
		questionBank: state.employerReducer.questionBank.data.private_question_bank
			.map((o) => {
				o.checked = false;
				return o;
			})
			.sort(function (a, b) {
				const x = a["question_id"];
				const y = b["question_id"];
				return x < y ? 1 : x > y ? -1 : 0;
			}),
		questionsSelected: state.employerReducer.questionBank.questions.map((o) => {
			o.checked = true;
			return o;
		}),
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(ChoosePrivateQuestions);
