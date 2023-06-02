<script lang="ts">
    import { Calendar } from '$components';
    const selectedDay = new Date();
    const dateChanged = (e: any) => {
        const date = e.detail;
        console.log(date);
    };
</script>

<Calendar
    {selectedDay}
    on:change={dateChanged}
/>