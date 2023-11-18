<script lang="ts">
	import { Progress } from '$components';
	import { slide } from 'svelte/transition';
    import { user } from '$api';
    import bridge from './bridge';

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
    bridge.newConversation.subscribe(async (v) => {
        if (v === true) {
            conversations = [];
            hasMore = false;
            await update();
            bridge.newConversation.set(false);
        }
    })
</script>

<div
    in:slide
    out:slide
    class="hidden md:flex flex-col rounded p-2 sm:p-4 bg-gray-100 overflow-hidden"
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
                <a
                    in:slide
                    out:slide
                    data-sveltekit-reload
                    class="flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
                        bg-gray-200 hover:bg-gray-300 overflow-hidden mb-2 md:mb-4 last:mb-0 relative"
                    href={`/advisor/conversation/${conversation.id ?? ''}`}
                    title={conversation.name}
                >
                    {conversation.name?.length > 32 ? conversation.name.substr(0, 31) + '...' : conversation.name}
                </a>
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