<script lang="ts">
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import { user as usr } from '$api';
	import { Recommendations, Progress } from '$components';
	import MenstruationStatus from './menstruation-status.svelte';
	import FertileStatus from './fertile-status.svelte';
	import CycleLength from './cycle-length.svelte';

	let latestMenstrualCycleStart: any;
	let loading = false;
	user.subscribe(async (v) => {
		if (!v || loading) return;
		loading = true;
		latestMenstrualCycleStart = await usr.getLatestMenstrualCycleStart();
		loading = false;
	});
</script>

<svelte:head>
	<title>Analytics</title>
	<meta
		name="description"
		content="Uncover patterns and insights into your menstrual health with our advanced analytics tools."
	/>
</svelte:head>

<div class="p-2 sm:p-4">
	{#if loading}
		<Progress />
	{:else}
		<div in:slide out:slide class="flex flex-col">
			<MenstruationStatus {latestMenstrualCycleStart} />
			<CycleLength />
			<FertileStatus {latestMenstrualCycleStart} />
			<Recommendations />
		</div>
	{/if}
</div>
