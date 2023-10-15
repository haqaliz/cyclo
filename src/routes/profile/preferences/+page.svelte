<script lang="ts">
	import { user } from '$stores';
	import { user as usr } from '$api';
	import Notifications from './notifications.svelte';
	import MenstruationProducts from './menstruation-products.svelte';

	let notifications: any;
	let menstruationProducts: any;

	const save = async () => {
		await usr.updateInfo({
			prefs: {
				notifications: {
					fertility_window: notifications?.fertility,
					pms_symptoms: notifications?.pmsSymptoms,
					self_care_tips: notifications?.selfCareTips
				},
				menstruation_products: menstruationProducts
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
	<Notifications bind:value={notifications} />
	<MenstruationProducts bind:value={menstruationProducts} />

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
