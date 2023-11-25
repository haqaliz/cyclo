<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Modal } from '$components';
    import { admin } from '$api';
    const dispatch = createEventDispatcher();
    export let recommendation: any;
    let modal: any = {
        title: '',
        show: false,
        loading: false,
        ref: {
            type: '',
            brand: '',
            img: '',
            url: '',
            price: {
                currency: 'usd',
                value: '',
            },
            features: [],
        },
    };
    const editRecommendation = async () => {
        if (modal.loading) return;
        modal.loading = true;
        await admin.recommendations.updateRecommendation({
            recommendation_id: recommendation.id,
            ...modal.ref,
        });
        modal.loading = false;
        modal.show = false;
        dispatch('update');
    };
</script>

<button
    class="flex flex-row items-center justify-center bg-yellow-400 hover:bg-yellow-500 p-2 md:p-4 rounded w-12 h-12 mr-2 md:mr-4"
    on:click={() => {
        modal.ref = structuredClone(recommendation);
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
            placeholder="Recommendation Type"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.type}
        >
        <input
            type="text"
            placeholder="Recommendation Brand"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.brand}
        >
        <input
            type="text"
            placeholder="Recommendation Image"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.img}
        >
        <input
            type="text"
            placeholder="Recommendation URL"
            class="
                flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                focus:bg-yellow-300 focus:bg-opacity-40
            "
            bind:value={modal.ref.url}
        >
        <div class="flex flex-row w-full">
            <input
                type="text"
                placeholder="Recommendation Price Currency"
                class="
                    flex flex-col flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                    focus:bg-yellow-300 focus:bg-opacity-40 max-w-[80px]
                "
                bind:value={modal.ref.price.currency}
            >
            <input
                type="text"
                placeholder="Recommendation Price Value"
                class="
                    flex flex-col flex-1 flex-wrap bg-yellow-300 outline-none text-lg font-semibold p-2 md:p-4
                    focus:bg-yellow-300 focus:bg-opacity-40
                "
                bind:value={modal.ref.price.value}
            >
        </div>
		<div class="flex flex-col flex-1 bg-yellow-200 max-h-[420px] overflow-y-scroll hide-scrollbar text-lg p-2 md:p-4">
            {#each modal.ref.features as item, k}
                <div class="flex flex-row mb-2 last:mb-0">
                    <div class="flex flex-col flex-1 bg-white bg-opacity-25 rounded p-2 mr-2">
                        <input
                            type="text"
                            placeholder="Item Title"
                            class="
                                min-w-max bg-black bg-opacity-25 p-2 rounded outline-none
                                focus:bg-black focus:bg-opacity-10 mb-2
                            "
                            bind:value={item.title}
                        />
                        <textarea
                            placeholder="Item Content"
                            class="
                                min-w-max bg-black bg-opacity-25 p-2 rounded outline-none
                                focus:bg-black focus:bg-opacity-10 min-h-[100px] resize-none
                            "
                            bind:value={item.content}
                        />
                    </div>
                    <div class="flex flex-col">
                        <button
                            class="flex flex-row flex-1 items-center justify-center bg-red-400 hover:bg-red-500 p-2 md:p-4 rounded w-12 h-12"
                            on:click={() => {
                                modal.ref.features = modal.ref.features.filter((_i, j) => (j !== k));
                            }}
                        >
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            {/each}
            <button
                class="flex flex-row w-full items-center justify-center bg-blue-400 hover:bg-blue-500 p-2 md:p-4 rounded h-12"
                on:click={() => {
                    modal.ref.features = [
                        ...modal.ref.features,
                        {
                            title: '',
                            content: '',
                        },
                    ];
                }}
            >
                <i class="material-icons">add</i>
            </button>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<div class="flex flex-row flex-1 justify-end">
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2 mr-2 md:mr-4
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={editRecommendation}
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