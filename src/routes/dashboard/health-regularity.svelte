<script lang="ts">
    import { twMerge } from 'tailwind-merge';
	import { menstrual_cycles } from '$firebase';
	import { slide } from 'svelte/transition';
    import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
	import { user } from '$stores';

	let loading = false;
    let regularity: any = null;
    let score: any = null;
    let range = {
		start: subMonths(startOfMonth(new Date()), 6),
		end: endOfMonth(new Date())
	};
    user.subscribe(async (v) => {
        if (!v || loading || (regularity?.length && score !== null)) return;
        loading = true;
        let [r1, r2] = await Promise.all([
            menstrual_cycles.getHealthRegularity({
				user_id: v.uid,
			}),
            menstrual_cycles.getHealthScore({
				user_id: v.uid,
			}),
        ]);
        if (!r1 || !r2) {
            loading = false;
            return;
        }
        regularity = r1;
        score = r2?.score;
        loading = false;
    });
</script>

{#if Object.keys(regularity ?? {})?.length && score !== null && !loading}
	<div
		in:slide
		out:slide
		class="flex flex-col sm:flex-row items-start transition-colors rounded-lg p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-zinc-950/10
		"
	>
		<div class="flex flex-col lg:flex-row md:max-w-min w-full mb-4 sm:mb-0">
			<div
				class={twMerge(
                    `flex flex-col items-center justify-center p-4 overflow-hidden
                    rounded-lg mr-4 w-full md:min-w-[240px]
                    transition-colors ease-in-out md:w-[240px] min-h-[240px] h-[240px]`,
                    score > 75 ? 'bg-sky-200' : '',
                    (score >= 25 && score <= 75) ? 'bg-orange-200' : '',
                    score < 25 ? 'bg-rose-200' : '',
                )}
                title={'title'}
			>
				<h3 class="text-5xl font-semibold">
					%{score}
				</h3>
                <h4 class="text-2xl text-gray-600 font-semibold">
                    Health Score
				</h4>
			</div>
		</div>
		<div class="flex flex-col items-start">
			<div class="flex flex-row items-center mb-4">
                <h3 class="font-sans font-semibold text-3xl">Regularity frequency in Last 6 Month</h3>
                <h3 class="font-sans font-semibold text-xl text-zinc-500 ml-2">
                    {format(new Date(range.start), 'LLL')} -
                    {format(new Date(range.end), 'LLL')}
                </h3>
            </div>
			<div class="flex flex-row flex-wrap">
                {#each regularity.cycles as item}
                    <div
                        class={twMerge(
                            `flex flex-col rounded-lg p-4 mb-4
                            mr-4 font-semibold`,
                            item.is_regular
                                ? 'bg-sky-200'
                                : 'bg-rose-200',
                        )}
                    >
                        <h3 class="flex flex-row items-center text-xl font-semibold">
                            {format(new Date(item.from * 1000), 'LLL, dd')}
                            <i class="material-icons mx-1 text-gray-500">east</i>
                            {format(new Date(item.to * 1000), 'LLL, dd')}
                        </h3>
                        <div class="flex flex-row items-center">
                            <span class="font-semibold text-gray-500">{item.diff} days</span>
                            {#if item.diff > 31}
                                <div
                                    class="flex flex-row items-center justify-center bg-red-500 rounded-lg w-7 h-7 ml-2"
                                    title={`Seems you've not logged symptoms in ${item.diff} days`}
                                >
                                    <i class="material-icons text-sm">priority_high</i>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
		</div>
	</div>
{/if}
