<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { Tabs } from '$components';
	const items = ['account', 'preferences'];
	let selected = '';
	$: if (browser && $page.url.pathname !== '/profile' && selected.length) {
		goto(`/profile/${selected}`);
	}
	onMount(() => {
		if ($page.url.pathname === '/profile') {
			goto('/profile/account');
		} else {
			const path = $page.url.pathname.split('/');
			const tab: string = path[path.length - 1].toLowerCase();
			selected = items.includes(tab) ? tab : 'account';
		}
	});
</script>

<div class="flex flex-col p-4">
	<div class="flex flex-row w-full justify-center mb-4">
        <Tabs.Root bind:value={selected}>
            <Tabs.List class="grid w-full grid-cols-2">
                {#each items as item}
                    <Tabs.Trigger value={item}>
                        <span class="capitalize">{item}</span>
                    </Tabs.Trigger>
                {/each}
            </Tabs.List>
        </Tabs.Root>
    </div>
	<slot />
</div>
