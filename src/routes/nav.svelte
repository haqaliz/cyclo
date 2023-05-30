<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { auth } from '$api';
    import { user } from '$stores';
    import { slide } from 'svelte/transition';

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
    ];
    let show = false;

    const logout = async () => {
        await auth.logout();
        user.set(null);
        await goto('/login');
    };
</script>

<div class="bg-purple-200 flex flex-row items-center p-2 sm:p-4">
    <h3 class="font-sans font-semibold text-2xl">Cyclo</h3>
    <div class="flex-1" />
    <button
        class="btn black justify-center md:hidden"
        on:click={() => show = !show}
    >
        <i class="material-icons">menu</i>
    </button>
    <div class="hidden flex-row md:flex">
        {#each menu as item}
            <a
                href={item.path}
                class="btn justify-center mr-4"
                class:black={$page.url.pathname !== item.path}
                class:primary={$page.url.pathname === item.path}
            >
                {item.name}
            </a>
        {/each}
        <button
            class="btn black justify-center"
            style:height="44px"
            title="Logout"
            on:click={logout}
        >
            <i class="material-icons">logout</i>
        </button>
    </div>
</div>
{#if show}
    <div in:slide out:slide class="bg-purple-200 flex flex-row items-center p-2">
        {#each menu as item}
            <a
                href={item.path}
                class="btn justify-center mr-4"
                class:black={$page.url.pathname !== item.path}
                class:primary={$page.url.pathname === item.path}
            >
                {item.name}
            </a>
        {/each}
        <button
            class="btn black justify-center"
            style:height="44px"
            title="Logout"
            on:click={logout}
        >
            <i class="material-icons">logout</i>
        </button>
    </div>
{/if}