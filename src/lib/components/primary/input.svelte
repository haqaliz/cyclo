<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    type InputType = 'text'|'password'|'textarea';
    export let type = 'text';
	export let value = '';
    type InputSize = 'small'|'normal'|'large';
    export let size: InputSize = 'normal';
    $: sizeClass = {
		'small': 'p-1 h-8',
		'normal': 'p-3 h-12',
		'large': 'p-4 h-14',
	}[size];
    $: elementType = type === 'textarea' ? 'textarea' : 'input';
    $: cl = twMerge(
		`flex-1 rounded-lg font-sans outline-none font-medium text-lg border-2 border-zinc-200 resize-none
        transition-all ease-in-out duration-300 focus:border-zinc-300`,
        sizeClass,
		$$restProps['class']
	);
</script>

{#if type === 'textarea'}
    <textarea
        bind:value
        {...$$restProps}
        class={cl}
    />
{:else if type === 'text'}
    <input
        bind:value
        type="text"
        {...$$restProps}
        class={cl}
    />
{:else if type === 'text'}
    <input
        bind:value
        type="password"
        {...$$restProps}
        class={cl}
    />
{/if}