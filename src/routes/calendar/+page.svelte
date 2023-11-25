<script lang="ts">
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import { user as usr } from '$api';
	import { Recommendations, Challenges, Progress } from '$components';
	import Agenda from './agenda.svelte';
	import RecordedDays from './recorded-days/index.svelte';
	import AddRecordedDay from './recorded-days/add.svelte';
	import { startOfDay, endOfDay } from 'date-fns';

	let selectedDay = new Date();
	let loading = false;
	let recordedDays: any[] = [];
	const getRecordedDays = async (d: Date) => {
		if (!$user || loading) return;
		loading = true;
		const r = await usr.getRecordedDays({
			from: startOfDay(d).getTime() / 1000,
			to: endOfDay(d).getTime() / 1000
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
	<title>Calendar</title>
	<meta
		name="description"
		content="Stay organized and in tune with your cycle on our intuitive calendar page."
	/>
</svelte:head>

<div class="p-2 sm:p-4">
	<Agenda on:change={dateChanged} />

	{#if loading}
		<div
			in:slide
			out:slide
			class="flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
				bg-gray-100 hover:bg-gray-200 overflow-hidden mt-2 sm:mt-4"
		>
			<Progress />
		</div>
	{:else}
		<div in:slide out:slide class="flex flex-col">
			{#if recordedDays?.length}
				<div class="mt-2 sm:mt-4">
					<RecordedDays {recordedDays} on:update={() => getRecordedDays(selectedDay)} />
				</div>
			{/if}
		</div>
	{/if}
	<div class="mt-2 sm:mt-4">
		<Recommendations type="menstruation_product" />
	</div>
	<div class="mt-2 sm:mt-4">
		<Recommendations type="other_product" />
	</div>
	<div class="mt-2 sm:mt-4">
		<Recommendations type="activities" />
	</div>
	<div class="mt-2 sm:mt-4">
		<Challenges />
	</div>
	<div class="mt-2 sm:mt-4">
		<Recommendations type="hormone_health_insights" />
	</div>
	<div class="mt-2 sm:mt-4">
		<Recommendations type="nutritional_guidances" />
	</div>
	<div in:slide out:slide class="flex flex-row mt-2 md:mt-4">
		<AddRecordedDay
			recordedDay={recordedDays?.length ? recordedDays[0] : null}
			{selectedDay}
			on:update={() => getRecordedDays(selectedDay)}
		/>
	</div>
</div>
