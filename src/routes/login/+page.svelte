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

    const login = async (): Promise<void> => {
        if (!form.email.length || !form.password.length) return;
		const r = await auth.login(form);
        if (!r) {
            // bad req
            return;
        }
		await goto('/');
        await user.get();
    };
</script>

<input bind:value={form.email} type="email" placeholder="Email" />
<input bind:value={form.password} type="password" placeholder="Password" />
<button on:click={login}>Login</button>