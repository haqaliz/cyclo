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
		<a href="/calendar/detail" class="btn black">
			<i class="material-icons">today</i>
		</a>
	</div>
	<div class="grid grid-cols-7 gap-4 mt-2 sm:mt-4">
		{#each Object.keys(days) as key, index}
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
				class="btn flex flex-col flex-1 items-center"
				class:primary={isSelected}
				class:gray={!isSelected}
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
