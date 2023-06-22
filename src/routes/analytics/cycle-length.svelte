<script lang="ts">
    import { GChart } from '$components';
    import { user } from '$stores';
    import { user as usr } from '$api';
    import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
    const columnMaxValue = 35;
    const colors = {
        column: '#e9d5ff',
    };
    let data: any = null;
    let options: any = {
        backgroundColor: { fill: 'transparent' },
        bar: { groupWidth: "95%" },
        chartArea: { width: '100%', height: '70%'},
        legend: { position: 'none' },
        hAxis: {
            gridlines: { count: 0 },
            baselineColor: 'transparent',
            textStyle: {
                fontSize: 22,
                bold: true
            },
        },
        vAxis: {
            gridlines: { count: 0 },
            baselineColor: 'transparent',
            textPosition: 'none',
            minValue: 0,
            maxValue: columnMaxValue,
            viewWindow: { max: columnMaxValue }
        },
        tooltip: { isHtml: true },
    };
    let range = {
        start: subMonths(startOfMonth(new Date()), 3),
        end: endOfMonth(new Date()),
    };
    interface Cycle {
        from: number;
        to: number;
        diff: number;
    }
    const tooltipContent = (v: Cycle) => {
        return `<div class="flex flex-col p-2 sm:p-4 min-w-[200px] sm:min-w-[250px]">
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    From:
                </span>
                <span class="font-sans font-semibold text-lg sm:text-xl ml-2">
                    ${format(new Date(v.from * 1000), 'yyyy, dd LLL')}
                </span>
            </div>
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    To:
                </span>
                <span class="font-sans font-semibold text-lg sm:text-xl ml-2">
                    ${format(new Date(v.to * 1000), 'yyyy, dd LLL')}
                </span>
            </div>
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    Cycle Length:
                </span>
                <span class="font-sans font-semibold text-lg sm:text-xl ml-2">
                    ${v.diff} days
                </span>
            </div>
        </div>`;
    };
    user.subscribe(async (v) => {
        if (!v) return;
        const r = await usr.getMenstrualCycles({
            from: range.start.getTime() / 1000,
            to: range.end.getTime() / 1000,
        });
        if (!r?.length) return;
        let dataRows = [['Cycle', 'Cycle Length', { role: 'style' }, { 'role': 'tooltip', 'p': {'html': true} }]];
        r.forEach((i: Cycle) => dataRows.push([
            i.diff.toString(),
            i.diff,
            `color: ${colors.column}`,
            tooltipContent(i),
        ]));
        data = dataRows;
    });
</script>

<div class="cycle-length-container bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
    <div class="flex flex-row items-center">
        <h3 class="font-sans font-semibold text-3xl">
            Last 3 Month
        </h3>
        <h3 class="font-sans font-semibold text-xl text-gray-400 ml-2">
            {format(new Date(range.start), 'LLL')} -
            {format(new Date(range.end), 'LLL')}
        </h3>
    </div>
    {#if data}
        <GChart
            type="ColumnChart"
            {data}
            {options}
        />
    {:else}
        <div class="alert warning self-center">
            <i class="material-icons mr-2">warning</i>
            Not enough data
        </div>
    {/if}
</div>

<style>
    .cycle-length-container :global(rect[fill="#e9d5ff"]) {
        rx: 0.25rem;
        ry: 0.25rem;
    }
</style>