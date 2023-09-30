<script lang="ts">
	import { user } from '$stores';
	import { user as usr } from '$api';
	import MenstruationStatus from './menstruation-status.svelte';
	import FertileStatus from './fertile-status.svelte';
	import CycleLength from './cycle-length.svelte';
	let latestMenstrualCycleStart: any;
	user.subscribe(async (v) => {
		if (!v) return;
		latestMenstrualCycleStart = await usr.getLatestMenstrualCycleStart();
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
	<MenstruationStatus {latestMenstrualCycleStart} />
	<CycleLength />
	<FertileStatus {latestMenstrualCycleStart} />
</div>
