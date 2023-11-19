<script lang="ts">
	import { slide } from 'svelte/transition';
	import { user } from '$stores';
	import { user as usr } from '$api';
	import { Calendar, Recommendations, Challenges, Progress } from '$components';
	import RecordedDays from '../recorded-days/index.svelte';
	import AddRecordedDay from '../recorded-days/add.svelte';
	import { startOfDay, endOfDay } from 'date-fns';
	let selectedDay = new Date();
	let loading = false;
	let recordedDays: any = null;
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
	<title>Calendar Detail</title>
	<meta
		name="description"
		content="Detailed insights for every cycle day. Maximize your menstrual health knowledge."
	/>
</svelte:head>

<div class="flex flex-col px-2 pt-2 sm:px-4 sm:pt-4">
	<Calendar {selectedDay} on:change={dateChanged} />
</div>

<div class="px-2 sm:px-4">
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
					<RecordedDays {recordedDays} {selectedDay} on:update={() => getRecordedDays(selectedDay)} />
				</div>
			{/if}
		</div>
	{/if}
	<div class="mt-2 sm:mt-4">
		<Recommendations type="menstruation_product" />
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
