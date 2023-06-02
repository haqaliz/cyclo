<script lang="ts">
    import Agenda from './agenda.svelte';
    const selectedDay = new Date();
    const dateChanged = (e: any) => {
        const date = e.detail;
        console.log(date);
    };
</script>

<div class="p-2 sm:p-4">
    <Agenda
        on:change={dateChanged}
    />
</div>