import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/* labelsArr, valuesArr > will be passed as arguments */
// function index({labelsArr, valuesArr}) {
// labelsArr = _labelsArr;
// valuesArr = _valuesArr;
function index(props) {
	let _valuesArr = [900, 700, 635, 203];
	let _labelsArr = [
		"Took Biology and Psychology",
		"Cared for a relative",
		"Held a previous job for 2+ years",
		"Current CNA Certification",
	];
	let labelsArr =
		props.titles || props.labelsArr ? props.titles || props.labelsArr : [];
	let valuesArr =
		props.values || props.valuesArr ? props.values || props.valuesArr : [];

	const data = {
		colors: ["#FF821E"],
		chart: {
			type: "bar",
			// height: (9 / 16) * 100 + "%", // 16:9 ratio
			height: props.height ? props.height : 260,
		},
		title: {
			text: "",
		},
		xAxis: {
			categories: labelsArr,
		},
		yAxis: {
			visible: false,
			min: 0,
			title: {
				text: "",
				align: "high",
			},
			labels: {
				overflow: "justify",
			},
		},
		tooltip: {
			valueSuffix: " ",
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: false,
				},
			},
			series: {
				pointPadding: 0,
				groupPadding: 0,
				pointWidth: 30,
			},
		},
		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "top",
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
			shadow: true,
			enabled: false,
		},
		credits: {
			enabled: false,
		},
		series: [
			{
				name: "",
				data: valuesArr,
				// data: [
				// 	{ y: 100, color: "#FF821E" },
				// 	{ y: 700, color: "#FF821E" },
				// 	{ y: 635, color: "#FF821E" },
				// 	{ y: 203, color: "#FF821E" },
				// 	{ y: 900, color: "#FF821E" },
				// ],
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={data} />;
}

export default index;
