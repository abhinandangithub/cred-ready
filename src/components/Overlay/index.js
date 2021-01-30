import React from "react";

import "./index.scss";

function Overlay(props) {
	return <div className={`overlay ${props.active ? "active" : ""}`}></div>;
}

export default Overlay;
