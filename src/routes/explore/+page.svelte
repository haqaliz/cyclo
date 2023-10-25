<script lang="ts">
	import { DOMAIN } from '$config';
	import { page } from '$app/stores';
	import Timeline from './timeline.svelte';
	import Trends from './trends.svelte';
	import Footer from '../footer/index.svelte';
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
	$: query = $page.url.searchParams.get('q') ?? '';
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
	<Timeline {query} />
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
