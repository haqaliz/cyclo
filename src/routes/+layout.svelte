<script lang="ts">
    import '$styles';

    import { user } from '$stores';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
	import Nav from './nav.svelte';

    let loading = false;

    const publicPages = ['login', 'signup'];
	const privatePages = [];
	const pages = {
		public: new RegExp(`^/(${publicPages.join('|')})`, 'i'),
		private: new RegExp(`^/(${privatePages.join('|')})$`, 'i')
	};

	$: allowed = (() => {
		if (!$user) return false;
		return !!$page.url.pathname.match(pages.private) || $page.url.pathname === '/';
	})();

	const redirects = async () => {
		if (
			!$user &&
			(!!$page.url.pathname.match(pages.private) || $page.url.pathname === '/')
		) {
			loading = false;
			await goto('/login');
		}
		if (!$user && !!$page.url.pathname.match(pages.public)) {
			loading = false;
			await goto($page.url);
		}
		if ($user && !!$page.url.pathname.match(pages.public)) {
			loading = false;
			await goto('/');
		}
		loading = false;
		await goto($page.url);
	};

	user.subscribe(async (v) => {
		if (!v) return;
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
