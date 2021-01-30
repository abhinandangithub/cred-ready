import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";
import { getQuestionBank, deleteQuestion } from "../../../../store/thunks/employer";
import { setQuestionBankQuestion, setNewJob, jobToUpdateArray } from "../../../../store/actions/employer";

import Input from "../../../_Elements/Input";

import "./index.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Spinner from "../../../_Elements/Spinner";

let scrollBarStyle = {
	width: "100%",
	height: "450px",
};
function QuestionsLibrary(props) {
	const dispatch = useDispatch();
	const [isEditing, toggleEditing] = useReducer((editing) => !editing, false);
	const [questionBanks, setQuestionBanks] = useState(props.questionBank);
	const [questionToSave, setQuestionToSave] = useState(props.questionsSelected);

	const [questionToSaveTemp, setQuestionToSaveTemp] = useState(props.questionsSelected);
	const createNewQuestion = () => {
		dispatch(togglePopup([true, "createNewQuestion", { type: "private" }]));
	};

	useEffect(() => {
		setQuestionToSaveTemp(props.questionsSelected)
	}, [props.questionsSelected]);

	useEffect(() => {
		dispatch(getQuestionBank());
	}, [dispatch]);

	useEffect(() => {
		// dispatch(setQuestionBankQuestion(questionToSave));
		// dispatch(setNewJob({ jobQuestionnaireMap: questionToSave }));
	}, [questionToSave]);

	useEffect(() => {
		//	dispatch(setNewJob({ jobQuestionnaireMap: props.questionsSelected }));
	}, [props.questionsSelected]);

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
			if (questionToSaveTemp.length !== 0) {
				let temp = questionToSaveTemp.find((x) => x.question_id == event.target.id);
				console.log("baby temp ", temp);
				if (!!temp) {
					// questionToSave.push(question);
					// setQuestionToSave((prev) => {
					// 	return [...prev, question];
					// });
					// setQuestionToSaveTemp((prev) => {
					// 	return [...prev, question];
					// });
				} else {
					setQuestionToSaveTemp((prev) => {
						return [...prev, question];
					});
				}
			} else {
				// questionToSave.push(question);
				// setQuestionToSave((prev) => {
				// 	return [...prev, question];
				// });
				setQuestionToSaveTemp((prev) => {
					return [...prev, question];
				});
			}
		} else {
			let temp = questionToSaveTemp.filter((val) => {
				if (val.question_id != event.target.id) {
					return val;
				}
			});
			// setQuestionToSave(temp);
			setQuestionToSaveTemp(temp);
		}

		let temp = questionBanks.map((o) => {
			if (question.question_id === o.question_id) o.checked = question.checked;
			return o;
		});

		setQuestionBanks(temp);
	};

	const handleQuestionAdd = () => {
		console.log("baby ", questionToSaveTemp);
		// dispatch(setQuestionBankQuestion(questionToSave));
		// dispatch(setNewJob({ jobQuestionnaireMap: questionToSave }));
		// dispatch(createQuestion({
		// 	"category": "Employer Questions",
		// 	"forPublicReview": true,
		// 	"jobTitle": "CNA",
		// 	"questionName": "How would you define yourself?",
		// 	"questionType": "text-input"
		// }));
		// dispatch(toggleOverlay(false));
		// dispatch(togglePopup([false, "addNewQuestion"]));
		// setQuestionToSave(questionToSaveTemp);
		dispatch(setQuestionBankQuestion(questionToSaveTemp));
		dispatch(setNewJob({ jobQuestionnaireMap: questionToSaveTemp }));
		if (!!props.jobToUpdate) {
			let temp = props.jobToUpdate;
			dispatch(jobToUpdateArray({ ...temp, questions: questionToSaveTemp }));
		}
		dispatch(toggleOverlay(false));
		dispatch(togglePopup([false, "addNewQuestion"]));
	};

	const handleEdit = (e, question) => {
		dispatch(togglePopup([true, "createNewQuestion", { type: "private", action: "edit", question: question }]));
	};
	const handleDelete = (e, question) => {
		// dispatch(toggleOverlay(true));
		// dispatch(togglePopup([true, "delete", { what: "deleteQuestion" }]));
		// dispatch(toggleOverlay(true));
		// alert("Are you sure to delete this question?");

		dispatch(toggleOverlay(true));
		dispatch(
			togglePopup([
				true,
				"delete",
				{
					what: "question",
					question_id: question.question_id,
					questionToSaveTemp: questionToSaveTemp,
					question: question,
				},
			])
		);

		//let choice = window.confirm("Are you sure you want to delete this question?");

		//if (choice) {
		//dispatch(deleteQuestion(question.question_id));
		// setQuestionBanks(props.questionBank.filter((val) => val.question_id !== question.question_id));
		// let temp = questionToSaveTemp.filter((val) => {
		// 	if (val.question_id != question.question_id) {
		// 		return val;
		// 	}
		// });
		// setQuestionToSave(temp);
		// setQuestionToSaveTemp(temp);
		// dispatch(setQuestionBankQuestion(questionToSave));
		// dispatch(setQuestionBankQuestion(temp));

		//dispatch(setNewJob({ jobQuestionnaireMap: questionToSaveTemp }));
		//}
	};

	const handleJobTitleSearch = (searchJobTitle) => {
		setQuestionBanks(
			props.questionBank.filter((val) => val.question_name.toLowerCase().includes(searchJobTitle.toLowerCase()))
		);
	};

	return (
		<div className={`questions_library ${isEditing ? "isEditing" : ""}`}>
			<div className="heading_type_2">
				<div className="left">
					<h1>Question Library</h1>
					<p className="description">Click on any question to select and add them to your job post</p>
				</div>
				<div className="right">
					<div className="search-panel">
						<div className="searches">
							<input
								type="text"
								placeholder="Type to Search Questions"
								onChange={(e) => {
									handleJobTitleSearch(e.target.value);
								}}
							/>
							{/* <input type="text" placeholder="Skills" /> */}
						</div>
					</div>
				</div>
			</div>

			<div className="content">
				<Scrollbars
					className="custom-scrollbar"
					style={scrollBarStyle}
					// autoHide
					autoHideTimeout={1000}
					autoHideDuration={600}
					renderTrackVertical={({ style, ...props }) => (
						<div
							{...props}
							className="bar"
							style={{
								...style,
							}}
						/>
					)}
				>
					{props.loading ? (
						<Spinner />
					) : (
							<ul className="general-questions">
								{questionBanks.map((question, i) => {
									return (
										<li
											className="general-question"
											key={i}
											onClick={(e) => {
												if (!isEditing) {
													let target = e.target;
													let parent = target.closest("li");
													let label = parent.querySelector(".options + input + label");
													let input = parent.querySelector(".options + input + label .input");

													if (target === input || target === label) return;

													label.click();
												}
											}}
										>
											<h2 className="question">{question.question_name}</h2>
											<div className="options">
												{question.question_type === "text-input" ? (
													<>
														<Input type="text" disabled />
														<label htmlFor="question3">
															<span className="input"></span>
														</label>

														{/* <FontAwesomeIcon
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
											/> */}
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
																		<label htmlFor={`${option.id}${option.question_id}`}>
																			{option.option_choice_name}
																		</label>
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
											<span className="grean_highlight"></span>

											{isEditing && (
												<>
													<FontAwesomeIcon
														className="action-btn edit"
														icon={faPen}
														onClick={(e) => handleEdit(e, question)}
													/>
													<FontAwesomeIcon
														className="action-btn delete"
														icon={faTrash}
														onClick={(e) => handleDelete(e, question)}
													/>{" "}
												</>
											)}
										</li>
									);
								})}
							</ul>
						)}
				</Scrollbars>

				<div className="cta">
					{!isEditing ? (
						<p
							className="common_underline_link"
							onClick={toggleEditing}
							data-toolTip="Edit/delete questions from the question library"
						>
							Edit Questions
						</p>
					) : (
							<p></p>
						)}

					<button
						className="primary-btn blue"
						onClick={() => {
							if (isEditing) {
								toggleEditing();
							} else {
								handleQuestionAdd();
							}
						}}
					>
						Done
					</button>
				</div>
			</div>
		</div>
	);
}

// export default QuestionsLibrary;

function mapStateToProps(state) {
	return {
		questionBank: state.employerReducer.questionBank.data.private_question_bank
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
			// .sort(function (a, b) {
			// 	const x = a["question_id"];
			// 	const y = b["question_id"];
			// 	return x < y ? 1 : x > y ? -1 : 0;
			// }),
			.sort(function (a, b) {
				return new Date(b.created_on) - new Date(a.created_on);
			}),
		questionsSelected: state.employerReducer.questionBank.questions
			? state.employerReducer.questionBank.questions.map((o) => {
				o.checked = true;
				return o;
			})
			: [],
		jobToUpdate: state.employerReducer.jobToUpdate,
		loading: state.commonReducer.apiCallsInProgress,
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(QuestionsLibrary);
