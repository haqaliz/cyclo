<script lang="ts">
	import { user } from '$stores';
	import {SmartTextarea} from '$components';
    export let query:String;
	const posts = [...Array(50).keys()].map((i) => ({
		created_at: 'Today, 15:00',
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
				exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
	}));
</script>

<div class="flex flex-col px-2 md:px-4">
    <h1 class="font-semibold text-3xl font-sans mb-2 md:mb-4">
        Explore
        {#if query?.length}
            <span class="text-xl">(searched for: {query})</span>
        {/if}
    </h1>
    <div class="flex flex-col md:h-[calc(100vh-132px)] md:overflow-y-scroll hide-scrollbar">
        {#if $user}
            <div class="flex flex-col bg-white rounded mb-2 md:mb-4 relative">
                <SmartTextarea
                    placeholder="What's gucci?!"
                    minRows={6}
                    maxRows={14}
                />
                <button
                    class="absolute right-2 md:right-4 bottom-2 md:bottom-4 px-8 py-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                    focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 sm:mr-4 last:mr-0
                    bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
                >
                        Post
                </button>
            </div>
        {/if}

        {#each posts as post}
            <div class="
                flex flex-col rounded bg-white transition-all ease-in-out bg-opacity-25
                hover:bg-black hover:bg-opacity-10 p-2 md:p-4 mb-2 md:mb-4
            ">
                <span class="text-sm font-semibold text-gray-600 mb-1 md:mb-2">{post.created_at}</span>
                <p class="font-sans">
                    {post.content}
                </p>
            </div>
        {/each}
    </div>
</div>