<script lang="ts">
    import { goto } from '$app/navigation';
    import { auth } from '$api';
    import { user } from '$stores';

    const logout = async () => {
        await auth.logout();
        user.set(null);
        await goto('/login');
    };
</script>

nav
<button on:click={logout}>logout</button>