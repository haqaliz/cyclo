<script lang="ts">
	import '$styles';

	import { user } from '$stores';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import Nav from './nav/index.svelte';
	import { Footer } from '$components';
	import { permissions, redirects, loading } from './index';

	user.subscribe(redirects);

	onMount(async () => {
		// get current user detail
		if (!$user) await user.get();
	});
</script>

<!-- Layout -->
{#if permissions.private.test($page.url.pathname) || permissions.publicWithNav.test($page.url.pathname) || '/' === $page.url.pathname}
	<div in:slide out:slide class="flex flex-col">
		<Nav />
	</div>
{/if}
{#if !loading}
	<div in:fade out:fade class="flex flex-col">
		<slot />

		{#if permissions.publicWithFooter.test($page.url.pathname) || '/' === $page.url.pathname}
			<Footer />
		{/if}
	</div>
{:else}
	<div in:fade out:fade class="flex flex-col items-center justify-center absolute inset-0">
		<span class="animate-ping w-8 h-8 rounded-full bg-purple-200 opacity-75" />
	</div>
{/if}
