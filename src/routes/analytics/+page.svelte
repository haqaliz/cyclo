<script lang="ts">
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import { recorded_days } from '$firebase';
	import MenstruationStatus from './menstruation-status.svelte';
	import FertileStatus from './fertile-status.svelte';
	import HealthRegularity from './health-regularity.svelte';
	import { Recommendations } from '$components';
	import ChallengesHistory from './challenges-history.svelte';

	let latestMenstrualCycleStart: any;
	let loading = false;
	user.subscribe(async (v: any) => {
		if (!v || loading) return;
		loading = true;
		latestMenstrualCycleStart = await recorded_days.getStartOfLastMenstrualCycleForUser({
			user_id: v.uid,
		});
		loading = false;
	});
</script>

<div class="p-4">
	<div in:slide out:slide class="flex flex-col mb-4">
		<HealthRegularity />
	</div>
	{#if !loading}
		<div in:slide out:slide class="flex flex-col mb-4">
			<MenstruationStatus {latestMenstrualCycleStart} />
		</div>
	{/if}
	<div class="mb-4">
		<Recommendations type="menstruation_product" />
	</div>
	{#if !loading}
		<div in:slide out:slide class="flex flex-col mb-4">
			<FertileStatus {latestMenstrualCycleStart} />
		</div>
	{/if}
	<div class="mb-4">
		<Recommendations type="other_product" />
	</div>
	<div class="mb-4">
		<Recommendations type="activities" />
	</div>
	<div class="mb-4">
		<ChallengesHistory />
	</div>
	<div class="mb-4">
		<Recommendations type="hormone_health_insights" />
	</div>
	<div class="mb-4">
		<Recommendations type="nutritional_guidances" />
	</div>
</div>
