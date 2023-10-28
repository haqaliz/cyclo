<script lang="ts">
	import { DOMAIN } from '$config';
	import { Trends, Footer, SinglePostItem, Progress } from '$components';
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
	$: (async () => {
		if (!/[a-zA-Z0-9]+/.test(data?.post_id) || data?.post_id === 'undefined')
			await goto('/explore/overview');
		if (loading || post) return;
		loading = true;
		post = await user.getPost({
			post_id: data?.post_id
		});
		loading = false;
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
			<h1 class="font-semibold text-3xl font-sans mb-2 md:mb-4">Post</h1>
			{#if loading}
				<div class="flex flex-row mb-2 md:mb-4">
					<Progress />
				</div>
			{/if}

			{#if post}
				<SinglePostItem
					{post}
					actions={$usr && $usr?.id === post?.user_id}
					clickable={false}
					compact={false}
					on:deleted={() => goto('/explore/overview')}
				/>
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
