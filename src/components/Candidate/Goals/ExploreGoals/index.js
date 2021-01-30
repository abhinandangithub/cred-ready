import React from "react";

import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import WidgetExploreGoal from "../../../_Elements/Widgets/ExploreGoal";
import { fetchHealthCareGoals } from "../../../../modals/candidateProfile/thunk";
import Filters from "../Filters";

function ExploreGoals() {
	const dispatch = useDispatch();
	const allGoals = useSelector(
		(state) => state.candidateSetHealthCareGoalsReducer.data
	);
	const [goals, setGoals] = React.useState(allGoals);

	const exploreGoals = goals.map((goal, i) => {
		return <WidgetExploreGoal currentGoal={goal} key={i} />;
	});

	React.useEffect(() => {
		dispatch(fetchHealthCareGoals());
		window.scrollTo(0, 0);
	}, []);

	React.useEffect(() => {
		setGoals(allGoals);
	}, [allGoals]);

	return (
		<div className="explore-goals">
			<div className="outerPart">
				<div className="goalsPart">
					Current Goal
				</div>
				{`>`}
				<div className="exploreGoalsPart">
					Explore Goals
				</div>
			</div>

			<div className="common-main-heading no-icon">
				<h2>Explore Career Options</h2>
			</div>
			<div className="outer">
				<div className="left">
					<Filters />
				</div>
				<div className="right">
					<div className="widgets">{exploreGoals}</div>
				</div>
			</div>
		</div>
	);
}

export default ExploreGoals;
