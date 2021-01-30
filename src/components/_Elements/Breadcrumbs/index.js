import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Breadcrumbs({ items }) {
	// console.log(items);

	return (
		<ul className="breadcrumbs">
			{/* {items.map((link, i) => {
				return (
					<li key={i}>
						<Link exact to="/">
							{link}
						</Link>
					</li>
				);
			})} */}
			{items.map(({ to, label }) => (
				<Link key={to} to={to}>
					{label}
				</Link>
			))}
			{/* <li>
				<NavLink exact to="/">
					View Jobs
				</NavLink>
			</li>
			<li>
				<NavLink exact to="/dashboard">
					Candidate View
				</NavLink>
			</li> */}
		</ul>
	);
}

export default Breadcrumbs;
