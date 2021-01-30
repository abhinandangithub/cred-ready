import React from "react";

import "./index.scss";
import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";

const employmentStatus = {
	heading: "Select Employment Type",
	content: ["Employed", "Self Employed", "Available", "On Break"],
};
const industry = {
	heading: "Select Industry",
	content: ["industry 1", "industry 2", "industry 3"],
};
const _function = {
	heading: "Select Function",
	content: ["function 1", "function 2", "function 3"],
};

function PostJob() {
	return (
		<div className="my-posted-jobs-page" data-per="40">
			<h1 className="heading-outer">My Posted Jobs</h1>
			<div className="status-bar">
				<div className="highlight"></div>
				<div className="stop stop-1 active">
					<span className="icon"></span>
					<span className="text">Job Details</span>
				</div>
				<div className="stop stop-2">
					<span className="icon"></span>
					<span className="text">Job Specefic Questions</span>
				</div>
			</div>
			<div className="basic-info">
				<ul>
					<li>
						<label htmlFor="jobTitle">
							Job Title <span>*</span>
						</label>
						<Input id="jobTitle" />
					</li>
					<li>
						<label htmlFor="jobLocation">
							Job Location <span>*</span>
						</label>
						<Input id="jobLocation" placeholder="Zip or city, state" />
					</li>
					<li>
						<label>
							Employment Type <span>*</span>
						</label>
						<Dropdown
							placeholder={employmentStatus.heading}
							content={employmentStatus.content}
						/>
					</li>
					<li>
						<label>
							Industry <span>*</span>
						</label>
						<Dropdown
							placeholder={industry.heading}
							content={industry.content}
						/>
					</li>
					<li>
						<label>
							Function <span>*</span>
						</label>
						<Dropdown
							placeholder={_function.heading}
							content={_function.content}
						/>
					</li>
					<li>
						<label htmlFor="count">
							How Many Open Positions Are There <span>*</span>
						</label>
						<Input id="count" />
					</li>
				</ul>
			</div>
			<div className="job-description">
				<h2 className="sub-heading">
					Job Description <span>*</span>
				</h2>
				<textarea
					name="email"
					id="email"
					defaultValue="Provides for activities of daily living by assisting with serving meals, feeding patients as necessary and ambulating, turning, and positioning patients; and providing fresh water and nourishment between meals.
Provides adjunct care by administering enemas, douches, non-sterile dressings, surgical preps, ice packs, heat treatments, sitz and therapeutic baths; and applying restraints.
Maintains patient stability by checking vital signs and weight; testing urine and recording intake and output information.
Provides patient comfort by utilizing resources and materials; transporting patients; answering patients’ call lights and requests; and reporting observations of the patient to nursing supervisor.
Documents actions by completing forms, reports, logs, and records.
Maintains work operations by following policies and procedures.
Protects organization’s value by keeping patient information confidential.
Serves and protects the hospital community by adhering to professional standards, hospital policies and procedures; federal, state, and local requirements; and jcaho standards.
Updates job knowledge by participating in educational opportunities, reading professional publications, participating in professional organisations, and maintaining licensure.
Enhances nursing department and hospital reputation by accepting ownership for accomplishing new and different requests; and exploring opportunities to add value to job accomplishments."
				></textarea>
				<h2 className="sub-heading">
					Required Strengths <span>*</span>
				</h2>
				<ul className="strengths">
					<li>
						Communication <span></span>{" "}
					</li>
					<li>
						Patient Care <span></span>{" "}
					</li>
					<li className="btn"></li>
				</ul>
				<h2 className="sub-heading">
					Certificates <span>*</span>
				</h2>
				<ul className="certificates">
					<li>
						Nursing <span></span>{" "}
					</li>
					<li>
						Take Care <span></span>{" "}
					</li>
					<li className="btn"></li>
				</ul>
				<h2 className="sub-heading">
					Years of Experience Required<span>*</span>
				</h2>
				<p>Experience in similar roles </p>
			</div>
			<div className="attach-email">
				<h2 className="sub-heading">Attach Email</h2>
				<p>Select / Modify Introduction Email Template</p>
				<Dropdown
					placeholder={employmentStatus.heading}
					content={employmentStatus.content}
				/>
				<h2 className="sub-heading">Email</h2>
				<textarea
					name="email"
					id="email"
					defaultValue="Hi {candidate_name},
Thanks for applying for the position of {job_title}, we will review your profile and share an update on the next steps soon."
				></textarea>
			</div>
			<div className="cta">
				<button className="primary-btn">Next</button>
			</div>
		</div>
	);
}

export default PostJob;
