<script>
	import '../app.css';
    import 'material-icons/iconfont/material-icons.css';
	import { page } from '$app/stores';
	import Nav from './nav.svelte';
	import Footer from './footer.svelte';
    import { _globals } from '$firebase';
	import { user, insights } from '$stores';
	import { onAuthStateChanged } from "firebase/auth";

    onAuthStateChanged(_globals.auth, async (v) => {
		if (v) {
			await user.get(v);
			if (!insights?.length) await insights.get();
		} else {
			// user is signed out
		}
	});
</script>

{#if !$page.url.pathname.match(/\/(login)/gi)}
	<Nav />
{/if}

<slot />

{#if !$page.url.pathname.match(/\/(login|calendar|analytics|insight)/gi)}
	<Footer />
{/if}