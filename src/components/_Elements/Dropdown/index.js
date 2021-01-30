import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import InputRange from "react-input-range";

import "./index.scss";

function Dropdown({
	id,
	placeholder,
	content,
	selected,
	onchange,
	tabIndex,
	callback = undefined,
}) {
	const [active, setactive] = useState(false);
	const [value, setvalue] = useState(null);
	const [isChanged, setIsChanged] = useState(false);
	const [sliderValue, setSliderValue] = useState(40);
	const dropDownEl = React.useRef();

	// const [currentKey, setCurrentKey] = useState(undefined);
	const [highlightedIndex, sethighlightedIndex] = useState(-1);

	const handleItemClick = (item) => {
		console.log("........handleItemClick.........", item);
		onchange && onchange(item.id ? item.id : item);
		setvalue(item.val ? item.val : item);
		setactive(false);
		setIsChanged(true);
		if (callback) {
			callback();
		}
	};

	const renderContent = () => {
		if (content === "slider") {
			return (
				<div className="content slider">
					<InputRange
						minValue={0}
						maxValue={100}
						value={sliderValue}
						onChange={(value) => setSliderValue(value)}
					/>
				</div>
			);
		} else {
			return (
				<ul className="content">
					{content &&
						content.length &&
						content.map((item, key) => {
							return (
								<li
									onClick={() => {
										// console.log("clickkkkkk");
										handleItemClick(item);
									}}
									key={key}
									className={highlightedIndex === key ? "highlighted" : ""}
								>
									{item.val ? item.val : item}
								</li>
							);
						})}
				</ul>
			);
		}
	};

	const handleClickOutside = (e) => {
		if (e.target.closest(".common-dropdown") !== dropDownEl.current)
			setactive(false);
	};

	const handleChange = (e) => {
		let key = e.which;
		// e.preventDefault();

		if (key === 40) {
			// console.log("Down");
			// setCurrentKey("down");
			if (highlightedIndex === -1) {
				sethighlightedIndex(0);
			} else if (highlightedIndex < content.length - 1) {
				sethighlightedIndex(highlightedIndex + 1);
			}
		} else if (key === 38) {
			// console.log("Up");
			// setCurrentKey("up");
			if (highlightedIndex > 0) {
				sethighlightedIndex(highlightedIndex - 1);
			} else if (highlightedIndex === -1) {
				sethighlightedIndex(content.length - 1);
			}
		} else if (key === 13) {
			// console.log("Enter");
			document.querySelector(".common-dropdown .highlighted").click();
		}
	};

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [active, selected]);

	return (
		<div
			className={`common-dropdown ${active ? "active" : ""}  ${
				isChanged || selected ? "changed" : ""
			}`}
			id={id && id}
			ref={dropDownEl}
			onKeyDown={(e) => {
				console.log("keydownnnnn");
				if (active) {
					handleChange(e);
				}
			}}
		>
			<div
				className="heading"
				onClick={() => setactive(!active)}
				// onFocus={() => {
				// 	// if (document.querySelector(".common-dropdown.active")) {
				// 	// 	document
				// 	// 		.querySelector(".common-dropdown.active")
				// 	// 		.classList.remove("active");
				// 	// }
				// 	!active && setactive(true);
				// }}
				// onBlur={() => setactive(false)}
				tabIndex={tabIndex ? tabIndex : "0"}
			>
				{selected ? selected : value ? value : placeholder}
				<FontAwesomeIcon
					icon={active ? faChevronUp : faChevronDown}
					className="arrow"
				/>
			</div>

			{renderContent()}
		</div>
	);
}

export default Dropdown;
