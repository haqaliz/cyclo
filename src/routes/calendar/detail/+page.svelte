<script lang="ts">
    import { user } from '$stores';
    import { users } from '$api';
    import { Calendar } from '$components';
    import RecordedDays from '../recorded-days/index.svelte';
    import { startOfDay, endOfDay } from 'date-fns';
    let selectedDay = new Date();
    let recordedDays: any = null;
    interface User {
        id: string;
        email: string;
    };
    const getRecordedDays = async (user: User, d: Date) => {
        if (!$user) return;
        const r = await users.getRecordedDays({
            user_id: user.id,
            from: startOfDay(d).getTime() / 1000,
            to: endOfDay(d).getTime() / 1000,
        });
        return r;
    };
    const dateChanged = async (e: any) => {
        selectedDay = e.detail;
        recordedDays = await getRecordedDays($user, selectedDay);
    };
    user.subscribe(async (v) => {
        if (!v) return;
        recordedDays = await getRecordedDays(v, selectedDay);
    });
</script>

<Calendar
    {selectedDay}
    on:change={dateChanged}
/>

<div class="pl-2 pr-2 sm:pl-4 sm:pr-4">
    <RecordedDays {recordedDays} />
</div>