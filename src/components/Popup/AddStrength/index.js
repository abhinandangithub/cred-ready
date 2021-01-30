import React, { useState } from "react";
import InputRange from "react-input-range";

import "./index.scss";
import Input from "../../_Elements/Input";

function AddStrength({ heading }) {
	const [value, setValue] = useState(2);

	return (
		<div className="add-strenght">
			<h1>{heading}</h1>
			<ul className="content">
				<li>
					<label htmlFor="">Name</label>
					<Input />
				</li>
				<li>
					<label htmlFor="">Range</label>
					<InputRange
						maxValue={5}
						minValue={0}
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</li>
			</ul>
			<div className="cta">
				<button className="primary-btn">Add</button>
			</div>
		</div>
	);
}

export default AddStrength;
