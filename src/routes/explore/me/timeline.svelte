<script lang="ts">
	import { browser } from '$app/environment';
	import { user as usr } from '$api';
	import { Progress } from '$components';
	import NewPost from '../new-post.svelte';
	import SinglePostItem from '../single-post-item.svelte';
	export let query: string;
	let posts: any = [];
	let loading = false;
	const update = async (q: string) => {
		if (loading) return;
		loading = true;
		posts = await usr.getPosts({
			query: q,
			limit: 1000
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
	<div class="flex flex-col md:h-[calc(100vh-240px)] md:overflow-y-scroll hide-scrollbar">
		<NewPost on:created={() => update(query)} />

		{#if loading}
			<div class="flex flex-row mb-2 md:mb-4">
				<Progress />
			</div>
		{/if}

		{#if posts?.length}
			{#each posts as post}
				<SinglePostItem {post} actions={true} on:deleted={() => update(query)} />
			{/each}
		{/if}
	</div>
</div>
