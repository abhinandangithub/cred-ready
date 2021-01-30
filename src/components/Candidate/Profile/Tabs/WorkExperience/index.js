import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import { getGeographyThunk } from "../../../../../store/thunks/employer";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";
import { fetchCandidateDetails } from "../../../../../modals/candidateProfile/thunk";
let pathName = null;

function WorkExperience(props) {
	const history = useHistory();
	pathName = history.location.pathname;

	const dispatch = useDispatch();

	const work_experience = useSelector(
		(state) => state.candidateSetDataReducer.data.work_experience
	);
	const additional_experiences = useSelector(
		(state) => state.candidateSetDataReducer.data.additional_experiences
	);

	const geographyKeys = useSelector(state => state.employerReducer.geographyKeys);

	const handleEdit = (id, type, info) => {
		if (info) {
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, type, { id, purpose: "edit" }]));
		} else {
			dispatch(toggleOverlay(true));
			dispatch(togglePopup([true, type, { id, purpose: "edit" }]));
		}
	};
	const handleDelete = (id, type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: type, id: id }]));
	};

	React.useEffect(() => {
		dispatch(fetchCandidateDetails());
		dispatch(getGeographyThunk());
		window.scrollTo(0, 0);
	}, [dispatch]);

	const renderWorkExperiences = work_experience.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>{data.title}</h2>
				<h3>
					{data.company} - <span>{data.location || (data.address && data.address.city)}</span>
				</h3>
				{(data.employment_from || data.employment_to) ? <h4>
					<span>
						{data.employment_from && data.employment_from.charAt(5) === ","
							? data.employment_from && data.employment_from.slice(0, 11)
							: data.employment_from && data.employment_from.slice(0, 12)}
					</span>{" "}
					-{" "}
					<span>
						{data.employment_to
							? data.employment_to.charAt(5) === ","
								? data.employment_to && data.employment_to.slice(0, 11)
								: data.employment_to && data.employment_to.slice(0, 12)
							: "Present"}
					</span>
				</h4> : ""}
				<p className="description">
					<span className="heading">Description: </span>
					<span className="text">{data.job_description}</span>
				</p>
				<FontAwesomeIcon
					className="action-btn edit pc"
					icon={faPen}
					id={"workExperienceEdit_" + i}
					onClick={() => handleEdit(data.work_ex_id, "addWorkExperience")}
				/>
				<Link
					to={pathName + "/add-work"}
					className="mobile"
					onClick={() =>
						handleEdit(data.work_ex_id, "addWorkExperience", { isEdit: true })
					}
				>
					<FontAwesomeIcon className="action-btn edit" icon={faPen} />
				</Link>
				<FontAwesomeIcon
					className="action-btn delete"
					icon={faTrash}
					id={"workExperienceDelete_" + i}
					onClick={() => handleDelete(data.work_ex_id, "workExperience")}
				/>
			</div>
		);
	});

	const renderOtherExperiences = additional_experiences.map((data, i) => {
		if (data.career_path === "work") {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.organization_name}
						{data.location ? " - " : ""}
						<span>{data.location}</span>
					</h3>
					{(data.employed_from || data.employed_till) ? <h4>
						<span>
							{data.employed_from && data.employed_from.charAt(5) === ","
								? data.employed_from && data.employed_from.slice(0, 11)
								: data.employed_from && data.employed_from.slice(0, 12)}
						</span>
						{" - "}
						<span>
							{data.employed_till
								? data.employed_till && data.employed_till.charAt(5) === ","
									? data.employed_till && data.employed_till.slice(0, 11)
									: data.employed_till && data.employed_till.slice(0, 12)
								: "Present"}
						</span>
					</h4> : ""}
					<p className="description">
						<span className="heading">Description: </span>
						<span className="text">{data.description}</span>
					</p>
					<FontAwesomeIcon
						className="action-btn edit pc"
						icon={faPen}
						id={"otherExperienceEdit_" + i}
						onClick={() => handleEdit(data.id, "addOtherExperience")}
					/>
					<Link
						to={pathName + "/add-other-work"}
						className="mobile"
						onClick={() =>
							handleEdit(data.id, "addOtherExperience", { isEdit: true })
						}
					>
						<FontAwesomeIcon className="action-btn edit" icon={faPen} />
					</Link>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						id={"otherExperienceDelete_" + i}
						onClick={() => handleDelete(data.id, "otherExperience")}
					/>
				</div>
			);
		}
	});

	return (
		<div className="work-experience">
			<div className="_heading mobile">
				<span className="text">Work Experience</span>
				<span className="count">2/4</span>
			</div>
			<p className="sub-heading mobile">Add your work & other experiences</p>

			{/* PC */}
			<div className="pc">
				<Accordion
					title="Work Experience"
					active
					type="addWorkExperience"
					addButton="Add Work Experience"
					id="addWorkExperienceAccordion"
				>
					{renderWorkExperiences}
				</Accordion>
				<Accordion
					title="Other Experiences"
					type="addOtherExperience"
					active
					addButton="Add Other Experience"
					id="addOtherExperienceAccordion"
				>
					{renderOtherExperiences}
				</Accordion>
			</div>

			{/* MOBILE */}
			<div className="mobile">
				<Accordion
					title="Work Experience"
					active
					type="addWorkExperience"
					addButton="Add Work Experience"
					id="addWorkExperienceAccordion"
					blendPopup
				>
					{renderWorkExperiences}
				</Accordion>
				<Accordion
					title="Other Experiences"
					type="addOtherExperience"
					active
					addButton="Add Other Experience"
					id="addOtherExperienceAccordion"
					blendPopup
				>
					{renderOtherExperiences}
				</Accordion>
			</div>

			{/* <div className="accordion mobile">
				<div className="contents">{renderWorkExperiences}</div>
				<div className="contents">{renderOtherExperiences}</div>
			</div> */}

			<div className="cta">
				{props.match.params.id ? (
					<Link
						className="primary-btn blue"
						to={`/jobs/view/${props.match.params.id}`}
						id="nextLink"
					>
						Done
					</Link>
				) : (
						<>
							<Link
								to="/profile/personal-details"
								className="primary-btn blue outline"
								id="previousLink"
							>
								<span className="">Previous</span>
								{/* <span className="pc">Previous</span>
								<span className="mobile">Go Back</span> */}
							</Link>
							<Link
								to="/profile/education"
								className="primary-btn blue"
								id="nextLink"
							>
								Next
						</Link>
						</>
					)}
			</div>
		</div>
	);
}

export default WorkExperience;
