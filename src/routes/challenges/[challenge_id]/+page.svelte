<script lang="ts">
	import { DOMAIN } from '$config';
	import { slide } from 'svelte/transition';
	import { challenges, user } from '$api';
	import { goto } from '$app/navigation';
	import { Progress, SmartTextarea } from '$components';
	import { differenceInDays } from 'date-fns';
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
	let bar: any = {
		content: '',
		mode: 'view',
		show: false,
		loading: false
	};
	const updateChallenge = async () => {
		if (bar.loading) return;
		bar.loading = true;
		await user.updateChallenge({
			challenge_id: challenge.id,
			content: bar.content
		});
		bar.loading = false;
		bar.content = '';
		bar.show = false;
		await update();
	};
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
				<!-- Challenge detail -->
				<div
					in:slide
					out:slide
					class="flex flex-col md:flex-row items-start transition-colors rounded p-2 md:p-4
					min-h-[300px] bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10"
				>
					<div class="flex flex-row items-center justify-center flex-1 w-full md:max-w-[350px]">
						<div
							class="bg-no-repeat bg-contain bg-center w-full h-full min-h-[250px]"
							style:background-image={`url(${challenge.img ?? ''})`}
						/>
					</div>
					<div class="flex flex-col flex-1 items-start">
						<span class="font-sans font-semibold text-2xl md:text-3xl mb-2 md:mb-4">
							{challenge.value}
						</span>
						<p class="flex-1 text-gray-700 text-lg mb-2 md:mb-4">
							{challenge.objective}
						</p>
						{#if challenge.user_challenge?.content?.length}
							<button
								class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
									focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 md:mr-4 last:mr-0
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
									Reject Challenge
								{:else}
									<i class="material-icons mr-2">bookmark_border</i>
									Join Challenge
								{/if}
							</button>
						{/if}
					</div>
				</div>

				<!-- Navigators of challenge -->
				{#if challenge.user_challenge}
					{@const chlngIndex = differenceInDays(
						new Date(),
						challenge.user_challenge.created_at.seconds * 1000
					)}
					<div
						in:slide
						out:slide
						class="flex flex-col md:flex-row items-start transition-colors rounded p-2 md:p-4
						bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10 mt-2 md:mt-4"
					>
						{#each [...Array(7).keys()] as k}
							{@const item = challenge.user_challenge?.content?.[k]}
							<button
								class="
									flex flex-row transition-colors ease-in-out rounded py-4 px-8 w-full md:w-auto
									font-semibold mb-2 md:mb-0 md:mr-4 last:mr-0 last:mb-0"
								class:text-white={!item && k === chlngIndex}
								class:bg-zinc-900={!item && k === chlngIndex}
								class:hover:bg-gray-700={!item && k === chlngIndex}
								class:text-black={k !== chlngIndex}
								class:bg-green-300={!!item && k <= chlngIndex}
								class:hover:bg-green-400={!!item && k <= chlngIndex}
								class:!bg-red-300={!item && k < chlngIndex}
								class:!hover:bg-red-400={!item && k < chlngIndex}
								class:bg-yellow-300={!item && k !== chlngIndex}
								class:hover:bg-yellow-400={!item && k !== chlngIndex}
								class:cursor-not-allowed={!item && k !== chlngIndex}
								on:click={() => {
									if ((!item && k === chlngIndex) || (!!item && k <= chlngIndex)) {
										bar.content = item?.value ?? '';
										bar.mode = k === chlngIndex ? 'edit' : 'view';
										bar.show = true;
									}
								}}
							>
								{#if item && k <= chlngIndex}
									<i class="material-icons mr-2">check</i>
								{:else if !item && k < chlngIndex}
									<i class="material-icons mr-2">close</i>
								{:else if !item && k !== chlngIndex}
									<i class="material-icons mr-2">more_horiz</i>
								{:else if !item && k === chlngIndex}
									<i class="material-icons mr-2">edit</i>
								{/if}
								Day {k + 1}
							</button>
						{/each}
					</div>
				{/if}

				<!-- Challenge day content -->
				{#if bar.show}
					<div
						in:slide
						out:slide
						class="flex flex-col md:flex-row items-start transition-colors rounded p-2 md:p-4
						bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10 mt-2 md:mt-4"
					>
						{#if bar.mode === 'edit'}
							<div class="flex flex-col bg-white flex-1 rounded relative">
								<SmartTextarea
									bind:value={bar.content}
									placeholder="Write&hellip;"
									minRows={12}
									maxRows={16}
									class="bg-white placeholder:text-gray-600 min-w-[320px]"
								/>
								<div
									class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4"
								>
									<button
										class="px-8 py-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
										focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 sm:mr-4 last:mr-0
											focus:ring-gray-400 justify-center h-[44px]"
										class:bg-zinc-900={bar.content?.length}
										class:hover:bg-gray-700={bar.content?.length}
										class:text-white={bar.content?.length}
										class:bg-gray-300={!bar.content?.length}
										class:hover:bg-gray-400={!bar.content?.length}
										class:text-gray-700={!bar.content?.length}
										class:cursor-not-allowed={!bar.content?.length || bar.loading}
										disabled={!bar.content?.length}
										on:click={updateChallenge}
									>
										{#if !bar.loading}
											Save
										{:else}
											<div
												class="w-3 h-3 rounded-full animate-ping"
												class:bg-white={!bar.content?.length}
												class:bg-gray-700={bar.content?.length}
											/>
										{/if}
									</button>
								</div>
							</div>
						{:else}
							{bar.content ?? ''}
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
