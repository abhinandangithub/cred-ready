import React from "react";

import "./index.scss";

function Input(props) {
	return (
		<input
			{...props}
			className={`common-input ${props.cls ? props.cls : ""}`}
		/>
	);
}

export default Input;
