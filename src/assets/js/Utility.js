export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export const monthsShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const getRandomColor = () => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const findIndexOfObjInArr = (arr, key, value) => {
	let index = -1;
	arr.forEach((item, i) => {
		if (item[key] === value) {
			index = i;
		}
	});
	return index;
};

export const formatDate = (date, format) => {
	let m = "" + date.getMonth(),
		d = "" + date.getDate(),
		y = date.getFullYear();

	if (format === "yyyy-mm-dd") {
		m = "" + (+m + 1);
		if (m.length < 2) m = "0" + m;
		if (d.length < 2) d = "0" + d;

		return [y, m, d].join("-");
	} else if (format === "utc") {
		return Date.UTC(y, m, d);
	} else {
		if (d.length < 2) d = "0" + d;

		return `${months[m].substr(0, 3)} ${d}, ${y}`;
	}
};

export const checkFileSize = (file, limit) => {
	// compare file type find doesn't matach
	if (file && file.size / 1024 / 1024 >= limit) {
		return `Maximum file size limit is ${limit} MB`;
	} else {
		return true;
	}
};

export const checkMimeType = (file, type) => {
	// list allow mime type
	const pdfTypes = ["application/pdf"];
	const imgTypes = ["image/jpeg", "image/gif", "image/png"];
	const docTypes = [
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	];

	// compare file type find doesn't matach
	if (type === "pdf") {
		if (pdfTypes.every((type) => file.type !== type)) {
			return "Unsupported resume format. Please upload in PDF or Word (.docx) format.";
		} else {
			return true;
		}
	} else if (type === "doc") {
		if (docTypes.every((type) => file.type !== type)) {
			return "Unsupported resume format. Please upload in PDF or Word (.docx) format.";
		} else {
			return true;
		}
	} else if (type === "img") {
		if (imgTypes.every((type) => file.type !== type)) {
			return "Unsupported image format. Please upload the image in JPEG, JPG, PNG or GIF format.";
		} else {
			return true;
		}
	}
};

export const calculateTimeLeft = (timerDuration) => {
	const difference = timerDuration;
	let timeLeft = {};

	if (difference > 0) {
		let minutes = parseInt(difference / 60, 10);
		let seconds = parseInt(difference % 60, 10);
		timeLeft = {
			m: minutes < 10 ? "0" + minutes : minutes,
			s: seconds < 10 ? "0" + seconds : seconds,
		};
	}
	return timeLeft;
};

/*******************************************************/
// formatPhoneText
// returns a string that is in XXX-XXX-XXXX format
/*******************************************************/
var down = true;
var filter = [];

//since we're looking for phone numbers, we need
//to allow digits 0 - 9 (they can come from either
//the numeric keys or the numpad)
const keypadZero = 48;
const numpadZero = 96;

//add key codes for digits 0 - 9 into this filter
for (var i = 0; i <= 9; i++) {
	filter.push(i + keypadZero);
	filter.push(i + numpadZero);
}

//add other keys that might be needed for navigation
//or for editing the keyboard input
filter.push(8); //backspace
filter.push(9); //tab
filter.push(46); //delete
filter.push(37); //left arrow
filter.push(39); //right arrow

export const formatPhoneText = (value, code) => {
	value = value.trim().replace(/-/g, "");

	if (filter.indexOf(code) < 0) {
		return "";
	}

	// console.log(code, value.length, value, +value[0]);

	// 1 (678) 912-3456
	if (+value[0] === 1 || code === 49) {
		if (value.length === 0) {
			// value = "1 (";
			// value = value.substring(0, value.length - 1);
		} else if (value.length === 6) {
			value = value + ") ";
		} else if (value.length > 11)
			value = value.slice(0, 11) + "-" + value.slice(11);
	} else {
		// (678) 912-3456
		if (value.length === 0) {
			value = "(" + value;
		} else if (value.length === 4) {
			value = value + ") ";
		} else if (value.length > 9)
			value = value.slice(0, 9) + "-" + value.slice(9);
	}

	return value;
};

const validatePhone = (p) => {
	var phoneRe = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
	var digits = p.replace(/\D/g, "");
	return phoneRe.test(digits);
};

export const handleKeyDownPhone = (e) => {
	if (filter.indexOf(e.keyCode) < 0) {
		e.preventDefault();
		return false;
	}

	if (e.keyCode !== 8) {
		var input = e.target;
		var formatted = formatPhoneText(input.value, e.keyCode);
		input.value = "";
		input.value = formatted;
	}
};

export const handleKeyUpPhone = (e) => {
	if (e.keyCode !== 8) {
		var input = e.target;
		var formatted = formatPhoneText(input.value, e.keyCode);
		// console.log(formatted, formatted.indexOf("(("));
		// formatted.replace("((", "(");
		// formatted.replace("))", ")");
		if (formatted === "1") {
			input.value = "1 (";
		} else {
			// input.value = formatted;
		}
	}

	// if (down) return;
	// console.log("uppppppppppp", down);
	// down = false;
	// var isError = validatePhone(formatted) || formatted.length === 0;
	// var color = isError ? "gray" : "red";
	// var borderWidth = isError ? "1px" : "3px";
	// input.style.borderColor = color;
	// input.style.borderWidth = borderWidth;
	// restrict(() => , 200);
};

/*******************************************************/
// tab behaviour
/*******************************************************/
const RadioGroup = function (domNode) {
	this.domNode = domNode;

	this.radioButtons = [];

	this.firstRadioButton = null;
	this.lastRadioButton = null;
};

RadioGroup.prototype.init = function () {
	// initialize pop up menus
	if (!this.domNode.getAttribute("role")) {
		this.domNode.setAttribute("role", "radiogroup");
	}

	var rbs = this.domNode.querySelectorAll("[role=radio]");

	for (var i = 0; i < rbs.length; i++) {
		var rb = new RadioButton(rbs[i], this);
		rb.init();
		this.radioButtons.push(rb);

		// console.log(rb);

		if (!this.firstRadioButton) {
			this.firstRadioButton = rb;
		}
		this.lastRadioButton = rb;
	}
	// this.firstRadioButton.domNode.tabIndex = 0;
};

RadioGroup.prototype.setChecked = function (currentItem, key, count) {
	for (var i = 0; i < this.radioButtons.length; i++) {
		var rb = this.radioButtons[i];
		rb.domNode.setAttribute("aria-checked", "false");
		rb.domNode.tabIndex = -1;
	}
	currentItem.domNode.setAttribute("aria-checked", "true");
	currentItem.domNode.tabIndex = 0;
	currentItem.domNode.focus();

	// if (key) {
	// 	let el = currentItem.domNode;
	// 	el.classList.contains("radio_button") && (el = el.querySelector("label"));
	// 	key === "enterOrSpace" && el.click();
	// }

	/* Select directly the highlighted radio element */
	let el = currentItem.domNode;
	el.classList.contains("radio_button") && (el = el.querySelector("label"));
	if (count === 1) {
		// console.log("=================");
		// console.log(el, key, count);
		count++;
		el.click();
	}
};

RadioGroup.prototype.setCheckedToPreviousItem = function (currentItem) {
	var index;

	if (currentItem === this.firstRadioButton) {
		this.setChecked(this.lastRadioButton);
	} else {
		index = this.radioButtons.indexOf(currentItem);
		this.setChecked(this.radioButtons[index - 1]);
	}
};

RadioGroup.prototype.setCheckedToNextItem = function (currentItem) {
	var index;

	if (currentItem === this.lastRadioButton) {
		this.setChecked(this.firstRadioButton);
	} else {
		index = this.radioButtons.indexOf(currentItem);
		this.setChecked(this.radioButtons[index + 1]);
	}
};

const RadioButton = function (domNode, groupObj) {
	this.domNode = domNode;
	this.radioGroup = groupObj;

	this.keyCode = Object.freeze({
		RETURN: 13,
		SPACE: 32,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
	});
};

RadioButton.prototype.init = function () {
	// this.domNode.tabIndex = -1;
	this.domNode.setAttribute("aria-checked", "false");

	this.domNode.addEventListener("keydown", this.handleKeydown.bind(this));
	this.domNode.addEventListener("click", this.handleClick.bind(this));
	this.domNode.addEventListener("focus", this.handleFocus.bind(this));
	this.domNode.addEventListener("blur", this.handleBlur.bind(this));
};

/* EVENT HANDLERS */

RadioButton.prototype.handleKeydown = function (event) {
	var tgt = event.currentTarget,
		flag = false,
		clickEvent;

	console.log(
		"[RadioButton][handleKeydown]: " + event.keyCode + " " + this.radioGroup
	);

	switch (event.keyCode) {
		case this.keyCode.SPACE:
		case this.keyCode.RETURN:
			this.radioGroup.setChecked(this, "enterOrSpace", 1);
			flag = true;
			break;

		case this.keyCode.UP:
			this.radioGroup.setCheckedToPreviousItem(this);
			flag = true;
			break;

		case this.keyCode.DOWN:
			this.radioGroup.setCheckedToNextItem(this);
			flag = true;
			break;

		case this.keyCode.LEFT:
			this.radioGroup.setCheckedToPreviousItem(this);
			flag = true;
			break;

		case this.keyCode.RIGHT:
			this.radioGroup.setCheckedToNextItem(this);
			flag = true;
			break;

		default:
			break;
	}

	if (flag) {
		event.stopPropagation();
		event.preventDefault();
	}
};

RadioButton.prototype.handleClick = function (event) {
	this.radioGroup.setChecked(this);
};

RadioButton.prototype.handleFocus = function (event) {
	this.domNode.classList.add("focus");
};

RadioButton.prototype.handleBlur = function (event) {
	this.domNode.classList.remove("focus");
};

export const initRadioClick = (parentSelector = "__null__") => {
	let radioGroups = document.querySelectorAll(`[role="radiogroup"]`);
	let parent = document.querySelector(parentSelector);
	parent && (radioGroups = parent.querySelectorAll(`[role="radiogroup"]`));

	console.log("..........");
	console.log(parent, radioGroups);
	radioGroups &&
		radioGroups.forEach((radioGroup) => {
			new RadioGroup(radioGroup).init();
		});
};
