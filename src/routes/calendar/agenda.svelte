<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getDay, subDays, addDays, getDate, differenceInDays, format } from 'date-fns';
	import { user } from '$stores';
	import { user as usr } from '$api';
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
			return [
				i,
				{
					date
				}
			];
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
		latestMCStart = await usr.getLatestMenstrualCycleStart();
	});
</script>

<div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
	<div class="flex flex-1 flex-row">
		<h3 class="font-sans font-semibold text-3xl">
			{#if differenceInDays(selectedDay, today) === 0 && getDate(selectedDay) === getDate(today)}
				Today
			{:else}
				{format(selectedDay, 'yyyy, dd LLL')}
			{/if}
		</h3>
		<div style:flex="1" />
		<a
			href="/calendar/detail"
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400"
		>
			<i class="material-icons">today</i>
		</a>
	</div>
	<div class="flex flex-row mt-2 sm:mt-4 overflow-x-scroll hide-scrollbar sm:overflow-auto">
		{#each Object.keys(days) as key}
			{@const item = days[key]}
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
				class={`p-2 min-w-[80px] sm:min-w-min rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
					focus:ring-opacity-75 ease-in-out duration-300 flex flex-col flex-1 items-center
					mr-2 sm:mr-4 last:mr-0
					${
						isSelected
							? 'bg-purple-400 text-black hover:bg-purple-800 focus:ring-purple-400'
							: 'bg-gray-200 text-black hover:bg-gray-400 focus:ring-gray-300'
					}`}
				class:border-l-4={isMCStart}
				class:border-red-600={isMCStart}
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
