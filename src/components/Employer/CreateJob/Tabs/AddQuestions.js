import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddButton from "../../../_Elements/AddButton";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";
import JobSpecificQuestions from "./Questions/JobSpecificQuestions";
import qs from "qs";
import { useParams, useLocation } from "react-router-dom";

function AddQuestions({ history, setShouldBlockNavigation, jobToUpdate }) {
	const dispatch = useDispatch();
	let { isViewOnly } = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
	const [disableCtrl, setDisableCtrl] = useState(isViewOnly);

	let { jobId } = useParams();

	useEffect(() => {
		if (jobToUpdate && jobToUpdate.count_of_applied_candidates && jobId) setDisableCtrl(true);
	}, [jobToUpdate]);

	const handleQuestionsClick = async () => {
		await setShouldBlockNavigation(false);
		// history.push('/jobs/create-job/general-questions');
		history.push({
			pathname: "/jobs/create-job/general-questions",
			state: { prevUrl: window.location.pathname, params: window.location.search },
		});
	};
	return (
		<div className="add_questions" id="copyLink">
			<div className="heading">
				<h2>Add custom questions</h2>
				<p>
					We recommend adding questions specific to your requirement to find the most suitable applicants. All
					applicants need to answer our general questions, you can view them right{" "}
					<span onClick={handleQuestionsClick} className="common_underline_link">
						here
					</span>
				</p>
			</div>
			<div className="content">
				<AddButton
					content="Create a new question"
					style={{ marginRight: "30px" }}
					onclick={() => {
						dispatch(toggleOverlay(true));
						dispatch(togglePopup([true, "createNewQuestion", { type: "private", jobId }]));
					}}
					toolTip="Create personalized questions for your job post."
				/>
				<AddButton
					content="Add from Question library"
					onclick={() => {
						dispatch(toggleOverlay(true));
						dispatch(togglePopup([true, "questionsLibrary"]));
					}}
					disable={disableCtrl}
					toolTip="Select single/multiple questions from your private Questions library"
				/>
			</div>
			<JobSpecificQuestions disable={disableCtrl} />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		jobToUpdate: state.employerReducer.jobToUpdate,
	};
}

export default connect(mapStateToProps)(AddQuestions);
