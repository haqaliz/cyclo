<script lang="ts">
	import { Button } from '$components';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { users_challenges } from '$firebase';
	import { user } from '$stores';
	const dispatch = createEventDispatcher();
	export let challenge: any;
	let toggleLoading = false;
	const toggleAccept = async () => {
		if (toggleLoading) return;
		toggleLoading = true;
		if (challenge.user_challenge) {
			await users_challenges.deleteUserChallenge({
				user_id: $user.uid,
				challenge_id: challenge.id,
			});
		} else {
			await users_challenges.createUserChallenge({
				user_id: $user.uid,
				challenge_id: challenge.id
			});
		}
		await user.get($user);
		toggleLoading = false;
		dispatch('change');
	};
</script>

<div
	in:slide
	out:slide
	class="flex flex-col md:flex-row items-start transition-colors rounded-lg p-4
    min-h-[300px] bg-zinc-950/10"
>
	<div class="flex flex-row items-center justify-center flex-1 w-full md:max-w-[350px]">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img class="h-full max-h-[250px] drag-none" src={challenge.img} />
	</div>
	<div class="flex flex-col flex-1 items-start">
		<span class="font-sans font-semibold text-2xl md:text-3xl mb-4">
			{challenge.value}
		</span>
		<p class="flex-1 text-gray-700 text-lg mb-4">
			{challenge.objective}
		</p>
		{#if !Object.keys(challenge.user_challenge?.content ?? {})?.length}
			<Button on:click={toggleAccept}>
				{#if toggleLoading}
					<div class="w-3 h-3 rounded-full animate-ping bg-gray-700" />
				{:else if challenge.user_challenge}
					<i class="material-icons mr-2">bookmark</i>
					Reject Challenge
				{:else}
					<i class="material-icons mr-2">bookmark_border</i>
					Join Challenge
				{/if}
			</Button>
		{:else if !challenge.user_challenge}
			<Button on:click={toggleAccept}>
				{#if toggleLoading}
					<div class="w-3 h-3 rounded-full animate-ping bg-white" />
				{:else}
					<i class="material-icons mr-2">bookmark_border</i>
					Join Challenge
				{/if}
			</Button>
		{/if}
	</div>
</div>
