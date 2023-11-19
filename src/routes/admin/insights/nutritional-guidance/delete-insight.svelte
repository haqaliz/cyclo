<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Modal } from '$components';
    import { admin } from '$api';
    const dispatch = createEventDispatcher();
    export let insight: any;
    let modal: any = {
        title: '',
        show: false,
        loading: false,
    };
    const deleteInsight = async () => {
        if (modal.loading) return;
        modal.loading = true;
        await admin.insights.deleteInsight({
            insight_id: insight.id,
        });
        modal.loading = false;
        modal.show = false;
        dispatch('update');
    };
</script>

<button
    class="flex flex-row items-center justify-center bg-red-400 hover:bg-red-500 p-2 md:p-4 rounded w-12 h-12"
    on:click={() => (modal.show = true)}
>
    <i class="material-icons">delete</i>
</button>

<Modal
	bind:show={modal.show}
	trigger={false}
	title="Are you sure you want to delete?"
    containerClass="max-w-md max-h-xs overflow-y-scroll"
>
	<svelte:fragment slot="content">
        <div class="flex flex-col flex-wrap bg-yellow-300 max-h-[420px] overflow-y-scroll hide-scrollbar text-lg font-semibold p-2 md:p-4">
            {insight?.name ?? ''}
        </div>
        <div class="flex flex-col flex-wrap bg-yellow-300 max-h-[420px] overflow-y-scroll hide-scrollbar text-lg font-semibold p-2 md:p-4">
            {insight?.category ?? ''}
        </div>
		<div class="flex flex-col flex-wrap flex-1 bg-yellow-200 text-lg p-2 md:p-4">
            {#each (insight?.content ?? []) as item}
                <div class="flex flex-col bg-white bg-opacity-25 rounded p-2 mb-2 last:mb-0">
                    <strong class="min-w-max bg-black bg-opacity-25 p-2 rounded">{item.key}</strong>
                    <span>{item.value}</span>
                </div>
            {/each}
		</div>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<div class="flex flex-row flex-1 justify-end">
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2 mr-2 md:mr-4
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={deleteInsight}
			>
                {#if !modal.loading}
                    Yes
                {:else}
                    <div class="w-3 h-3 rounded-full animate-ping bg-white" />
                {/if}
			</button>
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={() => (modal.show = false)}
			>
				No
			</button>
		</div>
	</svelte:fragment>
</Modal>