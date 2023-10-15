<script lang="ts">
	import { user } from '$stores';
	import { Checkbox } from '$components';

	interface Notifications {
		fertility: boolean;
		pmsSymptoms: boolean;
		selfCareTips: boolean;
	}
	export let value: Notifications = {
		fertility: false,
		pmsSymptoms: false,
		selfCareTips: false
	};

	user.subscribe((v: any) => {
		if (!v) return;
		value.fertility = v?.metadata?.prefs?.notifications?.fertility_window;
		value.pmsSymptoms = v?.metadata?.prefs?.notifications?.pms_symptoms;
		value.selfCareTips = v?.metadata?.prefs?.notifications?.self_care_tips;
	});
</script>

<!-- Notifications -->
<div class="flex flex-col mb-2 md:mb-4">
	<h3 class="text-2xl font-semibold mb-2 md:mb-4">Notifications</h3>

	<div class="flex flex-row -items-center mb-2 sm:mb-4">
		<Checkbox label="Fertility Window Notifications" bind:value={value.fertility} />
	</div>

	<div class="flex flex-row -items-center mb-2">
		<Checkbox label="PMS Symptoms Notifications" bind:value={value.pmsSymptoms} />
	</div>

	<!-- <div class="flex flex-row -items-center">
        <Checkbox label="Self Care Tips Notifications" bind:value={value.selfCareTips} />
    </div> -->
</div>
