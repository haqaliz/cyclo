<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user } from '$stores';
	import { menstrual_cycles } from '$firebase';
	import { twMerge } from 'tailwind-merge';
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
	import { Button } from '$components';
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
		latestMCStart = await menstrual_cycles.getStartOfLastMenstrualCycleForUser({
			user_id: v.uid,
		});
	});
</script>

<div class="bg-zinc-950/10 rounded-lg p-2 sm:p-4 flex flex-col">
	<!-- Controll Section -->
	<div class="flex flex-1 flex-row items-center">
		<Button title="Previous Month" icon="chevron_left" on:click={() => (sourceDate = subMonths(sourceDate, 1))} />
		<div class="flex-1" />
		<h4 class="font-sans font-semibold text-2xl sm:text-3xl">
			{format(sourceDate, 'yyyy, LLL')}
		</h4>
		<div class="flex-1" />
		<Button title="Next Month" icon="chevron_right" on:click={() => (sourceDate = addMonths(sourceDate, 1))} />
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
				class={twMerge(
					`p-2 rounded-lg font-sans font-medium text-lg focus:outline-none focus:ring-2
					focus:ring-opacity-75 ease-in-out duration-300 flex flex-col flex-1 items-center`,
					isSelected
						? 'bg-zinc-950/40 text-zinc-950 hover:bg-zinc-950/50'
						: 'bg-zinc-950/10 text-zinc-950 hover:bg-zinc-950/20',
					isMCStart ? 'border-l-4 border-zinc-950/30' : '',
					!item.fit ? 'opacity-25' : '',
				)}
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
