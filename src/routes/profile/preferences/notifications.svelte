<script lang="ts">
	import { user } from '$stores';
	import { Checkbox, Label } from '$components';

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
		value.fertility = v?.prefs?.notifications?.fertility_window;
		value.pmsSymptoms = v?.prefs?.notifications?.pms_symptoms;
		value.selfCareTips = v?.prefs?.notifications?.self_care_tips;
	});
</script>

<!-- Notifications -->
<div class="flex flex-col mb-2 md:mb-4">
	<h3 class="text-2xl font-semibold mb-2 md:mb-4">Notifications</h3>

	<div class="flex flex-row items-center mb-4">
		<Checkbox
			id="FWN"
			bind:value={value.fertility}
			aria-labelledby="FWN"
			class="mr-2"
		/>
		<Label
			id="FWN"
			for="FWN"
		>
			Fertility Window Notifications
		</Label>
	</div>

	<div class="flex flex-row items-center mb-4">
		<Checkbox
			id="PMSSN"
			bind:value={value.pmsSymptoms}
			aria-labelledby="PMSSN"
			class="mr-2"
		/>
		<Label
			id="PMSSN"
			for="PMSSN"
		>
			PMS Symptoms Notifications
		</Label>
	</div>

	<!-- <div class="flex flex-row items-center">
		<Checkbox
			id="SCTN"
			bind:value={value.selfCareTips}
			aria-labelledby="SCTN"
			class="mr-2"
		/>
		<Label
			id="SCTN"
			for="SCTN"
		>
			Self Care Tips Notifications
		</Label>
    </div> -->
</div>
