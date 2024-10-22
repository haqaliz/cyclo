<script>
	import '../app.css';
    import 'material-icons/iconfont/material-icons.css';
	import { page } from '$app/stores';
	import Navbar from './_navbar';
    import { _globals } from '$firebase';
	import { user } from '$stores';
	import { onAuthStateChanged } from "firebase/auth";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

    onAuthStateChanged(_globals.auth, async (v) => {
		if (v) {
			await user.get(v);
		} else {
			// user is signed out
		}
	});

	$: if (
		browser
		&& $user
		&& $page.url.pathname === '/'
	) {
		goto('/dashboard');
	}
</script>

{#if !$page.url.pathname.match(/^\/(login)/gi)}
	<Navbar />
{/if}

{#if $page.url.pathname.match(/^\/(login)?/gi)}
	<div class="flex flex-col mt-[72px]">
		<slot />
	</div>
{/if}