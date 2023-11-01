<script lang="ts">
	import { browser } from '$app/environment';
	import { misc } from '$api';
	import { user } from '$stores';
	import { Progress, SinglePostItem, NewPost, InfiniteScroll } from '$components';
	import _ from 'lodash';
	export let query: string;
	let startAfterPostId: any;
	const pageLimit = 20;
	let posts: any = [];
	let loading = false;
	const update = async (q: string) => {
		if (loading) return;
		loading = true;
		const fetchedPosts = await misc.explore({
			query: q,
			limit: pageLimit,
			start_after: startAfterPostId
		});
		posts = _.uniqBy([...posts, ...fetchedPosts], (i: any) => i.id);
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
		<NewPost
			on:created={async () => {
				startAfterPostId = null;
				posts = [];
				await update(query);
			}}
		/>

		{#if posts?.length}
			{#each posts as post}
				<SinglePostItem
					{post}
					actions={true}
					on:deleted={async () => {
						startAfterPostId = null;
						posts = [];
						await update(query);
					}}
				/>
			{/each}
		{/if}

		{#if loading}
			<div class="flex flex-row mb-2 md:mb-4">
				<Progress />
			</div>
		{/if}

		<InfiniteScroll
			hasMore={posts.length}
			threshold={pageLimit}
			on:loadMore={async () => {
				startAfterPostId = posts[posts.length - 1].id;
				await update(query);
			}}
		/>
	</div>
</div>
