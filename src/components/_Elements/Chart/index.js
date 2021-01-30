import React from "react";
import Highcharts from "highcharts";
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
// Initialize exporting module.
Exporting(Highcharts);

function Char() {
	var credReadniess = "{{readinessValue}}";
	// const stringOrNum = "{{treeData}}";
	// const decoded = Base64.decode(stringOrNum);
	// const treeData = JSON.parse(decoded);
	var chartColors = ["#828282"];
	var gaugePBColors = ["#EEF4EC", "#B7D3AF", "#5C9440"];

	// // Generate the chart
	// Highcharts.chart('container', {
	//   // options - see https://api.highcharts.com/highcharts
	// });

	Highcharts.chart("", {
		chart: {
			renderTo: "gaugeMeter", // id of html el where we want to attach chart
			type: "gauge",
			backgroundColor: "none",
		},

		colors: [chartColors[0]],

		credits: {
			enabled: false,
		},

		title: {
			text: null,
			style: {
				fontFamily: "arial,helvetica,sans-serif",
				color: chartColors[1],
				fontWeight: "bold",
				fontSize: "24px",
			},
		},

		legend: {
			align: "left",
			verticalAlign: "bottom",
			layout: "vertical",
			x: 0,
			y: -112,
			floating: true,
			borderWidth: 0,
		},
		exporting: { enabled: false },

		pane: [
			{
				startAngle: -90,
				endAngle: 90,
				background: null,
			},
		],

		yAxis: [
			{
				min: 1,
				max: 100,
				lineColor: "transparent",
				tickWidth: 1,
				tickLength: 12,
				tickColor: "transparent" /*'#ffffff',*/,
				minorTickColor: "transparent",
				labels: {
					rotation: null,
					distance: 15,
					zIndex: 1,
				},
				plotBands: [
					{
						from: 1,
						to: 30,
						color: gaugePBColors[0],
						innerRadius: "75%",
						outerRadius: "100%",
					},
					{
						from: 30,
						to: 70,
						color: gaugePBColors[1],
						innerRadius: "75%",
						outerRadius: "100%",
					},
					{
						from: 70,
						to: 100,
						color: gaugePBColors[2],
						innerRadius: "75%",
						outerRadius: "100%",
					},
				],
				pane: 0,
			},
		],

		plotOptions: {
			gauge: {
				dial: {
					radius: "100%",
					baseWidth: 7,
					baseLength: 14,
					rearLength: 0,
				},
				pivot: {
					radius: 3,
					backgroundColor: chartColors[1],
				},
				// showInLegend: true
			},
		},

		series: [
			{
				name: "CREDREADNIESS",
				data: [Number(credReadniess)],
				animation: false,
				dial: {
					backgroundColor: chartColors[0],
				},
				yAxis: 0,
			},
		],
	});

	return <div>Chart</div>;
}

export default Char;
