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
        confirmPassword: '',
    };

    let errorMsg = '';

    const signup = async (): Promise<void> => {
        if (!form.email.length || !form.password.length || !form.confirmPassword.length) {
            errorMsg = 'All fields are required';
            return;
        };
        if (form.password !== form.confirmPassword) {
            errorMsg = 'Password and confirmation must be the same'
        }
		const r = await auth.signup({
            email: form.email,
            password: form.password,
        });
        if (!r) {
            errorMsg = 'Registeration wasn\'t successful';
            return;
        }
        errorMsg = '';
		await goto('/');
        await user.get();
    };
</script>

<div class="flex flex-col items-center mt-10">
    <h3 class="font-sans font-semibold text-2xl mb-4">Create a new account</h3>
    <div class="flex flex-col space-y-3 min-w-[25%]">
        <input
            bind:value={form.email}
            type="email"
            placeholder="Email"
            class="p-2 rounded font-sans font-medium text-lg border-2"
        />
        <input
            bind:value={form.password}
            type="password"
            placeholder="Password"
            class="p-2 rounded font-sans font-medium text-lg border-2"
        />
        <input
            bind:value={form.confirmPassword}
            type="password"
            placeholder="Confirm Password"
            class="p-2 rounded font-sans font-medium text-lg border-2"
        />
        <button
            on:click={signup}
            class="bg-zinc-900 text-white p-2 rounded font-sans font-medium text-lg"
        >
            Signup
        </button>
        {#if errorMsg.length}
            <div class="bg-red-600 p-2 rounded font-sans font-medium text-lg flex items-center">
                <i class="material-icons mr-2">warning</i>
                {errorMsg}
            </div>
        {/if}
        <a href="/login" class="font-sans font-medium text-blue-500 text-lg">Already have an account?</a>
    </div>
</div>