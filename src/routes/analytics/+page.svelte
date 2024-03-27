<script lang="ts">
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import { recorded_days } from '$firebase';
	import MenstruationStatus from './menstruation-status.svelte';
	import FertileStatus from './fertile-status.svelte';

	let latestMenstrualCycleStart: any;
	let loading = false;
	user.subscribe(async (v) => {
		if (!v || loading) return;
		loading = true;
		latestMenstrualCycleStart = await recorded_days.getStartOfLastMenstrualCycleForUser({
			user_id: v.uid,
		});
		loading = false;
	});
</script>

<svelte:head>
	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="p-4">
	{#if !loading}
		<div in:slide out:slide class="flex flex-col mt-4">
			<MenstruationStatus {latestMenstrualCycleStart} />
		</div>
	{/if}
	{#if !loading}
		<div in:slide out:slide class="flex flex-col mt-4">
			<FertileStatus {latestMenstrualCycleStart} />
		</div>
	{/if}
</div>
