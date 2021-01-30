import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function AddButton(props) {
	return props.disable ? (
		<button
			title="questions cannot be changed if candidates have already applied for the job"
			className="add-btn"
			onClick={props.onclick}
			id={props.id}
			disabled={props.disable}
			style={props.style}
			data-toolTip={props.toolTip}
		>
			<span className="icon">
				<FontAwesomeIcon icon={faPlus} />
			</span>
			{props.content}
		</button>
	) : (
		<button className="add-btn" onClick={props.onclick} id={props.id} style={props.style} data-toolTip={props.toolTip}>
			<span className="icon">
				<FontAwesomeIcon icon={faPlus} />
			</span>
			{props.content}
		</button>
	);
}

export default AddButton;
