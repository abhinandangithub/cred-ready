import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputRange from "react-input-range";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";
import { Link } from "react-router-dom";

import "./index.scss";
import AddButton from "../../../../_Elements/AddButton";

function Strengths() {
	const dispatch = useDispatch();
	const [value1, setValue1] = useState(5);
	const [value2, setValue2] = useState(6);
	const [value3, setValue3] = useState(8);
	const [activeTab, setActiveTab] = useState("other");

	const minValue = 0;
	const maxValue = 10;

	const addStrength = (type, heading) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, type, { heading }]));
	};

	return (
		<div className="strengths">
			<div className="content">
				<ul className="strength-tabs">
					<li
						onClick={() => setActiveTab("personalityTraits")}
						className={activeTab === "personalityTraits" ? "active" : ""}
					>
						Personality Traits
					</li>
					<li
						onClick={() => setActiveTab("technical")}
						className={activeTab === "technical" ? "active" : ""}
					>
						Technical
					</li>
					<li
						onClick={() => setActiveTab("communication")}
						className={activeTab === "communication" ? "active" : ""}
					>
						Communication
					</li>
					<li
						onClick={() => setActiveTab("other")}
						className={activeTab === "other" ? "active" : ""}
					>
						Other
					</li>
				</ul>

				<div
					className={`other-sliders ${
						activeTab === "personalityTraits" ? "" : "hidden"
					}`}
				>
					<AddButton
						content="Add Personality Trait"
						onclick={() => addStrength("addStrength", "Add Personality Trait")}
					/>
					<ul>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value1}
									onChange={(value) => setValue1(value)}
								/>
							</div>
							<div className="label">Prescribing Medications</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value2}
									onChange={(value) => setValue2(value)}
								/>
							</div>
							<div className="label">Personal Care</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value3}
									onChange={(value) => setValue3(value)}
								/>
							</div>
							<div className="label">Compassion</div>
						</li>
					</ul>
				</div>
				<div
					className={`other-sliders ${
						activeTab === "technical" ? "" : "hidden"
					}`}
				>
					<AddButton
						content="Add Technical Strength"
						onclick={() => addStrength("addStrength", "Add Technical Strength")}
					/>
					<ul>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value1}
									onChange={(value) => setValue1(value)}
								/>
							</div>
							<div className="label">Prescribing Medications</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value2}
									onChange={(value) => setValue2(value)}
								/>
							</div>
							<div className="label">Personal Care</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value3}
									onChange={(value) => setValue3(value)}
								/>
							</div>
							<div className="label">Compassion</div>
						</li>
					</ul>
				</div>
				<div
					className={`other-sliders ${
						activeTab === "communication" ? "" : "hidden"
					}`}
				>
					<AddButton
						content="Add Communication Strength"
						onclick={() =>
							addStrength("addStrength", "Add Communication Strength")
						}
					/>
					<ul>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value1}
									onChange={(value) => setValue1(value)}
								/>
							</div>
							<div className="label">Prescribing Medications</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value2}
									onChange={(value) => setValue2(value)}
								/>
							</div>
							<div className="label">Personal Care</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value3}
									onChange={(value) => setValue3(value)}
								/>
							</div>
							<div className="label">Compassion</div>
						</li>
					</ul>
				</div>
				<div
					className={`other-sliders ${activeTab === "other" ? "" : "hidden"}`}
				>
					<AddButton
						content="Add Other Strength"
						onclick={() => addStrength("addStrength", "Add Other Strength")}
					/>
					<ul>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value1}
									onChange={(value) => setValue1(value)}
								/>
							</div>
							<div className="label">Prescribing Medications</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value2}
									onChange={(value) => setValue2(value)}
								/>
							</div>
							<div className="label">Personal Care</div>
						</li>
						<li>
							<div className="slider">
								<InputRange
									maxValue={maxValue}
									minValue={minValue}
									value={value3}
									onChange={(value) => setValue3(value)}
								/>
							</div>
							<div className="label">Compassion</div>
						</li>
					</ul>
				</div>
			</div>

			<div className="cta">
				<Link
					to="/profile/education"
					className="primary-btn outline"
					id="previousLink"
				>
					Previous
				</Link>
				<Link to="/profile/preview" className="primary-btn" id="nextLink">
					Next
				</Link>
			</div>
		</div>
	);
}

export default Strengths;
