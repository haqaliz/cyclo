<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type ChartType =
		| 'AnnotationChart'
		| 'AreaChart'
		| 'BarChart'
		| 'BubbleChart'
		| 'Calendar'
		| 'CandlestickChart'
		| 'ColumnChart'
		| 'ComboChart'
		| 'DiffChart'
		| 'DonutChart'
		| 'Gantt'
		| 'Gauge'
		| 'GeoChart'
		| 'Histogram'
		| 'LineChart'
		| 'Line'
		| 'Bar'
		| 'Map'
		| 'OrgChart'
		| 'PieChart'
		| 'Sankey'
		| 'ScatterChart'
		| 'Scatter'
		| 'SteppedAreaChart'
		| 'Table'
		| 'Timeline'
		| 'TreeMap'
		| 'WaterfallChart'
		| 'WordTree';

	let chartId = Math.random();
	const version = 'current';
	export let type: ChartType;
	export let data;
	export let settings = {
		packages: ['corechart', 'controls'],
		language: 'en'
	};
	export let options = {};
	let chart;

	const getValidChartData = (d, isFirstRowLabels) => {
		if ((browser && window.google === undefined) || !data) return;
		const g = window.google;
		if (Array.isArray(d)) {
			return g.visualization.arrayToDataTable(d, isFirstRowLabels);
		}
		if (typeof d !== 'object') return;
		return new g.visualization.DataTable(data);
	};

	const redraw = (ch, dd, ops) => {
		if ((browser && window.google === undefined) || !ch || !dd) return;
		const d = getValidChartData(dd);
		if (!d) return;
		let finalOps = ops;
		if (settings?.packages?.includes('bar')) {
			finalOps = window.google.charts[type].convertOptions(ops);
		}
		ch.draw(d, finalOps);
	};

	const draw = () => {
		if ((browser && window.google === undefined) || !type) return;
		// Instantiate and draw our chart, passing in some options.
		const ctx = document.getElementById(chartId);
		if (!ctx) return;
		let visualization = window.google.visualization;
		if (settings?.packages?.includes('bar')) {
			visualization = google.charts;
		}
		chart = new visualization[type](ctx);
		redraw(chart, data, options);
	};

	$: redraw(chart, data, options);

	let onResizeEnd;
	const resized = () => {
		clearTimeout(onResizeEnd);
		onResizeEnd = setTimeout(() => {
			redraw(chart, data, options);
		}, 100);
	};

	const update = async () => {
		if (browser && window.google === undefined) return;
		const loader = window.google.charts;
		loader.load(version, settings);
		loader.setOnLoadCallback(draw);
	};

	onMount(async () => {
		await update();
	});
</script>

<svelte:window on:resize={resized} />

<!-- Google Chart -->
<div id={chartId} />
