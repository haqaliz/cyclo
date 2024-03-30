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
    <Tabs {items} bind:selected={selected} class="mb-4">
        <svelte:fragment slot="default" let:item>
            <span class="capitalize">{item}</span>
        </svelte:fragment>
    </Tabs>
    <slot />
</div>