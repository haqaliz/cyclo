<script lang="ts">
    import {
        subDays,
        addDays,
        startOfMonth,
        endOfMonth,
        getDate,
        getDay,
        differenceInDays,
        addMonths,
        subMonths,
        format,
    } from 'date-fns';
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = new Date();
    let sourceDate = startOfMonth(today);
    $: days = Array(42)
        .fill(null)
        .map((_, i) => {
            const SM = startOfMonth(sourceDate);
            const SMW = getDay(SM);
            const EM = endOfMonth(sourceDate);
            const EMW = getDay(EM);
            if (i < SMW) {
                return {
                    date: subDays(SM, Math.abs((i + 1) - (SMW + 1))),
                    earlier: true,
                };
            }
            if (i >= getDate(EM) + SMW) {
                return {
                    date: addDays(SM, i - (SMW - 1) - 1),
                    later: true,
                };    
            }
            return {
                date: addDays(SM, i - (SMW - 1) - 1),
                fit: true,
            };
        });
    let selectedDay = today;
    interface Day {
        date: Date;
        earlier?: Boolean;
        later?: Boolean;
        fit?: Boolean;
    }
    const select = (e: Day) => {
        if (e.earlier) {
            sourceDate = subMonths(sourceDate, 1);
        } else if (e.later) {
            sourceDate = addMonths(sourceDate, 1)
        }
        selectedDay = e.date;
    };
</script>

<div class="p-2 sm:p-4">
    <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
        <!-- Controll Section -->
        <div class="flex flex-1 flex-row items-center">
            <button
                class="btn black justify-center"
                title="Previous Month"
                on:click={() => sourceDate = subMonths(sourceDate, 1)}
            >
                <i class="material-icons">chevron_left</i>
            </button>
            <div class="flex-1" />
            <h4 class="font-sans font-semibold text-2xl sm:text-3xl">
                {format(sourceDate, 'yyyy, LLL')}
            </h4>
            <div class="flex-1" />
            <button
                class="btn black justify-center"
                title="Next Month"
                on:click={() => sourceDate = addMonths(sourceDate, 1)}
            >
                <i class="material-icons">chevron_right</i>
            </button>
        </div>

        <!-- Items Section -->
        <div class="grid grid-cols-7 gap-2 sm:gap-4 mt-2 sm:mt-4">
            <!-- Week days header -->
            {#each week as item}
                <!-- Desktop -->
                <div class="hidden sm:flex flex-col flex-1 items-center">
                    <h4 class="font-sans font-semibold text-2xl capitalize">{item}</h4>
                </div>
                <!-- Mobile -->
                <div class="flex sm:hidden flex-col flex-1 items-center">
                    <h4 class="font-sans font-semibold text-xl capitalize">{item.substr(0, 1)}</h4>
                </div>
            {/each}

            <!-- Days -->
            {#each days as item}
                <button
                    class="btn flex flex-col flex-1 items-center"
                    class:primary={differenceInDays(item.date, selectedDay) === 0
                        && getDate(item.date) === getDate(selectedDay)}
                    class:gray={!(differenceInDays(item.date, selectedDay) === 0
                        && getDate(item.date) === getDate(selectedDay))}
                    class:opacity-25={!item.fit}
                    title={format(item.date, 'yyyy, dd LLL')}
                    on:click={() => select(item)}
                >
                    <div class="flex flex-row">
                        <span class="font-sans font-semibold text-l sm:text-2xl capitalize">
                            {#if getDate(item.date) < 10}
                                0{getDate(item.date)}
                            {:else}
                                {getDate(item.date)}
                            {/if}
                        </span>
                        {#if (
                            differenceInDays(item.date, today) === 0
                            && getDate(item.date) === getDate(today)
                        )}
                            <div class="bg-red-600 rounded-full w-1 sm:w-1.5 h-1 sm:h-1.5" />
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    </div>
</div>