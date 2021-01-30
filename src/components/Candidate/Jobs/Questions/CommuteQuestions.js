import React from "react";
import { initRadioClick } from "../../../../assets/js/Utility";

import Input from "../../../_Elements/Input";
import { isAnswer, findIndex } from "./index";

function CommuteQuestions({ data, onchange, calHeight, noHeading, ...props }) {
	const parent = React.useRef();
	const [addressCount, setAddressCount] = React.useState([""]);

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [calHeight]);

	const addAdress = () => {
		let _addressCount = [...addressCount];
		_addressCount.push("");
		setAddressCount(_addressCount);
		props && props.newAddress && props.newAddress(_addressCount);
	};

	React.useEffect(() => {
		initRadioClick(".commute-questions");
	}, []);

	return (
		<div className="commute-questions" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Commute Questions</h2>
				</div>
			) : (
					""
				)}
			<div className="content">
				<ul className="general-questions">
					<li className="general-question">
						<h2 className="question">
							What address will you be commuting from?<span className="requiredStar">*</span>
						</h2>
						{/* <span className={`error-text ${!data[0].required && "hidden"}`}>
							Required
						</span> */}
						{/* <div className="options">
							<Input
								type="text"
								placeholder="247 King St. Warren, NJ"
								defaultValue={data[findIndex(data, 1)]["answer"]}
								onChange={(e) => {
									onchange(1, e.target.value);
								}}
							/>
						</div> */}
						<ul className="level_2 ">
							<li className="general-question border">
								<ul className="address">
									<span
										className={`error-text ${(data[0].answer.hasOwnProperty("street")
												? data[0].answer.street
												: true) && "hidden"
											}`}
									>
										Required
									</span>
									<li>
										<label htmlFor="street">
											Street Address<span className="requiredStar">*</span>
										</label>
										{data[0].answer.hasOwnProperty("street")}
										<Input
											type="text"
											autoComplete="hidden"
											defaultValue={
												data[findIndex(data, 1)]["answer"][`street`]
											}
											onChange={(e) => {
												onchange(1, {
													address: `street`,
													value: e.target.value,
												});
											}}
										/>
									</li>
									<span
										className={`error-text ${(data[0].answer.hasOwnProperty("city")
												? data[0].answer.city
												: true) && "hidden"
											}`}
									>
										Required
									</span>
									<li>
										<label htmlFor="street">
											City<span className="requiredStar">*</span>
										</label>
										<Input
											type="text"
											autoComplete="none"
											defaultValue={data[findIndex(data, 1)]["answer"][`city`]}
											onChange={(e) => {
												onchange(1, {
													address: `city`,
													value: e.target.value,
												});
											}}
										/>
									</li>
									<span
										className={`error-text ${(data[0].answer.hasOwnProperty("state")
												? data[0].answer.state
												: true) && "hidden"
											}`}
									>
										Required
									</span>
									<li>
										<label htmlFor="street">
											State<span className="requiredStar">*</span>
										</label>
										<Input
											type="text"
											autoComplete="none"
											defaultValue={data[findIndex(data, 1)]["answer"][`state`]}
											onChange={(e) => {
												onchange(1, {
													address: `state`,
													value: e.target.value,
												});
											}}
										/>
									</li>
									<span
										className={`error-text ${(data[0].answer.hasOwnProperty("zip")
												? data[0].answer.zip
												: true) && "hidden"
											}`}
									>
										Required
									</span>
									{data[findIndex(data, 1)]["answer"][`zip`] ? (
										<span className={`invalid_zip`}>
											{data[findIndex(data, 1)]["answer"][`zip`].match(/^\d+$/)
												? ""
												: "Invalid format"}
										</span>
									) : (
											""
										)}
									<li>
										<label htmlFor="street">
											Zip Code<span className="requiredStar">*</span>
										</label>
										<Input
											type="number"
											autoComplete="none"
											defaultValue={data[findIndex(data, 1)]["answer"][`zip`]}
											onChange={(e) => {
												onchange(1, {
													address: `zip`,
													value: e.target.value,
												});
											}}
										/>
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li className="general-question" role="radiogroup">
						<h2 className="question">
							Do you have any other jobs that you plan to continue with?
							<span className="requiredStar">*</span>
						</h2>
						<span className={`error-text ${!data[1].required && "hidden"}`}>
							Required
						</span>
						<div className="options">
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 2, 1) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue yes radio"
									name="otherJob"
									type="radio"
									id="otherJobYes"
									checked={isAnswer(data, 2, 1)}
									onChange={() => {
										onchange(2, 1);
									}}
								/>
								<label htmlFor="otherJobYes">
									<span className="input"></span>Yes
								</label>
							</span>
							<span
								className="option radio_button"
								role="radio"
								aria-checked="false"
								tabindex={isAnswer(data, 2, 2) ? "0" : "-1"}
							>
								<input
									className="fancy-toggle blue"
									name="otherJob"
									type="radio"
									id="otherJobNo"
									checked={isAnswer(data, 2, 2)}
									onChange={() => {
										onchange(2, 2);
									}}
								/>
								<label htmlFor="otherJobNo">
									<span className="input"></span>No
								</label>
							</span>
						</div>
						{isAnswer(data, 2, 1) && findIndex(data, 3) >= 0 && (
							<ul className="level_2">
								<li>
									Please enter the addresses of your other Jobs.
									<span className="requiredStar">*</span>
								</li>
								{addressCount.map((address, i) => {
									return (
										<li className="general-question border" key={i}>
											<ul className="address">
												<li>Address {i + 1}</li>
												<span
													className={`error-text ${data[2]["answer"][`street_${i}`] && "hidden"
														}`}
												>
													Required
												</span>
												<li>
													<label htmlFor="street">
														Street Address
														<span className="requiredStar">*</span>
													</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`street_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `street_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
												<span
													className={`error-text ${data[2]["answer"][`city_${i}`] && "hidden"
														}`}
												>
													Required
												</span>
												<li>
													<label htmlFor="street">
														City<span className="requiredStar">*</span>
													</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`city_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `city_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
												<span
													className={`error-text ${data[2]["answer"][`state_${i}`] && "hidden"
														}`}
												>
													Required
												</span>
												<li>
													<label htmlFor="street">
														State<span className="requiredStar">*</span>
													</label>
													<Input
														type="text"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`state_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `state_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
												<span
													className={`error-text ${data[2]["answer"][`zip_${i}`] && "hidden"
														}`}
												>
													Required
												</span>
												{data[findIndex(data, 3)]["answer"][`zip_${i}`] ? (
													<span className="invalid_zip">
														{data[findIndex(data, 3)]["answer"][
															`zip_${i}`
														].match(/^\d+$/)
															? ""
															: "Invalid format"}
													</span>
												) : (
														""
													)}
												<li>
													<label htmlFor="street">
														Zip Code<span className="requiredStar">*</span>
													</label>
													<Input
														type="number"
														autoComplete="none"
														defaultValue={
															data[findIndex(data, 3)]["answer"][`zip_${i}`]
														}
														onChange={(e) => {
															onchange(3, {
																address: `zip_${i}`,
																value: e.target.value,
															});
														}}
													/>
												</li>
											</ul>
										</li>
									);
								})}
								<li
									id="addAddressBtn"
									className="add-address"
									onClick={addAdress}
								>
									Add Another Address
								</li>
							</ul>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CommuteQuestions;
