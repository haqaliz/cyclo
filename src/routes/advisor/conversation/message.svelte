<script lang="ts">
	import { slide, fade } from 'svelte/transition';
    import SvelteMarkdown from 'svelte-markdown';
    import {
		format
	} from 'date-fns';

    export let content: any;
    $: sender = content?.sender?.toLowerCase();
</script>

<div
    in:fade
    out:fade
    class="flex flex-row w-full mb-2 sm:mb-4"
    class:justify-start={sender === 'advisor'}
    class:justify-end={sender !== 'advisor'}
>
    <div
        in:slide
        out:slide
        class="
            flex flex-col transition-colors rounded-lg md:max-w-[580px]
            p-2 sm:p-4 overflow-hidden relative w-full
        "
        class:bg-gray-200={sender === 'advisor'}
        class:hover:bg-gray-300={sender === 'advisor'}
        class:bg-purple-200={sender !== 'advisor'}
        class:hover:bg-purple-300={sender !== 'advisor'}
    >
        <div class="flex flex-row items-center mb-2">
            <h4 class="font-semibold text-lg capitalize">{content.sender}</h4>
            {#if content.created_at && sender !== 'advisor'}
                <div class="flex-1" />
                <span class="text-sm text-gray-500 font-semibold">
                    {format(new Date(content.created_at * 1000), 'dd LLL, HH:mm')}
                </span>
            {/if}
        </div>
        <div class="message-content flex flex-col w-full">
            <SvelteMarkdown source={content.content} />
        </div>
    </div>
</div>

<style>
    /* general */
    .message-content :global(> *) {
        @apply mb-2 font-sans text-base;
    }
    .message-content :global(> *:last-child) {
        @apply mb-0;
    }
    /* p tags */
    /* 
    .message-content :global(p) {
    }
    */
    /* em, strong tags */
    .message-content :global(em),
    .message-content :global(strong) {
        @apply font-semibold;
    }
    /* hr tags */
    .message-content :global(hr) {
        @apply border-none h-[2px] bg-zinc-400;
    }
    /* hr tags */
    .message-content :global(blockquote) {
        @apply border-l-4 border-zinc-400 pl-4;
    }
    /* a tags */
    .message-content :global(a) {
        @apply text-purple-400 font-semibold;
    }
    /* a tags */
    .message-content :global(img) {
        @apply rounded-lg;
    }
    /* table tags */
    .message-content :global(table),
    .message-content :global(th),
    .message-content :global(td) {
        @apply border-2 border-zinc-400 bg-zinc-50;
    }
    .message-content :global(th),
    .message-content :global(td) {
        @apply p-1;
    }
    /* ul tags */
    .message-content :global(ul) {
        @apply list-disc list-inside;
    }
    /* ol tags */
    .message-content :global(ol) {
        @apply list-decimal list-inside;
    }
    .message-content :global(li::marker) {
        @apply font-semibold;
    }
    /* h1, h2, h3, h4, h5, h6 tags */
    .message-content :global(h1) {
        @apply font-semibold text-5xl;
    }
    .message-content :global(h2) {
        @apply font-semibold text-4xl;
    }
    .message-content :global(h3) {
        @apply font-semibold text-3xl;
    }
    .message-content :global(h4) {
        @apply font-semibold text-2xl;
    }
    .message-content :global(h5) {
        @apply font-semibold text-xl;
    }
    .message-content :global(h6) {
        @apply font-semibold text-lg;
    }
    /* code tags */
    .message-content :global(code) {
        @apply bg-zinc-400 p-2 rounded-lg
            text-sm text-zinc-900 font-semibold;
    }
    /* code block tags */
    .message-content :global(pre > code) {
        @apply block bg-zinc-400 p-2 rounded-lg
            text-sm text-zinc-900 font-semibold;
    }
</style>