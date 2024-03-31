<script lang="ts">
	import { Tabs } from '$components';
	import { users_challenges } from '$firebase';
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import { startOfMonth, format } from 'date-fns';
	import { twMerge } from 'tailwind-merge';

	let loading = false;
	let challenges: any = null;
	let series: any = null;
	let selectedTabItem = 'completed';
	const tooltipContent = (v: any, date: any) => {
		const type: any = convertTabToChallengeType(selectedTabItem);
		return `<div class="flex flex-col p-4 min-w-[250px]">
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    At:
                </span>
                <span class="font-sans font-semibold text-xl ml-2">
                    ${format(new Date(date * 1000), 'yyyy, dd LLL')}
                </span>
            </div>
            <div class="flex flex-row items-center">
                <span class="text-gray-500 font-sans font-semibold text-base">
                    Number of Challenges:
                </span>
                <span class="font-sans font-semibold text-xl ml-2">
                    ${v[type?.key]}
                </span>
            </div>
        </div>`;
	};
    user.subscribe(async (v: any) => {
		if (!v || loading || challenges?.length) return;
        loading = true;
		challenges = await users_challenges.getUserChallengesHistory({
			user_id: v.uid,
		});
        loading = false;
		if (!challenges?.length) return;
		series = challenges.reduce((a: any, i: any) => {
			const d = startOfMonth(i.created_at?.seconds * 1000).getTime() / 1000;
			if (!a[d]) a[d] = {
				completed: 0,
				abandoned: 0,
				not_completed: 0,
			};
			if (i.completed && Object.keys(i.content ?? {}).length === 7) a[d].completed += 1;
			if (i.completed && Object.keys(i.content ?? {}).length < 7) a[d].abandoned += 1;
			if (!i.completed && Object.keys(i.content ?? {}).length <= 7) a[d].not_completed += 1;
			return a;
		}, {});
	});
</script>

{#if !loading}
	<div
		in:slide
		out:slide
		class="flex flex-col transition-colors rounded-lg p-4 bg-zinc-950/10"
	>
		<div class="flex flex-col md:flex-row items-start">
			<h3 class="font-sans font-semibold text-3xl">Challenges History</h3>
			<div class="flex-1" />
			<Tabs
				items={['completed', 'abandoned', 'not_completed']}
				bind:selected={selectedTabItem}
			>
				<svelte:fragment slot="default" let:item>
					{{
						completed: 'Completed',
						abandoned: 'Abandoned',
						not_completed: 'Not Completed',
					}[item]}
				</svelte:fragment>
			</Tabs>
		</div>
		{#if series}
			<div class="flex flex-row flex-wrap">
				{#each Object.keys(series) as i}
					{@const item = series[i]}
					<div
						class={twMerge(
							`flex flex-row items-center rounded-lg p-4 mb-4
								mr-4 font-semibold`,
							{
								completed: 'bg-teal-200',
								abandoned: 'bg-yellow-300',
								not_completed: 'bg-red-300',
							}[selectedTabItem],
						)}
					>
						<h3 class="flex flex-row items-center text-xl font-semibold mr-2">
							{format(new Date(i * 1000), 'LLL, dd yyyy')}
						</h3>
						<h2 class="text-3xl rounded-lg px-2 py-1 mr-2">
							{item[selectedTabItem]}
						</h2>
					</div>
				{/each}
			</div>
		{:else}
			<div
				class="
					p-4 h-[76px] transition-all ease-in-out duration-300 rounded-lg font-sans text-lg flex items-center
					bg-yellow-300 font-semibold text-black mt-4
				"
			>
				<i class="material-icons mr-2">info</i>
				Not enough data
			</div>
		{/if}
	</div>
{/if}