<script lang="ts">
	import { browser } from '$app/environment';
	import { challenges } from '$firebase';
	import { user, pageTitle } from '$stores';
	import { goto } from '$app/navigation';
	import ChallengeDetail from './challenge-detail.svelte';
	import UserChallengeSection from './user-challenge-section.svelte';
	import CommentsSection from './comments-section.svelte';

	/** @type {import('./$types').PageData} */
	export let data: any;
	let challenge: any;
	let loading = false;
	const update = async () => {
		if (!browser || loading) return;
		loading = true;
		challenge = await challenges.getChallenge({
			user_id: $user.uid,
			challenge_id: data?.challenge_id,
		});
		$pageTitle = challenge.value ?? '';
		loading = false;
	};
	$: (async () => {
		if (!/[a-zA-Z0-9]+/.test(data?.challenge_id) || data?.challenge_id === 'undefined')
			await goto('/challenges');
		if (challenge) return;
		await update();
	})();
</script>

<div class="flex flex-col md:flex-row">
	<div class="flex flex-col flex-1">
		<div class="flex flex-col w-full px-2 md:px-4">
			{#if challenge}
				<ChallengeDetail {challenge} on:change={update} />

				<UserChallengeSection {challenge} on:change={update} />

				<CommentsSection {challenge} on:change={update} />
			{/if}
		</div>
	</div>
</div>
