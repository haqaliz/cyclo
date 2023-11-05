<script lang="ts">
	import { DOMAIN } from '$config';
	import { browser } from '$app/environment';
	import { Trends, Footer, SinglePostItem, NewPost, Progress } from '$components';
	import { user as usr } from '$stores';
	import { user } from '$api';
	import { goto } from '$app/navigation';
	const title = 'Your Shared Journey in Menstrual Health | Cyclo';
	const description =
		"Discover a world of shared experiences and knowledge on Cyclo's Explore page.";
	const keywords = [
		'Menstrual Health Community',
		'Shared Experiences',
		'Cyclo Explore Page',
		'Community Posts',
		'User Contributions',
		'Menstruation Support',
		'Shared Knowledge',
		'Menstrual Wellness',
		'Cycle Explorers',
		'Community Interaction'
	];

	/** @type {import('./$types').PageData} */
	export let data: any;
	let post: any;
	let loading = false;
	const update = async () => {
		if (!browser || loading) return;
		loading = true;
		post = await user.getPost({
			post_id: data?.post_id
		});
		loading = false;
	};
	$: (async () => {
		if (!/[a-zA-Z0-9]+/.test(data?.post_id) || data?.post_id === 'undefined')
			await goto('/explore/overview');
		if (post) return;
		await update();
	})();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords.join(',')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={DOMAIN} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={`${DOMAIN}img/about/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={DOMAIN} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${DOMAIN}img/about/cover.webp`} />

	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="flex flex-col md:flex-row">
	<div
		class="flex flex-col flex-1 w-full md:min-w-[calc(100%-350px-1rem)] md:max-w-[calc(100%-350px-1rem)]"
	>
		<div class="flex flex-col w-full px-2 md:px-4">
			{#if loading}
				<div class="flex flex-row mb-2 md:mb-4">
					<Progress />
				</div>
			{/if}

			{#if post}
				{#if post.parent_id}
					<SinglePostItem post={post.parent} actions={true} on:deleted={update}>
						<svelte:fragment slot="before-header-first-element">
							{#if post.parent.parent_id}
								<i class="material-icons text-gray-600 mr-2">reply</i>
							{/if}
						</svelte:fragment>
					</SinglePostItem>
				{/if}

				<SinglePostItem
					{post}
					actions={true}
					clickable={false}
					compact={false}
					on:deleted={() => goto('/explore/overview')}
				>
					<svelte:fragment slot="before-header-first-element">
						{#if post.parent_id}
							<i class="material-icons text-gray-600 mr-2">reply</i>
						{/if}
					</svelte:fragment>
				</SinglePostItem>

				{#if $usr}
					<NewPost
						parentId={post?.id}
						placeholder="Comment"
						submitButtonText="Reply"
						on:created={update}
					/>

					{#if post.comments?.length}
						{#each post.comments as comment}
							<SinglePostItem post={comment} actions={true} on:deleted={update}>
								<svelte:fragment slot="before-header-first-element">
									<i class="material-icons text-gray-600 mr-2">reply</i>
								</svelte:fragment>
							</SinglePostItem>
						{/each}
					{/if}
				{/if}
			{/if}
		</div>
	</div>
	<div class="flex flex-col w-full md:min-w-[350px] md:max-w-[350px] md:mr-4">
		<Trends />
		<div class="hidden md:flex flex-col">
			<Footer compact={true} />
		</div>
		<div class="md:hidden flex flex-col">
			<Footer />
		</div>
	</div>
</div>
