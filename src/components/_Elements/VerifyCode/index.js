import React, { useState, useEffect, useRef } from "react";

import "./index.scss";

function VerifyCode(props) {
	const [otp, setOtp] = useState(new Array(4).fill(""));
	const [pastedOtp, setpastedOtp] = useState([]);

	let refs = useRef([
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
	]);

	const handleChange = (e, idx, value) => {
		let t = e.currentTarget,
			nextSib = t.nextElementSibling;

		value = +value;

		if (!isNaN(value)) {
			setOtp([...otp.map((d, i) => (i === idx ? value : d))]);

			if (idx !== 3) {
				nextSib.focus();
				nextSib.select();
			} else {
				// refs.current[0].current.focus();
				// refs.current[0].current.select();
			}
		}
	};

	const handleKeyDown = (e, idx) => {
		let key = e.which,
			t = e.currentTarget,
			nextSib = t.nextElementSibling,
			prevSib = t.previousElementSibling;

		// console.log("key::", key);

		if (key === 13) {
			// console.log("Enter Pressed");
		} else if (key === 8) {
			// console.log("Backspace Pressed");
			if (idx !== 0) {
				prevSib.focus();
				prevSib.select();
				if (otp[idx] !== "") {
					setOtp([...otp.map((d, i) => (i === idx ? "" : d))]);
				} else {
					setOtp([...otp.map((d, i) => (i === idx - 1 ? "" : d))]);
				}
			} else {
				setOtp([...otp.map((d, i) => (i === idx ? "" : d))]);
			}
		} else if (key === 37 || key === 40) {
			// console.log("Left or Down Pressed");
			if (idx !== 0) {
				prevSib.focus();
				prevSib.select();
			} else {
				refs.current[3].current.focus();
				refs.current[3].current.select();
			}
		} else if (key === 39 || key === 38) {
			// console.log("Right or Up Pressed");
			if (idx !== 3) {
				nextSib.focus();
				nextSib.select();
			} else {
				refs.current[0].current.focus();
				refs.current[0].current.select();
			}
		}
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	useEffect(() => {
		if (props.setOtp) {
			props.setOtp(otp);
		}
	}, [props, otp]);

	useEffect(() => {
		document.addEventListener("paste", function (event) {
			var clipText = event.clipboardData.getData("Text");
			if (isNaN(+clipText)) {
				return;
			}
			let _pastedOtp = [];
			if (clipText.trim().toString().length === 4) {
				[...clipText.trim()].forEach((el) => {
					_pastedOtp.push(+el);
				});
				if (refs.current[0].current) {
					refs.current[3].current.focus();
					refs.current[0].current.value = _pastedOtp[0];
					refs.current[1].current.value = _pastedOtp[1];
					refs.current[2].current.value = _pastedOtp[2];
					refs.current[3].current.value = _pastedOtp[3];
					setOtp(_pastedOtp);
				}
			}
		});
	}, []);

	return (
		<form className="verify-code">
			{otp.map((data, index) => {
				return (
					<input
						key={index}
						value={data}
						type="number"
						// maxLength="1"
						ref={refs.current[index]}
						className={`input_${index}`}
						id={
							props.type === "Email"
								? `verifyCodeEmailInput_${index}`
								: `verifyCodePhoneInput_${index}`
						}
						// size="1"
						// min="0"
						// max="9"
						// pattern="[0-9]{1}"
						autoFocus={index === 0 ? true : false}
						autoComplete="hidden"
						onKeyDown={(e) => {
							e.target.value = "";
							handleKeyDown(e, index);
						}}
						onChange={(e) => handleChange(e, index, e.target.value)}
						onFocus={(e) => handleFocus(e)}
					/>
				);
			})}
		</form>
	);
}

export default VerifyCode;
