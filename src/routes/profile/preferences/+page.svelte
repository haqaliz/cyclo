<script lang="ts">
	import { user } from '$stores';
	import { user as usr } from '$api';
	import { Checkbox } from '$components';

	let fertility = false;
	let pmsSymptoms = false;
	let selfCareTips = false;

	user.subscribe((v: any) => {
		if (!v) return;
		fertility = v?.metadata?.prefs?.notifications?.fertility_window;
		pmsSymptoms = v?.metadata?.prefs?.notifications?.pms_symptoms;
		selfCareTips = v?.metadata?.prefs?.notifications?.self_care_tips;
	});

	const save = async () => {
		await usr.updateInfo({
			prefs: {
				notifications: {
					fertility_window: fertility,
					pms_symptoms: pmsSymptoms,
					self_care_tips: selfCareTips
				}
			}
		});
		await user.get();
	};
</script>

<svelte:head>
	<title>Profile Preferences</title>
	<meta
		name="description"
		content="Customize your experience with ease. Tailor your preferences to suit your needs. Personalize your app settings for a seamless experience."
	/>
</svelte:head>

<div class="flex flex-col bg-gray-100 rounded p-2 sm:p-4 relative overflow-hidden">
	<div class="flex flex-col mb-2 md:mb-4">
		<div class="flex flex-row -items-center mb-2 sm:mb-4">
			<Checkbox label="Fertility Window Notifications" bind:value={fertility} />
		</div>

		<div class="flex flex-row -items-center mb-2">
			<Checkbox label="PMS Symptoms Notifications" bind:value={pmsSymptoms} />
		</div>

		<!-- <div class="flex flex-row -items-center">
			<Checkbox label="Self Care Tips Notifications" bind:value={selfCareTips} />
		</div> -->
	</div>

	<div class="flex flex-row">
		<button
			on:click={save}
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
		>
			Save
		</button>
	</div>
</div>
