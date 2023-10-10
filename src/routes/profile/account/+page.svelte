<script lang="ts">
	import { user as usr } from '$stores';
	import { user as userApi, auth } from '$api';
	import { goto } from '$app/navigation';

	interface User {
		email: string;
	}
	let user: User | null;
	usr.subscribe((v) => {
		if (!v) return;
		user = structuredClone(v);
	});

	const save = async () => {
		await userApi.updateInfo({
			email: user?.email
		});
		await auth.logout();
		usr.set(null);
		await goto('/');
	};
</script>

<svelte:head>
	<title>Profile Account</title>
	<meta
		name="description"
		content="Manage your account details efficiently. Update your profile information effortlessly with our user-friendly tools. Your account, your control."
	/>
</svelte:head>

{#if user}
	<div class="flex flex-col bg-gray-100 rounded p-2 sm:p-4">
		<div class="flex flex-col mb-2 md:mb-4">
			<label for="" class="text-lg font-semibold mb-2">Email</label>
			<input
				bind:value={user.email}
				type="email"
				placeholder="Email"
				class="p-2 rounded bg-white font-sans font-medium text-lg border-2 resize-none"
			/>
		</div>

		<div class="flex flex-row">
			<button
				on:click={save}
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
			focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
			>
				Save
			</button>
		</div>
	</div>
{/if}
