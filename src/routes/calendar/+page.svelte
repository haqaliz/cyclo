<script lang="ts">
    import { user } from '$stores';
    import { user as usr } from '$api';
    import Agenda from './agenda.svelte';
    import RecordedDays from './recorded-days/index.svelte';
    import { startOfDay, endOfDay } from 'date-fns';
    let selectedDay = new Date();
    let recordedDays: any[] = [];
    interface User {
        id: string;
        email: string;
    };
    const getRecordedDays = async (d: Date) => {
        if (!$user) return;
        const r = await usr.getRecordedDays({
            from: startOfDay(d).getTime() / 1000,
            to: endOfDay(d).getTime() / 1000,
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
    <title>Calendar</title>
    <meta
        name="description"
        content="Stay organized and in tune with your cycle on our intuitive calendar page."
    >
</svelte:head>

<div class="p-2 sm:p-4">
    <Agenda
        on:change={dateChanged}
    />

    <div class="mt-2 sm:mt-4">
        <RecordedDays
            {recordedDays}
            {selectedDay}
            on:update={() => getRecordedDays(selectedDay)}
        />
    </div>
</div>