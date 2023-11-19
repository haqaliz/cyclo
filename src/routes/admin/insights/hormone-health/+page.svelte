<script lang="ts">
    import { admin } from '$api';
    import { Progress } from '$components';
    import AddInsight from './add-insight.svelte';
    import DeleteInsight from './delete-insight.svelte';
    import EditInsight from './edit-insight.svelte';

    let loading = false;
    const insightType = "hormone_health";
    let insights: any = null;
    const update = async () => {
        if (loading) return;
        loading = true;
        insights = await admin.insights.getInsights({
            type: insightType,
        });
        loading = false;
    };
    $: (async () => {
        if (insights) return;
        await update();
    })();
</script>

<div class="flex flex-col p-2 md:p-4">
    <div class="flex flex-row mb-2 md:mb-4">
        <h2 class="font-semibold text-3xl">Insights</h2>
        <div class="flex flex-1" />
        <AddInsight {insightType} on:update={update} />
    </div>
    {#if loading}
        <Progress />
    {:else}
        {#if insights?.length}
            {#each insights as insight}
                <div class="flex flex-row items-center bg-gray-200 p-2 md:p-4 rounded mb-2 md:mb-4 last:mb-0">
                    <div class="flex flex-col">
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">id:</span>
                            <strong>{insight.id}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">type:</span>
                            <strong>{insight.type}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">name:</span>
                            <strong>{insight.name}</strong>
                        </div>
                    </div>
                    <div class="flex-1" />
                    <div class="flex flex-row">
                        <EditInsight {insightType} {insight} on:update={update} />
                        <DeleteInsight {insight} on:update={update} />
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