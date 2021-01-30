import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePopup, toggleOverlay } from "../../store/actions/popup_overlay";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";

/* popups */
import Delete from "./Delete";
import UnsavedChanges from "./UnsavedChanges";
import TermsAndConditions from "./TermsAndConditions";
import VerifyEmail from "./VerifyEmail";
import VerifyPhone from "./VerifyPhone";
import Certificate from "./Certificate";
import PopulateInformation from "./PopulateInformation";
import AddWorkExperience from "./AddExpEduWorkCert/AddWorkExperience";
import AddOtherExperience from "./AddExpEduWorkCert/AddOtherExperience";
import AddEducation from "./AddExpEduWorkCert/AddEducation";
import AddCertificate from "./AddExpEduWorkCert/AddCertificate";
import AddEduOtherExperience from "./AddExpEduWorkCert/AddEduOtherExperience";
import AddStrength from "./AddStrength";
import CreateEmailTemplate from "./Employer/CreateEmailTemplate";
import SuspendJobPost from "./Employer/SuspendJobPost";
import CreateNewQuestion from "./Employer/CreateNewQuestion";
import ShareJobPost from "./Employer/ShareJobPost";
import ChoosePrivateQuestions from "./Employer/ChoosePrivateQuestions";
import ChoosePublicQuestions from "./Employer/ChoosePublicQuestions";
import QuestionsLibrary from "./Employer/QuestionsLibrary";
import AddNewQuestion from "./Employer/AddNewQuestion";
import RecruitmentFunnelList from "./Employer/RecruitmentFunnelList";
import JobApplied from "./JobApplied";
import CancelJobPostCreation from "./CancelJobPostCreation";

let scrollBarStyle = {
	width: "100vw",
	height: "100vh",
};

function Popup(props) {
	const dispatch = useDispatch();
	const { popup } = useSelector((state) => state.popupOverlayReducer);

	let info = null;
	if (popup.info) {
		info = popup.info;
	}

	/* render popups based on conditions */
	const renderPopup = () => {
		switch (popup.which) {
			case "termsAndConditions":
				return <TermsAndConditions />;
			case "emailOtp":
				return <VerifyEmail />;
			case "phoneOtp":
				return <VerifyPhone />;
			case "delete":
				return <Delete />;
			case "unsavedChanges":
				return <UnsavedChanges info={info} />;
			case "certificate":
				return <Certificate certificate={info.certificate} />;
			case "addWorkExperience":
				return <AddWorkExperience close={closePopupOverlay} />;
			case "addOtherExperience":
				return <AddOtherExperience close={closePopupOverlay} />;
			case "addEducation":
				return <AddEducation close={closePopupOverlay} />;
			case "addCertificate":
				return <AddCertificate close={closePopupOverlay} />;
			case "addEduOtherExperience":
				return <AddEduOtherExperience close={closePopupOverlay} />;
			case "addStrength":
				return <AddStrength heading={info.heading} />;
			case "createEmailTemplate":
				return <CreateEmailTemplate info={info} />;
			case "createNewQuestion":
				return <CreateNewQuestion type={info.type} action={info.action} data={info.question} jobId={info.jobId}/>;
			case "shareJobPost":
				return <ShareJobPost />;
			case "suspendJobPost":
				return <SuspendJobPost jobId={info.jobId} />;
			case "choosePrivateQuestions":
				return <ChoosePrivateQuestions />;
			case "choosePublicQuestions":
				return <ChoosePublicQuestions />;
			case "questionsLibrary":
				return <QuestionsLibrary />;
			case "recruitmentFunnelList":
				return <RecruitmentFunnelList info={info} />;
			case "addNewQuestion":
				return <AddNewQuestion />;
			case "populateInformation":
				return <PopulateInformation />;
			case "jobApplied":
				return <JobApplied />;
			case "cancelJobPostCreation":
				return <CancelJobPostCreation setShouldBlockNavigation={info.setShouldBlockNavigation} />;
			default:
				return null;
		}
	};

	// window.addEventListener("popstate", (e) => {
	// 	console.log(e);
	// 	console.log(
	// 		"location: " + document.location + ", state: " + JSON.stringify(e.state)
	// 	);
	// 	dispatch(toggleOverlay(false));
	// 	dispatch(togglePopup(false));
	// });

	const closePopupOverlay = () => {
		if (popup.which === "createNewQuestion" && popup.info.action === "edit") {
			dispatch(togglePopup([true, "questionsLibrary"]));
		} else {
			document.body.classList.remove("blendPopup");
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
		}

		// if (popup.which === "createNewQuestion") {
		// 	dispatch(togglePopup([true, popup.previousWhich]));
		// } else {
		// 	dispatch(toggleOverlay(false));
		// 	dispatch(togglePopup(false));
		// }
	};

	return (
		<div
			className={`popup-scroll-area ${props.active ? "active" : ""}`}
			onClick={(e) => {
				if (
					e.target.closest(".popup-recruitmentFunnelList") === null &&
					document.querySelector(".popup-recruitmentFunnelList")
				) {
					dispatch(toggleOverlay(false));
					dispatch(togglePopup(false));
				}
			}}
		>
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
				<>
					<div className={`popup ${popup.which ? "popup-" + popup.which : ""}`}>
						{renderPopup()}
						<button className="close" id="closePopupBtn" onClick={closePopupOverlay}></button>
					</div>
				</>
			</Scrollbars>
		</div>
	);
}

export default Popup;
