import React from "react";
import { initRadioClick } from "../../../../assets/js/Utility";

import { isAnswer } from "./index";

function PersonalityAssessment({ data, calHeight, onchange, noHeading }) {
	// console.log('abhi data PersonalityAssessment ', data);
	const parent = React.useRef();

	const listData = [
		"When someone else is feeling excited, I tend to get excited too.",
		"Other people’s misfortunes do not disturb me a great deal.",
		"It upsets me to see someone being treated disrespectfully.",
		"I remain unaffected when someone close to me is happy.",
		"I enjoy making other people feel better.",
		"I have tender, concerned feelings for people less fortunate than me.",
		"When a friend starts to talk about his\\her problems, I try to steer the conversation towards something else.",
		"I can tell when others are sad even when they do not say anything.",
		"I find that I am “in tune” with other people’s moods.",
		"I do not feel sympathy for people who cause their own serious illnesses.",
		"I become irritated when someone cries.",
		"I am not really interested in how other people feel.",
		"I get a strong urge to help when I see someone who is upset.",
		"When I see someone being treated unfairly, I do not feel very much pity for them.",
		"I find it silly for people to cry out of happiness.",
		"When I see someone being taken advantage of, I feel kind of protective towards him/her.",
	];

	let radioOptions = ["Never", "Rarely", "Sometimes", "Often", "Always"];

	React.useEffect(() => {
		if (calHeight) {
			calHeight(parent.current.clientHeight);
		}
	}, [calHeight]);

	React.useEffect(() => {
		initRadioClick(".personality-assessment");
	}, []);

	const renderRadioInputs = (id) => {
		let inputs = [];
		let _answer = null;
		for (let i = 0; i < 5; i++) {
			if (isAnswer(data, id + 1, i)) {
				_answer = i;
			}
		}

		for (let i = 0; i < 5; i++) {
			inputs.push(
				<li
					key={`${id}${i}`}
					onClick={() => {
						document.getElementById(`radio_${id}${i}`).click();
					}}
					role="radio"
					aria-checked="false"
					tabindex={
						_answer ? (_answer === i ? "0" : "-1") : i === 0 ? "0" : "-1"
					}
				>
					<input
						type="radio"
						className="fancy-toggle blue"
						id={`radio_${id}${i}`}
						name={`radio_${id}`}
						checked={_answer === i}
						onChange={() => onchange(id + 1, i)}
					/>
					<label htmlFor={`radio_${id}${i}`}>
						<span className="input"></span>
					</label>

					<span className="text">{radioOptions[i]}</span>
				</li>
			);
		}

		return inputs;
	};

	const renderList = () => {
		const lists = listData.map((content, i) => {
			return (
				<li key={i}>
					<ul className="ul_1">
						<li>
							{content}
							<span className="requiredStar">*</span>
							<span className={`error-text ${!data[i].required && "hidden"}`}>
								Required
							</span>
						</li>
						<ul
							className="ul_2"
							role="radiogroup"
						// id={`group_label_${i}`}
						// aria-labelledby={`group_label_${i}`}
						>
							{renderRadioInputs(i)}
						</ul>
					</ul>
				</li>
			);
		});

		return lists;
	};

	return (
		<div className="personality-assessment" ref={parent}>
			{!noHeading ? (
				<div className="heading">
					<h2>Your Personal Experiences</h2>
					<ul>
						<li>Never</li>
						<li>Rarely</li>
						<li>Sometimes</li>
						<li>Often</li>
						<li>Always</li>
					</ul>
				</div>
			) : (
					""
				)}
			<div className="content">
				<ul className="ul_0">{renderList()}</ul>
			</div>
		</div>
	);
}

export default PersonalityAssessment;
