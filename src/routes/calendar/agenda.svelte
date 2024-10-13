<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getDay, subDays, addDays, getDate, differenceInDays, format } from 'date-fns';
	import { user } from '$stores';
	import { Button } from '$components';
	import { menstrual_cycles } from '$firebase';
	import { twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher();
	const today = new Date();
	const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	$: days = Object.fromEntries(
		week.map((i, k) => {
			let date = today;
			if (getDay(date) !== k) {
				const diff = getDay(date) - k;
				date = diff < 0 ? addDays(date, Math.abs(diff)) : subDays(date, diff);
			}
			return [i, { date }];
		})
	);
	export let selectedDay = today;
	const select = (date: Date) => {
		selectedDay = date;
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

<div class="bg-zinc-950/10 rounded-lg p-4 flex flex-col mb-4">
	<div class="flex flex-1 flex-row">
		<h3 class="font-sans font-semibold text-3xl">
			{#if differenceInDays(selectedDay, today) === 0 && getDate(selectedDay) === getDate(today)}
				Today
			{:else}
				{format(selectedDay, 'yyyy, dd LLL')}
			{/if}
		</h3>
	</div>
	<div class="flex flex-row mt-4 overflow-x-scroll hide-scrollbar sm:overflow-auto">
		{#each Object.keys(days) as key}
			{@const item = days[key]}
			{@const isSelected =
				differenceInDays(item.date, selectedDay) === 0 &&
				getDate(item.date) === getDate(selectedDay)}
			{@const isToday =
				differenceInDays(item.date, today) === 0 && getDate(item.date) === getDate(today)}
			{@const MCStartDate = new Date(latestMCStart?.created_at?.seconds * 1000)}
			{@const isMCStart =
				differenceInDays(item.date, MCStartDate) === 0 &&
				getDate(item.date) === getDate(MCStartDate)}
			<button
				class={twMerge(
					`p-2 min-w-[80px] sm:min-w-min rounded-lg font-sans font-medium text-lg focus:outline-none focus:ring-2
					focus:ring-opacity-75 ease-in-out duration-300 flex flex-col flex-1 items-center
					mr-4 last:mr-0`,
					isSelected
						? 'bg-zinc-950/40 text-zinc-950 hover:bg-zinc-950/50'
						: 'bg-zinc-950/10 text-zinc-950 hover:bg-zinc-950/20',
					isMCStart ? 'border-l-4 border-zinc-950/50' : '',
				)}
				title={isToday ? 'Today' : ''}
				on:click={() => select(item.date)}
			>
				<div class="flex flex-row">
					<!-- Desktop -->
					<span class="hidden sm:inline font-sans font-semibold text-2xl capitalize">{key}</span>
					<!-- Mobile -->
					<span class="inline sm:hidden font-sans font-semibold text-l capitalize">{key[0]}</span>
					{#if isToday}
						<div class="bg-red-600 rounded-full w-1.5 h-1.5" />
					{/if}
				</div>
				<span>
					{#if getDate(item.date) < 10}
						0{getDate(item.date)}
					{:else}
						{getDate(item.date)}
					{/if}
				</span>
			</button>
		{/each}
	</div>
</div>
