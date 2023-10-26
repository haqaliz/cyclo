<script lang="ts">
	import { browser } from '$app/environment';
	import { misc } from '$api';
	import { user } from '$stores';
	import { Progress } from '$components';
	import NewPost from '../new-post.svelte';
	import { formatDistanceToNow } from 'date-fns';
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
				<div
					class="
					flex flex-col rounded bg-white transition-all ease-in-out bg-opacity-25
					hover:bg-black hover:bg-opacity-10 p-2 md:p-4 mb-2 md:mb-4
				"
				>
					<span class="text-sm font-semibold text-gray-600 mb-1 md:mb-2">
						{formatDistanceToNow(new Date(post.created_at.seconds * 1000), { addSuffix: true })}
					</span>
					<p class="font-sans">
						{post.content}
					</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
