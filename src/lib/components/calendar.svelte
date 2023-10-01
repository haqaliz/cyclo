<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user } from '$stores';
	import { user as usr } from '$api';
	import {
		subDays,
		addDays,
		startOfMonth,
		endOfMonth,
		getDate,
		getDay,
		differenceInDays,
		addMonths,
		subMonths,
		format
	} from 'date-fns';
	const dispatch = createEventDispatcher();
	const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	const today = new Date();
	export let sourceDate = startOfMonth(today);
	$: days = Array(42)
		.fill(null)
		.map((_, i) => {
			const SM = startOfMonth(sourceDate);
			const SMW = getDay(SM);
			const EM = endOfMonth(sourceDate);
			// when days are in previous month
			if (i < SMW) {
				return {
					date: subDays(SM, Math.abs(i + 1 - (SMW + 1))),
					earlier: true
				};
			}
			// when days are in next month
			if (i >= getDate(EM) + SMW) {
				return {
					date: addDays(SM, i - (SMW - 1) - 1),
					later: true
				};
			}
			return {
				date: addDays(SM, i - (SMW - 1) - 1),
				fit: true
			};
		});
	export let selectedDay = today;
	interface Day {
		date: Date;
		earlier?: boolean;
		later?: boolean;
		fit?: boolean;
	}
	const select = (e: Day) => {
		if (e.earlier) {
			sourceDate = subMonths(sourceDate, 1);
		} else if (e.later) {
			sourceDate = addMonths(sourceDate, 1);
		}
		selectedDay = e.date;
		dispatch('change', selectedDay);
	};
	let latestMCStart: any;
	user.subscribe(async (v) => {
		if (!v) return;
		latestMCStart = await usr.getLatestMenstrualCycleStart();
	});
</script>

<div class="p-2 sm:p-4">
	<div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
		<!-- Controll Section -->
		<div class="flex flex-1 flex-row items-center">
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
				title="Previous Month"
				on:click={() => (sourceDate = subMonths(sourceDate, 1))}
			>
				<i class="material-icons">chevron_left</i>
			</button>
			<div class="flex-1" />
			<h4 class="font-sans font-semibold text-2xl sm:text-3xl">
				{format(sourceDate, 'yyyy, LLL')}
			</h4>
			<div class="flex-1" />
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
				title="Next Month"
				on:click={() => (sourceDate = addMonths(sourceDate, 1))}
			>
				<i class="material-icons">chevron_right</i>
			</button>
		</div>

		<!-- Items Section -->
		<div class="grid grid-cols-7 gap-2 sm:gap-4 mt-2 sm:mt-4">
			<!-- Week days header -->
			{#each week as item}
				<!-- Desktop -->
				<div class="hidden sm:flex flex-col flex-1 items-center">
					<h4 class="font-sans font-semibold text-2xl capitalize">{item}</h4>
				</div>
				<!-- Mobile -->
				<div class="flex sm:hidden flex-col flex-1 items-center">
					<h4 class="font-sans font-semibold text-xl capitalize">{item[0]}</h4>
				</div>
			{/each}

			<!-- Days -->
			{#each days as item}
				{@const isSelected =
					differenceInDays(item.date, selectedDay) === 0 &&
					getDate(item.date) === getDate(selectedDay)}
				{@const isToday =
					differenceInDays(item.date, today) === 0 && getDate(item.date) === getDate(today)}
				{@const MCStartDate = new Date(latestMCStart?.created_at.seconds * 1000)}
				{@const isMCStart =
					differenceInDays(item.date, MCStartDate) === 0 &&
					getDate(item.date) === getDate(MCStartDate)}
				<button
					class={`p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
						focus:ring-opacity-75 ease-in-out duration-300 flex flex-col flex-1 items-center
						${
							isSelected
								? 'bg-purple-400 text-black hover:bg-purple-800 focus:ring-purple-400'
								: 'bg-gray-200 text-black hover:bg-gray-400 focus:ring-gray-300'
						}`}
					class:opacity-25={!item.fit}
					class:border-l-4={isMCStart}
					class:border-red-600={isMCStart}
					title={format(item.date, 'yyyy, dd LLL')}
					on:click={() => select(item)}
				>
					<div class="flex flex-row">
						<span class="font-sans font-semibold text-l sm:text-2xl capitalize">
							{#if getDate(item.date) < 10}
								0{getDate(item.date)}
							{:else}
								{getDate(item.date)}
							{/if}
						</span>
						{#if isToday}
							<div class="bg-red-600 rounded-full w-1 sm:w-1.5 h-1 sm:h-1.5" />
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
