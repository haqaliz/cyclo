<script lang="ts">
    import { startOfToday, getDay, subDays, addDays, getDate, format } from 'date-fns';
    const today = getDay(startOfToday());
    const items = Object.fromEntries(
        ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(
            (i, k) => {
                let date = startOfToday();
                if (getDay(date) !== k) {
                    const diff = getDay(date) - k;
                    date = diff < 0
                        ? addDays(date, Math.abs(diff))
                        : subDays(date, diff);
                }
                return [
                    i,
                    {
                        date,
                    },
                ];
            },
    ));
    let selectedDayIndex = getDay(startOfToday());
    $: todayIndex = getDay(startOfToday());
    type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    const select = (index: DayIndex) => {
        selectedDayIndex = index;
    };
</script>
<div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col overflow-x-scroll sm:overflow-auto">
    <div class="flex flex-1 flex-row">
        <h3 class="font-sans font-semibold text-3xl">
            {#if selectedDayIndex === todayIndex}
                Today
            {:else}
                {@const selectedDay = items[Object.keys(items)[selectedDayIndex]].date}
                {format(selectedDay, 'yyyy, dd LLL')}
            {/if}
        </h3>
        <div style:flex="1"/>
        <a href="/calendar/detail" class="btn black">
            <i class="material-icons">today</i>
        </a>
    </div>
    <div class="flex flex-1 flex-row mt-2 sm:mt-4">
        {#each Object.keys(items) as key, index}
            {@const item = items[key]}
            {@const generalClasses = index === Object.keys(items).length - 1 ? '' : 'mr-2 sm:mr-4'}
            {@const colorClasses = selectedDayIndex === index ? 'primary' : 'gray'}
            <button
                class={`btn flex flex-col flex-1 items-center ${generalClasses} ${colorClasses}`}
                title={todayIndex === index ? 'Today' : ''}
                on:click={() => select(index)}
            >
                <div class="flex flex-row">
                    <span class="font-sans font-semibold sm:text-2xl capitalize">{key}</span>
                    {#if todayIndex === index}
                        <div class="bg-red-600 rounded-full w-1.5 h-1.5" />
                    {/if}
                </div>
                <span>{getDate(item.date)}</span>
            </button>
        {/each}
    </div>
</div>