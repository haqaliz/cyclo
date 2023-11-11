<script lang="ts">
	import { Progress, GChart, Tabs } from '$components';
	import { user } from '$api';
	import { slide } from 'svelte/transition';
	import { startOfMonth, format } from 'date-fns';

	let loading = false;
	let challenges: any = null;
	let series: any = null;
	let data: any = null;
	let selectedTabItem = 'Completed';
	const columnMaxValue = 20;
	const convertTabToChallengeType = (tab: string) => ({
		'Completed': {
			key: 'completed',
			color: '#86efac'
		},
		'Abandoned': {
			key: 'abandoned',
			color: '#f87171'
		},
		'Not Completed': {
			key: 'notCompleted',
			color: '#fde047'
		},
	}[tab]);
	const tooltipContent = (v: any, date: any) => {
		const type = convertTabToChallengeType(selectedTabItem);
		return `<div class="flex flex-col p-2 sm:p-4 min-w-[200px] sm:min-w-[250px]">
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    At:
                </span>
                <span class="font-sans font-semibold text-lg sm:text-xl ml-2">
                    ${format(new Date(date * 1000), 'yyyy, dd LLL')}
                </span>
            </div>
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    Number of Challenges:
                </span>
                <span class="font-sans font-semibold text-lg sm:text-xl ml-2">
                    ${v[type?.key]}
                </span>
            </div>
        </div>`;
	};
	const selectChallengeType = () => {
		if (!Object.keys(series ?? {}).length) {
			data = null;
			return;
		}
		let dataRows = [
			['Challenge', 'Challenge State', { role: 'style' }, { role: 'tooltip', p: { html: true } }]
		];
		Object.keys(series)
		.sort((a: any, b: any) => (a - b))
		.forEach((i: any) => {
			const row = series[i];
			const type = convertTabToChallengeType(selectedTabItem);
			const v = row[type?.key];
			let c = type?.color;
			dataRows.push([v.toString(), v, `color: ${c}`, tooltipContent(row, i)]);
		});
		data = dataRows;
	};
	const tabChanged = (e: any) => {
		selectedTabItem = e.detail;
		selectChallengeType();
	};
    $: (async () => {
        if (loading || challenges?.length) return;
        loading = true;
        challenges = await user.getChallengesHistory();
        loading = false;
		if (!challenges?.length) return;
		series = challenges.reduce((a: any, i: any) => {
			const d = startOfMonth(i.created_at?.seconds * 1000).getTime() / 1000;
			if (!a[d]) a[d] = {
				completed: 0,
				abandoned: 0,
				notCompleted: 0,
			};
			if (i.completed && Object.keys(i.content ?? {}).length === 7) a[d].completed += 1;
			if (i.completed && Object.keys(i.content ?? {}).length < 7) a[d].abandoned += 1;
			if (!i.completed && Object.keys(i.content ?? {}).length <= 7) a[d].notCompleted += 1;
			return a;
		}, {});
		selectChallengeType();
    })();
	let options: any = {
		backgroundColor: { fill: 'transparent' },
		chartArea: { width: '100%', height: '70%' },
		legend: { position: 'none' },
		curveType: 'function',
		hAxis: {
			gridlines: { count: 0 },
			baselineColor: 'transparent',
			textStyle: {
				fontSize: 22,
				bold: true
			}
		},
		vAxis: {
			gridlines: { count: 0 },
			baselineColor: 'transparent',
			textPosition: 'none',
			minValue: 0,
			maxValue: columnMaxValue,
			viewWindow: { max: columnMaxValue }
		},
		series: {
			0: {
				lineWidth: 6,
				pointSize: 12,
			},
		},
		tooltip: { isHtml: true }
	};
</script>

{#if loading}
	<div
		in:slide
		out:slide
		class={`flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
			bg-gray-100 hover:bg-gray-200 overflow-hidden mb-2 md:mb-4 last:mb-0
			${$$restProps['class'] ?? ''}`}
	>
		<Progress />
	</div>
{:else}
	<div
		in:slide
		out:slide
		class="flex flex-col transition-colors rounded p-2 sm:p-4 bg-gray-100 hover:bg-gray-200"
	>
		<div class="flex flex-col md:flex-row items-start">
			<h3 class="font-sans font-semibold text-xl md:text-3xl">Challenges History</h3>
			<div class="flex-1" />
			<Tabs
				items={['Completed', 'Abandoned', 'Not Completed']}
				bind:selected={selectedTabItem}
				tab-items-class="!mb-0 mt-2 md:mt-0"
				tab-item-class="text-sm md:text-lg"
				tab-container-class="items-start"
				on:selected={tabChanged}
			/>
		</div>
		{#if data}
			<GChart type="AreaChart" {data} {options} />
		{:else}
			<div
				class="
					p-2 sm:p-4 h-[46px] sm:h-[76px] transition-all ease-in-out duration-300 rounded font-sans text-xs sm:text-lg flex items-center
					bg-yellow-300 font-semibold text-black mt-2 md:mt-4
				"
			>
				<i class="material-icons mr-2">info</i>
				Not enough data
			</div>
		{/if}
	</div>
{/if}