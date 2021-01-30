import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";
import GeneralQuestions from "./GeneralQuestions";
import PersonalityAssessment from "./PersonalityAssessment";
import CourseWork from "./CourseWork";
import WorkHistory from "./WorkHistory";
import CommuteQuestions from "./CommuteQuestions";
import EmployerQuestions from "./EmployerQuestions";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};

function Questions() {
	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
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
	};

	return (
		<div className="questions">
			<h1 className="common-heading">Create a Job</h1>

			<div className="outer">
				<div className="left">
					<ul>
						<li
							className={`done ${activeTab === 0 ? "active" : ""}`}
							onClick={() => handleScroll(0)}
						>
							General Questions
							<span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 1 ? "active" : ""}`}
							onClick={() => handleScroll(1)}
						>
							Your Personal Experiences <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 2 ? "active" : ""}`}
							onClick={() => handleScroll(2)}
						>
							Coursework <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 3 ? "active" : ""}`}
							onClick={() => handleScroll(3)}
						>
							Work History <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 4 ? "active" : ""}`}
							onClick={() => handleScroll(4)}
						>
							Commute <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 5 ? "active" : ""}`}
							onClick={() => handleScroll(5)}
						>
							Employer Questions <span className="common-check-icon"></span>
						</li>
					</ul>
				</div>
				<div className="right">
					<Scrollbars
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
					>
						<GeneralQuestions calHeight={calHeight} />
						<PersonalityAssessment calHeight={calHeight} />
						<CourseWork calHeight={calHeight} />
						<WorkHistory calHeight={calHeight} />
						<CommuteQuestions calHeight={calHeight} />
						<EmployerQuestions calHeight={calHeight} />
						<div className="cta">
							<button className="primary-btn">Submit</button>
						</div>
						{/* <div className="blank"></div> */}
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

export default Questions;
