<script lang="ts">
	import { DOMAIN } from '$config';
	import { challenges } from '$api';
	import { goto } from '$app/navigation';
	import { Progress } from '$components';
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
	let challenge: any;
	let loading = false;
	const update = async () => {
		if (loading) return;
		loading = true;
		challenge = await challenges.getChallenge({
			challenge_id: data?.challenge_id
		});
		loading = false;
	};
	$: (async () => {
		if (!/[a-zA-Z0-9]+/.test(data?.challenge_id) || data?.challenge_id === 'undefined')
			await goto('/challenges');
		if (challenge) return;
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
		class="flex flex-col flex-1"
	>
		<div class="flex flex-col w-full px-2 md:px-4">
			<h1 class="font-semibold text-3xl font-sans mb-2 md:mb-4">Challenge</h1>
			{#if loading}
				<div class="flex flex-row mb-2 md:mb-4">
					<Progress />
				</div>
			{/if}

			{#if challenge}
				<div
					class="flex flex-row items-start transition-colors rounded p-2 sm:p-4
					min-w-max cursor-pointer
					min-h-[300px] bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10"
				>
					<div
						class="bg-no-repeat bg-contain bg-center w-full max-w-[250px] h-full"
						style:background-image={`url(${challenge.img ?? ''})`}
					/>
					<div class="flex flex-row flex-1 items-start">
						<span class="font-sans font-semibold text-xl sm:text-2xl">
							{challenge.value}
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>