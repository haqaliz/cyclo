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
            class="input"
        />
        <input
            bind:value={form.password}
            type="password"
            placeholder="Password"
            class="input"
        />
        <input
            bind:value={form.confirmPassword}
            type="password"
            placeholder="Confirm Password"
            class="input"
        />
        <button
            on:click={signup}
            class="btn black justify-center"
        >
            Signup
        </button>
        {#if errorMsg.length}
            <div class="alert error">
                <i class="material-icons mr-2">warning</i>
                {errorMsg}
            </div>
        {/if}
        <a href="/login" class="btn link blue">Already have an account?</a>
    </div>
</div>