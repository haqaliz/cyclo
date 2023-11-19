<script lang="ts">
    import { admin } from '$api';
    import { Progress } from '$components';
    import AddActivity from './add-activity.svelte';
    import DeleteActivity from './delete-activity.svelte';
    import EditActivity from './edit-activity.svelte';

    let loading = false;
    let activities: any = null;
    const update = async () => {
        if (loading) return;
        loading = true;
        activities = await admin.activities.getActivities();
        loading = false;
    };
    $: (async () => {
        if (activities) return;
        await update();
    })();
</script>

<div class="flex flex-col p-2 md:p-4">
    <div class="flex flex-row mb-2 md:mb-4">
        <h2 class="font-semibold text-3xl">Activities</h2>
        <div class="flex flex-1" />
        <AddActivity on:update={update} />
    </div>
    {#if loading}
        <Progress />
    {:else}
        {#if activities?.length}
            {#each activities as activity}
                <div class="flex flex-row items-center bg-gray-200 p-2 md:p-4 rounded mb-2 md:mb-4 last:mb-0">
                    <div class="flex flex-col">
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">id:</span>
                            <strong>{activity.id}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">type:</span>
                            <strong>{activity.type}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">name:</span>
                            <strong>{activity.name}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">category:</span>
                            <strong>{activity.category}</strong>
                        </div>
                    </div>
                    <div class="flex-1" />
                    <div class="flex flex-row">
                        <EditActivity {activity} on:update={update} />
                        <DeleteActivity {activity} on:update={update} />
                    </div>
                </div>
            {/each}
        {:else}
            <div
                class="
                    p-2 sm:p-4 h-[46px] sm:h-[76px] transition-all ease-in-out duration-300 rounded font-sans text-xs sm:text-lg flex items-center
                    bg-yellow-300 font-semibold text-black
                "
            >
                <i class="material-icons mr-2">info</i>
                Not enough data
            </div>
        {/if}
    {/if}
</div>