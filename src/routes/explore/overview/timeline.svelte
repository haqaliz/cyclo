<script lang="ts">
	import { browser } from '$app/environment';
	import { misc } from '$api';
	import { user } from '$stores';
	import { Progress } from '$components';
	import NewPost from '../new-post.svelte';
	import SinglePostItem from '../single-post-item.svelte';
	export let query: string;
	let posts: any = [];
	let loading = false;
	const update = async (q: string) => {
		if (loading) return;
		loading = true;
		posts = await misc.explore({
			query: q
		});
		loading = false;
	};
	$: {
		if (browser) update(query);
	}
</script>

<div class="flex flex-col w-full px-2 md:px-4">
	<h1 class="font-semibold text-3xl font-sans mb-2 md:mb-4">
		Explore
		{#if query?.length}
			<span class="text-xl">(searched for: {query})</span>
		{/if}
	</h1>
	<div
		class="flex flex-col md:overflow-y-scroll hide-scrollbar"
		class:md:h-[calc(100vh-132px)]={!$user}
		class:md:h-[calc(100vh-240px)]={!!$user}
	>
		<NewPost on:created={() => update(query)} />

		{#if loading}
			<div class="flex flex-row mb-2 md:mb-4">
				<Progress />
			</div>
		{/if}

		{#if posts?.length}
			{#each posts as post}
				<SinglePostItem {post} />
			{/each}
		{/if}
	</div>
</div>
