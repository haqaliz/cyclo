<script lang="ts">
    import { admin } from '$api';
    import { Progress } from '$components';
    import AddMiscellaneous from './add-miscellaneous.svelte';
    import DeleteMiscellaneous from './delete-miscellaneous.svelte';
    import EditMiscellaneous from './edit-miscellaneous.svelte';

    let loading = false;
    let miscellaneous: any = null;
    const update = async () => {
        if (loading) return;
        loading = true;
        miscellaneous = await admin.miscellaneous.getMiscellaneousList();
        loading = false;
    };
    $: (async () => {
        if (miscellaneous) return;
        await update();
    })();
</script>

<div class="flex flex-col p-2 md:p-4">
    <div class="flex flex-row mb-2 md:mb-4">
        <h2 class="font-semibold text-3xl">Miscellaneous</h2>
        <div class="flex flex-1" />
        <AddMiscellaneous on:update={update} />
    </div>
    {#if loading}
        <Progress />
    {:else}
        {#if miscellaneous?.length}
            {#each miscellaneous as item}
                <div class="flex flex-row items-center bg-gray-200 p-2 md:p-4 rounded mb-2 md:mb-4 last:mb-0">
                    <div class="flex flex-col">
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">id:</span>
                            <strong>{item.id}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">key:</span>
                            <strong>{item.key}</strong>
                        </div>
                        <div class="flex flex-row text-lg">
                            <span class="mr-2">value:</span>
                            <strong>{item.value}</strong>
                        </div>
                    </div>
                    <div class="flex-1" />
                    <div class="flex flex-row">
                        <EditMiscellaneous {item} on:update={update} />
                        <DeleteMiscellaneous {item} on:update={update} />
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