<script lang="ts">
    import { pageTitle } from '$stores';
    import { page } from '$app/stores';
    import Logo from './logo.svelte';
    import Menu from './menu.svelte';
    
    $: {
        if ($page.url.pathname === '/calendar') {
            $pageTitle = 'Calendar';
        } else if ($page.url.pathname === '/analytics') {
            $pageTitle = 'Analytics';
        } else if ($page.url.pathname === '/insight') {
            $pageTitle = 'Insight';
        } else if ($page.url.pathname === '/profile/account') {
            $pageTitle = 'Profile Account';
        } else if ($page.url.pathname === '/profile/preferences') {
            $pageTitle = 'Profile Preferences';
        } else if ($page.url.pathname === '/profile/notifications') {
            $pageTitle = 'Profile Notifications';
        } else if ($page.url.pathname === '/challenges') {
            $pageTitle = 'Challenges';
        }
    }
</script>

<svelte:head>
    {#if $pageTitle?.length > 0}
        <title>Cyclo | {$pageTitle}</title>
    {/if}
</svelte:head>

<div class="bg-background flex flex-row items-center p-4">
    <Menu />
    <div class="flex-1" />
    <Logo />
    <div class="flex-1" />
</div>