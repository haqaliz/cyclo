<script lang="ts">
    import { recorded_days } from "$firebase";
    import { user } from '$stores';
    import { startOfDay, endOfDay } from "date-fns";
    import Agenda from "./agenda.svelte";
    import RecordedDays from './recorded-days/index.svelte';
	import AddRecordedDay from './recorded-days/add.svelte';
	import { slide } from "svelte/transition";
	import { Recommendations, Challenges } from "$components";

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

<div class="p-4">
	<Agenda on:change={dateChanged} />

    {#if !loading && recordedDays.length}
		<div in:slide out:slide class="flex flex-col mt-4">
			<RecordedDays {recordedDays} on:update={() => getRecordedDays(selectedDay)} />
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
		<Recommendations type="menstruation_product" class="h-full" />
		<Recommendations type="other_product" class="h-full xl:col-span-2" />
		<Challenges class="h-full md:col-span-2" />
		<Recommendations type="activities" class="h-full" />
		<Recommendations type="hormone_health_insights" class="h-full" />
		<Recommendations type="nutritional_guidances" class="h-full md:col-span-2" />
	</div>
    <div in:slide out:slide class="flex flex-row">
		<AddRecordedDay
			recordedDay={recordedDays?.length ? recordedDays[0] : null}
			{selectedDay}
			on:update={() => getRecordedDays(selectedDay)}
		/>
	</div>
</div>