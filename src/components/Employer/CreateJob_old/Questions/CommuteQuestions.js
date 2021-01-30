import React from "react";

import Input from "../../../_Elements/Input";

function CommuteQuestions(props) {
	const parent = React.useRef();

	React.useEffect(() => {
		// props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="commute-questions" ref={parent}>
			<div className="heading">
				<h2>Commute Questions</h2>
			</div>
			<div className="content">
				<ul className="general-questions">
					{/* <li className="general-question">
						<h2 className="question">What is your home address?</h2>
						<div className="options">
							<Input type="text" placeholder="247 King St. Warren, NJ" />
						</div>
					</li> */}
					<li className="general-question">
						<h2 className="question">
							Do you have any other jobs that you plan to continue with?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="otherJob"
								type="radio"
								id="otherJobYes"
								disabled
							/>
							<label htmlFor="otherJobYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle blue radio"
								name="otherJob"
								type="radio"
								id="otherJobNo"
								disabled
							/>
							<label htmlFor="otherJobNo">
								<span className="input"></span>No
							</label>
						</div>
						<ul className="level_2">
							<li>Please enter the addresses of your other Jobs.</li>
							<li className="general-question border">
								<ul className="address">
									<li>Adress 1</li>
									<li>
										<label htmlFor="street">Street Adress</label>
										<Input type="text" disabled />
									</li>
									<li>
										<label htmlFor="street">Zip Code</label>
										<Input type="number" disabled />
									</li>
									<li>
										<label htmlFor="street">City</label>
										<Input type="text" disabled />
									</li>
									<li>
										<label htmlFor="street">State</label>
										<Input type="text" disabled />
									</li>
								</ul>
							</li>
							{/* <li id="addAddressBtn" className="add-address">
								Add Another Address
							</li> */}
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CommuteQuestions;
