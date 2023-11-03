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
	let toggleLoading = false;
	const toggleAccept = async () => {
		if (toggleLoading) return;
		toggleLoading = true;
		if (challenge.user_challenge) {
			await challenges.rejectChallenge({
				challenge_id: challenge.id
			});
		} else {
			await challenges.acceptChallenge({
				challenge_id: challenge.id
			});
		}
		toggleLoading = false;
		await update();
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
	<div class="flex flex-col flex-1">
		<div class="flex flex-col w-full px-2 md:px-4">
			{#if loading}
				<div class="flex flex-row mb-2 md:mb-4">
					<Progress />
				</div>
			{/if}

			{#if challenge}
				<div
					class="flex flex-col md:flex-row items-start transition-colors rounded p-2 sm:p-4 cursor-pointer
					min-h-[300px] bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10"
				>
					<div class="flex flex-row items-center justify-center flex-1 w-full md:max-w-[350px]">
						<div
							class="bg-no-repeat bg-contain bg-center w-full h-full min-h-[250px]"
							style:background-image={`url(${challenge.img ?? ''})`}
						/>
					</div>
					<div class="flex flex-col flex-1 items-start ml-2 md:ml-4">
						<span class="font-sans font-semibold text-2xl sm:text-3xl mb-2 md:mb-4">
							{challenge.value}
						</span>
						<p class="flex-1 text-gray-700 text-lg mb-2 md:mb-4">
							{challenge.objective}
						</p>
						<button
							class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
								focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 sm:mr-4 last:mr-0
								focus:ring-gray-400 justify-center h-11 min-w-[80px]"
							class:bg-zinc-900={!challenge.user_challenge}
							class:text-white={!challenge.user_challenge}
							class:hover:bg-gray-700={!challenge.user_challenge}
							class:bg-purple-400={challenge.user_challenge}
							class:text-black={challenge.user_challenge}
							class:hover:bg-purple-500={challenge.user_challenge}
							on:click={toggleAccept}
						>
							{#if toggleLoading}
								<div
									class="w-3 h-3 rounded-full animate-ping"
									class:bg-gray-700={challenge.user_challenge}
									class:bg-white={!challenge.user_challenge}
								/>
							{:else if challenge.user_challenge}
								<i class="material-icons mr-2">bookmark</i>
								Reject The Challenge you accepted
							{:else}
								<i class="material-icons mr-2">bookmark_border</i>
								Join Challenge for This Month
							{/if}
						</button>

						{#if challenge.user_challenge}
							<a
								href="/calendar"
								class="hover:bg-black hover:bg-opacity-10 transition-colors ease-in-out rounded p-2
								font-semibold mt-2 sm:mt-4">Start your challenge from your calendar</a
							>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
