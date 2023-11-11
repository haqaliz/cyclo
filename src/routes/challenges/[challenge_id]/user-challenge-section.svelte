<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { user } from '$api';
	import { SmartTextarea } from '$components';
	import { differenceInDays, startOfDay } from 'date-fns';

	const dispatch = createEventDispatcher();
	export let challenge: any;
	let bar: any = {
		title: '',
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
		dispatch('change');
	};
	let windowWidth = window.innerWidth;
	const resized = () => {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:window on:resize={resized} />

<!-- Navigators of challenge -->
{#if challenge.user_challenge}
	{@const chlngIndex = differenceInDays(
		startOfDay(new Date()),
		startOfDay(new Date(challenge.user_challenge.created_at.seconds * 1000))
	)}
	<div
		in:slide
		out:slide
		class="flex flex-col md:flex-row items-start transition-colors rounded p-2 md:p-4
        bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10 mt-2 md:mt-4 hide-scrollbar md:overflow-x-scroll"
		style:width={`calc(${windowWidth}px - (2 * ${windowWidth < 768 ? '0.5rem' : '1rem'}))`}
	>
		{#each [...Array(7).keys()] as k}
			{@const item = challenge.user_challenge?.content?.[k]}
			<button
				class="
                    flex flex-row transition-colors ease-in-out rounded py-4 px-8 w-full md:min-w-max md:w-auto
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
						bar.title = `Day ${k + 1}`;
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
		style:max-width={`calc(${windowWidth}px - (2 * ${windowWidth < 768 ? '0.5rem' : '1rem'}))`}
	>
		{#if bar.mode === 'edit'}
			<div class="flex flex-col flex-1 w-full">
				<h3 class="font-semibold text-3xl mb-2 md:mb-4">{bar.title}</h3>
				<div class="flex flex-col bg-white flex-1 w-full rounded relative">
					<SmartTextarea
						bind:value={bar.content}
						placeholder="Write&hellip;"
						minRows={12}
						maxRows={16}
						class="bg-white placeholder:text-gray-600 min-w-[320px]"
					/>
					<div class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4">
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
				<!-- share section -->
				<div class="flex flex-row mt-2 md:mt-4">
					<a
						href={`https://twitter.com/intent/tweet?text=${bar.title + ': ' + bar.content.substr(0, 144) + ' ' + window.location.href}&related=cyclo`}
						target="_blank"
						class="
							rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
							focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
							focus:ring-gray-400 justify-center hover:bg-gray-600 hover:bg-opacity-30
							w-[40px] h-[40px]
						"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
							<path
								d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
							/>
						</svg>
					</a>
				</div>
			</div>
		{:else}
			<div class="flex flex-col">
				<h3 class="font-semibold text-3xl mb-2 md:mb-4">{bar.title}</h3>
				<p class="text-lg">
					{bar.content ?? ''}
				</p>
				<!-- share section -->
				<div class="flex flex-row mt-2 md:mt-4">
					<a
						href={`https://twitter.com/intent/tweet?text=${bar.title + ': ' + bar.content.substr(0, 144) + ' ' + window.location.href}&related=cyclo`}
						target="_blank"
						class="
							rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
							focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
							focus:ring-gray-400 justify-center hover:bg-gray-600 hover:bg-opacity-30
							w-[40px] h-[40px]
						"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
							<path
								d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
							/>
						</svg>
					</a>
				</div>
			</div>
		{/if}
	</div>
{/if}
