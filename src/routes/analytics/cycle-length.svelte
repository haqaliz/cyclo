<script lang="ts">
    import { GChart } from '$components';
    const colors = {
        column: '#e9d5ff',
    };
    const columnMaxValue = 35;
    const tooltipContent = (value: number, prefix: string) => {
        return `<div class="flex flex-col p-2 sm:p-4 min-w-[200px] sm:min-w-[250px]">
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    Cycle Length:
                </span>
                <span class="font-sans font-semibold text-lg sm:text-xl ml-2">
                    ${value} ${prefix ?? ''}
                </span>
            </div>
        </div>`;
    };
    let data = [
          ['Year', 'Cycle Length', { role: 'style' }, { 'role': 'tooltip', 'p': {'html': true} } ],
          ['28', 28, `color: ${colors.column}`, tooltipContent(28, 'days')],
          ['26', 26, `color: ${colors.column}`, tooltipContent(26, 'days')],
          ['30', 30, `color: ${colors.column}`, tooltipContent(30, 'days')],
          ['29', 29, `color: ${colors.column}`, tooltipContent(29, 'days')]
        ];
    let options = {
        backgroundColor: { fill: 'transparent' },
        bar: { groupWidth: "90%" },
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
        isStacked: true,
    };
</script>

<div class="cycle-length-container bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
    <GChart
        type="ColumnChart"
        {data}
        {options}
    />
</div>

<style>
    .cycle-length-container :global(rect[fill="#e9d5ff"]) {
        rx: 0.25rem;
        ry: 0.25rem;
    }
</style>