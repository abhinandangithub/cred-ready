import React from "react";
import { useDispatch } from "react-redux";

import "./index.scss";
import ImgLock from "../../../../assets/lock.jpg";
import ImgGlobe from "../../../../assets/globe.jpg";
import { togglePopup } from "../../../../store/actions/popup_overlay";

function AddNewQuestion() {
	const dispatch = useDispatch();

	const choosePrivateQuestions = () => {
		dispatch(togglePopup([true, "choosePrivateQuestions"]));
	};

	const choosePublicQuestions = () => {
		dispatch(togglePopup([true, "choosePublicQuestions"]));
	};

	return (
		<div className="add-new-question">
			<h1>Add New Question</h1>
			<div className="content">
				<div className="option" id="private-lib" onClick={choosePrivateQuestions}>
					<div className="highlight">
						<img src={ImgLock} alt="Private Library" />
						<p>Company Library</p>
					</div>
					<p className="text">
						Set of questions created by your teammates.
						<br />
						These are not visible to other companies.
					</p>
				</div>
				<div className="option" id="public-lib" onClick={choosePublicQuestions}>
					<div className="highlight">
						<img src={ImgGlobe} alt="Public Library" />
						<p>Public Library</p>
					</div>
					<p className="text">
						Set of questions for use across companies.
						<br />
						Suggested by other users & CredReady.
					</p>
				</div>
			</div>
		</div>
	);
}

export default AddNewQuestion;
