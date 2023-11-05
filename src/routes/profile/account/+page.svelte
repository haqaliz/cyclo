<script lang="ts">
	import { user as usr, token } from '$stores';
	import { user as userApi, auth } from '$api';
	import { goto } from '$app/navigation';

	let user: any = {
		email: '',
		first_name: '',
		last_name: ''
	};
	usr.subscribe((v) => {
		if (!v) return;
		user.email = v.email;
		user.first_name = v?.metadata?.first_name ?? '';
		user.last_name = v?.metadata?.last_name ?? '';
	});

	const save = async () => {
		await auth.updateUserEmail({
			email: user?.email
		});
		await userApi.updateInfo({
			email: user?.email,
			first_name: user?.first_name,
			last_name: user?.last_name
		});
		if ($usr && user?.email !== $usr?.email) {
			await auth.logout();
			usr.set(null);
			token.set(null);
			await goto('/login');
		} else {
			await usr.get(false);
		}
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
	<div class="flex flex-col bg-gray-100 rounded p-2 md:p-4">
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-col min-w-[50px] flex-1 mb-2 md:mr-4 md:mb-4">
				<label for="" class="text-lg font-semibold mb-2">Email</label>
				<input
					bind:value={user.email}
					type="email"
					placeholder="Email"
					class="p-2 rounded bg-white font-sans font-medium text-lg border-2 resize-none"
				/>
			</div>
			<div class="flex flex-col min-w-[50px] flex-1 mb-2 md:mr-4 md:mb-4">
				<label for="" class="text-lg font-semibold mb-2">First Name</label>
				<input
					bind:value={user.first_name}
					type="text"
					placeholder="First Name"
					class="p-2 rounded bg-white font-sans font-medium text-lg border-2 resize-none"
				/>
			</div>
			<div class="flex flex-col min-w-[50px] flex-1 mb-2">
				<label for="" class="text-lg font-semibold mb-2">Last Name</label>
				<input
					bind:value={user.last_name}
					type="text"
					placeholder="Last Name"
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
