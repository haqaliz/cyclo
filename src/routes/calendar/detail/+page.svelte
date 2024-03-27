<script lang="ts">
	import { slide } from 'svelte/transition';
	import { user } from '$stores';
	import { recorded_days } from '$firebase';
	import Calendar from './calendar.svelte';
	import RecordedDays from '../recorded-days/index.svelte';
	import AddRecordedDay from '../recorded-days/add.svelte';
	import { startOfDay, endOfDay } from 'date-fns';
	let selectedDay = new Date();
	let loading = false;
	let recordedDays: any = null;
	const getRecordedDays = async (d: Date) => {
		if (!$user || loading) return;
		loading = true;
		const r = await recorded_days.getRecordedDaysForUser({
			user_id: $user.uid,
			from: startOfDay(d),
			to: endOfDay(d),
		});
		recordedDays = r;
		loading = false;
	};
	const dateChanged = async (e: any) => {
		selectedDay = e.detail;
		await getRecordedDays(selectedDay);
	};
	user.subscribe(async (v) => {
		if (!v) return;
		await getRecordedDays(selectedDay);
	});
</script>

<svelte:head>
	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="flex flex-col px-2 pt-2 sm:px-4 sm:pt-4">
	<Calendar {selectedDay} on:change={dateChanged} />
</div>

<div class="px-2 sm:px-4">
	{#if !loading && recordedDays?.length}
		<div in:slide out:slide class="flex flex-col mt-4">
			<RecordedDays {recordedDays} on:update={() => getRecordedDays(selectedDay)} />
		</div>
	{/if}
	<div in:slide out:slide class="flex flex-row">
		<AddRecordedDay
			recordedDay={recordedDays?.length ? recordedDays[0] : null}
			{selectedDay}
			on:update={() => getRecordedDays(selectedDay)}
		/>
	</div>
</div>
