import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

import Input from "../../../../_Elements/Input";
import AddButton from "../../../../_Elements/AddButton";
import { togglePopup, toggleOverlay } from "../../../../../store/actions/popup_overlay";
import { getQuestionBank } from "../../../../../store/thunks/employer";
import { setQuestionBankQuestion, setNewJob } from "../../../../../store/actions/employer";
import { useToasts } from "react-toast-notifications";

function JobSpecificQuestions(props) {
	let { jobId } = useParams();
	const [defaultQuestions, setDefaultQuestions] = React.useState([]);
	const [disableCtrl, setDisableCtrl] = useState(props.disable);
	const { addToast } = useToasts();

	const dispatch = useDispatch();
	// console.log('props questionBank ', props.questionBank.questionBank.questions);
	useEffect(() => {
		// console.log('props questionBank dispatch', props.questionBank);
		// dispatch(getQuestionBank());
	}, [dispatch]);

	useEffect(() => {
		if (!!jobId && !!props.jobToUpdate) {
			// setDefaultQuestions(props.jobToUpdate.questions);
			// dispatch(setQuestionBankQuestion(props.jobToUpdate.questions));
			// dispatch(setNewJob({ jobQuestionnaireMap: props.jobToUpdate.questions }));
		} else {
			// dispatch(setNewJob({ jobQuestionnaireMap: [] }));
		}
		if (props.jobToUpdate && props.jobToUpdate.count_of_applied_candidates && jobId) setDisableCtrl(true);
	}, [props.jobToUpdate]);

	useEffect(() => {
		// console.log('props questionBank useeffect', props.questionBank);
	}, [props.questionBank]);

	const addQuestion = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "addNewQuestion"]));
	};

	const handleEdit = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "createNewQuestion", { type: "private" }]));
	};
	const handleDelete = (question) => {
		addToast("Question removed from list.", {
			appearance: "success",
			autoDismiss: true,
		});
		let temp = props.questionBank.filter((q, i) => q.question_id !== question.question_id);
		dispatch(setQuestionBankQuestion(temp));
		dispatch(setNewJob({ jobQuestionnaireMap: temp }));
	};

	return (
		<div className="job-specefic-questions">
			<ul className="general-questions">
				{props.questionBank &&
					props.questionBank.map((question, i) => {
						return (
							<li className="general-question" key={i}>
								<h2 className="question">{question.question_name}</h2>
								<div className="options">
									{question.question_type === "text-input" ? (
										<Input type="text" />
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
															<label htmlFor={`${option.id}${option.question_id}`}>{option.option_choice_name}</label>
														</div>
													);
												} else if (option.question_type === "boolean") {
													return (
														<div key={i}>
															<input
																key={i}
																className={`fancy-toggle blue ${i === 0 ? "yes" : "yes"}`}
																id={`${option.id}${option.question_id}`}
																name={`${option.question_id}`}
																type="radio"
																disabled
															/>
															<label htmlFor={`${option.id}${option.question_id}`}>
																<span className="input"></span>
																{option.option_choice_name}
															</label>
														</div>
													);
												}
											})}
										</>
									) : null}
									{/* <FontAwesomeIcon
									className="action-btn edit"
									icon={faPen}
									onClick={handleEdit}
								/>
                                <FontAwesomeIcon
                                    className="action-btn delete"
                                    icon={faTrash}
                                    onClick={handleDelete}
                                /> */}
									<button disabled={disableCtrl} className="common_plus_icon" onClick={() => handleDelete(question)}>
										<span data-toolTip="Remove Question"></span>
									</button>
								</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		//  questionBank: state.employerReducer.questionBank.questions
		// questionBank: state.employerReducer,
		jobToUpdate: state.employerReducer.jobToUpdate,

		questionBank: state.employerReducer.questionBank.questions ? state.employerReducer.questionBank.questions
			.map((o) => {
				o.checked = false;
				if (!!o.option_choices && o.option_choices.length) {
					o.option_choices.sort(function (a, b) {
						const x = a["option_order"];
						const y = b["option_order"];
						return x > y ? 1 : x < y ? -1 : 0;
					});
				}
				return o;
			})
			.sort(function (a, b) {
				return new Date(b.created_on) - new Date(a.created_on);
			}) : []
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(JobSpecificQuestions);
