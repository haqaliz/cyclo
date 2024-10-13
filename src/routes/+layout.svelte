<script>
	import '../app.css';
    import 'material-icons/iconfont/material-icons.css';
	import { page } from '$app/stores';
	import Nav from './nav.svelte';
    import { _globals } from '$firebase';
	import { user, insights, recommendations, brands, challenges, initialized } from '$stores';
	import { onAuthStateChanged } from "firebase/auth";
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

    onAuthStateChanged(_globals.auth, async (v) => {
		if (v) {
			await user.get(v);
			if (!$insights?.length) await insights.get();
			if (!$recommendations) await recommendations.get(v.uid);
			if (!$brands) await brands.get();
			if (!$challenges) await challenges.get();
		} else {
			// user is signed out
		}
		$initialized = true;
	});

	$: if (
		browser
		&& $initialized
		&& !$user
	) {
		goto('/login');
	}

	$: if (
		browser
		&& $initialized
		&& $user
		&& $page.url.pathname === '/'
	) {
		goto('/calendar');
	}
</script>

{#if $initialized && !$page.url.pathname.match(/^\/(login)/gi)}
	<Nav />
{/if}

{#if $initialized || $page.url.pathname.match(/^\/(login)?/gi)}
	<slot />
{/if}