import React from "react";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import { months } from "../../../assets/js/Utility";
import { forEach, forEachRight } from "lodash";

const range = (start, end) => {
	return new Array(end - start).fill().map((d, i) => i + start);
};

function CustomDatePicker(props) {
	var now = new Date();

	const years = range(1950, getYear(now) + 1, 1);

	var currentMonth = months[now.getMonth()];

	React.useEffect(() => {
		//
		// let datePicker = document.querySelectorAll("[tabindex='0']");
	}, []);

	return (
		<DatePicker
			{...props}
			peekNextMonth
			showMonthDropdown
			showYearDropdown
			dropdownMode="select"
			autoComplete="off"
			maxDate={new Date()}
			tabIndex="0"
			onFocus={() => {
				setTimeout(() => {
					let tabIndex0ElOuter = document.querySelector(
						".react-datepicker__tab-loop"
					);
					let tabIndex0Els =
						tabIndex0ElOuter &&
						tabIndex0ElOuter.querySelectorAll("[tabindex='0']");
					tabIndex0Els.forEach((tabIndex0El) => {
						tabIndex0El.removeAttribute("tabindex");
					});

					// let _input = document.querySelector(
					// 	".react-datepicker-wrapper input"
					// );
					// _input.addEventListener("blur", () => {
					// 	// this.setBlur();
					// });
					// console.log("focus..........");
					// console.log(_input);
				});
			}}
			// onBlur={() => {
			// 	console.log("blur..........");
			// 	this.setBlur();
			// }}
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				increaseYear,
				decreaseYear,
			}) => (
				<div
					style={{
						margin: 10,
						display: "flex",
						justifyContent: "center",
					}}
					tabIndex="-1"
				>
					<button
						tabindex="-1"
						onClick={decreaseYear}
						disabled={date.getFullYear() <= 1950}
					>
						{"<<"}
					</button>
					<button
						tabindex="-1"
						onClick={decreaseMonth}
						disabled={
							date.getFullYear() <= 1950 &&
							months[date.getMonth()] === "January"
						}
					>
						{"<"}
					</button>
					<select
						tabindex="-1"
						value={getYear(date)}
						onChange={({ target: { value } }) => changeYear(value)}
					>
						{years.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					<select
						tabindex="-1"
						value={months[date.getMonth()]}
						onChange={({ target: { value } }) =>
							changeMonth(months.indexOf(value))
						}
					>
						{months.map((option) => {
							if (
								date.getFullYear() >= getYear(new Date()) &&
								months.indexOf(option) > now.getMonth()
							) {
								return (
									<option key={option} value={option} disabled>
										{option}
									</option>
								);
							}
							return (
								<option key={option} value={option}>
									{option}
								</option>
							);
						})}
					</select>
					<button
						tabindex="-1"
						onClick={increaseMonth}
						disabled={
							date.getFullYear() >= getYear(new Date()) &&
							months[date.getMonth()] === currentMonth
						}
					>
						{">"}
					</button>
					<button
						tabindex="-1"
						onClick={increaseYear}
						disabled={date.getFullYear() >= getYear(new Date())}
					>
						{">>"}
					</button>
				</div>
			)}
		/>
	);
}

export default CustomDatePicker;
