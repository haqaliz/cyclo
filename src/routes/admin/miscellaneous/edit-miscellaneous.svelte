<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Modal } from '$components';
    import { admin } from '$api';
    const dispatch = createEventDispatcher();
    export let item: any;
    let modal: any = {
        title: '',
        show: false,
        loading: false,
        ref: {
            key: '',
            value: '',
            metadata: {},
            metadata_raw: '',
        },
    };
    const editMiscellaneous = async () => {
        if (modal.loading) return;
        modal.loading = true;
        await admin.miscellaneous.updateMiscellaneous({
            miscellaneous_id: item.id,
            ...modal.ref,
            key: modal.ref.key,
            value: modal.ref.value,
            metadata: JSON.parse(modal.ref.metadata_raw),
        });
        modal.loading = false;
        modal.show = false;
        dispatch('update');
    };
</script>

<button
    class="flex flex-row items-center justify-center bg-yellow-400 hover:bg-yellow-500 p-2 md:p-4 rounded w-12 h-12 mr-2 md:mr-4"
    on:click={() => {
        modal.ref = {
            ...structuredClone(item),
            metadata_raw: JSON.stringify(item.metadata)
        };
        modal.show = true;
    }}
>
    <i class="material-icons">edit</i>
</button>

<Modal
	bind:show={modal.show}
	trigger={false}
    containerClass="max-w-md max-h-xs overflow-y-scroll"
>
	<svelte:fragment slot="content">
        <input
            type="text"
            placeholder="Miscellaneous Key"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.key}
        >
        <input
            type="text"
            placeholder="Miscellaneous Value"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.value}
        >
        <input
            type="text"
            placeholder="Miscellaneous Metadata"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.metadata_raw}
        >
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<div class="flex flex-row flex-1 justify-end">
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2 mr-2 md:mr-4
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={editMiscellaneous}
			>
                {#if !modal.loading}
                    Save
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