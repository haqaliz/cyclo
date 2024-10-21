<script lang="ts">
	import { type Activity as ActivityT, type Insight as InsightT } from '$types';
	import { Spinner } from '$components';
	import Activity from './activity.svelte';
	import NutritionalGuidance from './nutritional-guidance.svelte';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let activity: ActivityT;
	let nutritionalGuidance: InsightT;

	onMount(() => {
		activity = data.activity;
		nutritionalGuidance = data.nutritional_guidance;
	});
</script>

{#if !data}
	<div class="fixed inset-0 flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="w-full py-4 px-3">
		<div class="grid sm:grid-cols-2 md:grid-cols-6 gap-4">
			<Activity bind:value={activity} />
			<NutritionalGuidance bind:value={nutritionalGuidance} />
		</div>
	</div>
{/if}
