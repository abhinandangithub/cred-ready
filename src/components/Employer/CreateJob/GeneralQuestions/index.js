import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

import "./index.scss";
import { Link } from "react-router-dom";
import Spinner from "../../../_Elements/Spinner";
import PersonalityAssessment from "./PersonalityAssessment";
import CourseWork from "./CourseWork";
import WorkHistory from "./WorkHistory";
import CommuteQuestions from "./CommuteQuestions";
import GeneralQuestions from "./GeneralQuestions";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};

let scrollHeights = [];

function GeneralQuestionsPage(props) {
	console.log("cr abhi props ", props.location.state);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);
	const [isClicked, setIsClicked] = React.useState(false);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
		setIsClicked(true);
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
		scrollHeights = [];
		calScrollHeight();
	};

	const calScrollHeight = () => {
		for (let i = 0; i < heights.length; i++) {
			scrollHeights.push(heights[i] + i * 30);
		}
	};

	const handleScrolling = (e) => {
		let t = e.target.scrollTop;
		if (!isClicked) {
			for (let i = 0; i < scrollHeights.length; i++) {
				if (t > scrollHeights[i] && t < scrollHeights[i + 1]) {
					setActiveTab(i);
				} else if (t > scrollHeights[scrollHeights.length - 1]) {
					setActiveTab(scrollHeights.length - 1);
				}
			}
		}
	};

	const handleScrollStop = () => {
		setIsClicked(false);
	};

	const handleClick = () => {
		// to="/jobs/create-job?activeTab=1"
		console.log("...........");
		const { prevUrl, params } = props.location.state;
		// console.log('cr abhi ', `${prevUrl}?${params}&activeTab=1`);
		console.log("cr abhi params ", params);
		props.history.push(`${prevUrl}?activeTab=1`);
	};

	/* TO SHOW SPINNER ONLY WHEN PAGE LOADS FIRST TIME */
	return props.loading ? (
		<Spinner />
	) : (
			<>
				<div className="questions general_questions_page">
					<div className="cta mb20">
						<button onClick={handleClick} className="primary-btn blue">
							Back to job post
					</button>
					</div>

					<div className="outer">
						<div className="left">
							<ul>
								<li className={`${activeTab === 0 ? "active" : ""}`} onClick={() => handleScroll(0)}>
									General Questions
								<span className="common-check-icon"></span>
								</li>
								<li className={`${activeTab === 1 ? "active" : ""}`} onClick={() => handleScroll(1)}>
									Personality Assessment <span className="common-check-icon"></span>
								</li>
								<li className={`${activeTab === 2 ? "active" : ""}`} onClick={() => handleScroll(2)}>
									Coursework <span className="common-check-icon"></span>
								</li>
								<li className={`${activeTab === 3 ? "active" : ""}`} onClick={() => handleScroll(3)}>
									Work History <span className="common-check-icon"></span>
								</li>
								<li className={`${activeTab === 4 ? "active" : ""}`} onClick={() => handleScroll(4)}>
									Commute <span className="common-check-icon"></span>
								</li>
							</ul>
						</div>
						<div className="right">
							<Scrollbars
								onScroll={handleScrolling}
								onScrollStop={handleScrollStop}
								ref={scrollBar}
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
								renderTrackHorizontal={() => (
									<div
										style={{
											display: "none",
										}}
									/>
								)}
							>
								<GeneralQuestions calHeight={calHeight} />
								<PersonalityAssessment calHeight={calHeight} />
								<CourseWork calHeight={calHeight} />
								<WorkHistory calHeight={calHeight} />
								<CommuteQuestions calHeight={calHeight} />
							</Scrollbars>
						</div>
					</div>
				</div>
			</>
		);
}

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
		jobToUpdate: state.employerReducer.jobToUpdate,
		jobURL: state.employerReducer.jobURL,
	};
}

export default connect(mapStateToProps)(GeneralQuestionsPage);
