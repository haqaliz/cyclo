<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Tabs } from '$components';
	import { goto } from '$app/navigation';
	import { user } from '$stores';

	const tabs = ['Account', 'Password', 'Preferences', 'Notifications'];
	let selectedTabItem = '';
	user.subscribe((v) => {
		if (!v) return;
		tabs.push('Me');
	});
	$: {
		if (browser && $page.url.pathname !== '/profile') {
			let tab = selectedTabItem;
			if (tabs.includes(tab) && tab !== 'Me') tab = tab.toLowerCase();
			if (tab === 'Me' && $user?.id) tab = $user.id;
			goto(`/profile/${tab}`);
		}
	}
	onMount(() => {
		if ($page.url.pathname === '/profile') {
			selectedTabItem = 'Account';
			goto(`/profile/${selectedTabItem.toLowerCase()}`);
		} else {
			const path = $page.url.pathname.split('/');
			const tab: string = path[path.length - 1];
			selectedTabItem = tab[0].toUpperCase() + tab.substr(1);
			if (selectedTabItem === $user?.id) selectedTabItem = 'Me';
		}
	});
</script>

<div class="flex flex-col p-2 sm:p-4">
	{#if $user}
		<Tabs
			items={tabs}
			bind:selected={selectedTabItem}
			tab-items-class={new RegExp(`(${tabs.join('|')})$`, 'i').test($page.url.pathname)
				? 'bg-gray-100 rounded p-2 sm:p-4'
				: 'bg-white transition-all ease-in-out bg-opacity-25 hover:bg-black hover:bg-opacity-10 rounded p-2 sm:p-4'}
			on:selected={(e) => selectedTabItem = e.detail}
		/>
	{/if}

	<slot />
</div>
