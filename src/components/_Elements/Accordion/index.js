import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";

import AddButton from "../AddButton";
let pathName = null;

function Accordion(props) {
	const history = useHistory();
	pathName = history.location.pathname;

	// console.log(".......", pathName);

	const dispatch = useDispatch();
	const [active, setActive] = useState(false);
	const contentRef = useRef(null);

	useEffect(() => {
		if (props.active) {
			setActive(true);
		}
	}, [props.active]);

	useEffect(() => {
		contentRef.current.style.height = active
			? "auto"
			: props.type === "blank"
			? "60px"
			: "0px";
		// contentRef.current.style.height = active
		// 	? `${contentRef.current.scrollHeight}px`
		// 	: props.type === "blank"
		// 	? "60px"
		// 	: "0px";
	}, [contentRef, active, props.type]);

	const addExperience = (type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, type]));
	};

	const handleEdit = (id, type) => {
		dispatch(toggleOverlay(false));
		dispatch(togglePopup([false, type, { id, purpose: "show" }]));
	};

	const arrowIcon = (
		<FontAwesomeIcon
			className="icon"
			icon={active ? faChevronUp : faChevronDown}
		/>
	);

	return (
		<div
			className={`accordion ${props.className ? props.className : ""} ${
				active ? "active" : ""
			}`}
			id={props.id}
		>
			{props.type === "blank" ? (
				<>
					<div
						className="contents"
						ref={contentRef}
						id={props.id + "heading"}
						onClick={(e) => {
							e.target.closest("ul").classList.contains("for-click") &&
								setActive(!active);
						}}
					>
						{props.children}
					</div>
					{arrowIcon}
				</>
			) : (
				<>
					<h1
						className="title flex"
						onClick={() => {
							// let activeAccordion = document.querySelector('.accordion.active');
							// if(activeAccordion) {
							// 	activeAccordion.classList.remove('active')
							// 	activeAccordion.querySelector('.contents').style.height = "0px";

							// }
							setActive(!active);
						}}
						id={props.id + "heading"}
					>
						{props.title}
						{arrowIcon}
					</h1>
					<div className="contents" ref={contentRef}>
						{/* add button iff addButton prop is defined */}
						{props.blendPopup ? (
							<Link
								className="add-btn"
								to={
									props.type === "addWorkExperience"
										? pathName + "/add-work"
										: props.type === "addOtherExperience"
										? pathName + "/add-other-work"
										: props.type === "addEducation"
										? pathName + "/add-education"
										: props.type === "addCertificate"
										? pathName + "/add-certificate"
										: props.type === "addEduOtherExperience"
										? pathName + "/add-edu-other-work"
										: ""
								}
								onClick={() => handleEdit(props.id, "addWorkExperience")}
								id={props.id + "Btn"}
							>
								<span className="icon">
									<FontAwesomeIcon icon={faPlus} />
								</span>
								{props.addButton}
							</Link>
						) : props.addButton ? (
							<AddButton
								id={props.id + "Btn"}
								onclick={() => {
									addExperience(props.type);
								}}
								content={props.addButton}
							/>
						) : (
							""
						)}
						{}
						{props.children}
					</div>
				</>
			)}
		</div>
	);
}

export default Accordion;
