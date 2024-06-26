<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	import { domain } from '$lib';
	import { Modal, Button } from '$components';
	import { posts } from '$firebase';
	import { user, challenges } from '$stores';
	import { formatDistanceToNow } from 'date-fns';
	const dispatch = createEventDispatcher();
	export let post: any;
	export let clickable = true;
	export let compact = true;
	export let actions: boolean;
	let showConfirmation = false;
	$: brief = post.content.length > 128 ? `${post.content.substr(0, 128)}...` : post.content;
	$: sharedContent = encodeURIComponent(`${brief}\n${domain}posts/${post.id}`);
	const deletePost = async () => {
		await posts.deletePostForUser({
			user_id: $user.uid,
			post_id: post.id,
		});
		showConfirmation = false;
		dispatch('deleted');
	};
	let isLiked: boolean;
	user.subscribe((v: any) => {
		if (!v) return;
		isLiked = post.likes?.[v.id];
	});
	const likePost = async () => {
		isLiked = !isLiked;
		await posts.likePostForUser({
			user_id: $user.uid,
			post_id: post.id,
		});
	};
</script>

<a
	data-sveltekit-reload
	href={`/posts/${post.id}`}
	class={twMerge(
		`flex flex-col rounded-lg transition-all ease-in-out p-4
		bg-zinc-950/10 hover:bg-zinc-950/20 mb-4`,
		clickable ? 'cursor-pointer' : '',
	)}
>
	<div class="flex flex-row items-center mb-2">
		<slot name="before-header-first-element" />
		<Button data-sveltekit-reload href={`/user/${post?.user_id ?? ''}`} class="mr-2">
			{post?.user_id?.substr(0, 2)}
		</Button>
		<span class="text-sm font-semibold text-gray-600">
			{formatDistanceToNow(new Date(post.created_at.seconds * 1000), { addSuffix: true })}
		</span>
		<div class="flex-1" />
		{#if actions && $user && $user.id === post?.user_id}
			<Button
				icon="delete"
				on:click={(e) => {
					e.stopPropagation();
					e.preventDefault();
					showConfirmation = true;
				}}
			/>
		{/if}
		<slot name="after-header-last-element" />
	</div>
	<p class="font-sans">
		{post.content}
	</p>
	<!-- actions section -->
	<div class="flex flex-col items-start mt-4">
		<div class="flex flex-row w-full">
			{#if post.parent_id && post.parent_type === 'challenge' && Object.keys($challenges ?? {}).length}
				<Button
					href={`/challenges/${post.parent_id}`}
					title={challenges?.withId(post.parent_id)?.value ?? ''}
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					<img
						class="w-full h-full"
						src={challenges?.withId(post.parent_id)?.img}
					/>
				</Button>
			{/if}

			{#if !compact}
				<!-- share section -->
				<div class="flex flex-row">
					<Button
						href={`https://twitter.com/intent/tweet?text=${sharedContent}&related=cyclo`}
						target="_blank"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
							<path
								d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
								class="fill-zinc-50"
							/>
						</svg>
					</Button>
				</div>
			{/if}
			<div class="flex-1" />
			<!-- like section -->
			{#if $user}
				<div class="flex flex-row items-center">
					<Button
						color={isLiked ? 'red' : 'black'}
						icon="favorite"
						on:click={(e) => {
							e.stopPropagation();
							e.preventDefault();
							likePost();
						}}
					>
						{Object.keys(post.likes ?? {}).length}
					</Button>
				</div>
			{:else}
				<div class="flex flex-row items-center">
					<Button color={isLiked ? 'red' : 'black'} icon="favorite" class="cursor-default">
						{Object.keys(post.likes ?? {}).length}
					</Button>
				</div>
			{/if}
		</div>
	</div>
</a>

<Modal
	bind:show={showConfirmation}
	title="Are you sure you want to delete this post?"
>
	<div class="flex flex-col flex-1 mb-4">
		<div class="flex flex-col bg-yellow-200 p-4 rounded-t-lg">
			<span class="text-sm font-semibold text-gray-600">
				{formatDistanceToNow(new Date(post.created_at.seconds * 1000), { addSuffix: true })}
			</span>
		</div>
		<div class="flex flex-col flex-1 bg-yellow-100 p-4 rounded-b-lg">
			{post.content.length > 128 ? `${post.content.substr(0, 128)}...` : post.content}
		</div>
	</div>

	<div class="flex flex-row">
		<Button color="red" class="mr-4" on:click={deletePost}>Yes</Button>
		<Button on:click={() => (showConfirmation = false)}>No</Button>
	</div>
</Modal>
