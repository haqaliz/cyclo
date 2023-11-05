<script lang="ts">
	import { DOMAIN } from '$config';
	import { browser } from '$app/environment';
	import { user as usr } from '$api';
	import { Progress } from '$components';
	import { goto } from '$app/navigation';
	import { challenges } from '$stores';
	import { slide } from 'svelte/transition';
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

	let challengesById: any = {};
	challenges.subscribe((v) => {
		challengesById = Object.fromEntries(
			Object.values(v ?? {})
				.reduce((a, i) => {
					a = [...a, ...i];
					return a;
				}, [])
				.map((i) => [i.id, i])
		);
	});

	/** @type {import('./$types').PageData} */
	export let data: any;
	let user: any;
	let loading = false;
	const update = async () => {
		if (!browser || loading) return;
		loading = true;
		user = await usr.getPublicInfo({
			user_id: data?.user_id
		});
		loading = false;
	};
	$: (async () => {
		if (!/[a-zA-Z0-9]+/.test(data?.user_id) || data?.user_id === 'undefined') await goto('/');
		if (user || !browser) return;
		if (!$challenges) await challenges.get();
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
	{#if loading}
		<div in:slide out:slide class="flex flex-1 flex-row mb-2 md:mb-4">
			<Progress />
		</div>
	{/if}

	{#if user?.completed_challenges?.length}
		<div in:slide out:slide class="flex flex-col w-full">
			<h1 class="font-semibold text-3xl font-sans mb-2 md:mb-4">Badges</h1>
			<div
				class="flex flex-row flex-wrap w-full bg-white transition-all ease-in-out bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4"
			>
				{#each user?.completed_challenges as item}
					<div class="flex flex-row items-center w-full sm:w-auto mb-2 last:mb-0 sm:mb-0 sm:mr-4">
						{#each item?.history ?? [] as hs}
							{#if hs.completed_days === 7}
								<div
									class="flex flex-row items-center justify-center min-w-max h-24 bg-green-300 select-none px-4 rounded-s relative"
								>
									<i class="material-icons text-5xl">verified</i>
									<span class="bg-zinc-900 py-1 px-2 rounded text-white font-semibold ml-4">
										{hs.count} Time{hs.count > 1 ? 's' : ''}
									</span>
								</div>
							{:else if hs.completed_days < 7 && hs.completed_days >= 3}
								<div
									class="flex flex-row items-center justify-center w-full sm:w-auto min-w-max h-24 bg-yellow-300 select-none px-4 rounded-s relative"
								>
									<i class="material-icons text-5xl">military_tech</i>
									<span class="bg-zinc-900 py-1 px-2 rounded text-white font-semibold ml-4">
										{hs.count} Time{hs.count > 1 ? 's' : ''}
									</span>
								</div>
							{:else if hs.completed_days < 7}
								<div
									class="flex flex-row items-center justify-center w-full sm:w-auto min-w-max h-24 bg-red-400 select-none px-4 rounded-s relative"
								>
									<i class="material-icons text-5xl">new_releases</i>
									<span class="bg-zinc-900 py-1 px-2 rounded text-white font-semibold ml-4">
										{hs.count} Time{hs.count > 1 ? 's' : ''}
									</span>
								</div>
							{/if}
						{/each}
						<a
							href={`/challenges/${item.challenge_id}`}
							class="bg-white transition-all ease-in-out bg-opacity-40 hover:bg-black hover:bg-opacity-25 w-24 h-24 p-4 rounded-e"
						>
							<div
								class="bg-no-repeat bg-contain bg-center w-full h-full"
								style:background-image={`url(${challengesById[item.challenge_id]?.img ?? ''})`}
							/>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
