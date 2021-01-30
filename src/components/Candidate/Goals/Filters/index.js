import React from "react";

import Input from "../../../_Elements/Input";
import "./index.scss";

const careerOptions = [
	{
		title: "Building and fixing things",
		child: [],
	},
	{
		title: "Computers",
		child: [],
	},
	{
		title: "Food",
		child: [],
	},
	{
		title: "Healthcare",
		child: [
			// "Pharmacist",
			// "Certified Nursing Assistant",
			// "Registered Nurse",
			// "Optometrist",
			// "Doctor",
		],
	},
	{
		title: "Helping your community",
		child: [],
	},
	{
		title: "Law",
		child: [],
	},
	{
		title: "Managing Money",
		child: [],
	},
	{
		title: "Maths",
		child: [],
	},
	{
		title: "Music and art",
		child: [],
	},
	{
		title: "Nature",
		child: [],
	},
	{
		title: "Reading",
		child: [],
	},
	{
		title: "Science",
		child: [],
	},
	{
		title: "Social Studies",
		child: [],
	},
	{
		title: "Sports",
		child: [],
	},
	{
		title: "Teaching",
		child: [],
	},
	{
		title: "Transportation",
		child: [],
	},
];
let prevActiveId = null;

function Filters({ noSearch, onclick }) {
	const [activeId, setActiveId] = React.useState(3);

	const handleMainClick = (id) => {
		id = prevActiveId === id ? null : id;
		prevActiveId = id;
		setActiveId(id);
	};

	return (
		<div className="filters">
			{noSearch ? null : (
				<Input type="text" placeholder="Search by Job Title" />
			)}

			<ul>
				{careerOptions.map((career, i) => {
					return (
						<li key={i}>
							<div
								className={`top_1${activeId === i ? " active" : ""}`}
								onClick={() =>
									career.child.length > 0 ? handleMainClick(i) : null
								}
							>
								{career.title}
								{career.child.length > 0 && (
									<span>{activeId === i ? "-" : "+"}</span>
								)}
							</div>
							<ul>
								{career.child.map((title, i) => {
									return (
										<li key={i}>
											<div
												className="top_2 active"
												onClick={(e) => {
													console.log("sachin", e.target.classList);
													e.target.classList.toggle("active");
												}}
											>
												{title}
												<span className="common-check-icon active"></span>
											</div>
										</li>
									);
								})}
							</ul>
						</li>
					);
				})}
			</ul>

			{onclick && (
				<div className="cta">
					<button
						className="primary-btn blue outline"
						onClick={() => onclick("cancel")}
					>
						Cancel
					</button>
					<button className="primary-btn blue" onClick={() => onclick("done")}>
						Done
					</button>
				</div>
			)}
		</div>
	);
}

export default Filters;
