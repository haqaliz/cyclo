<script lang="ts">
    import { recorded_days } from "$firebase";
    import { user } from '$stores';
    import { startOfDay, endOfDay } from "date-fns";
    import Agenda from "./agenda.svelte";
    import RecordedDays from './recorded-days/index.svelte';
	import AddRecordedDay from './recorded-days/add.svelte';
	import { slide } from "svelte/transition";

    let selectedDay = new Date();
	let loading = false;
	let recordedDays: any[] = [];
    
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

<div class="p-2 sm:p-4">
	<Agenda on:change={dateChanged} />

    {#if !loading}
		<div in:slide out:slide class="flex flex-col">
			{#if recordedDays?.length}
				<div class="mt-2 sm:mt-4">
					<RecordedDays {recordedDays} on:update={() => getRecordedDays(selectedDay)} />
				</div>
			{/if}
		</div>
	{/if}
    <div in:slide out:slide class="flex flex-row mt-2 md:mt-4">
		<AddRecordedDay
			recordedDay={recordedDays?.length ? recordedDays[0] : null}
			{selectedDay}
			on:update={() => getRecordedDays(selectedDay)}
		/>
	</div>
</div>