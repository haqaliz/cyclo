<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { auth } from '$api';
    import { user } from '$stores';

    const menu = [
        {
            name: 'Calendar',
            path: '/calendar',
        },
        {
            name: 'Analytics',
            path: '/analytics',
        },
        {
            name: 'Insight',
            path: '/insight',
        },
    ]

    const logout = async () => {
        await auth.logout();
        user.set(null);
        await goto('/login');
    };
</script>

<div class="bg-purple-200 flex flex-row items-center p-3">
    <h3 class="font-sans font-semibold text-2xl">Cyclo</h3>
    <div class="flex-1" />
    {#each menu as item}
        <a
            href={item.path}
            class="btn flex items-center justify-center mr-3"
            class:black={$page.url.pathname !== item.path}
            class:primary={$page.url.pathname === item.path}
        >
            {item.name}
        </a>
    {/each}
    <button
        class="btn black flex items-center justify-center"
        style:height="44px"
        title="Logout"
        on:click={logout}
    >
        <i class="material-icons">logout</i>
    </button>
</div>