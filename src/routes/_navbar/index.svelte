<script lang="ts">
    import Logo from './logo.svelte';
    import Menu from './menu.svelte';
</script>

<div class="fixed top-0 inset-x-0 bg-background flex flex-row items-center p-4">
    <Menu />
    <div class="flex-1" />
    <Logo />
    <div class="flex-1" />
</div>