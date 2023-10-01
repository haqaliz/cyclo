<script lang="ts">
	import { user } from '$stores';
	import { user as usr } from '$api';
	import { Calendar } from '$components';
	import RecordedDays from '../recorded-days/index.svelte';
	import { startOfDay, endOfDay } from 'date-fns';
	let selectedDay = new Date();
	let recordedDays: any = null;
	const getRecordedDays = async (d: Date) => {
		if (!$user) return;
		const r = await usr.getRecordedDays({
			from: startOfDay(d).getTime() / 1000,
			to: endOfDay(d).getTime() / 1000
		});
		recordedDays = r;
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
	<title>Calendar Detail</title>
	<meta
		name="description"
		content="Detailed insights for every cycle day. Maximize your menstrual health knowledge."
	/>
</svelte:head>

<Calendar {selectedDay} on:change={dateChanged} />

<div class="pl-2 pr-2 sm:pl-4 sm:pr-4">
	<RecordedDays {recordedDays} {selectedDay} on:update={() => getRecordedDays(selectedDay)} />
</div>
