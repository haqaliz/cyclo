<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Tabs } from '$components';
	import { goto } from '$app/navigation';
	import { user } from '$stores';

	const tabs = ['Overview', 'Me'];
	let selectTabItem = '';
	$: {
		if (browser && $page.url.pathname !== '/explore') {
			const query = $page.url.search ?? '';
			goto(`/explore/${selectTabItem.toLowerCase()}${query}`);
		}
	}
	onMount(() => {
		const query = $page.url.search ?? '';
		if ($page.url.pathname === '/explore') {
			selectTabItem = 'Overview';
			goto(`/explore/${selectTabItem.toLowerCase()}${query}`);
		} else {
			const path = $page.url.pathname.split('/');
			const tab: string = path[path.length - 1];
			selectTabItem = tab[0].toUpperCase() + tab.substr(1);
		}
	});
</script>

<div class="flex flex-col">
	{#if $user}
		<div class="flex flex-row p-2 md:p-4">
			<Tabs
				items={tabs}
				bind:selected={selectTabItem}
				tab-items-class="bg-white transition-all ease-in-out bg-opacity-25
					hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4 !mb-0"
				tab-item-class="px-6"
				tab-container-class="flex-1"
			>
				<svelte:fragment slot="content" let:selected={selectTabItem} />
			</Tabs>
		</div>
	{/if}

	<slot />
</div>
