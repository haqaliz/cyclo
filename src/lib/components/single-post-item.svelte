<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { DOMAIN } from '$config';
	import { Modal } from '$components';
	import { user as usr } from '$api';
	import { user } from '$stores';
	import { formatDistanceToNow } from 'date-fns';
	const dispatch = createEventDispatcher();
	export let post: any;
	export let clickable = true;
	export let compact = true;
	export let actions: boolean;
	let showConfirmation = false;
	$: brief = post.content.length > 128 ? `${post.content.substr(0, 128)}...` : post.content;
	$: sharedContent = encodeURIComponent(`${brief}\n${DOMAIN}posts/${post.id}`);
	const deletePost = async () => {
		await usr.removePost({
			post_id: post.id
		});
		showConfirmation = false;
		dispatch('deleted');
	};
	let isLiked: boolean;
	user.subscribe((v) => {
		if (!v) return;
		isLiked = post.likes?.[v.id];
	});
	const likePost = async () => {
		isLiked = !isLiked;
		await usr.likePost({
			post_id: post.id
		});
	};
	const clickEvent = async () => {
		if (!clickable) return;
		window.location.href = `/posts/${post.id}`;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<a
	class="
		flex flex-col rounded bg-white transition-all ease-in-out bg-opacity-25
		hover:bg-black hover:bg-opacity-10 p-2 md:p-4 mb-2 md:mb-4
	"
	class:cursor-pointer={clickable}
	on:click|stopPropagation={clickEvent}
>
	<div class="flex flex-row items-center mb-1 md:mb-2">
		<slot name="before-header-first-element" />
		<span class="text-sm font-semibold text-gray-600">
			{formatDistanceToNow(new Date(post.created_at.seconds * 1000), { addSuffix: true })}
		</span>
		<div class="flex-1" />
		{#if actions && $user && $user.id === post?.user_id}
			<button
				class="rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
                focus:ring-gray-400 justify-center hover:bg-gray-600 hover:bg-opacity-30 text-red-500"
				on:click|stopPropagation={() => (showConfirmation = true)}
			>
				<i class="material-icons">delete</i>
			</button>
		{/if}
		<slot name="after-header-last-element" />
	</div>
	<p class="font-sans">
		{post.content}
	</p>
	<!-- actions section -->
	<div class="flex flex-col items-start mt-w md:mt-4">
		<div class="flex flex-row w-full">
			{#if !compact}
				<!-- share section -->
				<div class="flex flex-row">
					<a
						href={`https://twitter.com/intent/tweet?text=${sharedContent}&related=cyclo`}
						target="_blank"
						class="
							rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
							focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
							focus:ring-gray-400 justify-center hover:bg-gray-600 hover:bg-opacity-30
							w-[40px] h-[40px]
						"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
							<path
								d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
							/>
						</svg>
					</a>
				</div>
			{/if}
			<div class="flex-1" />
			<!-- like section -->
			{#if $user}
				<div class="flex flex-row items-center">
					<span class="text-zinc-900 text-lg font-semibold mr-2">
						{isLiked
							? Object.keys(post.likes ?? {}).length + 1
							: Object.keys(post.likes ?? {}).length}
					</span>
					<button
						class="
							rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
							focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
							focus:ring-gray-400 justify-center hover:bg-gray-600 hover:bg-opacity-30
							w-[40px] h-[40px]
						"
						on:click|stopPropagation={likePost}
					>
						<i class="material-icons" class:text-zinc-900={!isLiked} class:text-red-500={isLiked}
							>favorite</i
						>
					</button>
				</div>
			{:else}
				<div class="flex flex-row items-center">
					<span class="text-zinc-900 text-lg font-semibold mr-2">
						{Object.keys(post.likes ?? {}).length}
					</span>
					<div
						class="
							rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
							focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center p-2
							justify-center w-[40px] h-[40px] select-none
						"
					>
						<i class="material-icons text-zinc-900">favorite</i>
					</div>
				</div>
			{/if}
		</div>
	</div>
</a>

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
