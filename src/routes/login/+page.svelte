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
        password: '',
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
		await goto('/');
        await user.get();
    };
</script>

<div class="flex flex-col items-center mt-10">
    <h3 class="font-sans font-semibold text-2xl mb-4">Login to your account</h3>
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
        <button
            on:click={login}
            class="btn black"
        >
            Login
        </button>
        {#if showError}
            <div class="alert error">
                <i class="material-icons mr-2">warning</i>
                Wrong email or password
            </div>
        {/if}
        <a href="/signup" class="btn link blue">Create new account</a>
    </div>
</div>