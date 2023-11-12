<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Tabs } from '$components';
	import { goto } from '$app/navigation';
	import _ from 'lodash';

	const tabs = ['Hormone Health', 'Nutritional Guidance'];
	let selectedTabItem = '';
	onMount(() => {
		if ($page.url.pathname === '/admin/insights') {
			selectedTabItem = 'Hormone Health';
			goto(`/admin/insights/${selectedTabItem.replace(/[-_ ]+/g, '-').toLowerCase()}`);
		} else {
			const path = $page.url.pathname.split('/');
			selectedTabItem = _.startCase(path[path.length - 1].replace(/-+/g, ' '));
		}
	});
	const tabSelected = (e: any) => {
		selectedTabItem = e.detail;
		if (browser && $page.url.pathname !== '/admin/insights') {
			let tab = selectedTabItem;
			if (tabs.includes(tab)) tab = tab.replace(/[-_ ]+/g, '-').toLowerCase();
			goto(`/admin/insights/${tab}`);
		}
	};
</script>

<div class="flex flex-col p-2 sm:p-4">
	<Tabs
		items={tabs}
		bind:selected={selectedTabItem}
		tab-items-class="bg-gray-100 rounded p-2 sm:p-4"
		on:selected={tabSelected}
	/>

	<slot />
</div>
