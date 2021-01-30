import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import { togglePopup, toggleOverlay } from "../../../store/actions/popup_overlay";

function InputDropdown({
	id,
	placeholder,
	content,
	selected,
	onchange,
	search_term,
	intellisense,
	allow_random,
	disable,
	tabIndex,
	showArrow,
	filter,
}) {
	const dispatch = useDispatch();
	const [active, setactive] = useState(false);
	const [value, setvalue] = useState(null);
	const [isChanged, setIsChanged] = useState(false);
	const [prevHeight, setPrevHeight] = useState(0);
	const [prevElement, setPrevElement] = useState(0);
	const [isFocus, setIsFocus] = useState(false);
	const [_content, setContent] = useState(content);

	const [currentKey, sextCurrentKey] = useState(undefined);
	const [highlightedIndex, sethighlightedIndex] = useState(-1);
	const dropDownEl = React.useRef();

	const distinct = (arr, indexedKeys, isPrioritizeFormer = true) => {
		const lookup = new Map();
		const makeIndex = (el) => indexedKeys.reduce((index, key) => `${index};;${el[key]}`, "");
		arr.forEach((el) => {
			const index = makeIndex(el);
			if (lookup.has(index) && isPrioritizeFormer) {
				return;
			}
			lookup.set(index, el);
		});

		return Array.from(lookup.values());
	};

	const toTitleCase = (str) => {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	const handleItemClick = (item) => {
		console.log(".......", item);
		onchange && onchange(item.id ? item.id : item);
		setvalue(item.val ? toTitleCase(item.val) : toTitleCase(item));
		setactive(false);
		setIsChanged(true);
	};

	const handleClickOutside = (e) => {
		if (e.target.closest(".common-dropdown") !== dropDownEl.current) {
			if (!dropDownEl.current.classList.contains("changed") && !allow_random) {
				setvalue("");
			}
			setactive(false);
		}
	};

	const createEmailTemplate = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "createEmailTemplate", { type: "add", data: undefined }]));

		setactive(false);
	};

	const renderContent = () => {
		let searchItem = null;

		if (value) {
			// searchItem = !isFocus ? value.toLowerCase(): undefined;
			searchItem = value.toLowerCase();
		}

		return (
			<ul className="content" id={`${active ? "contentId" : ""}`}>
				{id === "emailtemplate" ? (
					<li onClick={createEmailTemplate} id="create-email-template" className="create_new_template">
						+ Create a new template
					</li>
				) : (
						""
					)}
				{
					filter ?
						_content &&
						_content.map((item, key) => {
							if (typeof item === "object" && (item.val === undefined || item.id === undefined)) return null;

							if (searchItem) {
								if (search_term && searchItem.length !== 0) {
									if (!item.val.toLowerCase().includes(searchItem)) {
										return null;
									}
								} else if (!item.toLowerCase().includes(searchItem)) {
									return null;
								}
							}

							return id === "emailtemplate" ? (
								<li onClick={() => handleItemClick(item)} key={key} id="create-email-template-option">
									{item.val ? item.val : item}
								</li>
							) : (
									<li
										onClick={() => handleItemClick(item)}
										key={key}
										id={id ? id : ""}
										className={highlightedIndex === key ? "highlighted" : ""}
									>
										{item.val ? item.val : item}
									</li>
								);
						}) : content &&
						content.map((item, key) => {
							if (typeof item === "object" && (item.val === undefined || item.id === undefined)) return null;

							if (searchItem) {
								if (search_term && searchItem.length !== 0) {
									if (!item.val.toLowerCase().includes(searchItem)) {
										return null;
									}
								} else if (!item.toLowerCase().includes(searchItem)) {
									return null;
								}
							}

							return id === "emailtemplate" ? (
								<li onClick={() => handleItemClick(item)} key={key} id="create-email-template-option">
									{item.val ? item.val : item}
								</li>
							) : (
									<li
										onClick={() => handleItemClick(item)}
										key={key}
										id={id ? id : ""}
										className={highlightedIndex === key ? "highlighted" : ""}
									>
										{item.val ? item.val : item}
									</li>
								);
						})
				}
			</ul>
		);
	};

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	React.useEffect(() => {
		filter && content.length > 0 && setContent(distinct(content, filter));
	}, [content]);

	React.useEffect(() => {
		// element which needs to be scrolled to
		// let ul = document.querySelector('ul');
		// let nodes = document.querySelectorAll('li');

		let activeDropDownEl = document.querySelector(".common-input-dropdown.active");
		if (activeDropDownEl) {
			let highlightEl = activeDropDownEl.querySelector(`.content li:nth-child(${highlightedIndex + 1})`);

			console.log("highlightedIndex: ", highlightedIndex, activeDropDownEl, highlightEl);

			// let elHeight = $(nodes[highlightedIndex]).height();
			// let scrollTop = $(ul).scrollTop();
			// let viewport = scrollTop + $(ul).height();
			// let elOffset = elHeight * highlightedIndex;
			// let x = document.getElementById('contentId');
			// let currentHeight;
			// if (currentKey === 'up') {
			// 	currentHeight = prevHeight - prevElement;
			// 	setPrevHeight(currentHeight);
			// 	x.scroll(0, currentHeight);
			// } else if (currentKey === 'down') {
			// 	currentHeight = prevHeight + highlightEl.offsetHeight;
			// 	setPrevHeight(currentHeight);
			// 	x.scroll(0, prevHeight);
			// } else {

			// }
			// setPrevElement(highlightEl.offsetHeight);

			// console.log(x.offsetHeight, x.scrollHeight, x.clientHeight, currentKey, highlightEl.offsetHeight, prevHeight);

			// if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
			// 	$(ul).scrollTop(elOffset);

			if (highlightEl) {
				highlightEl.scrollIntoView();
				highlightEl.scrollBy(0, 20);
				return;
			}
		}

		// scroll to element
	}, [highlightedIndex]);

	const handleFocus = () => {
		setIsFocus(true);
	};
	const handleBlur = () => {
		setIsFocus(false);
	};

	const handleChange = (e) => {
		let key = e.which;
		e.preventDefault();

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
			console.log("Enter");
			document.querySelector(".common-dropdown .highlighted").click();
		}
	};

	return (
		<div
			className={`common-dropdown common-input-dropdown ${active ? "active" : ""}  ${isChanged || selected ? "changed" : ""
				}`}
			id={id && id}
			ref={dropDownEl}
		// onKeyDown={(e) => handleChange(e)}
		>
			<div className="heading" onClick={() => disable !== true && setactive(true)}>
				<input
					type="text"
					placeholder={placeholder}
					value={selected ? selected : value ? value : ""}
					autoComplete="none"
					className={`${showArrow ? "showArrow" : ""}`}
					onChange={(e) => {
						dropDownEl.current.classList.remove("changed");
						setvalue(e.target.value);
						//setIsFocus(false);
						onchange && onchange(e.target.value);
					}}
					disabled={disable === true ? true : false}
					onFocus={() => {
						let activeEl = document.querySelector(".common-dropdown.active");
						if (activeEl) {
							activeEl.classList.remove("active");
							// activeEl.blur();
						}
						setactive(true);
					}}
					// onBlur={() => setactive(false)}
					tabIndex={tabIndex ? tabIndex : "0"}
				/>
				{showArrow && <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} className="arrow" />}
			</div>
			{intellisense ? (value && value.length > 0 ? renderContent() : null) : renderContent()}
		</div>
	);
}

export default InputDropdown;
