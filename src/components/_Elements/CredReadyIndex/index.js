import React from "react";

import "./index.scss";

function CredReadyIndex(props) {
	const deg = (i) => {
		if (i <= 0) {
			return -90;
		} else if (i >= 100) {
			return 90;
		} else if (i >= 50) {
			return ((i - 50) * 9) / 5;
		} else if (i <= 50) {
			return -((50 - i) * 9) / 5;
		}
	};

	return (
		<div className="cred-ready-index">
			{/* {!props.noHeading && <h3 className="heading">CredReadiness</h3>} */}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 295.67 172.75">
				<path
					d="M15.9 154h31.25a105.91 105.91 0 0129.72-73.7L54.78 58.2A137 137 0 0015.9 154z"
					style={{ opacity: ".2", fill: "#39b54a" }}
				/>
				<path
					d="M153.4 16.5a137 137 0 00-95.8 38.88l22.1 22.09a106.24 106.24 0 01147.4 0l22.1-22.09a137 137 0 00-95.8-38.88z"
					style={{ opacity: ".5", fill: "#39b54a" }}
				/>
				<path
					d="M290.9 154a137 137 0 00-38.88-95.8l-22.09 22.1a105.91 105.91 0 0129.72 73.7z"
					style={{ opacity: "1", fill: "#39b54a" }}
				/>
				<text className="d" transform="rotate(-89.07 83.5 71.054)"></text>
				<text className="d" transform="rotate(-87 84.7 69.272)">
					G
				</text>
				<text className="d" transform="rotate(-83.88 84.533 64.327)">
					e
				</text>
				<text className="d" transform="rotate(-81.64 84.108 60.199)">
					t
				</text>
				<text className="d" transform="rotate(-80.3 83.48 57.286)"></text>
				<text className="d" transform="rotate(-77.93 85.443 55.35)">
					S
				</text>
				<text className="d" transform="rotate(-75.5 84.803 50.002)">
					t
				</text>
				<text className="d" transform="rotate(-73.23 85.884 46.971)">
					a
				</text>
				<text className="d" transform="rotate(-70.92 85.606 41.756)">
					r
				</text>
				<text className="d" transform="rotate(-69.01 85.844 37.867)">
					t
				</text>
				<text className="d" transform="rotate(-66.76 86.873 34.134)">
					e
				</text>
				<text className="d" transform="rotate(-63.9 87.362 27.758)">
					d
				</text>
				<text className="d" transform="rotate(-61.8 86.831 21.15)"></text>
				<text className="d" transform="rotate(-60.7 86.971 18.03)"></text>
				<text className="d" transform="rotate(-59.22 87.334 14.435)"></text>
				<text className="d" transform="rotate(-57.94 87.59 10.887)"></text>
				<text className="d" transform="rotate(-56.66 87.859 7.195)"></text>
				<text className="d" transform="rotate(-55.3 88.462 3.328)"></text>
				<text className="d" transform="rotate(-54.1 88.435 -.668)"></text>
				<text className="d" transform="rotate(-52.82 88.743 -4.865)"></text>
				<text className="d" transform="rotate(-51.54 89.043 -9.27)"></text>
				<text className="d" transform="rotate(-50.2 89.306 -13.96)"></text>
				<text className="d" transform="rotate(-48.7 90.3 -18.984)"></text>
				<text className="d" transform="rotate(-48 90.01 -23.415)"></text>
				<text className="d" transform="rotate(-46.43 90.466 -29.076)"></text>
				<text className="d" transform="rotate(-45 90.75 -34.762)"></text>
				<text className="d" transform="rotate(-43.88 91.282 -40.588)"></text>
				<text
					className="d"
					transform="matrix(.74 -.68 .68 .74 55.91 49.74)"
				></text>
				<text className="d" transform="rotate(-40.5 93.485 -55.021)">
					A
				</text>
				<text className="d" transform="rotate(-37.8 94.345 -73.668)">
					l
				</text>
				<text className="d" transform="rotate(-35.01 97.06 -86.57)">
					m
				</text>
				<text className="d" transform="rotate(-31.31 98.26 -119.5)">
					o
				</text>
				<text className="d" transform="rotate(-28.5 100.132 -147.783)">
					s
				</text>
				<text className="d" transform="rotate(-26.3 101.43 -176.023)">
					t
				</text>
				<text className="d" transform="rotate(-24.8 102.65 -197.528)"></text>
				<text className="d" transform="matrix(.92 -.38 .38 .92 95.17 23.47)">
					R
				</text>
				<text className="d" transform="matrix(.94 -.33 .33 .94 102.55 20.42)">
					e
				</text>
				<text className="d" transform="matrix(.96 -.29 .29 .96 109.03 18.12)">
					a
				</text>
				<text className="d" transform="rotate(-13.85 124.191 -468.08)">
					d
				</text>
				<text className="d" transform="rotate(-11.13 135.236 -622.353)">
					y
				</text>
				<text className="d" transform="rotate(-9.23 146.23 -791.26)"></text>
				<text className="d" transform="rotate(-8.1 157.234 -931.269)"></text>
				<text className="d" transform="rotate(-6.66 172.914 -1154.994)"></text>
				<text className="d" transform="rotate(-5.37 195.919 -1468.581)"></text>
				<text className="d" transform="rotate(-4.1 232.626 -1970.206)"></text>
				<text className="d" transform="translate(144.63 11.36)"></text>
				<text className="d" transform="translate(147.82 11.21)"></text>
				<text className="d" transform="rotate(-.93 761.817 -9298.937)"></text>
				<text className="d" transform="rotate(.95 -592.346 9304.744)"></text>
				<text className="d" transform="rotate(2.22 -209.038 4067.131)"></text>
				<text className="d" transform="rotate(3.49 -104.838 2641.087)"></text>
				<text className="d" transform="rotate(4.77 -55.81 1971.754)"></text>
				<text
					className="d"
					transform="matrix(.99 .11 -.11 .99 166.95 11.74)"
				></text>
				<text className="d" transform="rotate(7.32 -9.292 1335.724)"></text>
				<text className="d" transform="rotate(8.1 -6.164 1155.544)"></text>
				<text className="d" transform="rotate(9.9 13.459 1025.071)"></text>
				<text className="d" transform="rotate(11.5 28.115 942.093)"></text>
				<text className="d" transform="rotate(12.48 26.786 842.564)"></text>
				<text className="d" transform="rotate(13.77 31.579 776.82)"></text>
				<text className="d" transform="rotate(15.06 35.593 722.308)"></text>
				<text className="d" transform="rotate(16.36 38.98 675.97)"></text>
				<text className="d" transform="rotate(17.65 41.842 636.805)"></text>
				<text className="d" transform="rotate(18.94 44.33 602.844)"></text>
				<text className="d" transform="rotate(20.24 46.513 572.99)"></text>
				<text className="d" transform="rotate(21.53 48.418 546.888)"></text>
				<text className="d" transform="rotate(23 51.445 520.293)"></text>
				<text className="d" transform="rotate(24.11 51.633 503.013)"></text>
				<text className="d" transform="rotate(25.4 52.997 484.379)"></text>
				<text className="d" transform="rotate(26.7 54.226 467.37)"></text>
				<text className="d" transform="rotate(27.98 55.325 452.195)"></text>
				<text className="d" transform="rotate(29.27 56.347 438.218)"></text>
				<text className="d" transform="rotate(30.7 57.615 423.812)"></text>
				<text className="d" transform="rotate(31.83 58.121 413.764)"></text>
				<text
					className="d"
					transform="matrix(.84 .55 -.55 .84 229.67 33.25)"
				></text>
				<text className="d" transform="rotate(34.4 59.653 392.78)"></text>
				<text
					className="d"
					transform="matrix(.81 .58 -.58 .81 234.99 36.8)"
				></text>
				<text className="d" transform="rotate(36.96 60.947 374.753)"></text>
				<text
					className="d"
					transform="matrix(.79 .62 -.62 .79 240.11 40.57)"
				></text>
				<text className="d" transform="rotate(39.6 61.78 356.907)"></text>
				<text className="d" transform="rotate(40.5 62.172 354.09)"></text>
				<text className="d" transform="rotate(42.3 64.062 344.543)"></text>
				<text className="d" transform="rotate(43.35 63.55 338.73)"></text>
				<text className="d" transform="rotate(44.63 63.99 332.712)"></text>
				<text
					className="d"
					transform="matrix(.7 .72 -.72 .7 254.45 53.21)"
				></text>
				<text className="d" transform="rotate(47.18 64.776 321.642)"></text>
				<text className="d" transform="rotate(49.5 66.678 309.872)">
					R
				</text>
				<text className="d" transform="rotate(52.39 67.1 300.31)">
					e
				</text>
				<text className="d" transform="rotate(55.16 67.77 291.436)">
					a
				</text>
				<text className="d" transform="rotate(58 68.457 283.026)">
					d
				</text>
				<text className="d" transform="rotate(60.72 68.754 276.188)">
					y
				</text>
				<text className="d" transform="rotate(62.62 68.347 272.705)"></text>
				<path
					className="needle"
					d="M165.72 139.89L153.4 29l-12.32 110.89a18.75 18.75 0 1024.64 0zM153.4 166.5a12.5 12.5 0 1112.5-12.5 12.5 12.5 0 01-12.5 12.5z"
					style={{
						fill: "#231f20",
						transform: `rotateZ(${deg(props.index)}deg)`,
					}}
				/>
				<path
					className="divider"
					d="M.9 154.39h18M262.37 47.33l-12.73 12.73M46.73 45.04l12.73 12.72"
				/>
			</svg>
			<h4>{props.index}</h4>
			{!props.noSubHeading && <p>My CredReadiness</p>}
		</div>
	);
}

export default CredReadyIndex;
