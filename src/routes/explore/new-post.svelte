<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user } from '$stores';
	import { user as usr } from '$api';
	import { SmartTextarea } from '$components';
	const dispatch = createEventDispatcher();
	let newPostContent = '';
	$: postIsDisabled = !newPostContent?.length || newPostContent?.length > 144;
	const savePost = async () => {
		if (!newPostContent?.length) return;
		await usr.createPost({
			content: newPostContent
		});
		newPostContent = '';
		dispatch('created');
	};
</script>

{#if $user}
	<div class="flex flex-col bg-white rounded mb-2 md:mb-4 relative">
		<SmartTextarea
			bind:value={newPostContent}
			placeholder="What's gucci?!"
			minRows={6}
			maxRows={14}
		/>
		<div class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4">
			<div
				class="py-1 px-2 font-semibold text-sm rounded mr-2 md:mr-4"
				class:bg-gray-200={newPostContent?.length < 124}
				class:bg-yellow-400={newPostContent?.length >= 124 && newPostContent?.length < 144}
				class:bg-red-500={newPostContent?.length > 144}
			>
				{newPostContent?.length ?? 0} / 144 characters
			</div>
			<button
				class="px-8 py-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 sm:mr-4 last:mr-0
                    focus:ring-gray-400 justify-center"
				class:bg-zinc-900={!postIsDisabled}
				class:hover:bg-gray-700={!postIsDisabled}
				class:text-white={!postIsDisabled}
				class:bg-gray-300={postIsDisabled}
				class:hover:bg-gray-400={postIsDisabled}
				class:text-gray-700={postIsDisabled}
				disabled={postIsDisabled}
				on:click={savePost}
			>
				Share
			</button>
		</div>
	</div>
{/if}
