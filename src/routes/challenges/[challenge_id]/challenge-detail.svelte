<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { challenges } from '$api';
	const dispatch = createEventDispatcher();
	export let challenge: any;
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
		dispatch('change');
	};
</script>

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
		{#if !Object.keys(challenge.user_challenge?.content ?? {})?.length}
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                    focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 md:mr-4 last:mr-0
                    focus:ring-gray-400 justify-center h-11 min-w-[80px] bg-purple-400 text-black hover:bg-purple-500"
				on:click={toggleAccept}
			>
				{#if toggleLoading}
					<div class="w-3 h-3 rounded-full animate-ping bg-gray-700" />
				{:else if challenge.user_challenge}
					<i class="material-icons mr-2">bookmark</i>
					Reject Challenge
				{:else}
					<i class="material-icons mr-2">bookmark_border</i>
					Join Challenge
				{/if}
			</button>
		{:else if !challenge.user_challenge}
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                    focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 md:mr-4 last:mr-0
                    focus:ring-gray-400 justify-center h-11 min-w-[80px] bg-zinc-900 text-white hover:bg-gray-700"
				on:click={toggleAccept}
			>
				{#if toggleLoading}
					<div class="w-3 h-3 rounded-full animate-ping bg-white" />
				{:else}
					<i class="material-icons mr-2">bookmark_border</i>
					Join Challenge
				{/if}
			</button>
		{/if}
	</div>
</div>
