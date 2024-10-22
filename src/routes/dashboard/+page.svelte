<script lang="ts">
	import type {
		Activity as ActivityT,
		Insight as InsightT,
		Recommendation as RecommendationT,
		HealthRegularity as HealthRegularityT,
		HealthScore as HealthScoreT,
	} from '$types';
	import { Spinner } from '$components';
	import Activity from './activity.svelte';
	import NutritionalGuidance from './nutritional-guidance.svelte';
	import HormoneHealth from './hormone-health.svelte';
	import OtherProductRecommendation from './other-product-recommendation.svelte';
	import MenstruationProductRecommendation from './menstruation-product-recommendation.svelte';
	import HealthRegularity from './health-regularity.svelte';
	import HealthScore from './health-score.svelte';
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores'

	/** @type {import('./$types').PageData} */
	export let data;

	let activity: ActivityT;
	let nutritionalGuidance: InsightT;
	let hormoneHealth: InsightT;
	let otherProductRecommendation: RecommendationT;
	let menstruationProductRecommendation: RecommendationT;
	let healthRegularity: HealthRegularityT;
	let healthScore: HealthScoreT;

	onMount(() => {
		activity = data.activity;
		nutritionalGuidance = data.nutritional_guidance;
		hormoneHealth = data.hormone_health;
		otherProductRecommendation = data.other_product;
		menstruationProductRecommendation = data.menstruation_product;
		healthRegularity = data.health_regularity;
		healthScore = data.health_score;
	});
</script>

{#if !data || $navigating}
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
			<HealthScore
				bind:value={healthScore}
				class="h-full lg:col-span-2"
			/>
			<MenstruationProductRecommendation
				bind:value={menstruationProductRecommendation}
				class="h-full lg:col-span-4"
			/>
			<HealthRegularity
				bind:value={healthRegularity}
				class="h-full lg:col-span-3"
			/>
		</div>
	</div>
{/if}
