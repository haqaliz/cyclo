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
        class=" p-2 rounded font-sans font-medium text-lg flex items-center justify-center mr-3"
        class:bg-zinc-900={$page.url.pathname !== item.path}
        class:text-white={$page.url.pathname !== item.path}
        class:bg-purple-400={$page.url.pathname === item.path}
        class:text-black={$page.url.pathname === item.path}
    >
        {item.name}
    </a>
    {/each}
    <button
        class="bg-zinc-900 text-white p-2 rounded font-sans font-medium text-lg flex items-center justify-center"
        style:height="44px"
        title="Logout"
        on:click={logout}
    >
        <i class="material-icons">logout</i>
    </button>
</div>