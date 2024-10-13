<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user } from '$stores';
	import { posts } from '$firebase';
	import { Button, Textarea, Badge } from '$components';
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
		<Textarea bind:value={newPostContent} {placeholder} />
		<div class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4">
			<Badge
				class={twMerge(
					'mr-4',
					(newPostContent?.length >= 124 && newPostContent?.length < 144) ? 'bg-yellow-400' : '',
					newPostContent?.length > 144 ? 'bg-red-500' : '',
				)}
			>
				{newPostContent?.length ?? 0} / 144 characters
			</Badge>
			<Button disabled={postIsDisabled} on:click={savePost}>
				{#if !loading}
					{submitButtonText}
				{:else}
					<div
						class={twMerge(
							'w-3 h-3 rounded-full bg-foreground animate-ping',
						)}
					/>
				{/if}
			</Button>
		</div>
	</div>
{/if}
