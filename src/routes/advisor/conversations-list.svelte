<script lang="ts">
	import { Progress, Modal } from '$components';
	import { slide } from 'svelte/transition';
    import { user } from '$api';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import bridge from './bridge';
    import {
		format
	} from 'date-fns';

	let conversations: any = [];
	let loading = false;
    let hasMore = false;
    let startAfter: any;
	const update = async () => {
		loading = true;
        const r = await user.getAdvisorConversationsList({
            ...startAfter && { start_after: startAfter },
            limit: 20,
        });
        if (!r) {
            loading = false;
            return;
        }
        hasMore = !!r?.has_more;
        conversations = [
            ...conversations,
            ...r.data,
        ];
		loading = false;
	};
	$: (async () => {
		await update();
	})();
    $: path = $page.url.pathname?.split('/');
    $: currentConversationId = path[path.length - 1];
    $: conversationsById = Object.fromEntries(conversations.map((i: any) => [i.id, i]));
    let modal: any = {
        show: false,
        loading: false,
        ref: null,
    };
    const showDeleteModal = (conversation: any) => {
        modal.ref = conversation;
        modal.show = true;
    };
    const deleteConversation = async () => {
        if (!modal.ref) return;
        modal.loading = true;
        const r = await user.deleteAdvisorConversation({
            conversation_id: modal.ref?.id,
        });
        if (!r) {
            modal.loading = false;
            return;
        }
        modal.ref = null;
        modal.loading = false;
        modal.show = false;
        await goto('/advisor', {
            replaceState: true,
        });
    };
    bridge.newConversation.subscribe(async (v) => {
        if (v === true) {
            conversations = [];
            hasMore = false;
            await update();
            bridge.newConversation.set(false);
        }
    });
    let windowWidth = window.innerWidth;
	const resized = () => {
		windowWidth = window.innerWidth;
	};
    let showList = false;
    $: dynamicClass = (() => {
        let classes = '';
        if (windowWidth >= 768) {
            classes += 'hidden md:flex h-full';
        } else {
            classes += 'absolute flex z-10 w-[350px] shadow-lg h-[calc(100%-146px)] sm:h-[calc(100%-200px)] transition-all ease-in-out duration-300';
            classes += showList ? '' : ' -translate-x-full';
        }
        classes += ' flex-col rounded p-2 sm:p-4 bg-gray-100 overflow-hidden';
        return classes;
    })();
</script>

<svelte:window on:resize={resized} />

<div
    in:slide
    out:slide
    class="flex md:hidden flex-row items-center rounded p-2 sm:p-4 bg-gray-100 mb-2 sm:mb-4"
>
    <button
        class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
        focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center md:hidden"
        on:click={() => (showList = !showList)}
    >
        <i class="material-icons">chat</i>
    </button>
    {#if conversationsById[currentConversationId]?.name}
        {@const conversationName = conversationsById[currentConversationId].name}
        <h3 class="font-semibold text-xl sm:text-3xl ml-2 sm:ml-4" title={conversationName}>
            {conversationName?.length > 32 ? conversationName.substr(0, 31) + '...' : conversationName}
        </h3>
    {/if}
</div>

<div
    in:slide
    out:slide
    class={dynamicClass}
>
    <a
        data-sveltekit-reload
        href="/advisor"
        class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
            focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center justify-center mb-2 md:mb-4
            bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 h-11"
    >
        New Chat
    </a>
    {#if loading}
        <Progress />
    {:else}
        {#if conversations?.length}
            {#each conversations as conversation}
                {#if currentConversationId === conversation.id}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        in:slide
                        out:slide
                        class="flex flex-row items-center rounded p-2 sm:p-4 transition-all ease-in-out
                            overflow-hidden mb-2 md:mb-4 last:mb-0 relative bg-purple-200"
                        title={conversation.name}
                    >
                        <span>{conversation.name?.length > 32 ? conversation.name.substr(0, 31) + '...' : conversation.name}</span>
                        <div class="flex-1" />
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <i
                            class="
                                material-icons p-2 rounded transition-all ease-in-out
                                hover:bg-black hover:bg-opacity-20 text-red-500 cursor-pointer
                            "
                            title="Delete Conversation"
                            on:click|stopPropagation|preventDefault={() => showDeleteModal(conversation)}
                        >delete</i>
                    </div>
                {:else}
                    <a
                        in:slide
                        out:slide
                        data-sveltekit-reload
                        class="flex flex-row items-start transition-colors rounded p-2 sm:p-4
                            overflow-hidden mb-2 md:mb-4 last:mb-0 relative bg-gray-200 hover:bg-gray-300"
                        href={`/advisor/conversation/${conversation.id ?? ''}`}
                        title={conversation.name}
                    >
                        {conversation.name?.length > 32 ? conversation.name.substr(0, 31) + '...' : conversation.name}
                    </a>
                {/if}
            {/each}
            {#if hasMore}
                <button
                    class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                        focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center justify-center mb-2 md:mb-4
                        bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 h-11"
                    on:click={async () => {
                        startAfter = conversations[conversations.length - 1].id;
                        await update();
                    }}
                >
                    Load More
                </button>
            {/if}
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

<Modal
	bind:show={modal.show}
	trigger={false}
	title="Are you sure you want to delete conversation?"
>
	<svelte:fragment slot="content">
        <div class="flex flex-col bg-purple-200 rounded p-2 md:p-4 mb-2 md:mb-4 flex-1">
            <h2 class="font-semibold text-2xl">{modal.ref?.name}</h2>
            <div class="flex-1" />
            <span class="font-semibold text-sm text-gray-500">
                {format(new Date(modal.ref?.created_at * 1000), 'dd LLL, HH:mm')}
            </span>
        </div>
		<div class="flex flex-row justify-end">
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2 mr-2 md:mr-4
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={deleteConversation}
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