<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$api';
	import { user } from '$stores';

	interface Form {
		email: string;
		password: string;
	}

	let form: Form = {
		email: '',
		password: ''
	};

	let showError = false;

	const login = async (): Promise<void> => {
		if (!form.email.length || !form.password.length) return;
		const r = await auth.login(form);
		if (!r) {
			showError = true;
			return;
		}
		showError = false;
		await goto('/calendar');
		await user.get();
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta
		name="description"
		content="Securely access your menstrual health data. Log in for a personalized experience."
	/>
</svelte:head>

<div class="flex flex-col items-center mt-10">
	<div
		class="bg-cover bg-no-repeat bg-center w-[256px] h-[324px]"
		style:background-image="url(/img/misc/login.webp)"
	/>
	<h3 class="font-sans font-semibold text-2xl mb-4">Login to your account</h3>
	<div class="flex flex-col space-y-3 min-w-[25%]">
		<input
			bind:value={form.email}
			type="email"
			placeholder="Email"
			class="p-2 rounded font-sans font-medium text-lg border-2 resize-none"
		/>
		<input
			bind:value={form.password}
			type="password"
			placeholder="Password"
			class="p-2 rounded font-sans font-medium text-lg border-2 resize-none"
		/>
		<button
			on:click={login}
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
		>
			Login
		</button>
		{#if showError}
			<div
				class="p-2 rounded font-sans font-medium text-lg flex items-center bg-red-600 text-black"
			>
				<i class="material-icons mr-2">warning</i>
				Wrong email or password
			</div>
		{/if}
		<a
			href="/signup"
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-transparent text-blue-500 hover:bg-gray-50"
			>Create new account</a
		>
		<a
			href="/"
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-transparent text-blue-500 hover:bg-gray-50"
			>Go back to home</a
		>
	</div>
</div>
