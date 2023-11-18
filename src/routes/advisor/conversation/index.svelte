<script lang="ts">
	import { Progress, SmartTextarea } from '$components';
	import { slide, fade } from 'svelte/transition';
    import Message from './message.svelte';
    import { user } from '$api';
    import bridge from '../bridge';

    export let conversationId: string;
    const advisorIntro = {
        sender: 'advisor',
        content: "Hi! I'm your mental health & menstrual cycle advisor. I'm here to provide you with information and advice on your menstrual cycle and mental health. Whether you have questions about your symptoms, need guidance on managing your emotions, or want tips for self-care during your period, I'm here to help. Just ask me anything!"
    };
    let conversationEl: any;
	let messages: any = !conversationId?.length
        ? [advisorIntro]
        : [];
	let loading = false;
    let hasMore = false;
    let startAfter: any;
	const update = async () => {
		loading = true;
        const r = await user.getAdvisorConversation({
            conversation_id: conversationId,
            ...startAfter && { start_after: startAfter },
            limit: 20,
        });
        if (!r) {
            loading = false;
            return;
        }
        hasMore = !!r?.has_more;
        const newMessages = r.data?.reduce((a: any, i: any) => {
            if (i.query) {
                a.push({
                    id: i.id,
                    sender: 'you',
                    content: i.query,
                    created_at: i.created_at,
                });
            }
            if (i.answer) {
                a.push({
                    id: i.id,
                    sender: 'advisor',
                    content: i.answer,
                    created_at: i.created_at,
                });
            }
            return a;
        }, []);
        messages = [
            ...!hasMore && [advisorIntro],
            ...messages,
            ...newMessages,
        ];
		loading = false;
        setTimeout(() => conversationEl.scrollTo({
            left: 0,
            top: conversationEl.scrollHeight,
            behavior: 'smooth',
        }), 500);
	};
	$: (async () => {
		await update();
	})();
    let newMessage = '';
    let loadingNewMessage = false;
    const sendMessage = async () => {
        if (loadingNewMessage) return;
        const query = structuredClone(newMessage);
        messages = [
            ...messages,
            {
                sender: 'you',
                content: query,
                created_at: Date.now() / 1000,
            },
        ];
        loadingNewMessage = true;
        newMessage = '';
        const r = await user.createMessageToAdvisor({
            conversation_id: conversationId ?? '',
            query,
        });
        if (!r) {
            loadingNewMessage = false;
            return;
        }
        messages = [
            ...messages,
            {
                id: r.id,
                sender: 'advisor',
                content: r.answer,
                created_at: r.created_at,
            },
        ];
        loadingNewMessage = false;
        bridge.newConversation.set(true);
    };
</script>

<div
    in:slide
    out:slide
    class="flex flex-col rounded p-2 sm:p-4 bg-gray-100"
>
    <div
        bind:this={conversationEl}
        class="flex flex-col h-[calc(100vh-270px)] overflow-y-scroll hide-scrollbar"
    >
        {#if loading}
            <Progress />
        {:else}
            {#if hasMore}
                <div
                    in:fade
                    out:fade
                    class="flex flex-row w-full justify-center mb-2 md:mb-4"
                >
                    <button
                        in:slide
                        out:slide
                        class="py-2 px-4 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                            focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center justify-center
                            bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 h-11"
                        on:click={async () => {
                            startAfter = messages[messages.length - 1].id;
                            await update();
                        }}
                    >
                        Load More
                    </button>
                </div>
            {/if}
            {#if messages?.length}
                {#each messages as message}
                    <Message content={message} />
                {/each}
            {/if}
        {/if}
    </div>
    <div class="flex flex-col bg-white rounded relative">
        <SmartTextarea bind:value={newMessage} placeholder="Message Advisor&hellip;" minRows={6} maxRows={6} />
        <div class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4">
            <button
                class="px-8 py-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 sm:mr-4 last:mr-0
                    focus:ring-gray-400 justify-center h-[44px]"
                class:bg-zinc-900={newMessage.length}
                class:hover:bg-gray-700={newMessage.length}
                class:text-white={newMessage.length}
                class:bg-gray-300={!newMessage.length}
                class:hover:bg-gray-400={!newMessage.length}
                class:text-gray-700={!newMessage.length}
                class:cursor-not-allowed={!newMessage.length || loadingNewMessage}
                disabled={!newMessage.length}
                on:click={sendMessage}
            >
                {#if !loadingNewMessage}
                    Send
                {:else}
                    <div
                        class="w-3 h-3 rounded-full animate-ping"
                        class:bg-white={newMessage.length}
                        class:bg-gray-700={!newMessage.length}
                    />
                {/if}
            </button>
        </div>
    </div>
</div>