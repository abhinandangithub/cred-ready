import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";

import "./index.scss";
import GeneralQuestions from "./GeneralQuestions";
import PersonalityAssessment from "./PersonalityAssessment";
import CourseWork from "./CourseWork";
import WorkHistory from "./WorkHistory";
import CommuteQuestions from "./CommuteQuestions";
import EmployerQuestions from "./EmployerQuestions";
import { useDispatch, useSelector, connect } from "react-redux";
import {
	fetchAllAnswers,
	fetchJobDescription,
	fetchAllCertificateTitles,
	fetchCandidateDegreeTitles,
	submitCandidateAnswers,
	fetchCandidateDetails,
} from "../../../../modals/candidateProfile/thunk";
import Spinner from "../../../_Elements/Spinner";
import { findIndexOfObjInArr } from "../../../../assets/js/Utility";
import { formatDate } from "../../../../assets/js/Utility";
import { showToast } from "../../../../store/actions/toast";
import { Prompt } from "react-router";

import { initRadioClick } from "../../../../assets/js/Utility";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};

let scrollHeights = [];
/* type="general_questions", q="question_id", a="answer" */
export const isAnswer = (data, q, a) => {
	let answer = false;
	data &&
		data.forEach((ques) => {
			if (q === ques.question_id) {
				if (Array.isArray(a)) {
					// answer = ques.answer.includes(a[0]);
				} else if (typeof a === "object") {
					if (a.sub_question_id_2) {
						let i = findIndex(ques.answer, a.sub_question_id_2);
						if (i > -1) {
							answer = a.sub_answer === ques.answer[i].sub_answer;
						}
					} else if (a.sub_answer) {
						answer = a.sub_answer === ques.sub_answer;
					} else if (a.sub_question_id) {
						let i = findIndex(ques.answer, a.sub_question_id);
						if (i > -1) {
							answer = a.sub_question_id === ques.answer[i].sub_question_id;
						}
					}
				} else if (a === ques.answer) {
					answer = true;
				}
			}
		});
	return answer;
};

/* type="general_questions", q="question_id" */
export const findIndex = (arr, q) => {
	let index = -1;
	arr.forEach((ques, i) => {
		if (ques.question_id === q) {
			index = i;
		} else if (ques.sub_question_id === q) {
			index = i;
		}
	});
	return index;
};

function Questions(props) {
	const dispatch = useDispatch();
	const loading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const jobData = useSelector((state) => state.setJobDescriptionReducer.data);
	const [employerAnswer, setEmployerAnswer] = useState();
	const allAnswersData = useSelector((state) =>
		state.setCandidateAllAnswersReducer.data
			? state.setCandidateAllAnswersReducer.data
			: []
	);

	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);
	const [clientWidth, setclientWidth] = React.useState(
		document.body.clientWidth
	);
	const [isClicked, setIsClicked] = React.useState(false);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
		setIsClicked(true);
		setActiveTab(i);
		let scrollTo = heights[i] + i * 30;
		scrollBar.current.view.scroll({
			top: scrollTo,
			behavior: "smooth",
		});
	};

	const calHeight = (height) => {
		let lastHeight = heights[heights.length - 1];
		heights.push(lastHeight + height);
		scrollHeights = [];
		calScrollHeight();
	};

	const calScrollHeight = () => {
		for (let i = 0; i < heights.length; i++) {
			scrollHeights.push(heights[i] + i * 30);
		}
	};

	const handleScrolling = (e) => {
		let t = e.target.scrollTop;
		if (!isClicked) {
			for (let i = 0; i < scrollHeights.length; i++) {
				if (t > scrollHeights[i] && t < scrollHeights[i + 1]) {
					setActiveTab(i);
				} else if (t > scrollHeights[scrollHeights.length - 1]) {
					setActiveTab(scrollHeights.length - 1);
				}
			}
		}
	};

	const handleScrollStop = () => {
		setIsClicked(false);
	};

	const empQuestions = jobData ? jobData.questions && jobData.questions.map((o) => {
		o.checked = false;
		if (!!o.option_choices && o.option_choices.length) {
			o.option_choices.sort(function (a, b) {
				const x = a["option_order"];
				const y = b["option_order"];
				return x > y ? 1 : x < y ? -1 : 0;
			})
		}
		return o
	}).sort(function (a, b) {
		const x = a["question_id"];
		const y = b["question_id"];
		return x < y ? 1 : x > y ? -1 : 0;
	}) : [];

	const empQuestionFormat =
		empQuestions &&
		empQuestions.map((entity) => {
			if (entity.question_type === "text-input") {
				return {
					question_id: entity.question_id,
					answer: "",
					type: undefined,
				};
			} else {
				return {
					question_id: entity.question_id,
					answer: [],
					type: entity.option_choices[0].question_type,
				};
			}
		});

	let _formData = {
		general_questions: [
			{
				question_id: 1,
				answer: "",
			},

			{
				question_id: 2,
				answer: "",
			},

			{
				question_id: 3,
				answer: "",
			},

			{
				question_id: 4,
				answer: "",
			},

			{
				question_id: 5,
				answer: "",
			},

			{
				question_id: 6,
				answer: "",
				sub_answer: "",
				followup_sub_answer: "",
			},
		],

		personality_assessment: [
			{
				question_id: 1,
				answer: "",
			},

			{
				question_id: 2,
				answer: "",
			},

			{
				question_id: 3,
				answer: "",
			},

			{
				question_id: 4,
				answer: "",
			},

			{
				question_id: 5,
				answer: "",
			},

			{
				question_id: 6,
				answer: "",
			},

			{
				question_id: 7,
				answer: "",
			},

			{
				question_id: 8,
				answer: "",
			},

			{
				question_id: 9,
				answer: "",
			},

			{
				question_id: 10,
				answer: "",
			},

			{
				question_id: 11,
				answer: "",
			},

			{
				question_id: 12,
				answer: "",
			},

			{
				question_id: 13,
				answer: "",
			},

			{
				question_id: 14,
				answer: "",
			},

			{
				question_id: 15,
				answer: "",
			},

			{
				question_id: 16,
				answer: "",
			},
		],

		coursework: [
			{
				question_id: 1,
				answer: "",
			},

			{
				question_id: 2,
				answer: [
					// {
					// 	sub_question_id: 1,
					// 	sub_answer: "",
					// }
				],
			},

			{
				question_id: 3,
				answer: "",
			},

			{
				question_id: 4,
				answer: [
					// {
					// 	sub_question_id: 1,
					// 	sub_answer: "",
					// }
				],
			},

			{
				question_id: 5,
				answer: "",
			},
		],

		work_history: [
			{
				question_id: 1,
				answer: 0,
			},
			{
				question_id: 2,
				answer: 0,
			},
			{
				question_id: 3,
				answer: "",
			},
			{
				question_id: 4,
				answer: "",
			},
		],

		commute: [
			{
				question_id: 1,
				answer: {},
			},
			{
				question_id: 2,
				answer: "",
			},
			{
				question_id: 3,
				answer: {
					street_0: "",
					city_0: "",
					state_0: "",
					zip_0: "",
				},
			},
		],

		employer_questions: [],
	};
	const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);

	const [formData, setFormData] = React.useState(_formData);

	const fetchAnswers = (type) => {
		if (type === "commute") {
			let commute = JSON.parse(
				allAnswersData &&
				allAnswersData.length > 0 &&
				allAnswersData[findIndexOfObjInArr(allAnswersData, "category", type)]
					.answer
			);

			let newCommute = [];
			let obj = {};
			obj.question_id = 1;
			obj.answer = commute[0]
				? {
					city: commute[0] && commute[0].answer && commute[0].answer.city,
					state: commute[0] && commute[0].answer.state,
					street: commute[0] && commute[0].answer.street,
					zip: commute[0] && commute[0].answer.zip,
				}
				: {};
			newCommute.push(obj);

			obj = {};
			obj.question_id = 2;
			obj.answer = commute[1] && commute[1].answer.length > 0 ? 1 : 2;
			newCommute.push(obj);

			obj = {};
			obj.question_id = 3;
			obj.answer = {};
			let length = commute[1] && commute[1].answer.length;
			for (let i = 0; i < length; i++) {
				obj.answer[`city_${i}`] = commute[1].answer[i].city;
				obj.answer[`street_${i}`] = commute[1].answer[i].street;
				obj.answer[`state_${i}`] = commute[1].answer[i].state;
				obj.answer[`zip_${i}`] = commute[1].answer[i].zip;
			}
			newCommute.push(obj);
			console.log("newCommute", newCommute);
			return newCommute.length > 0 ? newCommute : _formData[type];
		} else {
			let obj = JSON.parse(
				allAnswersData &&
				allAnswersData.length > 0 &&
				allAnswersData[findIndexOfObjInArr(allAnswersData, "category", type)]
					.answer
			);

			if (type === "general_questions" && obj[0] === "string") {
				obj[0].answer = JSON.stringify(new Date(obj[0].answer)).slice(1, 11);
			}
			type = type === "jWorkHistory" ? "work_history" : type;
			return obj.length > 0 ? obj : _formData[type];
		}
	};
	React.useEffect(() => {
		if (!!allAnswersData && allAnswersData.length) {
			console.log("zzzzzz");
			_formData.general_questions = fetchAnswers("general_questions");
			checkForGQValidation();
			_formData.personality_assessment = fetchAnswers("personality_assessment");
			checkForPQValidation();
			_formData.coursework = fetchAnswers("coursework");
			checkForCQValidation();
			_formData.work_history = fetchAnswers("jWorkHistory");
			checkForWQValidation();
			_formData.commute = fetchAnswers("commute");
			checkForWCOQValidation();
			_formData.employer_questions = empQuestionFormat;
			// checkForEQValidation();
		} else {
			_formData.employer_questions = empQuestionFormat;
		}

		/* Add address obj if not present */
		if (_formData.commute.length > 0 && findIndex(_formData.commute, 3) < 0) {
			_formData.commute[2] = {
				question_id: 3,
				answer: {
					street_0: "",
					city_0: "",
					state_0: "",
					zip_0: "",
				},
			};
		}
		setFormData(_formData);
	}, [allAnswersData, jobData]);

	/* type="general_questions", q="question_id" a="answer" */
	const handleFieldChange = (type, q, a) => {
		// handleValidations(type, q, a);
		let _formData = { ...formData };

		let i = findIndex(_formData[type], q);

		if (Array.isArray(a)) {
			let index = _formData[type][i]["answer"].indexOf(a[0]);
			// if (type === "employer_questions") {
			// 	_formData[type][i]["answer"][0] = a[0];
			// 	_formData[type][i]["required"] = false;
			// } else
			// {
			if (index > -1) {
				_formData[type][i]["answer"].splice(index, 1);
			} else {
				_formData[type][i]["answer"].push(a[0]);
			}
			// }
		} else if (typeof a === "object") {
			if (a.sub_question_id_2) {
				let index = findIndex(formData[type][i].answer, a.sub_question_id_2);
				_formData[type][i]["answer"][index].sub_answer = a.sub_answer;
				_formData[type][i]["answer"][index]["required"] = false;
			} else if (a.sub_answer) {
				_formData[type][i]["sub_answer"] = a.sub_answer;
				_formData[type][i]["required"] = false;
			} else if (a.sub_question_id) {
				let obj = {
					sub_question_id: a.sub_question_id,
					sub_answer: null,
					required: true,
				};

				let index = findIndex(formData[type][i].answer, a.sub_question_id);
				if (index > -1) {
					_formData[type][i]["answer"].splice(index, 1);
				} else {
					_formData[type][i]["answer"].push(obj);
				}
			} else if (a.address) {
				_formData[type][i]["answer"][a.address] = a.value;
			}
		} else {
			if (type === "general_questions" && typeof a === "string") {
				if (q === 6) {
					_formData[type][i]["followup_sub_answer"] = formatDate(
						new Date(a),
						"yyyy-mm-dd"
					);
				} else if (q === 1) {
					// _formData[type][i]["answer"] = formatDate(new Date(a), "yyyy-mm-dd");
					_formData[type][i]["answer"] =
						a === "" ? a : formatDate(new Date(a), "yyyy-mm-dd");
				}
			} else if (type === "personality_assessment") {
				_formData[type][i]["answer"] = a;
				_formData[type][i]["required"] = false;
			} else {
				_formData[type][i]["answer"] = a;
				!!a
					? (_formData[type][i]["required"] = false)
					: (_formData[type][i]["required"] = true);
			}
		}

		setFormData(_formData);
	};

	const handleFieldChangeEQuestions = (type, q, a, isChecked) => {
		let _formData = { ...formData };
		let i = findIndex(_formData[type], q);
		console.log("abhi zzz ", _formData[type][i], a, isChecked);

		if (!!a && a.length) {
			_formData[type][i]["required"] = false;
		} else {
			_formData[type][i]["required"] = true;
		}
		if (_formData[type][i]["type"] == "multiple") {
			if (isChecked) {
				_formData[type][i]["answer"].push(a[0]);
			} else {
				let temp = _formData[type][i]["answer"].filter((id) => id != a[0]);
				_formData[type][i]["answer"] = temp;
				if (!!temp && !temp.length) _formData[type][i]["required"] = true;
			}
		} else {
			_formData[type][i]["answer"] = a;
		}
		setFormData(_formData);
	};

	const onSubmitHandler = () => {
		let isFormValid = true;

		formData["commute"][0].answer = {
			street: formData["commute"][0].answer.street
				? formData["commute"][0].answer.street
				: "",
			city: formData["commute"][0].answer.city
				? formData["commute"][0].answer.city
				: "",
			state: formData["commute"][0].answer.state
				? formData["commute"][0].answer.state
				: "",
			zip: formData["commute"][0].answer.zip
				? formData["commute"][0].answer.zip
				: "",
		};

		Object.keys(formData).map((key) => {
			if (
				key === "coursework" ||
				key === "general_questions" ||
				key === "personality_assessment" ||
				key === "commute" ||
				(key === "work_history" && formData[key][0].answer) ||
				key === "employer_questions"
			) {
				formData[key] &&
					formData[key].forEach((question, index) => {
						if (Array.isArray(question.answer)) {
							if (key === "work_history") {
								question.required = false;
							}
							if (key === "coursework") {
								if (formData[key][index - 1].answer === 2) {
									question.required = false;
								} else {
									if (question.answer && question.answer.length) {
										question.answer.forEach((subQues) => {
											if (!!subQues.sub_answer) {
												subQues.required = false;
											} else {
												question.required = true;
												subQues.required = true;
												isFormValid = false;
											}
										});
									} else {
										question.required = true;
										isFormValid = false;
									}
								}
							} else {
								if (question.answer.length) {
									question.required = false;
								} else {
									question.required = true;
									isFormValid = false;
								}
							}
						} else if (
							typeof question.answer === "object" &&
							question.answer.length
						) {
							question.answer.forEach((subQues) => {
								if (!!subQues.sub_answer) {
									subQues.required = false;
								} else {
									question.required = true;
									subQues.required = true;
									isFormValid = false;
								}
							});
						} else {
							if (key === "personality_assessment") {
								if (question.answer > -1) {
									question.required = false;
								} else {
									question.required = true;
									isFormValid = false;
								}
							}
							else if (!!question.answer) {
								question.required = false;
							} else {
								question.required = true;
								isFormValid = false;
							}
						}
						// Update the state with error variable and show required error in GeneralQuestions.js
						setFormData({
							...formData,
							[key]: formData[key],
						});
					});
			}
		});

		let scrollToEl = document.querySelectorAll(".error-text:not(.hidden)")[0]
			? document
				.querySelectorAll(".error-text:not(.hidden)")[0]
				.closest(".general-question")
			: null;

		const isMobileView =
			getComputedStyle(document.querySelector(".outer .left")).display ===
			"none";

		if (scrollToEl) {
			scrollToEl.scrollIntoView();
			if (isMobileView) {
				window.scrollBy(0, -70);
			}
		}

		let isFormValid_1 =
			generalQuestionValidation &&
			personalQuestionValidation &&
			courseQuestionValidation &&
			checkForWQValidation() &&
			commuteQuestionValidation &&
			checkForEQValidation();

		// if (isFormValid) {
		if (isFormValid_1) {
			var _commute = _formData.commute;
			_commute.pop();

			Object.size = function (obj) {
				var size = 0,
					key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};

			let totalAddresses = Object.size(formData.commute[2].answer) / 4;
			let addressArr = [];
			if (formData.commute[0].answer) {
				if (
					!formData.commute[0].answer.city ||
					!formData.commute[0].answer.street ||
					!formData.commute[0].answer.state ||
					!formData.commute[0].answer.zip
				)
					isFormValid = false;
			}
			if (formData.commute[1].answer === 1) {
				if (totalAddresses) {
					for (let i = 0; i < totalAddresses; i++) {
						let addressObj = {};
						if (
							!formData.commute[2].answer[`city_${i}`] ||
							!formData.commute[2].answer[`street_${i}`] ||
							!formData.commute[2].answer[`state_${i}`] ||
							!formData.commute[2].answer[`zip_${i}`]
						)
							isFormValid = false;
						addressObj.city = formData.commute[2].answer[`city_${i}`];
						addressObj.street = formData.commute[2].answer[`street_${i}`];
						addressObj.state = formData.commute[2].answer[`state_${i}`];
						addressObj.zip = formData.commute[2].answer[`zip_${i}`];
						addressArr.push(addressObj);
					}
				} else {
					isFormValid = false;
				}
			}
			_commute[0].answer = formData.commute[0].answer;
			_commute[1].answer = addressArr;
			// if (isFormValid) {
			if (true) {
				let formDataCommute = { ...formData };
				formDataCommute.commute = _commute;
				// if (!formDataCommute.employerAnswer) {
				// 	formDataCommute.employerQuestion = [];
				// }
				console.log(JSON.stringify("sachin", formDataCommute.employerAnswer));
				const localStorageId = localStorage.getItem("jobId");
				if (!localStorageId && !props.match.params.id) return;
				if (localStorageId)
					formDataCommute.job_id = localStorage.getItem("jobId");
				else formDataCommute.job_id = props.match.params.id;

				dispatch(submitCandidateAnswers(formDataCommute, props));
			}
		} else {
			setTimeout(() => {
				let scrollToEl = document.querySelectorAll(
					".error-text:not(.hidden)"
				)[0];
				const isMobileView =
					getComputedStyle(document.querySelector(".outer .left")).display ===
					"none";

				if (scrollToEl) {
					var scrollToElParent =
						scrollToEl.closest(".general-question") ||
						scrollToEl.closest(".ul_1");
				}

				if (scrollToElParent) {
					scrollToElParent.scrollIntoView();
					if (isMobileView) {
						window.scrollBy(0, -70);
					}
				}
				console.log(isMobileView, scrollToEl, scrollToElParent);
			});
			dispatch(
				showToast({
					message: "Please fill all the required fields",
					type: "warning",
					isShow: true,
				})
			);
		}
	};

	const handleResize = (e) => {
		setclientWidth(document.body.clientWidth);
	};

	React.useEffect(() => {
		// initRadioClick();

		if (props.match.params.id) {
			dispatch(fetchJobDescription(props.match.params.id));
		}
		if (localStorage.getItem("jobId")) {
			dispatch(fetchJobDescription(localStorage.getItem("jobId")));
		}
		dispatch(fetchAllAnswers());
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchCandidateDetails());

		window.scrollTo(0, 0);

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleAddress = (_addressCount) => {
		/* update form values as well */
		setCommuteQuestionValidation(false);
		let i = _addressCount.length - 1;
		let _formData = { ...formData };
		let j = findIndex(_formData["commute"], 3);

		_formData["commute"][j]["answer"][`street_${i}`] = "";
		_formData["commute"][j]["answer"][`city_${i}`] = "";
		_formData["commute"][j]["answer"][`state_${i}`] = "";
		_formData["commute"][j]["answer"][`zip_${i}`] = "";
		setFormData(_formData);
	};

	const [generalQuestionValidation, setGeneralQuestionValidation] = useState(
		false
	);
	const checkForGQValidation = () => {
		let _formData = { ...formData };
		for (let i = 0; i < _formData.general_questions.length - 1; i++) {
			if (!_formData.general_questions[i].answer) {
				setGeneralQuestionValidation(false);
				return false;
			}
		}
		setGeneralQuestionValidation(true);
		return true;
	};

	const [personalQuestionValidation, setPersonalQuestionValidation] = useState(
		false
	);
	const checkForPQValidation = () => {
		let _formData = { ...formData };
		for (let i = 0; i < _formData.personality_assessment.length; i++) {
			if (_formData.personality_assessment[i].answer < -1) {
				setPersonalQuestionValidation(false);
				return false;
			}
		}
		setPersonalQuestionValidation(true);
		return true;
	};

	const [courseQuestionValidation, setCourseQuestionValidation] = useState(
		false
	);
	const checkForCQValidation = () => {
		let _formData = { ...formData };
		if (_formData.coursework[0].answer) {
			if (_formData.coursework[0].answer === 1) {
				if (_formData.coursework[1].answer.length) {
					for (let i = 0; i < _formData.coursework[1].answer.length; i++) {
						if (!_formData.coursework[1].answer[i].sub_answer) {
							setCourseQuestionValidation(false);
							return false;
						}
					}
				} else {
					setCourseQuestionValidation(false);
					return false;
				}
			}
		} else {
			setCourseQuestionValidation(false);
			return false;
		}

		if (_formData.coursework[2].answer) {
			if (_formData.coursework[2].answer === 1) {
				if (_formData.coursework[3].answer.length) {
					for (let i = 0; i < _formData.coursework[3].answer.length; i++) {
						if (!_formData.coursework[3].answer[i].sub_answer) {
							setCourseQuestionValidation(false);
							return false;
						}
					}
				} else {
					setCourseQuestionValidation(false);
					return false;
				}
			}
		} else {
			setCourseQuestionValidation(false);
			return false;
		}

		if (!_formData.coursework[4].answer) {
			setCourseQuestionValidation(false);
			return false;
		}

		setCourseQuestionValidation(true);
		return true;
	};

	const [workQuestionValidation, setWorkQuestionValidation] = useState(false);
	const checkForWQValidation = () => {
		let _formData = { ...formData };
		if (_formData.work_history[0].answer) {
			for (let i = 2; i < _formData.work_history.length; i++) {
				if (!_formData.work_history[i].answer) {
					setWorkQuestionValidation(false);
					return false;
				}
			}
			setWorkQuestionValidation(true);
			return true;
		} else {
			setWorkQuestionValidation(true);
			return true;
		}
	};

	const [commuteQuestionValidation, setCommuteQuestionValidation] = useState(
		false
	);
	const checkForWCOQValidation = () => {
		let _formData = { ...formData };
		if (
			_formData.commute[0].answer &&
			Object.keys(_formData.commute[0].answer).length === 4
		) {
			let { street, city, state, zip } = _formData.commute[0].answer;
			if (!!street && !!city && !!state && !!zip) {
				if (!zip.match(/^\d+$/)) {
					setCommuteQuestionValidation(false);
					return false;
				}
			} else {
				setCommuteQuestionValidation(false);
				return false;
			}
		} else {
			setCommuteQuestionValidation(false);
			return false;
		}
		if (_formData.commute[1].answer) {
			if (_formData.commute[1].answer === 1) {
				let keys = Object.keys(_formData.commute[2].answer);
				if (_formData.commute[2].answer && keys.length) {
					for (let i = 0; i < keys.length; i++) {
						if (!_formData.commute[2].answer[keys[i]]) {
							setCommuteQuestionValidation(false);
							return false;
						} else {
							if (
								keys[i].indexOf("zip") > -1 &&
								!_formData.commute[2].answer[keys[i]].match(/^\d+$/)
							) {
								setCommuteQuestionValidation(false);
								return false;
							}
						}
					}
					setCommuteQuestionValidation(true);
					return true;
				} else {
					setCommuteQuestionValidation(false);
					return false;
				}
			} else {
				setCommuteQuestionValidation(true);
				return true;
			}
		} else {
			setCommuteQuestionValidation(false);
			return false;
		}
	};

	const [employerQuestionValidation, setEmployerQuestionValidation] = useState(
		false
	);
	const checkForEQValidation = () => {
		let _formData = { ...formData };
		console.log("abhi coursework ", _formData.employer_questions);
		if (!!_formData.employer_questions && _formData.employer_questions.length) {
			for (let i = 0; i < _formData.employer_questions.length; i++) {
				if (!_formData.employer_questions[i].answer) {
					setEmployerQuestionValidation(false);
					return false;
				} else {
					let ans = _formData.employer_questions[i].answer;
					if (Array.isArray(ans)) {
						if (!ans.length) {
							setEmployerQuestionValidation(false);
							return false;
						}
					}
				}
			}
			setEmployerQuestionValidation(true);
			return true;
		}
		setEmployerQuestionValidation(true);
		return true;
	};

	const renderContent = (
		<>
			<GeneralQuestions
				calHeight={calHeight}
				data={formData.general_questions}
				onchange={(q, a) => {
					handleFieldChange("general_questions", q, a);
					checkForGQValidation();
				}}
			/>
			<PersonalityAssessment
				calHeight={calHeight}
				data={formData.personality_assessment}
				onchange={(q, a) => {
					handleFieldChange("personality_assessment", q, a);
					checkForPQValidation();
				}}
			/>
			<CourseWork
				calHeight={calHeight}
				data={formData.coursework}
				onchange={(q, a) => {
					handleFieldChange("coursework", q, a);
					checkForCQValidation();
				}}
			/>
			<WorkHistory
				calHeight={calHeight}
				data={formData.work_history}
				onchange={(q, a) => {
					handleFieldChange("work_history", q, a);
					checkForWQValidation();
				}}
			/>
			<CommuteQuestions
				calHeight={calHeight}
				data={formData.commute}
				onchange={(q, a) => {
					handleFieldChange("commute", q, a);
					checkForWCOQValidation();
				}}
				newAddress={(count) => handleAddress(count)}
			/>
			{props.showEmployerQuestions && (
				<EmployerQuestions
					calHeight={calHeight}
					title={empQuestions && empQuestions.length > 0 ? true : false}
					data={formData.employer_questions}
					empQuestions={empQuestions}
					onchange={(q, a, isChecked) => {
						// handleFieldChange("employer_questions", q, a);
						handleFieldChangeEQuestions("employer_questions", q, a, isChecked);
						checkForEQValidation();
					}}
				/>
			)}
			<div className="cta">
				{/* <Link className="primary-btn blue" onClick={onSubmitHandler}>
					Submit
				</Link> */}
				<button className="primary-btn blue" onClick={onSubmitHandler}>
					View CredReadiness and apply next
				</button>
			</div>
		</>
	);

	return loading ? (
		<Spinner />
	) : (
			<>
				<Prompt
					when={shouldBlockNavigation}
					message="You have unsaved changes, are you sure you want to leave?"
				/>
				<div className="questions">
					{props.showEmployerQuestions ? (
						<h1 className="common-heading">You Are Applying For {jobData.job_title}</h1>
					) : (
							<h1 className="common-heading">Let Us Know More About You</h1>
						)}

					<div className="outer">
						<div className="left pc">
							<ul>
								<li
									className={`done ${activeTab === 0 ? "active" : ""}`}
									onClick={() => handleScroll(0)}
								>
									General Questions
								<span
										className={
											generalQuestionValidation ? "common-check-icon" : ""
										}
									></span>
								</li>
								<li
									className={`done ${activeTab === 1 ? "active" : ""}`}
									onClick={() => handleScroll(1)}
								>
									Your Personal Experiences{" "}
									<span
										className={
											personalQuestionValidation ? "common-check-icon" : ""
										}
									></span>
								</li>
								<li
									className={`done ${activeTab === 2 ? "active" : ""}`}
									onClick={() => handleScroll(2)}
								>
									Coursework{" "}
									<span
										className={
											courseQuestionValidation ? "common-check-icon" : ""
										}
									></span>
								</li>
								<li
									className={`done ${activeTab === 3 ? "active" : ""}`}
									onClick={() => handleScroll(3)}
								>
									Work History{" "}
									<span
										className={workQuestionValidation ? "common-check-icon" : ""}
									></span>
								</li>
								<li
									className={`done ${activeTab === 4 ? "active" : ""}`}
									onClick={() => handleScroll(4)}
								>
									Commute{" "}
									<span
										className={
											commuteQuestionValidation ? "common-check-icon" : ""
										}
									></span>
								</li>
								{props.showEmployerQuestions && (
									<li
										className={`done ${activeTab === 5 ? "active" : ""}`}
										onClick={() => handleScroll(5)}
									>
										{empQuestions && empQuestions.length > 0 ? "Employer Questions" : ""}{" "}
										<span
											className={
												employerQuestionValidation ? "common-check-icon" : ""
											}
										></span>
									</li>
								)}
							</ul>
						</div>
						<div className="right">
							<Scrollbars
								onScroll={handleScrolling}
								onScrollStop={handleScrollStop}
								ref={scrollBar}
								className="custom-scrollbar"
								style={scrollBarStyle}
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
								renderTrackHorizontal={({ style, ...props }) => (
									<div
										{...props}
										className="hbar"
										style={{
											...style,
										}}
									/>
								)}
							>
								{renderContent}
								{/* {clientWidth > 768 ? renderContent : null} */}
							</Scrollbars>

							{/* <div className="custom-scrollbar">
						<div>{clientWidth <= 768 ? renderContent : null}</div>
					</div> */}
						</div>
					</div>
				</div>
			</>
		);
}

function mapStateToProps(state) {
	return {
		filledAnswers: state.setCandidateAllAnswersReducer.data,
	};
}
export default connect(mapStateToProps)(Questions);
