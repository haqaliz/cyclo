<script lang="ts">
	import '../app.css';
    import 'material-icons/iconfont/material-icons.css';
	import { page } from '$app/stores';
	import Navbar from './_navbar';
    import { _globals } from '$firebase';
	import { user, loaded } from '$stores';
	import { Spinner } from '$components';
	import { onAuthStateChanged } from "firebase/auth";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

    onAuthStateChanged(_globals.auth, async (v) => {
		if (v) {
			await user.get(v);
			loaded.set(true);
		} else {
			// user is signed out
			loaded.set(false);
		}
	});

	user.subscribe((v: any) => {
		if (!browser) return;
		if (!v) return;
		loaded.set(true);
		if ($page.url.pathname === '/') {
			goto('/dashboard');
		}
	});

	loaded.subscribe((v: any) => {
		if (browser && v === false) {
			goto('/login');
		}
	});
</script>

{#if $loaded === null}
	<div class="flex flex-col w-full h-screen items-center justify-center">
		<Spinner />
	</div>
{:else}
	{#if $user}
		<Navbar />
		<div class="flex flex-col mt-[72px]">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
{/if}