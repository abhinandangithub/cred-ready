import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import Accordion from "../../../_Elements/Accordion";
import GeneralQuestions from "../../../Candidate/Jobs/Questions/GeneralQuestions";
import PersonalityAssessment from "../../../Candidate/Jobs/Questions/PersonalityAssessment";
import CourseWork from "../../../Candidate/Jobs/Questions/CourseWork";
import WorkHistory from "../../../Candidate/Jobs/Questions/WorkHistory";
import { getGeographyThunk } from "../../../../store/thunks/employer";
import CommuteQuestions from "../../../Candidate/Jobs/Questions/CommuteQuestions";
import EmployerQuestions from "../../../Candidate/Jobs/Questions/EmployerQuestions";
import {
	fetchAllCertificateTitles,
	fetchCandidateDetails,
	jobApply,
	fetchJobDescription,
	fetchAllAnswers,
	fetchCandidateCurrentStatus,
	fetchCandidateDegreeTitles,
	fetchjobViewData,
	updateReadiness,
} from "../../../../modals/candidateProfile/thunk";
import { Document, Page, pdfjs } from "react-pdf";
import { showToast } from "../../../../store/actions/toast";

import { findIndex } from "../Questions/index";
import {
	toggleOverlay,
	togglePopup,
} from "../../../../store/actions/popup_overlay";
import { findIndexOfObjInArr } from "../../../../assets/js/Utility";
import { formatDate } from "../../../../assets/js/Utility";
import Spinner from "../../../_Elements/Spinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Application = (props) => {
	const dispatch = useDispatch();
	const [numPages, setNumPages] = React.useState(null);
	const isLoading = useSelector(
		(state) => state.commonReducer.apiCallsInProgress
	);
	const jobData = useSelector((state) =>
		state.setJobDescriptionReducer.data
			? state.setJobDescriptionReducer.data
			: []
	);
	const geographyKeys = useSelector(state => state.employerReducer.geographyKeys);

	const userData = useSelector((state) => state.candidateSetDataReducer.data);
	const allCertificates = useSelector(
		(state) => state.setCandidateCertificateTitlesReducer.data
	);
	const status = useSelector((state) =>
		state.candidateCurrentStatusReducer
			? state.candidateCurrentStatusReducer.data
			: []
	);
	const degrees = useSelector(
		(state) => state.setCandidateDegreeTitlesReducer.data
	);
	const institutions = useSelector((state) =>
		state.setCandidateInstitutionTypeReducer
			? state.setCandidateInstitutionTypeReducer.data
			: []
	);

	const employerQuestions = useSelector((state) =>
		state.setCandidateJobViewDataReducer
			? state.setCandidateJobViewDataReducer.data
			: []
	);
	const allAnswersData = useSelector((state) =>
		state.setCandidateAllAnswersReducer.data
			? state.setCandidateAllAnswersReducer.data
			: []
	);

	const empQuestions =
		jobData.submittedAnswer && jobData.submittedAnswer.employerQuestions
			? jobData.submittedAnswer.employerQuestions
			: [];

	const showCertificate = (certificate) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "certificate", { certificate }]));
	};

	React.useEffect(() => {
		//	console.log('abhi zeepee ', allAnswersData);
	}, [allAnswersData]);

	const applicationEmployerQuestions = employerQuestions && employerQuestions.submittedAnswer &&
		employerQuestions.submittedAnswer.employerQuestions.map((o) => {
			o.checked = false;
			if (!!o.option_choices && o.option_choices.length) {
				o.option_choices.sort(function (a, b) {
					const x = a["option_order"];
					const y = b["option_order"];
					return x > y ? 1 : x < y ? -1 : 0;
				})
			}
			return o
		})
			.sort(function (a, b) {
				const x = a["question_id"];
				const y = b["question_id"];
				return x < y ? 1 : x > y ? -1 : 0;
			});

	const empQuestionFormat = applicationEmployerQuestions &&
		applicationEmployerQuestions.map((entity) => {
			if (entity.question_type === "text-input") {
				return {
					question_id: entity.question_id,
					answer: entity.candidate_answer && entity.candidate_answer.ans_text ? entity.candidate_answer.ans_text : "",
					type: undefined
				};
			} else {
				return {
					question_id: entity.question_id,
					answer:
						entity.candidate_answer && entity.candidate_answer.ans_option_choice &&
							entity.candidate_answer.ans_option_choice.length > 0
							? entity.candidate_answer.ans_option_choice
							: [],
					type: entity.option_choices[0].question_type
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
				followup_sub_answer: "2019-12-12",
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
					{
						sub_question_id: 1,
						sub_answer: "",
					},
					{
						sub_question_id: 3,
						sub_answer: "",
					},
				],
			},

			{
				question_id: 3,
				answer: 1,
			},

			{
				question_id: 4,
				answer: [
					{
						sub_question_id: 1,
						sub_answer: "",
					},
					{
						sub_question_id: 3,
						sub_answer: "",
					},
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
				answer: "",
			},
			{
				question_id: 2,
				answer: "",
			},
			{
				question_id: 3,
				answer: "09/10/18",
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
				answer: 1,
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
	const fetchAnswers = (type) => {
		if (type === "commute") {
			let commute = JSON.parse(
				allAnswersData &&
				allAnswersData.length > 0 &&
				allAnswersData[findIndexOfObjInArr(allAnswersData, "category", type)]
					.answer
			);
			// let commuteNew = [
			// 	{
			// 		question_id: 1,
			// 		answer: "My Address",
			// 	},
			// 	{
			// 		question_id: 2,
			// 		answer: [],
			// 	},
			// ];
			let newCommute = [];
			let obj = {};
			obj.question_id = 1;
			obj.answer = commute[0]
				? {
					city: commute[0] && commute[0].answer.city,
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
			return newCommute.length > 0 ? newCommute : _formData[type];
		}
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
	};

	React.useEffect(() => {
		if (!!allAnswersData && allAnswersData.length) {
			_formData.general_questions = fetchAnswers("general_questions");
			_formData.personality_assessment = fetchAnswers("personality_assessment");
			_formData.coursework = fetchAnswers("coursework");
			_formData.work_history = fetchAnswers("jWorkHistory");
			_formData.commute = fetchAnswers("commute");
			_formData.employer_questions = empQuestionFormat;
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

	const formDataFetched = {
		general_questions: fetchAnswers("general_questions"),
		personality_assessment: fetchAnswers("personality_assessment"),
		coursework: fetchAnswers("coursework"),
		workHistory: fetchAnswers("jWorkHistory"),
		commute: fetchAnswers("commute"),
		employer_questions: empQuestionFormat,
	};

	/* Add address obj if not present */

	if (
		formDataFetched.commute.length > 0 &&
		findIndex(formDataFetched.commute, 3) < 0
	) {
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
	const [formData, setFormData] = React.useState(_formData);

	/* type="general_questions", q="question_id" a="answer" */
	const handleFieldChange = (type, q, a) => {
		// handleValidations(type, q, a);
		props.updateButton();
		let _formData = { ...formData };

		let i = findIndex(_formData[type], q);

		if (Array.isArray(a)) {
			let index = _formData[type][i]["answer"].indexOf(a[0]);
			if (type === "employer_questions") {
				_formData[type][i]["answer"][0] = a[0];
				_formData[type][i]["required"] = false;
			} else {
				if (index > -1) {
					_formData[type][i]["answer"].splice(index, 1);
				} else {
					_formData[type][i]["answer"].push(a[0]);
				}
			}
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
		props.updateButton();
		let _formData = { ...formData };
		let i = findIndex(_formData[type], q);

		if (!!a && a.length) {
			_formData[type][i]["required"] = false;
		} else {
			_formData[type][i]["required"] = true;
		}
		if (_formData[type][i]['type'] == 'multiple') {
			if (isChecked) {
				_formData[type][i]["answer"].push(a[0]);
			} else {
				let temp = _formData[type][i]["answer"].filter((id) => id != a[0]);
				_formData[type][i]["answer"] = temp;
				if (!!temp && !temp.length)
					_formData[type][i]["required"] = true;
			}
		} else {
			_formData[type][i]["answer"] = a;
		}
		setFormData(_formData);
	};

	const calHeight = (height) => { };

	const checkForGQValidation = () => {
		let _formData = { ...formData };
		for (let i = 0; i < _formData.general_questions.length - 1; i++) {
			if (!_formData.general_questions[i].answer) {
				return false;
			}
		}
		return true;
	};

	const checkForPQValidation = () => {
		let _formData = { ...formData };
		for (let i = 0; i < _formData.personality_assessment.length; i++) {
			if (_formData.personality_assessment[i].answer < -1) {
				return false;
			}
		}
		return true;
	};

	const checkForCQValidation = () => {
		let _formData = { ...formData };
		if (_formData.coursework[0].answer) {
			if (_formData.coursework[0].answer === 1) {
				if (_formData.coursework[1].answer.length) {
					for (let i = 0; i < _formData.coursework[1].answer.length; i++) {
						if (!_formData.coursework[1].answer[i].sub_answer) {
							return false;
						}
					}
				} else {
					return false;
				}
			}
		} else {
			return false;
		}

		if (_formData.coursework[2].answer) {
			if (_formData.coursework[2].answer === 1) {
				if (_formData.coursework[3].answer.length) {
					for (let i = 0; i < _formData.coursework[3].answer.length; i++) {
						if (!_formData.coursework[3].answer[i].sub_answer) {
							return false;
						}
					}
				} else {
					return false;
				}
			}
		} else {
			return false;
		}

		if (!_formData.coursework[4].answer) {
			return false;
		}

		return true;
	};

	const checkForWQValidation = () => {
		let _formData = { ...formData };
		if (_formData.work_history[0].answer) {
			for (let i = 2; i < _formData.work_history.length; i++) {
				if (!_formData.work_history[i].answer) {
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	};

	const checkForWCOQValidation = () => {
		let _formData = { ...formData };
		if (
			_formData.commute[0].answer &&
			Object.keys(_formData.commute[0].answer).length === 4
		) {
			let { street, city, state, zip } = _formData.commute[0].answer;
			if (!!street && !!city && !!state && !!zip) {
				if (!zip.match(/^\d+$/)) {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
		if (_formData.commute[1].answer) {
			if (_formData.commute[1].answer === 1) {
				let keys = Object.keys(_formData.commute[2].answer);
				if (_formData.commute[2].answer && keys.length) {
					for (let i = 0; i < keys.length; i++) {
						if (!_formData.commute[2].answer[keys[i]]) {
							return false;
						} else {
							if (
								keys[i].indexOf("zip") > -1 &&
								!_formData.commute[2].answer[keys[i]].match(/^\d+$/)
							) {
								return false;
							}
						}
					}
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	};

	const handleClick = (status) => {

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
							if (!!question.answer) {
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

		let isFormValid_1 =
			checkForGQValidation() &&
			checkForPQValidation() &&
			checkForCQValidation() &&
			checkForWQValidation() &&
			checkForWCOQValidation();

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

			let totalAddresses = Object.size(formData.commute[2] && formData.commute[2].answer) / 4;
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
			if (true) {
				let formDataCommute = { ...formData };
				formDataCommute.commute = _commute;
				if (status === "update") {
					if (props.match.params.id) {
						dispatch(updateReadiness(formDataCommute, props.match.params.id));
						props.reset();
						props.resetUpdate();
					}
					else {
						dispatch(updateReadiness(formDataCommute, localStorage.getItem("jobId")));
						props.reset();
						props.resetUpdate();
					}
				} else {
					if (props.match.params.id) {
						dispatch(jobApply(props, formDataCommute, props.match.params.id));
						props.reset();
						props.resetUpdate();
					}
					else {
						dispatch(jobApply(props, formDataCommute, localStorage.getItem("jobId")));
						props.reset();
						props.resetUpdate();
					}
				}
			}
		} else {
			setTimeout(() => {
				let scrollToEl = document.querySelectorAll(
					".error-text:not(.hidden)"
				)[0];
				const isMobileView =
					getComputedStyle(document.querySelector(".checkMobile")).display ===
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
	}

	let AllEmpAnswers = useSelector(
		(state) => state.setCandidateJobViewDataReducer.data
	);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	React.useEffect(() => {
		// if (props.match.params.id) {
		// 	dispatch(fetchJobDescription(props.match.params.id));
		// }
		// if (localStorage.getItem("jobId")) {
		// 	dispatch(fetchJobDescription(localStorage.getItem("jobId")));
		// }
		// dispatch(fetchCandidateDetails());
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchCandidateDegreeTitles());
		dispatch(getGeographyThunk());
		dispatch(fetchCandidateCurrentStatus());
		dispatch(fetchAllAnswers());
		dispatch(
			fetchjobViewData(
				localStorage.getItem("jobId")
					? localStorage.getItem("jobId")
					: props.match.params.id
			)
		);
		window.scrollTo(0, 0);
	}, []);

	React.useEffect(() => {
		if (props.refresh && (typeof (props.refresh) !== "number") && props.refresh.includes("update")) {
			handleClick("update");
			//children function of interest
		}
		if (props.refresh === 1) {
			handleClick();
			//children function of interest
		}
	}, [props.refresh]);

	return isLoading ? (
		<Spinner />
	) : (
			<div className="application_page questions">
				<p className="checkMobile pc"></p>
				{/* <div className="heading">
				<h2>Preview</h2>
			</div> */}
				<div className="preview_info_job">
					<div className="content">
						{/* <div className="group">
						<div className="top">
							<h1>Resume</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								id="preview-edit"
								onClick={() =>
									props.history.push(
										`/profile/resume/${localStorage.getItem("jobId")
											? localStorage.getItem("jobId")
											: props.match.params.id
										}`
									)
								}
							/>
						</div>
						<div className="bottom">
							<p>
								<Link
									to={`/profile/resume/${localStorage.getItem("jobId")
										? localStorage.getItem("jobId")
										: props.match.params.id
										}`}
								>
									{userData.resume_name ? userData.resume_name : "Not Found"}
								</Link>
							</p>
						</div>
					</div> */}
						{/* <div className="group">
						<div className="top">
							<h1></h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								id="preview-edit"
								onClick={() =>
									props.history.push(
										`/profile/personal-details/${localStorage.getItem("jobId")
											? localStorage.getItem("jobId")
											: props.match.params.id
										}`
									)
								}
							/>
						</div>
						<div className="bottom">
							<p>First Name : {userData.first_name}</p>
							<p>Last Name : {userData.last_name}</p>
							<p>
								Current employment status :{" "}
								{status.map((entity) => {
									if (entity.id === userData.current_employment_status)
										return entity.employment_status;
								})}
							</p>
							<p>
								How long would you begin a new role? :{" "}
								{userData.available_within}
							</p>
						</div>
					</div> */}
						<div className="group">
							<div className="top">
								<h1>Work Experience</h1>
								<FontAwesomeIcon
									className="action-btn edit"
									icon={faPen}
									id="preview-edit"
									onClick={() =>
										props.history.push(
											`/profile/work-experience/${localStorage.getItem("jobId")
												? localStorage.getItem("jobId")
												: props.match.params.id
											}`
										)
									}
								/>
							</div>
							<div className="bottom other">
								{userData &&
									userData.work_experience &&
									userData.work_experience.length > 0
									? userData.work_experience.map((exp, index) => {
										return (
											<div className="details" key={index}>
												<h2>{exp.title}</h2>
												<p>
													<span className="heading">Description : </span>
													{exp.job_description}
												</p>
												<p>
													<span className="heading">Organization : </span>
													{exp.company}
												</p>
												<p>
													<span className="heading">Location : </span>
													{exp.location || (exp.address && exp.address.city)}
												</p>
												<p>
													<span className="heading">Employer Website : </span>
													{exp.employer_website}
												</p>
												<p>
													<span className="text">
														{exp.employment_from && exp.employment_from.charAt(5) === ","
															? exp.employment_from && exp.employment_from.slice(0, 11)
															: exp.employment_from && exp.employment_from.slice(0, 12)}
													</span>

													{" to "}

													<span className="text">
														{exp.employment_to
															? exp.employment_to.charAt(5) === ","
																? exp.employment_to && exp.employment_to.slice(0, 11)
																: exp.employment_to && exp.employment_to.slice(0, 12)
															: "Present"}
													</span>
												</p>
												{/* <p>
											<span className="heading">
												Current employment status:{" "}
											</span>
											<span className="text">Employed</span>
										</p> */}
												{/* <p>
											<span className="heading">Skills: </span>
											<span className="text">{exp.job_description}</span>
										</p> */}
											</div>
										);
									})
									: ""}
							</div>
							<div className="top ">
								<h1>Experiences Outside of Work That You Think Are Important</h1>
								<FontAwesomeIcon
									className="action-btn edit"
									id="edit-icon"
									icon={faPen}
									onClick={() =>
										props.history.push(
											`/profile/work-experience/${localStorage.getItem("jobId")
												? localStorage.getItem("jobId")
												: props.match.params.id
											}`
										)
									}
								/>
							</div>
							<div className="bottom ">
								{userData &&
									userData.additional_experiences &&
									userData.additional_experiences.length >= 1
									? userData.additional_experiences.map((exp, index) => {
										if (exp.career_path === "work") {
											return (
												<div className="details" key={index}>
													<h2>{exp.title}</h2>
													<p>
														<span className="text">
															{/* <span className="heading">From</span>{" "} */}
															{exp.employed_from && exp.employed_from.charAt(5) === ","
																? exp.employed_from && exp.employed_from.slice(0, 11)
																: exp.employed_from && exp.employed_from.slice(0, 12)}
														</span>
														<span>{" - "}</span>
														<span className="text">
															{exp.employed_till
																? exp.employed_till.charAt(5) === ","
																	? exp.employed_till && exp.employed_till.slice(0, 11)
																	: exp.employed_till && exp.employed_till.slice(0, 12)
																: "Present"}
														</span>
													</p>
													<p>
														<span className="heading">Description: </span>
														{exp.description}
													</p>
													<p>
														<span className="heading">Organization: </span>
														{exp.organization_name}
													</p>
													<p>
														<span className="heading">Location: </span>
														{exp.location}
													</p>
												</div>
											);
										}
									})
									: ""}
							</div>
						</div>

						<div className="group ">
							<div className="top">
								<h1>Education</h1>
								<FontAwesomeIcon
									className="action-btn edit"
									icon={faPen}
									id="preview-edit"
									onClick={() =>
										props.history.push(
											`/profile/education/${localStorage.getItem("jobId")
												? localStorage.getItem("jobId")
												: props.match.params.id
											}`
										)
									}
								/>
							</div>
							<div className="bottom other">
								{userData &&
									userData.education_experience &&
									userData.education_experience.length > 0
									? userData.education_experience.map((exp, index) => {
										return (
											<div className="details" key={index}>
												<h2>
													{degrees.length > 0 &&
														degrees.map((entity) => {
															if (entity.id === parseInt(exp.title))
																return entity.title;
														})}
												</h2>
												<p>
													<span className="heading">
														{degrees.length > 0 &&
															degrees.map((entity) => {
																if (entity.id === exp.title)
																	return entity.title;
															})}
													</span>
													<span className="heading">Description : </span>
													{exp.education_description}
													<br />
													<span className="heading">Institution : </span>
													{institutions.length > 0 &&
														institutions.map((entity) => {
															if (entity.id === exp.institution)
																return entity.institute_name;
														})}

													<br />

													<span className="heading">Major : </span>
													{exp.education_major &&
														exp.education_major.map((major) => {
															return major.name;
														})}

													<br />

													<span className="heading">Minor : </span>
													{exp.education_minor &&
														exp.education_minor.map((minor) => {
															return minor.name;
														})}

													<br />

													<span className="text">
														FROM{" "}
														{exp.attended_from && exp.attended_from.charAt(5) === ","
															? exp.attended_from && exp.attended_from.slice(0, 11)
															: exp.attended_from && exp.attended_from.slice(0, 12)}
													</span>
													{" to "}
													<span className="text">
														{exp.attended_till && exp.attended_till.charAt(5) === ","
															? exp.attended_till && exp.attended_till.slice(0, 11)
															: exp.attended_till && exp.attended_till.slice(0, 12)}
													</span>
												</p>
											</div>
										);
									})
									: ""}
							</div>

							<div className="group ">
								<div className="top">
									<h1>Certifications</h1>
									<FontAwesomeIcon
										className="action-btn edit"
										icon={faPen}
										id="preview-edit"
										onClick={() =>
											props.history.push(
												`/profile/education/${localStorage.getItem("jobId")
													? localStorage.getItem("jobId")
													: props.match.params.id
												}`
											)
										}
									/>
								</div>
								{userData && userData.certificate && userData.certificate.length > 0
									? userData.certificate.map((entity, index) => {
										return (
											<div className="bottom" key={index}>
												<div className="details">
													<h2>
														{allCertificates.map((cert) => {
															if (cert.id === entity.title_id)
																return cert.title_name;
														})}
													</h2>
													<p>
														<span className="heading">Description: </span>
														{" - "}
														<span className="text">{entity.description}</span>
													</p>
													<p>
														<span className="heading">Issued Date: </span>

														<span className="text">
															{entity.issued_date && entity.issued_date.charAt(5) === ","
																? entity.issued_date && entity.issued_date.slice(0, 11)
																: entity.issued_date && entity.issued_date.slice(0, 12)}
														</span>
													</p>
													<p>
														<span className="heading">Certificate link: </span>
														<span className="text">
															<Link to="#">{entity.certificate_link}</Link>
														</span>
													</p>
													<p className="docs">
														{entity.certificate_image_loc && (
															<>
																<span className="heading">
																	Certificate image:{" "}
																</span>
																<span
																	className="doc"
																	to={entity.doc}
																	onClick={() =>
																		showCertificate(entity.certificate_image_loc)
																	}
																	id={"showCertificate_"}
																>
																	{entity.certificate_image_loc &&
																		entity.certificate_image_loc
																			.split(".")
																			.pop() === "pdf" ? (
																			<Document
																				file={entity.certificate_image_loc}
																				onLoadSuccess={onDocumentLoadSuccess}
																				loading={
																					<div className="spinner_outer">
																						<Spinner />
																					</div>
																				}
																			>
																				{Array.from(
																					new Array(numPages),
																					(el, index) => (
																						<Page
																							// size="A4"
																							loading=""
																							key={`page_${index + 1}`}
																							pageNumber={index + 1}
																							width={150}
																						// width={width}
																						/>
																					)
																				)}
																			</Document>
																		) : (
																			<img
																				src={entity.certificate_image_loc}
																				alt={entity.doc}
																			/>
																		)}
																</span>
															</>
														)}
													</p>
												</div>
											</div>
										);
									})
									: ""}
							</div>
							<div className="top ">
								<h1>Experiences Outside the Classroom That You Think are Important</h1>
								<FontAwesomeIcon
									className="action-btn edit"
									id="edit-icon"
									icon={faPen}
									onClick={() =>
										props.history.push(
											`/profile/education/${localStorage.getItem("jobId")
												? localStorage.getItem("jobId")
												: props.match.params.id
											}`
										)
									}
								/>
							</div>
							<div className="bottom ">
								{userData &&
									userData.additional_experiences &&
									userData.additional_experiences.length >= 1
									? userData.additional_experiences.map((exp, index) => {
										if (exp.career_path === "EDUCATION") {
											return (
												<div className="details" key={index}>
													<h2>{exp.title}</h2>
													<p>
														<span className="text">
															{/* <span className="heading">From</span>{" "} */}
															{exp.employed_from && exp.employed_from.charAt(5) === ","
																? exp.employed_from && exp.employed_from.slice(0, 11)
																: exp.employed_from && exp.employed_from.slice(0, 12)}
														</span>
														<span>{" - "}</span>
														<span className="text">
															{exp.employed_till
																? exp.employed_till && exp.employed_till.charAt(5) === ","
																	? exp.employed_till && exp.employed_till.slice(0, 11)
																	: exp.employed_till && exp.employed_till.slice(0, 12)
																: "Present"}
														</span>
													</p>
													<p>
														<span className="heading">Description: </span>
														{exp.description}
													</p>
													<p>
														<span className="heading">Organization: </span>
														{exp.organization_name}
													</p>
													<p>
														<span className="heading">Location: </span>
														{exp.location}
													</p>
												</div>
											);
										}
									})
									: ""}
							</div>
						</div>
					</div>

				</div>

				<Accordion title="General Questions">
					<GeneralQuestions
						// calHeight={calHeight}
						noHeading
						data={formData.general_questions}
						onchange={(q, a) => handleFieldChange("general_questions", q, a)}
					/>
				</Accordion>
				<Accordion title="Your Personal Experiences" className="pa">
					<PersonalityAssessment
						// calHeight={calHeight}
						// noHeading
						data={formData.personality_assessment}
						onchange={(q, a) => handleFieldChange("personality_assessment", q, a)}
					/>
				</Accordion>
				<Accordion title="Coursework">
					<CourseWork
						// calHeight={calHeight}
						noHeading
						data={formData.coursework}
						onchange={(q, a) => handleFieldChange("coursework", q, a)}
					/>
				</Accordion>
				<Accordion title="Work History" type="addEducation">
					<WorkHistory
						// calHeight={calHeight}
						noHeading
						data={formData.work_history}
						onchange={(q, a) => handleFieldChange("work_history", q, a)}
					/>
				</Accordion>
				<Accordion title="Commute" type="addEducation">
					<CommuteQuestions
						// calHeight={calHeight}
						noHeading
						data={formData.commute}
						onchange={(q, a) => handleFieldChange("commute", q, a)}
					/>
				</Accordion>
				{employerQuestions &&
					employerQuestions.submittedAnswer &&
					employerQuestions.submittedAnswer.employerQuestions && employerQuestions.submittedAnswer.employerQuestions.length > 0 ? (
						<Accordion title="Employer Questions" type="addEducation">
							<EmployerQuestions
								// calHeight={calHeight}
								noHeading
								//empQuestions={empQuestions}
								// employerQuestions={
								// 	employerQuestions.submittedAnswer.employerQuestions
								// }
								empQuestions={
									employerQuestions.submittedAnswer.employerQuestions
								}
								data={formData.employer_questions}
								//onchange={(q, a) => handleFieldChange("employer_questions", q, a)}
								onchange={(q, a, isChecked) => handleFieldChangeEQuestions("employer_questions", q, a, isChecked)}

							/>
						</Accordion>
					) : ""}

				{/* <div className="cta">
				<button className="primary-btn blue" id="submit-preview" onClick={handleClick}>
					Submit
				</button>
			</div> */}
			</div>
		);
};

export default withRouter(Application);
