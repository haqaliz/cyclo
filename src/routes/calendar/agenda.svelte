<script lang="ts">
    import { getDay, subDays, addDays, getDate, format } from 'date-fns';
    const today = new Date();
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    $: days = Object.fromEntries(
        week.map(
            (i, k) => {
                let date = today;
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
    let selectedDayIndex = getDay(today);
    $: todayIndex = getDay(today);
    type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    const select = (index: DayIndex) => {
        selectedDayIndex = index;
    };
</script>

<div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
    <div class="flex flex-1 flex-row">
        <h3 class="font-sans font-semibold text-3xl">
            {#if selectedDayIndex === todayIndex}
                Today
            {:else}
                {@const selectedDay = days[Object.keys(days)[selectedDayIndex]].date}
                {format(selectedDay, 'yyyy, dd LLL')}
            {/if}
        </h3>
        <div style:flex="1"/>
        <a href="/calendar/detail" class="btn black">
            <i class="material-icons">today</i>
        </a>
    </div>
    <div class="grid grid-cols-7 gap-4 mt-2 sm:mt-4">
        {#each Object.keys(days) as key, index}
            {@const item = days[key]}
            {@const colorClasses = selectedDayIndex === index ? 'primary' : 'gray'}
            <button
                class={`btn flex flex-col flex-1 items-center ${colorClasses}`}
                title={todayIndex === index ? 'Today' : ''}
                on:click={() => select(index)}
            >
                <div class="flex flex-row">
                    <!-- Desktop -->
                    <span class="hidden sm:inline font-sans font-semibold text-2xl capitalize">{key}</span>
                    <!-- Mobile -->
                    <span class="inline sm:hidden font-sans font-semibold text-l capitalize">{key.substr(0, 1)}</span>
                    {#if todayIndex === index}
                        <div class="bg-red-600 rounded-full w-1.5 h-1.5" />
                    {/if}
                </div>
                <span>
                    {#if getDate(item.date) < 10}
                        0{getDate(item.date)}
                    {:else}
                        {getDate(item.date)}
                    {/if}
                </span>
            </button>
        {/each}
    </div>
</div>