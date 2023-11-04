<script lang="ts">
	import { DOMAIN } from '$config';
	import { challenges } from '$stores';
	import { Progress } from '$components';
	import ChallengesCategory from './challenges-category.svelte';

	const title = 'Cyclo | Track & Achieve';
	const description =
		'Explore engaging challenges to enhance your menstrual cycle experience with Cyclo. Achieve wellness milestones, earn rewards, and connect with the Cyclo community.';
	const keywords = [
		'menstrual cycle challenges',
		'wellness milestones',
		'rewards',
		'Cyclo community',
		'menstrual cycle achievements'
	];
	let loading = true;
	challenges.subscribe((v) => {
		if (v) loading = false;
	});
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
	<meta property="og:image" content={`${DOMAIN}img/misc/cover.webp`} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={DOMAIN} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={`${DOMAIN}img/misc/cover.webp`} />

	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="flex flex-col px-2 md:px-4">
	{#if loading}
		<div class="flex flex-row mb-2 md:mb-4">
			<Progress />
		</div>
	{/if}
	<div class="flex flex-col bg-white bg-opacity-25 rounded relative overflow-hidden">
		{#if Object.keys($challenges ?? {})?.length}
			{@const challengesKeys = Object.keys($challenges ?? {})}

			{#each challengesKeys as challengeKey}
				<ChallengesCategory
					value={$challenges[challengeKey].map((i) => ({ key: challengeKey, ...i }))}
				/>
			{/each}
		{/if}
	</div>
</div>
