<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Tabs } from '$components';
	import { goto } from '$app/navigation';

	const tabs = ['Account', 'Password', 'Preferences'];
	let selectTabItem = '';
	$: {
		if (browser && $page.url.pathname !== '/profile') {
			goto(`/profile/${selectTabItem.toLowerCase()}`);
		}
	}
	onMount(() => {
		if ($page.url.pathname === '/profile') {
			selectTabItem = 'Account';
			goto(`/profile/${selectTabItem.toLowerCase()}`);
		} else {
			const path = $page.url.pathname.split('/');
			const tab: string = path[path.length - 1];
			selectTabItem = tab[0].toUpperCase() + tab.substr(1);
		}
	});
</script>

<div class="flex flex-col p-2 sm:p-4">
	<Tabs items={tabs} bind:selected={selectTabItem} tab-items-class="bg-gray-100 rounded p-2 sm:p-4">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		<svelte:fragment slot="content" let:selected={selectTabItem} />
	</Tabs>

	<slot />
</div>
