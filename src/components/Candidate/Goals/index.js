import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import userData from "../../_data/userData.json";
import WidgetCurrentGoal from "../../_Elements/Widgets/CurrentGoal";
import WidgetExploreGoal from "../../_Elements/Widgets/ExploreGoal";
import ImgFilter from "../../../assets/filter.svg";
import Filters from "./Filters";
import Spinner from "../../_Elements/Spinner";

import {
	fetchAlternativeGoals,
	fetchCurrentGoals,
	fetchHealthCareGoals,
} from "../../../modals/candidateProfile/thunk";

function Goals() {
	const dispatch = useDispatch();
	const allGoals = useSelector(
		(state) => state.candidateSetHealthCareGoalsReducer.data
	);
	const alternativeGoalsInitial = useSelector(
		(state) => state.candidateSetAlternativeGoalsReducer.data
	);
	const cGoals = useSelector((state) => state.setCurrentGoalsReducer.data);
	const [goals, setGoals] = React.useState(allGoals);
	const [whichGoalIsActive, setwhichGoalIsActive] = React.useState("my");
	const cGoalIds = cGoals.map((entity) => entity.goal);
	const [filterOptions, setFilterOptions] = React.useState(false);
	const [alternativeGoals, setAlternativeGoals] = React.useState(
		alternativeGoalsInitial
	);
	const [currentGoal, setCurrentGoal] = React.useState(cGoalIds);
	// const alternateArray = userData.goals.alternate.map((entity, index) => {
	// 	if (!cGoalIds.includes(entity.id)) {
	// 		return entity;
	// 	} else return;
	// });
	const currentGoals = currentGoal && currentGoal.length > 0 ? currentGoal.map((goal, i) => (
		<WidgetCurrentGoal currentGoal={goal} key={i} credreadyness={null} />
	)) : "No Goals Found..";

	const alternateGoals = alternativeGoals.map((goal, i) => {
		if (goal === undefined) return;
		else
			return (
				<WidgetCurrentGoal alternateGoal={goal} key={i} credreadyness={null} />
			);
	});
	const exploreGoals = goals.map((goal, i) => {
		return <WidgetExploreGoal currentGoal={goal} key={i} />;
	});

	React.useEffect(() => {
		setCurrentGoal(cGoalIds);
		setAlternativeGoals(alternativeGoalsInitial);
	}, [cGoals, alternativeGoalsInitial]);
	React.useEffect(() => {
		setGoals(allGoals);
	}, [allGoals]);

	React.useEffect(() => {
		dispatch(fetchCurrentGoals());
		dispatch(fetchAlternativeGoals());
		dispatch(fetchHealthCareGoals());
		window.scrollTo(0, 0);
	}, []);

	const handleSearch = (searchSting, key) => {
		if (alternativeGoalsInitial) {
			let temp = alternativeGoalsInitial.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			setAlternativeGoals(temp);
		}
		if (cGoalIds) {
			let temp = cGoalIds.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			setCurrentGoal(temp);
		}
	};

	const handleExploreGoalSearch = (searchSting, key) => {
		if (allGoals) {
			let temp = allGoals.filter((val) => {
				if (
					val[key].toLowerCase().includes(searchSting.toLowerCase()) ||
					val["job_summary"].toLowerCase().includes(searchSting.toLowerCase())
				)
					return val;
			});
			setGoals(temp);
		}
	};

	return (
		<div className="goals">
			<div className="search-panel pc">
				<div className="common-main-heading">
					<h2>My Goals</h2>
					{/* <button className="btn">Sort by</button> */}
				</div>
				<div className="searches">
					<input
						type="text"
						placeholder="Search by Goal Title"
						onChange={(e) => handleSearch(e.target.value, "name")}
					/>
				</div>
			</div>

			<div className="current-goals mobile">
				<h2>
					{whichGoalIsActive === "my"
						? "My Goals"
						: whichGoalIsActive === "alternate"
						? "Alternate Goals"
						: "Explore Career Options"}
				</h2>
				<div className="common-main-heading no-icon">
					<h2
						onClick={() => setwhichGoalIsActive("my")}
						className={whichGoalIsActive === "my" ? "active" : ""}
					>
						My Goals
					</h2>
					<h2
						onClick={() => setwhichGoalIsActive("alternate")}
						className={whichGoalIsActive === "alternate" ? "active" : ""}
					>
						Alternate Goals
					</h2>
					<h2
						onClick={() => setwhichGoalIsActive("explore")}
						className={whichGoalIsActive === "explore" ? "active" : ""}
					>
						Explore Goals
					</h2>
				</div>
				<div
					className={`widgets ${whichGoalIsActive !== "my" ? "hidden" : ""}`}
				>
					{currentGoals}
				</div>
				<div
					className={`widgets ${
						whichGoalIsActive !== "alternate" ? "hidden" : ""
					}`}
				>
					{alternateGoals}
				</div>
				<div className={`${whichGoalIsActive !== "explore" ? "hidden" : ""}`}>
					<div className="heading">
						<h2>Explore Career Options</h2>
						<button
							className="primary-btn blue filter_btn"
							onClick={() => {
								setFilterOptions(!filterOptions);
							}}
						>
							<img src={ImgFilter} alt="Filter" />
						</button>
					</div>
					<div className={`search-panel ${filterOptions ? "" : ""}`}>
						<div className="searches">
							<input
								type="text"
								placeholder="Search by Job Title"
								onChange={(e) =>
									handleExploreGoalSearch(e.target.value, "name")
								}
							/>
						</div>
					</div>
					<div className={`${!filterOptions ? "hidden" : ""}`}>
						<Filters
							noSearch
							onclick={(action) => {
								window.scrollTo(0, 0);
								setFilterOptions(false);
								if (action === "done") {
									// filter logic goes heare
								}
							}}
						/>
					</div>
					<div className={`widgets ${filterOptions ? "hidden" : ""}`}>
						{exploreGoals}
					</div>
				</div>
			</div>

			<div className="current-goals pc">
				<div className="common-main-heading no-icon">
					<h2>Current Goals</h2>
				</div>
				<div className="widgets">{currentGoals}</div>
			</div>

			<div className="alternate-goals pc">
				<div className="common-main-heading no-icon">
					<h2>Alternate Goals</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				<div className="widgets">{alternateGoals}</div>
			</div>

			<div className="cta pc">
				<Link className="primary-btn blue" to="goals/explore-goals">
					Click here for Explore Career Options
				</Link>
			</div>
		</div>
	);
}

export default Goals;
