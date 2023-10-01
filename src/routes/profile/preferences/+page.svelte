<script lang="ts">
    import { Checkbox } from '$components';
    let fertility = false;
    let pmsSymptoms = false;
    let selfCareTips = false;
</script>

<svelte:head>
	<title>Profile Preferences</title>
	<meta
		name="description"
		content="Customize your experience with ease. Tailor your preferences to suit your needs. Personalize your app settings for a seamless experience."
	/>
</svelte:head>

<div class="flex flex-col bg-gray-100 rounded p-2 sm:p-4 relative overflow-hidden">
    <div class="absolute inset-0 flex flex-row items-center justify-center bg-amber-100 bg-opacity-70 backdrop-blur z-[99999]">
        <i class="material-icons mr-2">construction</i>
        <h3 class="font-semibold text-base sm:text-lg">Under Construction</h3>
    </div>

    <div class="flex flex-row -items-center mb-2 sm:mb-4">
        <Checkbox label="Fertility Window Notifications" bind:value={fertility} />
    </div>

    <div class="flex flex-row -items-center mb-2 sm:mb-4">
        <Checkbox label="PMS Symptoms Notifications" bind:value={pmsSymptoms} />
    </div>

    <div class="flex flex-row -items-center">
        <Checkbox label="Self Care Tips Notifications" bind:value={pmsSymptoms} />
    </div>
</div>