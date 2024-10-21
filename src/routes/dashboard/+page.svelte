<script lang="ts">
	import { type Activity as ActivityT, type Insight as InsightT } from '$types';
	import { Spinner } from '$components';
	import Activity from './activity.svelte';
	import NutritionalGuidance from './nutritional-guidance.svelte';
	import HormoneHealth from './hormone-health.svelte';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let activity: ActivityT;
	let nutritionalGuidance: InsightT;
	let hormoneHealth: InsightT;

	onMount(() => {
		activity = data.activity;
		nutritionalGuidance = data.nutritional_guidance;
		hormoneHealth = data.hormone_health;
	});
</script>

{#if !data}
	<div class="fixed inset-0 flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="w-full py-4 px-3">
		<div class="grid sm:grid-cols-2 md:grid-cols-6 gap-2.5 grid-flow-row auto-rows-fr">
			<Activity
				bind:value={activity}
				class="h-full md:col-span-3"
			/>
			<NutritionalGuidance
				bind:value={nutritionalGuidance}
				class="h-full md:col-span-3"
			/>
			<HormoneHealth
				bind:value={hormoneHealth}
				class="h-full md:col-span-4"
			/>
		</div>
	</div>
{/if}
