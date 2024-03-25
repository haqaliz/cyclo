<script lang="ts">
    import { recorded_days } from "$firebase";
    import { user } from '$stores';
    import { startOfDay, endOfDay } from "date-fns";
    let selectedDay = new Date();
    let recordedDays;
    // user.subscribe(async (v) => {
    //     if (!v) return;
    //     const a = await recorded_days.getRecordedDaysForUser({
    //         user_id: v.uid,
    //         from: startOfDay(selectedDay),
	// 		to: endOfDay(selectedDay),
    //     });
    // });
</script>

<svelte:head>
	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen">
    <h3 class="font-semibold text-4xl">👩‍❤️‍👩 We're redesigning the previous version!</h3>
    <h4 class="font-semibold text-xl">hope we get back soon buddies 👩‍💻</h4>
</div>