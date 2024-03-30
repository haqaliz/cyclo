<script lang="ts">
	import { Button } from "$components";
    import { user } from "$stores";
    import Notifications from './notifications.svelte';
	import MenstruationProducts from './menstruation-products.svelte';
    import { users_metadata } from "$firebase";

	let notifications: any;
	let menstruationProducts: any;

	const save = async () => {
        await users_metadata.upsertUserMetadata({
            user_id: $user.uid,
            prefs: {
                notifications: {
                    fertility_window: !!notifications?.fertility,
                    pms_symptoms: !!notifications?.pmsSymptoms,
                    self_care_tips: !!notifications?.selfCareTips
                },
                menstruation_products: menstruationProducts,
            },
        });
		await user.get($user);
	};
</script>

<div class="flex flex-col bg-zinc-950/10 rounded-lg p-2 sm:p-4 relative overflow-hidden">
	<Notifications bind:value={notifications} />
	<MenstruationProducts bind:value={menstruationProducts} />

	<div class="flex flex-row">
		<Button on:click={save}>Save</Button>
	</div>
</div>
