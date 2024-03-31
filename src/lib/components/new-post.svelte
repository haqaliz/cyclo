<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user } from '$stores';
	import { posts } from '$firebase';
	import { Input, Button } from '$components';
	import { twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher();
	export let parentId: string;
	export let parentType: string;
	export let placeholder = "What's gucci?!";
	export let submitButtonText = 'Share';
	let loading = false;
	let newPostContent = '';
	$: postIsDisabled = !newPostContent?.length || newPostContent?.length > 144;
	const savePost = async () => {
		if (!newPostContent?.length || loading) return;
		loading = true;
		const hashtags = (newPostContent.match(/\#[a-zA-Z0-9_]+/gi) ?? []).map((i) => i.replace(/\#+/g, ''));
		const links = newPostContent.match(new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi')) ?? [];
		const context: any = {
			user_id: $user.uid,
			content: newPostContent,
			hashtags,
			links,
		};
		if (parentId && parentType) {
			context.parent_id = parentId;
			context.parent_type = parentType;
		}
		await posts.createPostForUser(context);
		loading = false;
		newPostContent = '';
		dispatch('created');
	};
</script>

{#if $user}
	<div class="flex flex-col mb-2 md:mb-4 relative">
		<Input type="smart-textarea" bind:value={newPostContent} {placeholder} minRows={6} maxRows={14} />
		<div class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4">
			<div
				class={twMerge(
					'py-1 px-2 font-semibold text-sm rounded mr-2 md:mr-4',
					newPostContent?.length < 124 ? 'bg-gray-200' : '',
					(newPostContent?.length >= 124 && newPostContent?.length < 144) ? 'bg-yellow-400' : '',
					newPostContent?.length > 144 ? 'bg-red-500' : '',
				)}
			>
				{newPostContent?.length ?? 0} / 144 characters
			</div>
			<Button disabled={postIsDisabled} on:click={savePost}>
				{#if !loading}
					{submitButtonText}
				{:else}
					<div
						class={twMerge(
							'w-3 h-3 rounded-full animate-ping',
							postIsDisabled ? 'bg-gray-700' : 'bg-white',
						)}
					/>
				{/if}
			</Button>
		</div>
	</div>
{/if}
