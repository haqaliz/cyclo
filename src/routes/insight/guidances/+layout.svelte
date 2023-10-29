<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$stores';
	import topics from '../topics';

	let isValid: boolean | null = null;
	let targetTopic: any = null;
	user.subscribe((v) => {
		if (!v) return;
		topics.forEach((topic) => {
			// First level check is inside the topic
			if (isValid) return;
			if ((topic.permission ?? []).includes($user.subscription?.key)) {
				isValid = true;
				return;
			}
			// Second level check is inside the topic items
			topic.items.forEach((i) => {
				if ($page.url.pathname !== i?.link) return;
				targetTopic = i;
				if ((i.permission ?? []).includes(v?.subscription?.key)) {
					isValid = true;
					return;
				}
			});
		});
		if (isValid === null) isValid = false;
	});
</script>

<svelte:head>
	<title>{targetTopic?.name ?? 'Insight'}</title>
	<meta name="description" content={targetTopic?.name ?? ''} />
</svelte:head>

{#if isValid === true}
	{#if targetTopic?.name?.length}
		<div class="px-2 pt-2 sm:px-4 sm:pt-4 flex flex-col">
			<div class={`rounded p-2 sm:p-4 flex flex-col ${targetTopic?.classes}`}>
				<h1 class="font-sans font-semibold text-4xl">{targetTopic?.name}</h1>
			</div>
		</div>
	{/if}

	<slot />
{:else if isValid === false}
	<div class="flex flex-col items-center justify-center p-2 mt-2 sm:mt-4">
		<div
			class={`
                bg-cover bg-no-repeat bg-center w-[256px] h-[620px] rounded relative
                flex flex-row items-center justify-center overflow-hidden mb-2 sm:mb-4
            `}
			style:background-image="url(/img/misc/not-allowed.webp)"
		/>
		<div class="flex flex-col w-full sm:w-auto mb-2 sm:mb-4">
			<div
				class="p-2 rounded font-sans font-medium text-lg flex items-center bg-purple-400 text-black"
			>
				<i class="material-icons mr-2">info</i>
				You're not allowed to this page.
			</div>
		</div>
		<a
			href="/calendar"
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
		>
			Go To Home
		</a>
	</div>
{:else}
	<div class="fixed inset-0 flex flex-row items-center justify-center">
		<span class="animate-ping inline-flex h-7 w-7 rounded-full bg-purple-300 opacity-75" />
	</div>
{/if}
