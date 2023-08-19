<script lang="ts">
    import '$styles';

    import { user } from '$stores';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { browser } from '$app/environment';
    import { onMount } from 'svelte';
	import Nav from './nav.svelte';

    let loading = false;
	let requestedForUser = false;

    const publicPages = ['login', 'signup'];
	const privatePages = ['calendar', 'analytics', 'insight', 'subscribe'];
	const pages = {
		public: new RegExp(`^/(${publicPages.join('|')})`, 'i'),
		private: new RegExp(`^/(${privatePages.join('|')})`, 'i')
	};

	const redirects = async () => {
		if (!browser) return;
		if (!requestedForUser && !$user) await user.get();
		if (
			!$page.url.pathname.match(pages.private)
			&& !$page.url.pathname.match(pages.public)
			&& $page.url.pathname !== '/'
		) {
			loading = false;
			return;
		}
		if (
			!$user &&
			(!!$page.url.pathname.match(pages.private) || $page.url.pathname === '/')
		) {
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
		if ($user && $page.url.pathname === '/') {
			loading = false;
			await goto('/calendar');
			return;
		}
		loading = false;
		await goto($page.url);
	};

	user.subscribe(async (v) => {
		await redirects();
	});

    onMount(async () => {
		loading = true;
		// get current user detail
		await user.get();
	});
</script>

<!-- Layout -->
{#if $user}
	<Nav />
{/if}
<slot />
