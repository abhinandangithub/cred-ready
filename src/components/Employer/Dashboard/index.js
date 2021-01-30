import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReactHighcharts from "react-highcharts";
import bellcurve from "highcharts/modules/histogram-bellcurve";
import { connect, useDispatch } from "react-redux";

import "./index.scss";
import InputDropdown from "../../_Elements/InputDropdown";
import CustomDatePicker from "../../_Elements/CustomDatePicker";
import { clearSelectedJobs, setNewJob } from "../../../store/actions/employer";
import { getDashboard, getDashboardMetrics } from "../../../store/thunks/employer";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";
import { Link } from "react-router-dom";
import Spinner from "../../_Elements/Spinner";
import { monthsShort } from "../../../assets/js/Utility";
import { getRandomColor, formatDate } from "../../../assets/js/Utility";
import { strings } from "../../../constants";
import { togglePopup, toggleOverlay } from "../../../store/actions/popup_overlay";
import { forEach } from "lodash";
bellcurve(Highcharts);

const {
	PAGE_TITLE,
	JOB_POSTED,
	OPEN_POSITIONS,
	NEW_APPLICATIONS,
	INTERVIEWED,
	OFFER_PLACED,
	ALERT_NO_JOBS,
	BUTTON_TO_POST_JOB,
} = strings.EMPLOYER_DASHBOARD;

// Load the full build.
var _ = require("lodash");

function Dashboard(props) {
	const dispatch = useDispatch();
	const [dashboard, setDashboard] = useState([]);
	const [dashboardMetrics, setDashboardMetrics] = useState([]);
	const [selectedMetrics, setSelectedMetrics] = useState();
	// const [isDemoGraphDataActive, setisDemoGraphDataActive] = useState(false);

	const [recruitmentFunnelGraph, setrecruitmentFunnelGraph] = useState();
	const [applicationsRecievedGraph, setapplicationsRecievedGraph] = useState();
	const [offersMadeGraph, setoffersMadeGraph] = useState();
	const [applicationsBySourceGraph, setapplicationsBySourceGraph] = useState();
	const [applicantsAverageGraph, setapplicantsAverageGraph] = useState();
	const [jobPostsAnalysisGraph, setjobPostsAnalysisGraph] = useState([]);
	const [isGraphClick, setIsGraphClick] = useState(false);
	const [currentDate, setCurrentDate] = useState(formatDate(new Date(), "yyyy-mm-dd"));
	const [previousDate, setPreviousDate] = useState(
		formatDate(new Date(new Date().getTime() - 86400000 * 60), "yyyy-mm-dd")
	);
	const graphRef = React.useRef();

	useEffect(() => {
		dispatch(clearSelectedJobs());
		dispatch(getDashboardMetrics());
		dispatch(getDashboard(0, previousDate, currentDate));
		window.scrollTo(0, 0);
	}, []);

	let recruitmentFunnel = {
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		chart: {
			type: "bar",
			// styledMode: true,
		},
		legend: {
			reversed: true,
		},
		accessibility: {
			// point: {
			// 	valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
			// },
		},
		xAxis: {
			categories: ["Viewed", "Emailed", "Phone", "In-Person Interview", "Offer Made", "Hired"],
		},
		yAxis: {
			visible: false,
		},
		plotOptions: {
			series: {
				stacking: "normal",
				borderWidth: 0,
				pointPadding: 0,
				states: {
					hover: {
						color: "#a4edba",
					},
					inactive: {
						opacity: 1,
					},
				},
				events: {
					click: function (e) {
						if (!!selectedMetrics.jobId && selectedMetrics.jobTitle !== "All") {
							setIsGraphClick(true);
							let type =
								e.point.color === "#ebf5ec"
									? "Getting Started"
									: e.point.color === "#afd5ad"
									? "Almost Ready"
									: "Ready";
							// e.point.color === "#ebf5ec" ? { min: 70, max: 100 } : e.point.color === "#afd5ad" ? { min: 41, max: 70 } : { min: 0, max: 40 };
							console.log(e.point.category, " | ", type, " | ", e.point.options.y);
							dispatch(toggleOverlay(true));
							//dispatch(togglePopup([true, "recruitmentFunnelList", { jobId: selectedMetrics.jobId, cri: type, status: e.point.category }]));
							dispatch(
								togglePopup([
									true,
									"recruitmentFunnelList",
									{
										jobId: selectedMetrics.jobId,
										type: "recruitmentFunnelChart",
										cri: type,
										status: e.point.category,
										previousDate,
										currentDate,
									},
								])
							);
						}
					},
				},

				align: "center",
			},
			align: "center",
		},
		tooltip: {
			formatter: function () {
				return `${this.series.name} (${this.y})`;
			},
		},
		series: [
			{ name: "Ready", data: [768, 765, 479, 564, 232, 179], color: "#469a34" },
			{
				name: "Almost Ready",
				data: [864, 987, 698, 432, 90, 67],
				color: "#afd5ad",
			},
			{
				name: "Getting Started",
				data: [1242, 711, 401, 213, 154, 108],
				color: "#ebf5ec",
			},
		],
	};

	let newObj = [
		{
			point: 1,
			date: "20-11-16",
		},
		{
			point: 2,
			date: "20-11-17",
		},
		{
			point: 3,
			date: "20-11-18",
		},
		{
			point: 4,
			date: "20-11-19",
		},
		{
			point: 2,
			date: "20-11-20",
		},
		{
			point: 6,
			date: "20-11-21",
		},
		{
			point: 6,
			date: "20-11-22",
		},
	];

	let applicationsRecieved = {
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				// day: "%e of %b",
				month: "%b '%y",
			},
			title: {
				text: "",
			},
		},
		yAxis: {
			tickInterval: 1,
			title: {
				text: "",
			},
		},
		tooltip: {
			shared: true,
		},
		legend: {
			layout: "horizontal",
			align: "center",
		},
		plotOptions: {
			series: {
				point: {
					events: {
						click: function () {
							window.location.href = this.series.options.website;
						},
					},
				},
				cursor: "pointer",
			},
		},
		series: [
			{
				name: "CNA",
				// data: newObj.map((entity) => entity.point),
				data: [
					// [Date.UTC(2015, 1, 1), 3],
					[formatDate(new Date("2015, 1, 1"), "utc"), 3],
					[formatDate(new Date("2015, 2, 11"), "utc"), 9],
					[formatDate(new Date("2015, 3, 1"), "utc"), 3],
					[formatDate(new Date("2015, 4, 21"), "utc"), 2],
					[formatDate(new Date("2015, 5, 1"), "utc"), 5],
					[formatDate(new Date("2015, 6, 1"), "utc"), 9],
					[formatDate(new Date("2015, 6, 2"), "utc"), 5],
					[formatDate(new Date("2015, 8, 1"), "utc"), 5],
				],
				color: "#21639E",
			},
			{
				name: "PCA",
				// data: newObj.map((entity) => entity.point),
				data: [
					[formatDate(new Date("2015, 2, 1"), "utc"), 4],
					[formatDate(new Date("2015, 3, 11"), "utc"), 2],
					[formatDate(new Date("2015, 4, 1"), "utc"), 7],
					[formatDate(new Date("2015, 6, 21"), "utc"), 1],
					[formatDate(new Date("2015, 7, 1"), "utc"), 10],
					[formatDate(new Date("2015, 9, 1"), "utc"), 3],
				],
				color: "#F1C232",
			},
			// { name: "PCA", data: [3, 2, 5, 5, 4, 8, 9], color: "#F1C232" },
		],
	};
	let offersMade = {
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				// day: "%e of %b",
				month: "%b '%y",
			},
			title: {
				text: "",
			},
		},
		yAxis: {
			tickInterval: 5,
			title: {
				text: "Conversion Rate (in %)",
			},
		},
		tooltip: {
			shared: true,
		},
		legend: {
			layout: "horizontal",
			align: "center",
		},
		plotOptions: {
			series: {
				point: {
					events: {
						click: function () {
							window.location.href = this.series.options.website;
						},
					},
				},
				cursor: "pointer",
			},
		},
		series: [
			{
				name: "CNA",
				// data: newObj.map((entity) => entity.point),
				data: [
					// [Date.UTC(2015, 1, 1), 3],
					[formatDate(new Date("2015, 1, 1"), "utc"), 3],
					[formatDate(new Date("2015, 2, 11"), "utc"), 9],
					[formatDate(new Date("2015, 3, 1"), "utc"), 3],
					[formatDate(new Date("2015, 4, 21"), "utc"), 2],
					[formatDate(new Date("2015, 5, 1"), "utc"), 5],
					[formatDate(new Date("2015, 6, 1"), "utc"), 9],
					[formatDate(new Date("2015, 6, 2"), "utc"), 5],
					[formatDate(new Date("2015, 8, 1"), "utc"), 5],
				],
				color: "#21639E",
			},
			{
				name: "PCA",
				// data: newObj.map((entity) => entity.point),
				data: [
					[formatDate(new Date("2015, 2, 1"), "utc"), 4],
					[formatDate(new Date("2015, 3, 11"), "utc"), 2],
					[formatDate(new Date("2015, 4, 1"), "utc"), 7],
					[formatDate(new Date("2015, 6, 21"), "utc"), 1],
					[formatDate(new Date("2015, 7, 1"), "utc"), 10],
					[formatDate(new Date("2015, 9, 1"), "utc"), 3],
				],
				color: "#F1C232",
			},
			// { name: "PCA", data: [3, 2, 5, 5, 4, 8, 9], color: "#F1C232" },
		],
	};

	let applicationsBySource = {
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		chart: {
			type: "column",
		},
		xAxis: {
			categories: ["May", "Jun", "Jul", "Aug", "Sep"],
			// categories: [
			// 	"Social Media",
			// 	"Word of Mouth",
			// 	"Job Board",
			// 	"Website",
			// 	"Others",
			// ],
		},
		yAxis: {
			min: 0,
			title: {
				text: "Number of Applications",
			},
			// stackLabels: {
			// 	enabled: true,
			// 	style: {
			// 		fontWeight: "bold",
			// 		color:
			// 			// theme
			// 			(Highcharts.defaultOptions.title.style &&
			// 				Highcharts.defaultOptions.title.style.color) ||
			// 			"gray",
			// 	},
			// },
		},
		// legend: {
		// 	align: "right",
		// 	x: -30,
		// 	verticalAlign: "top",
		// 	y: 25,
		// 	floating: true,
		// 	backgroundColor:
		// 		Highcharts.defaultOptions.legend.backgroundColor || "white",
		// 	borderColor: "#CCC",
		// 	borderWidth: 1,
		// 	shadow: false,
		// 	enabled: true,
		// },
		tooltip: {
			headerFormat: "<b>{point.x}</b><br/>",
			pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
		},
		plotOptions: {
			column: {
				stacking: "normal",
				dataLabels: {
					enabled: false,
				},
			},
			series: {
				stacking: "normal",
				borderWidth: 0,
				pointPadding: 0,
				// groupPadding: 0,
				states: {
					inactive: {
						opacity: 1,
					},
				},
			},
		},
		series: [
			{
				name: "Social Media",
				data: [5, 3, 4, 7, 2],
				color: "#C27BA0",
			},
			{
				name: "WOM",
				data: [2, 2, 3, 2, 1],
				color: "#F1C232",
			},
			{
				name: "Job Board",
				data: [3, 4, 4, 2, 5],
				color: "#0092D0",
			},
			{
				name: "Website",
				data: [5, 3, 4, 7, 2],
				color: "#6aa84f",
			},
			{
				name: "Others",
				data: [2, 2, 3, 2, 1],
				color: "#FF6D01",
			},
		],
	};
	let applicantsAverage = {
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		chart: {
			type: "column",
		},
		xAxis: {
			categories: ["Certified Nursing Assistant", "Personal Care Aid"],
			// crosshair: true,
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: "Number of Applicants",
			},
		},
		tooltip: {
			// headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			// pointFormat:
			// 	'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			// 	'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
			// footerFormat: "</table>",
			shared: true,
			// useHTML: true,
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				pointPadding: 0.05,
				// groupPadding: 0,
				states: {
					inactive: {
						opacity: 1,
					},
				},
				events: {
					click: function (e) {
						if (selectedMetrics.jobTitle !== "All") {
							setIsGraphClick(true);
							console.log(e.point.category, " | ", e.point.series.name, " | ", selectedMetrics.jobId);
							dispatch(toggleOverlay(true));
							// dispatch(togglePopup([true, "recruitmentFunnelList", { jobId: selectedMetrics.jobId, cri: type, status: e.point.category }]));
							dispatch(
								togglePopup([
									true,
									"recruitmentFunnelList",
									{
										jobId: selectedMetrics.jobId,
										type: "applicantAvailability",
										cri: e.point.series.name.toLowerCase(),
										previousDate,
										currentDate,
									},
								])
							);
						}
					},
				},
			},
		},
		series: [
			{
				name: "Immediate",
				data: [4, 8],
				color: "#6aa84f",
			},
			{
				name: "<15 Days",
				data: [20, 15],
				color: "#76a5af",
			},
			{
				name: "<30 Days",
				data: [28, 23],
				color: "#6d9eeb",
			},
			{
				name: ">30 Days",
				data: [2, 18],
				color: "#c27ba0",
			},
		],
	};

	const resetJobFields = () => {
		dispatch(setNewJob({ jobTitle: null }));
		dispatch(setNewJob({ employmentType: null }));
		dispatch(setNewJob({ industry: null }));
		dispatch(setNewJob({ function: 1126 }));
		dispatch(setNewJob({ location: null }));
		dispatch(setNewJob({ openPositions: null }));
		dispatch(setNewJob({ jobDescription: null }));
		dispatch(setNewJob({ minExp: null }));
		dispatch(setNewJob({ maxExp: null }));
		dispatch(setNewJob({ jobCertificateMap: [{ id: 16859 }] }));
		//dispatch(jobToUpdateArray(null));
	};
	const handlePostJob = () => {
		resetJobFields();
		props.history.push("/jobs/create-job");
	};
	let jobPostsAnalysis = {
		chart: {
			type: "column",
		},
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		subtitle: {
			text: "",
		},
		accessibility: {
			announceNewData: {
				enabled: true,
			},
		},
		xAxis: {
			type: "category",
			title: {
				text: "CredReadiness Range",
			},
		},
		yAxis: {
			title: {
				text: "Number of Applicants",
				tickInterval: 1,
				minTickInterval: 1,
				allowDecimals: false,
			},
		},
		legend: {
			enabled: false,
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: false,
					format: "{point.y}",
				},
				events: {
					click: function (e) {
						{
							/* setIsGraphClick(true); */
						}
						console.log(e.point);
						let { id, name } = e.point.options;
						console.log("Job Id: ", id, name);
						dispatch(toggleOverlay(true));
						dispatch(
							togglePopup([
								true,
								"recruitmentFunnelList",
								{ jobId: id, cri: name, type: "range", previousDate, currentDate },
							])
						);
					},
				},
			},
		},

		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
		},
		series: [
			{
				name: "Applications",
				colorByPoint: true,

				data: [
					{
						name: "0-20",
						y: 4,
						color: "rgba(70,154,52,.4)",
						id: null,
					},
					{
						name: "21-40",
						y: 2,
						color: "rgba(70,154,52,.55)",
						id: null,
					},
					{
						name: "41-60",
						y: 7.23,
						color: "rgba(70,154,52,.7)",
						id: null,
					},
					{
						name: "61-80",
						y: 5.58,
						color: "rgba(70,154,52,.85)",
						id: null,
					},
					{
						name: "81-100",
						y: 4.02,
						color: "rgba(70,154,52,1)",
						id: null,
					},
				],
			},
		],
	};

	useEffect(() => {
		// setDashboard(props.dashboard);
		if (props.dashboard) {
			toggle();
		} else {
			setDashboard(undefined);
		}
	}, [props.dashboard]);

	const toggle = (isChecked) => {
		if (isChecked) {
			let temp = Object.assign({}, props.dashboard);
			temp.countOfPostedJobs = 35;
			temp.countOfOpenPositions = 120;
			temp.countNewApplications = 42;
			temp.countOfInterviewedCandidates = 32;
			temp.countOfOfferPlaced = 5;
			setDashboard(temp);
		} else {
			setDashboard(props.dashboard);
		}

		let seriesArr = [];
		let uniqueArr = [];
		let xAxisCategories = [];
		let data = null;
		let seriesData = ["Ready", "Almost Ready", "Getting Started"];
		let seriesArrSorted = [];

		/* ***************** */
		/* 1. recruitmentFunnelGraph */
		/* ***************** */
		data = props.dashboard.edbRecruitmentFunnel.rFunnelMetrics;

		for (let i = 0; i < data.length; i++) {
			if (xAxisCategories.indexOf(data[i].applicationStatus) < 0) {
				xAxisCategories.push(data[i].applicationStatus);
			}

			let _obj = {};
			if (uniqueArr.indexOf(data[i].readinessRange) < 0) {
				_obj.name = data[i].readinessRange;
				_obj.data = [];
				_obj.color =
					data[i].readinessRange === "Ready"
						? "#469a34"
						: data[i].readinessRange === "Almost Ready"
						? "#afd5ad"
						: "#ebf5ec";
				_obj.data.push(data[i].count);
				uniqueArr.push(data[i].readinessRange);
				seriesArr.push(_obj);
			} else {
				let _i = findIndexOfObjInArr(seriesArr, "name", data[i].readinessRange);
				seriesArr[_i].data.push(data[i].count);
			}
		}

		seriesData.map((data, i) => {
			let _i = findIndexOfObjInArr(seriesArr, "name", data);
			if (_i >= 0) {
				seriesArrSorted.push(seriesArr[_i]);
			}
		});

		if (!isChecked) {
			recruitmentFunnel.xAxis.categories = [...xAxisCategories];
			recruitmentFunnel.series = [...seriesArrSorted];
		}

		setrecruitmentFunnelGraph(recruitmentFunnel);

		/* ***************** */
		/* 2. applicationsRecievedGraph */
		/* ***************** */
		seriesArr = [];
		uniqueArr = [];
		let dateArr = [];
		data = props.dashboard.edbJobAppTrend.edbJobTrends;

		for (let i = 0; i < data.length; i++) {
			if (dateArr.indexOf(data[i].date) < 0) {
				dateArr.push(new Date(data[i].date));
			}
		}

		let dateArrSorted = dateArr.slice().sort((a, b) => b.date - a.date);
		let dateArrFormated = dateArrSorted.slice().map((date) => formatDate(date, "yyyy-mm-dd"));
		dateArrFormated = [...new Set(dateArrFormated)];

		for (let i = 0; i < data.length; i++) {
			let _obj = { data: [] };
			/* add Title and data array if not present before */

			if (uniqueArr.indexOf(data[i].jobTitle) < 0) {
				let _dataObj = [];
				_dataObj.push(formatDate(new Date(data[i].date), "utc"), data[i].count);
				_obj.data.push(_dataObj);
				_obj.name = data[i].jobTitle;
				uniqueArr.push(data[i].jobTitle);
				seriesArr.push(_obj);
			} else {
				let _i = findIndexOfObjInArr(seriesArr, "name", data[i].jobTitle);
				let _dataObj = [];
				_dataObj.push(formatDate(new Date(data[i].date), "utc"), data[i].count);
				seriesArr[_i].data.push(_dataObj);
			}
		}

		// seriesArr[0].data.push([formatDate(new Date("2015, 1, 1"), "utc"), 10]);

		seriesArr.forEach((series, i) => {
			let dataArr = series.data;
			let dataArrSorted = dataArr.sort(function (a, b) {
				return a[0] - b[0];
			});
			seriesArr[i].data = dataArrSorted;
		});

		let uniqueArrLowerCase = uniqueArr.map((val) => val.toLowerCase()).sort();
		let uniqueArrSorted = new Array(uniqueArrLowerCase.length).fill("");

		for (let i = 0; i < uniqueArr.length; i++) {
			let _i = uniqueArrLowerCase.indexOf(uniqueArr[i].toLowerCase());
			uniqueArrSorted[_i] = uniqueArr[i];
		}

		seriesArrSorted = new Array(seriesArr.length).fill(null);

		for (let i = 0; i < uniqueArrSorted.length; i++) {
			let _i = findIndexOfObjInArr(seriesArr, "name", uniqueArrSorted[i]);
			seriesArrSorted[i] = seriesArr[_i];
		}

		if (!isChecked) {
			// applicationsRecieved.xAxis.categories = [...dateArrFormated];
			applicationsRecieved.series = [...seriesArrSorted];
		}

		setapplicationsRecievedGraph(applicationsRecieved);

		/* ***************** */
		/* 3. offersMadeGraph */
		/* ***************** */
		seriesArr = [];
		uniqueArr = [];
		data = props.dashboard.edbJobOfferRatio.edbRatios;

		for (let i = 0; i < data.length; i++) {
			let _obj = { data: [] };
			if (uniqueArr.indexOf(data[i].jobTitle) < 0) {
				let _dataObj = [];
				_dataObj.push(formatDate(new Date(data[i].appliedMonth), "utc"), data[i].conversionRate);
				_obj.data.push(_dataObj);
				_obj.name = data[i].jobTitle;
				uniqueArr.push(data[i].jobTitle);
				seriesArr.push(_obj);
			} else {
				let _i = findIndexOfObjInArr(seriesArr, "name", data[i].jobTitle);
				let _dataObj = [];
				_dataObj.push(formatDate(new Date(data[i].appliedMonth), "utc"), data[i].conversionRate);
				seriesArr[_i].data.push(_dataObj);
			}
		}

		seriesArr.forEach((series, i) => {
			let dataArr = series.data;
			let dataArrSorted = dataArr.sort(function (a, b) {
				return a[0] - b[0];
			});
			seriesArr[i].data = dataArrSorted;
		});

		uniqueArrLowerCase = uniqueArr.map((val) => val.toLowerCase()).sort();
		uniqueArrSorted = new Array(uniqueArrLowerCase.length).fill("");

		for (let i = 0; i < uniqueArr.length; i++) {
			let _i = uniqueArrLowerCase.indexOf(uniqueArr[i].toLowerCase());
			uniqueArrSorted[_i] = uniqueArr[i];
		}

		seriesArrSorted = new Array(seriesArr.length).fill(null);

		for (let i = 0; i < uniqueArrSorted.length; i++) {
			let _i = findIndexOfObjInArr(seriesArr, "name", uniqueArrSorted[i]);
			seriesArrSorted[i] = seriesArr[_i];
		}

		if (!isChecked) {
			offersMade.series = [...seriesArrSorted];
		}

		setoffersMadeGraph(offersMade);

		/* ***************** */
		/* 4. applicationsBySourceGraph */
		/* ***************** */
		seriesArr = [];
		uniqueArr = [];
		xAxisCategories = [];
		let xAxisCategoriesSorted = [];
		data = [
			{
				count: 3,
				monthName: "Jan",
				monthStartDate: "Oct 1, 2020",
				source: "Social Media",
			},
			{
				count: 7,
				monthName: "Oct",
				monthStartDate: "Oct 1, 2020",
				source: "Word Of Mouth",
			},
			{
				count: 1,
				monthName: "Oct",
				monthStartDate: "Oct 1, 2020",
				source: "Job Board",
			},
			{
				count: 9,
				monthName: "May",
				monthStartDate: "Oct 1, 2020",
				source: "Website",
			},
			{
				count: 15,
				monthName: "Oct",
				monthStartDate: "Oct 1, 2020",
				source: "Others",
			},
			{
				count: 6,
				monthName: "Nov",
				monthStartDate: "Nov 1, 2020",
				source: "Social Media",
			},
			{
				count: 11,
				monthName: "Nov",
				monthStartDate: "Nov 1, 2020",
				source: "Word Of Mouth",
			},
			{
				count: 2,
				monthName: "Dec",
				monthStartDate: "Nov 1, 2020",
				source: "Job Board",
			},
			{
				count: 7,
				monthName: "Nov",
				monthStartDate: "Nov 1, 2020",
				source: "Website",
			},
			{
				count: 19,
				monthName: "Nov",
				monthStartDate: "Nov 1, 2020",
				source: "Others",
			},
		];
		data = props.dashboard.edbApplicationSource.edbReferenceSources;

		for (let i = 0; i < data.length; i++) {
			if (xAxisCategories.indexOf(data[i].monthName) < 0) {
				xAxisCategories.push(data[i].monthName);
			}
		}

		for (let i = 0; i < monthsShort.length; i++) {
			if (xAxisCategories.indexOf(monthsShort[i]) !== -1) {
				xAxisCategoriesSorted.push(monthsShort[i]);
			}
		}

		for (let i = 0; i < data.length; i++) {
			let _obj = {};
			if (uniqueArr.indexOf(data[i].source) < 0) {
				_obj.name = data[i].source;
				_obj.data = new Array(xAxisCategories.length).fill(0);
				_obj.color =
					data[i].source === "Social Media"
						? "#C27BA0"
						: data[i].source === "Word Of Mouth"
						? "#F1C232"
						: data[i].source === "Job Board"
						? "#0092D0"
						: data[i].source === "Website"
						? "#6aa84f"
						: data[i].source === "Others"
						? "#FF6D01"
						: getRandomColor();
				let monthIndex = xAxisCategories.indexOf(data[i].monthName);
				_obj.data[monthIndex] = data[i].count;
				seriesArr.push(_obj);
				uniqueArr.push(data[i].source);
			} else {
				let _i = findIndexOfObjInArr(seriesArr, "name", data[i].source);
				let monthIndex = xAxisCategories.indexOf(data[i].monthName);
				seriesArr[_i].data[monthIndex] = data[i].count;
			}
		}

		if (!isChecked) {
			applicationsBySource.xAxis.categories = [...xAxisCategoriesSorted];
			applicationsBySource.series = [...seriesArr];
		}
		setapplicationsBySourceGraph(applicationsBySource);

		/* ***************** */
		/* 5. applicantsAverageGraph */
		/* ***************** */
		seriesArr = [];
		uniqueArr = [];
		xAxisCategories = [];
		xAxisCategoriesSorted = [];
		data = [
			{ count: 2, availableWithin: "Immediate", jobTitle: "jobTitle1" },
			{ count: 5, availableWithin: "<15 Days", jobTitle: "jobTitle2" },
			{ count: 1, availableWithin: "Immediate", jobTitle: "jobTitle1" },
			{ count: 1, availableWithin: "<30 Days", jobTitle: "jobTitle1" },
			{ count: 10, availableWithin: "Immediate", jobTitle: "jobTitle2" },
			{ count: 8, availableWithin: "<15 Days", jobTitle: "jobTitle1" },
			{ count: 3, availableWithin: "<30 Days", jobTitle: "jobTitle2" },
			{ count: 9, availableWithin: "<30 Days", jobTitle: "jobTitle2" },
			{ count: 15, availableWithin: "<15 Days", jobTitle: "jobTitle2" },
			{ count: 4, availableWithin: ">30 Days", jobTitle: "jobTitle2" },
			{ count: 15, availableWithin: ">30 Days", jobTitle: "jobTitle1" },
		];
		data = props.dashboard.edbApplicantAvailability.edbApplicantStatuses;
		// console.log("-----------");
		// console.log(props.dashboard.edbApplicantAvailability, data);

		for (let i = 0; i < data.length; i++) {
			if (xAxisCategories.indexOf(data[i].jobTitle) < 0) {
				xAxisCategories.push(data[i].jobTitle);
			}
		}

		let xAxisCategoriesLowerCase = xAxisCategories.map((val) => val.toLowerCase()).sort();
		xAxisCategoriesSorted = new Array(xAxisCategoriesLowerCase.length).fill("");

		for (let i = 0; i < xAxisCategories.length; i++) {
			let _i = xAxisCategoriesLowerCase.indexOf(xAxisCategories[i].toLowerCase());
			xAxisCategoriesSorted[_i] = xAxisCategories[i];
		}

		for (let i = 0; i < data.length; i++) {
			// console.log("...........");
			// console.log(data[i], selectedMetrics);
			let _obj = {};
			if (data[i].availableWithin === undefined) continue;

			if (uniqueArr.indexOf(data[i].availableWithin) < 0) {
				_obj.name = data[i].availableWithin;
				_obj.data = new Array(xAxisCategories.length).fill(0);
				_obj.stack = data[i].jobTitle;
				// _obj.id = selectedMetrics.jobId;
				_obj.color =
					data[i].availableWithin === "Immediately"
						? "#6aa84f"
						: data[i].availableWithin === "<15 Days"
						? "#F1C232"
						: data[i].availableWithin === "<30 Days"
						? "#FF6D01"
						: data[i].availableWithin === ">30 Days"
						? "#c27ba0"
						: data[i].availableWithin === "2-3 weeks"
						? "#76a5af"
						: data[i].availableWithin === "Less than 2 weeks"
						? "#6d9eeb"
						: getRandomColor();

				let jobTitleIndex = xAxisCategoriesSorted.indexOf(data[i].jobTitle);
				_obj.data[jobTitleIndex] = data[i].count;
				seriesArr.push(_obj);
				uniqueArr.push(data[i].availableWithin);
			} else {
				let _i = findIndexOfObjInArr(seriesArr, "name", data[i].availableWithin);
				let jobTitleIndex = xAxisCategoriesSorted.indexOf(data[i].jobTitle);
				seriesArr[_i].data[jobTitleIndex] = data[i].count;
			}
		}

		if (!isChecked) {
			applicantsAverage.series = [...seriesArr];
			applicantsAverage.xAxis.categories = [...xAxisCategoriesSorted];
		}
		// console.log(applicantsAverage);
		setapplicantsAverageGraph(applicantsAverage);
		/* ***************** */
		/* 6. jobPostsAnalysisGraph */
		/* ***************** */
		let jobs = props.dashboard.edbJobPostAnalysis.edbJobPostThresholds;
		let jobPostAnalysisObj = {};

		jobs.map((job, i) => {
			jobPostAnalysisObj[job.jobId] = {
				chart: {
					type: "column",
				},
				credits: {
					enabled: false,
				},
				title: {
					text: "",
				},
				subtitle: {
					text: "",
				},
				accessibility: {
					announceNewData: {
						enabled: true,
					},
				},
				xAxis: {
					type: "category",
					title: {
						text: "CredReadiness Range",
					},
				},
				yAxis: {
					title: {
						text: "Number of Applicants",
						tickInterval: 1,
						minTickInterval: 1,
						allowDecimals: false,
					},
				},
				legend: {
					enabled: false,
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: false,
							format: "{point.y}",
						},
						events: {
							click: function (e) {
								console.log(e.point);
								let { id, name } = e.point.options;
								console.log("Job Id: ", id, name);
								dispatch(toggleOverlay(true));
								dispatch(
									togglePopup([
										true,
										"recruitmentFunnelList",
										{ jobId: id, cri: name, type: "range", previousDate, currentDate },
									])
								);
							},
						},
					},
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
				},
				series: [
					{
						name: "Applications",
						colorByPoint: true,

						data: [
							{
								name: "0-20",
								y: 4,
								color: "rgba(70,154,52,.4)",
								id: null,
							},
							{
								name: "21-40",
								y: 2,
								color: "rgba(70,154,52,.55)",
								id: null,
							},
							{
								name: "41-60",
								y: 7.23,
								color: "rgba(70,154,52,.7)",
								id: null,
							},
							{
								name: "61-80",
								y: 5.58,
								color: "rgba(70,154,52,.85)",
								id: null,
							},
							{
								name: "81-100",
								y: 4.02,
								color: "rgba(70,154,52,1)",
								id: null,
							},
						],
					},
				],
			};

			let _data = [
				{
					name: "0-20",
					y: 62.74,
					color: "rgba(70,154,52,.4)",
					id: null,
				},
				{
					name: "21-40",
					y: 10.57,
					color: "rgba(70,154,52,.55)",
					id: null,
				},
				{
					name: "41-60",
					y: 7.23,
					color: "rgba(70,154,52,.7)",
					id: null,
				},
				{
					name: "61-80",
					y: 5.58,
					color: "rgba(70,154,52,.85)",
					id: null,
				},
				{
					name: "81-100",
					y: 4.02,
					color: "rgba(70,154,52,1)",
					id: null,
				},
			];

			let demoData = [
				{ count: 1, score: 20.12 },
				{ count: 1, score: 32.71 },
				{ count: 1, score: 34.63 },
				{ count: 1, score: 37.13 },
				{ count: 1, score: 39.01 },
				{ count: 1, score: 39.27 },
				{ count: 1, score: 42.81 },
				{ count: 1, score: 50.37 },
				{ count: 1, score: 62.82 },
				{ count: 1, score: 72.39 },
				{ count: 1, score: 81.25 },
			];

			let credRange = {
				lev1Count: 0, // 0-20
				lev2Count: 0, // 21-40
				lev3Count: 0, // 41-60
				lev4Count: 0, // 61-80
				lev5Count: 0, // 81-100
			};

			if (!isChecked) {
				demoData = job.applicantCurves;
			}

			_data[0].id = job.jobId;
			_data[1].id = job.jobId;
			_data[2].id = job.jobId;
			_data[3].id = job.jobId;
			_data[4].id = job.jobId;

			demoData.forEach((data, i) => {
				// console.log(data);
				if (data.score <= 20) {
					credRange.lev1Count += data.count;
				} else if (data.score <= 40) {
					credRange.lev2Count += data.count;
				} else if (data.score <= 60) {
					credRange.lev3Count += data.count;
				} else if (data.score <= 80) {
					credRange.lev4Count += data.count;
				} else if (data.score <= 100) {
					credRange.lev5Count += data.count;
				}

				_data[0].y = credRange.lev1Count;
				_data[1].y = credRange.lev2Count;
				_data[2].y = credRange.lev3Count;
				_data[3].y = credRange.lev4Count;
				_data[4].y = credRange.lev5Count;
			});

			// console.log("_data: ", _data);
			jobPostAnalysisObj[job.jobId].series[0].data = _data;
			// console.log("jobPostsAnalysis: ", jobPostsAnalysis.series[0].data);
		});

		setjobPostsAnalysisGraph(jobPostAnalysisObj);
	};

	useEffect(() => {
		if (props.dashboardMetrics && props.dashboardMetrics.length) {
			props.dashboardMetrics.push({
				jobId: 0,
				jobTitle: "All",
				readinessIndex: 0,
			});
			let temp = props.dashboardMetrics.sort((a, b) => {
				return a.jobId - b.jobId;
			});
			setSelectedMetrics({
				jobId: 0,
				jobTitle: "All",
				readinessIndex: 0,
			});
			setDashboardMetrics(temp);
		}
	}, [props.dashboardMetrics]);

	const handleChangeMetrics = (val) => {
		setIsGraphClick(false);
		if (typeof val === "number") {
			let obj = dashboardMetrics.find((o) => o.jobId === val);
			setSelectedMetrics(obj);
			dispatch(getDashboard(obj.jobId, previousDate, currentDate));
		} else if (typeof val === "object") {
			setSelectedMetrics({
				jobId: 0,
				jobTitle: "All",
				readinessIndex: 0,
			});
			dispatch(getDashboard(0, previousDate, currentDate));
		} else {
			setSelectedMetrics(val);
		}
	};

	const handleDateChange = (date, id) => {
		setIsGraphClick(false);
		let temp = formatDate(date, "yyyy-mm-dd");
		if (id === "previous") {
			dispatch(getDashboard(selectedMetrics.jobId, temp, currentDate));
			setPreviousDate(formatDate(date, "yyyy-mm-dd"));
		} else {
			dispatch(getDashboard(selectedMetrics.jobId, previousDate, temp));
			setCurrentDate(formatDate(date, "yyyy-mm-dd"));
		}
	};

	// const [startDate, setStartDate] = useState(new Date("05/24/99"));
	const [startDate, setStartDate] = useState(new Date(new Date() - 86400000 * 60));
	const [endDate, setEndDate] = useState(new Date());

	return dashboard && dashboardMetrics ? (
		<div className="dashboard-employer">
			{props.loading && !isGraphClick ? (
				<div className="spinner_outer">
					<Spinner />
				</div>
			) : null}
			<div className="numbers">
				<div className="common-main-heading">
					<h2>{PAGE_TITLE}</h2>
					<div>
						<input
							className="fancy-toggle blue"
							type="checkbox"
							// checked={isDemoGraphDataActive}
							id="demoGraphData"
							onChange={(e) => toggle(e.target.checked)}
						/>
						<label htmlFor="demoGraphData">
							<span className="input"></span>
							Graph with Simulated Data
						</label>
					</div>
				</div>
				<ul>
					<li>
						<h2>{dashboard.countOfPostedJobs}</h2>
						<p>{JOB_POSTED}</p>
					</li>
					<li>
						<h2>{dashboard.countOfOpenPositions}</h2>
						<p>{OPEN_POSITIONS}</p>
					</li>
					<li>
						<h2>{dashboard.countNewApplications}</h2>
						<p>{NEW_APPLICATIONS}</p>
					</li>
					<li>
						<h2>{dashboard.countOfInterviewedCandidates}</h2>
						<p>{INTERVIEWED}</p>
					</li>
					<li>
						<h2>{dashboard.countOfOfferPlaced}</h2>
						<p>{OFFER_PLACED}</p>
					</li>
				</ul>
			</div>

			<div className="dashboard_filters flex">
				<div className="left flex">
					<h3>Show Metrics For</h3>
					{/* <InputDropdown
							placeholder={metrics.heading}
							content={metrics.content}
							id="metrics"
						/> */}
					<InputDropdown
						placeholder="Select Metrics"
						content={dashboardMetrics.map((val) => ({
							val: val.jobTitle,
							id: val.jobId,
						}))}
						showArrow
						id="metrics"
						search_term="jobTitle"
						selected={!!selectedMetrics && selectedMetrics.jobTitle ? selectedMetrics.jobTitle : selectedMetrics}
						onchange={(value) => {
							handleChangeMetrics(value);
						}}
					/>
				</div>
				<div className="right flex">
					<h3>Duration</h3>
					<div className="start-date" id="start-date">
						<CustomDatePicker
							placeholderText="Start Date"
							selected={startDate}
							onChange={(date) => {
								setStartDate(date);
								handleDateChange(date, "previous");
							}}
						/>
					</div>
					<div className="date" id="end-date">
						<CustomDatePicker
							popperPlacement="bottom-end"
							placeholderText="End Date"
							selected={endDate}
							minDate={startDate}
							onChange={(date) => {
								setEndDate(date);
								handleDateChange(date, "current");
							}}
						/>
					</div>
				</div>
			</div>

			<div className="widgets widgets-dashboard">
				<div className="widget recruitmentFunnelGraph">
					<div className="heading">Recruitment Funnel</div>
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={recruitmentFunnelGraph} />
					</div>
				</div>
				<div className="widget">
					<div className="heading">Trend of Applications Received Over Time</div>
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={applicationsRecievedGraph} />
					</div>
				</div>
				<div className="widget">
					<div className="heading">Ratio of Offers Made to Candidates Interviewed</div>
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={offersMadeGraph} />
					</div>
				</div>
				<div className="widget">
					<div className="heading">Applications by Source</div>
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={applicationsBySourceGraph} />
					</div>
				</div>
				<div className="widget">
					<div className="heading">Applicant Availability</div>
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={applicantsAverageGraph} />
					</div>
				</div>
			</div>

			<h2>Job Posts</h2>
			<div className="widgets widgets-dashboard">
				{props.dashboard &&
					props.dashboard.edbJobPostAnalysis.edbJobPostThresholds.map((job, key) => {
						return (
							<>
								{jobPostsAnalysisGraph[job.jobId] ? (
									<div className="widget" key={key}>
										<div className="heading">Job Title : {job.jobTitle}</div>
										<div className="content">
											<ReactHighcharts highcharts={Highcharts} config={jobPostsAnalysisGraph[job.jobId]} />
										</div>
									</div>
								) : null}
							</>
						);
					})}
			</div>
		</div>
	) : props.loading ? (
		<Spinner />
	) : (
		<div className="dashboard-employer">
			<div className="numbers">
				<div className="common-main-heading">
					<h2>Dashboard</h2>
				</div>
				<ul>
					<li>
						<h2>0</h2>
						<p>Job Posted</p>
					</li>
					<li>
						<h2>0</h2>
						<p>Open Positions</p>
					</li>
					<li>
						<h2>0</h2>
						<p>New Applications</p>
					</li>
					<li>
						<h2>0</h2>
						<p>Interviewed</p>
					</li>
					<li>
						<h2>0</h2>
						<p>Offer Placed</p>
					</li>
				</ul>
			</div>
			{/* <div className="common-main-heading">
					<h2>No jobs posted yet, please post a job</h2>
				</div> */}
			<div className="no-jobs">
				<div className="common-heading-button">
					<h1>{ALERT_NO_JOBS}</h1>
				</div>
				<div className="content-no">
					{/* <p>
							No jobs have been created yet.
					<br />
							Why don't you post the job by clicking on the button below
				</p> */}
					<div className="common-heading-button">
						<Link onClick={handlePostJob} className="btn plus">
							<span></span>
							{BUTTON_TO_POST_JOB}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
		dashboard: state.employerReducer.dashboard,
		dashboardMetrics: state.employerReducer.dashboardMetrics,
	};
}

export default connect(mapStateToProps)(Dashboard);
