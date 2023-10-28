<script lang="ts">
	import { browser } from '$app/environment';
	import { misc } from '$api';
	import { user } from '$stores';
	import { Progress } from '$components';
	import _ from 'lodash';
	let trends: any = [];
	let loading = false;
	const update = async () => {
		if (loading) return;
		loading = true;
		trends = await misc.trends();
		loading = false;
	};
	$: {
		if (browser) update();
	}
	$: top10Trends = _.orderBy(trends, (i: any) => i.count, 'desc')?.slice(0, 10);
</script>

<div class="flex flex-col px-2 md:px-0">
	<h1 class="font-semibold text-3xl font-sans mb-2 md:mb-4">Trends</h1>

	{#if loading}
		<div class="flex flex-row mb-2 md:mb-4">
			<Progress />
		</div>
	{:else}
		<div
			class="
				flex flex-col rounded bg-white transition-all ease-in-out bg-opacity-25
				md:overflow-y-scroll hide-scrollbar
			"
			class:md:h-[calc(100vh-252px)]={!$user}
			class:md:h-[calc(100vh-360px)]={!!$user}
		>
			<ul>
				{#if top10Trends?.length}
					{#each top10Trends as trend}
						<li>
							<a
								href={`/explore/overview?q=${trend.value}`}
								class="flex flex-col hover:bg-black hover:bg-opacity-10 p-2 md:p-4"
							>
								<strong>#{trend.value}</strong>
								<span>{trend.count.toLocaleString('en')} posts</span>
							</a>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
