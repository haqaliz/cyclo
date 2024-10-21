<script lang="ts">
	import {
		type Activity as ActivityT,
		type Insight as InsightT,
		type Recommendation as RecommendationT,
	} from '$types';
	import { Spinner } from '$components';
	import Activity from './activity.svelte';
	import NutritionalGuidance from './nutritional-guidance.svelte';
	import HormoneHealth from './hormone-health.svelte';
	import OtherProductRecommendation from './other-product-recommendation.svelte';
	import MenstruationProductRecommendation from './menstruation-product-recommendation.svelte';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let activity: ActivityT;
	let nutritionalGuidance: InsightT;
	let hormoneHealth: InsightT;
	let otherProductRecommendation: RecommendationT;
	let menstruationProductRecommendation: RecommendationT;

	onMount(() => {
		activity = data.activity;
		nutritionalGuidance = data.nutritional_guidance;
		hormoneHealth = data.hormone_health;
		otherProductRecommendation = data.other_product;
		menstruationProductRecommendation = data.menstruation_product;
	});
</script>

{#if !data}
	<div class="fixed inset-0 flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="w-full py-4 px-3">
		<div class="grid lg:grid-cols-6 lg:grid-flow-row lg:auto-rows-fr gap-2.5">
			<Activity
				bind:value={activity}
				class="h-full lg:col-span-3"
			/>
			<NutritionalGuidance
				bind:value={nutritionalGuidance}
				class="h-full lg:col-span-3"
			/>
			<OtherProductRecommendation
				bind:value={otherProductRecommendation}
				class="h-full lg:col-span-4"
			/>
			<HormoneHealth
				bind:value={hormoneHealth}
				class="h-full lg:col-span-2"
			/>
			<MenstruationProductRecommendation
				bind:value={menstruationProductRecommendation}
				class="h-full lg:col-span-4"
			/>
		</div>
	</div>
{/if}
