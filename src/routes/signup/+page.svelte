<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$api';
	import { user } from '$stores';

	interface Form {
		email: string;
		password: string;
		confirmPassword: string;
	}

	let form: Form = {
		email: '',
		password: '',
		confirmPassword: ''
	};

	let errorMsg = '';

	const signup = async (): Promise<void> => {
		if (!form.email.length || !form.password.length || !form.confirmPassword.length) {
			errorMsg = 'All fields are required';
			return;
		}
		if (form.password !== form.confirmPassword) {
			errorMsg = 'Password and confirmation must be the same';
		}
		const r = await auth.signup({
			email: form.email,
			password: form.password
		});
		if (!r) {
			errorMsg = "Registeration wasn't successful";
			return;
		}
		errorMsg = '';
		await goto('/');
		await user.get();
	};
</script>

<svelte:head>
	<title>Signup</title>
	<meta
		name="description"
		content="Embark on your menstrual health journey with us. Sign up today for a healthier tomorrow."
	/>
</svelte:head>

<div class="flex flex-col items-center mt-10">
	<div
		class="bg-contain bg-no-repeat bg-center w-[256px] h-[368px]"
		style:background-image="url(/img/misc/signup.webp)"
	/>
	<h3 class="font-sans font-semibold text-2xl mb-4">Create a new account</h3>
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
		<input
			bind:value={form.confirmPassword}
			type="password"
			placeholder="Confirm Password"
			class="p-2 rounded font-sans font-medium text-lg border-2 resize-none"
		/>
		<button
			on:click={signup}
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
		>
			Signup
		</button>
		{#if errorMsg.length}
			<div
				class="p-2 rounded font-sans font-medium text-lg flex items-center bg-red-600 text-black"
			>
				<i class="material-icons mr-2">warning</i>
				{errorMsg}
			</div>
		{/if}
		<a
			href="/login"
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-transparent text-blue-500 hover:bg-gray-50"
			>Already have an account?</a
		>
		<a
			href="/"
			class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
		focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-transparent text-blue-500 hover:bg-gray-50"
			>Go back to home</a
		>
	</div>
</div>
