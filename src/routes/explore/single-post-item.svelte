<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal } from '$components';
	import { user } from '$api';
	import { formatDistanceToNow } from 'date-fns';
	const dispatch = createEventDispatcher();
	export let post: any;
	export let actions: boolean;
	let showConfirmation = false;
	const deletePost = async () => {
		await user.removePost({
			post_id: post.id
		});
		showConfirmation = false;
		dispatch('deleted');
	};
</script>

<div
	class="
    flex flex-col rounded bg-white transition-all ease-in-out bg-opacity-25
    hover:bg-black hover:bg-opacity-10 p-2 md:p-4 mb-2 md:mb-4
"
>
	<div class="flex flex-row">
		<span class="text-sm font-semibold text-gray-600 mb-1 md:mb-2">
			{formatDistanceToNow(new Date(post.created_at.seconds * 1000), { addSuffix: true })}
		</span>
		<div class="flex-1" />
		{#if actions}
			<button
				class="rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
                focus:ring-gray-400 justify-center hover:bg-gray-600 hover:bg-opacity-30 text-red-500"
				on:click={() => (showConfirmation = true)}
			>
				<i class="material-icons">delete</i>
			</button>
		{/if}
	</div>
	<p class="font-sans">
		{post.content}
	</p>
</div>

<Modal
	bind:show={showConfirmation}
	trigger={false}
	title="Are you sure you want to delete this post?"
>
	<svelte:fragment slot="content">
		<div class="flex flex-col flex-1">
			<div class="flex flex-col bg-yellow-200 p-2 md:p-4 rounded-t">
				<span class="text-sm font-semibold text-gray-600">
					{formatDistanceToNow(new Date(post.created_at.seconds * 1000), { addSuffix: true })}
				</span>
			</div>
			<div class="flex flex-col flex-1 bg-yellow-100 p-2 md:p-4 rounded-b">
				{post.content.length > 128 ? `${post.content.substr(0, 128)}...` : post.content}
			</div>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<div class="flex flex-row flex-1 justify-end">
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2 mr-2 md:mr-4
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={deletePost}
			>
				Yes
			</button>
			<button
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-400 justify-center flex-1 sm:flex-none"
				on:click={() => (showConfirmation = false)}
			>
				No
			</button>
		</div>
	</svelte:fragment>
</Modal>
