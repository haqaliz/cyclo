<script>
	import '../app.css';
    import 'material-icons/iconfont/material-icons.css';
	import { page } from '$app/stores';
	import Nav from './nav.svelte';
	import Footer from './footer.svelte';
    import { _globals, users_metadata } from '$firebase';
	import { user } from '$stores';
	import { onAuthStateChanged } from "firebase/auth";

    onAuthStateChanged(_globals.auth, async (v) => {
		if (v) {
			const r = {
				uid: v.uid,
				email: v.email,
				name: v.displayName,
				profile: v.photoURL,
			};
			const metadata = await users_metadata.getUserMetadata({
				user_id: v.uid,
			});
			if (!metadata) {
				users_metadata.upsertUserMetadata({
					user_id: v.uid,
					email: v.email,
					prefs: {},
				});
			}
			if (metadata?.admin) r.admin = true;
			if (metadata?.prefs) r.prefs = metadata.prefs;
			user.set(r);
		} else {
			// user is signed out
		}
	});
</script>

{#if !$page.url.pathname.match(/\/(login)/gi)}
	<Nav />
{/if}

<slot />

{#if !$page.url.pathname.match(/\/(login|calendar)/gi)}
	<Footer />
{/if}