<script lang="ts">
    import { admin } from '$api';
    import { Progress } from '$components';
    import AddRecommendation from './add-recommendation.svelte';
    import DeleteRecommendation from './delete-recommendation.svelte';
    import EditRecommendation from './edit-recommendation.svelte';

    let loading = false;
    let recommendations: any = null;
    const update = async () => {
        if (loading) return;
        loading = true;
        recommendations = await admin.recommendations.getRecommendations();
        loading = false;
    };
    $: (async () => {
        if (recommendations) return;
        await update();
    })();
</script>

<div class="flex flex-col p-2 md:p-4">
    <div class="flex flex-row mb-2 md:mb-4">
        <h2 class="font-semibold text-3xl">Recommendations</h2>
        <div class="flex flex-1" />
        <AddRecommendation on:update={update} />
    </div>
    {#if loading}
        <Progress />
    {:else}
        {#if recommendations?.length}
            {#each recommendations as recommendation}
                <div class="flex flex-row items-center bg-gray-200 p-2 md:p-4 rounded mb-2 md:mb-4 last:mb-0">
                    <div class="flex flex-col">
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">id:</span>
                            <strong>{recommendation.id}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">type:</span>
                            <strong>{recommendation.type}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">brand:</span>
                            <strong>{recommendation.brand}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">img:</span>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <img
                                src={recommendation.img}
                                class="max-h-14"
                            />
                        </div>
                    </div>
                    <div class="flex-1" />
                    <div class="flex flex-row">
                        <EditRecommendation {recommendation} on:update={update} />
                        <DeleteRecommendation {recommendation} on:update={update} />
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