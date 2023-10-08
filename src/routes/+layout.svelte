<script lang="ts">
	import '$styles';

	import { user } from '$stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import Nav from './nav/index.svelte';

	let loading = false;
	let requestedForUser = false;

	const publicPages = ['login', 'signup'];
	const privatePages = ['profile', 'calendar', 'analytics', 'insight', 'subscribe'];
	const pages = {
		public: new RegExp(`^/(${publicPages.join('|')})`, 'i'),
		private: new RegExp(`^/(${privatePages.join('|')})`, 'i')
	};

	const redirects = async () => {
		if (!browser) return;
		if (!requestedForUser && !$user) await user.get();
		if (
			!$page.url.pathname.match(pages.private) &&
			!$page.url.pathname.match(pages.public) &&
			$page.url.pathname !== '/'
		) {
			loading = false;
			return;
		}
		if (!$user && !!$page.url.pathname.match(pages.private)) {
			loading = false;
			await goto('/login');
			return;
		}
		if (!$user && !!$page.url.pathname.match(pages.public)) {
			loading = false;
			await goto($page.url);
			return;
		}
		if ($user && !!$page.url.pathname.match(pages.public)) {
			loading = false;
			await goto('/');
			return;
		}
		loading = false;
		await goto($page.url);
	};

	user.subscribe(async () => {
		await redirects();
	});

	onMount(async () => {
		loading = true;
		// get current user detail
		await user.get();
	});
</script>

<!-- Layout -->
{#if $page.url.pathname.match(pages.private) || $page.url.pathname === '/'}
	<div in:slide out:slide class="flex flex-col">
		<Nav />
	</div>
{/if}
{#if !loading}
	<div in:fade out:fade class="flex flex-col">
		<slot />
	</div>
{:else}
	<div in:fade out:fade class="flex flex-col items-center justify-center absolute inset-0">
		<span class="animate-ping w-8 h-8 rounded-full bg-purple-200 opacity-75" />
	</div>
{/if}
