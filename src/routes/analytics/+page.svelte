<script lang="ts">
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import { user as usr } from '$api';
	import { Recommendations, Progress } from '$components';
	import MenstruationStatus from './menstruation-status.svelte';
	import FertileStatus from './fertile-status.svelte';
	import CycleLength from './cycle-length.svelte';
	import ChallengesHistory from './challenges-history.svelte';

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
		<div
			in:slide
			out:slide
			class="flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
				bg-gray-100 hover:bg-gray-200 overflow-hidden"
		>
			<Progress />
		</div>
	{/if}
	{#if !loading}
		<div in:slide out:slide class="flex flex-col">
			<MenstruationStatus {latestMenstrualCycleStart} />
			<CycleLength />
		</div>
	{/if}
	<div in:slide out:slide class="flex flex-col mt-2 sm:mt-4">
		<Recommendations type="menstruation_product" />
	</div>
	<div in:slide out:slide class="flex flex-col my-2 sm:my-4">
		<Recommendations type="activities" />
	</div>
	{#if !loading}
		<div in:slide out:slide class="flex flex-col">
			<FertileStatus {latestMenstrualCycleStart} />
		</div>
	{/if}
	<div in:slide out:slide class="flex flex-col my-2 sm:my-4">
		<ChallengesHistory />
	</div>
	<div in:slide out:slide class="mt-2 sm:mt-4">
		<Recommendations type="hormone_health_insights" />
	</div>
	<div in:slide out:slide class="mt-2 sm:mt-4">
		<Recommendations type="nutritional_guidances" />
	</div>
</div>
