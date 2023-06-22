<script lang="ts">
    import { user } from '$stores';
    import { user as usr } from '$api';
    import Status from './status.svelte';
    import CycleLength from './cycle-length.svelte';
    let latestMenstrualCycleStart: any;
    user.subscribe(async (v) => {
        if (!v) return;
        latestMenstrualCycleStart = await usr.getLatestMenstrualCycleStart();
    });
</script>

<div class="p-2 sm:p-4">
    <Status {latestMenstrualCycleStart} />
    <CycleLength />
</div>