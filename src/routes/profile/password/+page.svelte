<script lang="ts">
	import { user as usr, token } from '$stores';
	import { auth } from '$api';
	import { goto } from '$app/navigation';

	interface User {
		newPassword: string;
		confirmPassword: string;
	}
	let user: User = {
		newPassword: '',
		confirmPassword: ''
	};
	usr.subscribe((v) => {
		if (!v) return;
		user = structuredClone(v);
	});

	const save = async () => {
		if (user?.newPassword !== user?.confirmPassword) return;
		await auth.updateUserPassword({
			password: user?.newPassword
		});
		await auth.logout();
		usr.set(null);
		token.set(null);
		await goto('/login');
	};
</script>

<svelte:head>
	<title>Profile Password</title>
	<meta
		name="description"
		content="Manage your account password securely. Update your profile password effortlessly with our user-friendly tools. Your account, your control."
	/>
</svelte:head>

{#if user}
	<div class="flex flex-col bg-gray-100 rounded p-2 sm:p-4">
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-1 flex-col mb-2 md:mr-4 md:mb-4">
				<label for="" class="text-lg font-semibold mb-2">New Password</label>
				<input
					bind:value={user.newPassword}
					type="password"
					placeholder="Enter a New Password"
					class="p-2 rounded bg-white font-sans font-medium text-lg border-2 resize-none"
				/>
			</div>

			<div class="flex flex-1 flex-col mb-2 md:mb-4">
				<label for="" class="text-lg font-semibold mb-2">Confirm Password</label>
				<input
					bind:value={user.confirmPassword}
					type="password"
					placeholder="Confirm your Password"
					class="p-2 rounded bg-white font-sans font-medium text-lg border-2 resize-none"
				/>
			</div>
		</div>

		<div class="flex flex-row">
			<button
				on:click={save}
				class="py-2 px-8 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
			focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
			>
				Save
			</button>
		</div>
	</div>
{/if}
