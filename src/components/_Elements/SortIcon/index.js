import React from "react";

import "./index.scss";

function SortIcon(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 307.79 443.24"
			className={`sort-icon ${props.active}`}
		>
			<path
				className="up"
				d="M235.7,24.47l-142.12,171a11.76,11.76,0,0,0,9,19.27H386.86a11.75,11.75,0,0,0,9-19.27L253.78,24.47A11.75,11.75,0,0,0,235.7,24.47Z"
				transform="translate(-90.85 -20.23)"
			/>
			<path
				className="down"
				d="M253.78,459.23l142.12-171a11.75,11.75,0,0,0-9-19.26H102.62a11.75,11.75,0,0,0-9,19.26l142.12,171A11.76,11.76,0,0,0,253.78,459.23Z"
				transform="translate(-90.85 -20.23)"
			/>
		</svg>
	);
}

export default SortIcon;
