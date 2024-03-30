<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    type InputType = 'text'|'password'|'textarea';
    export let type = 'text';
	export let value = '';
    export let label = '';
    type InputSize = 'small'|'normal'|'large';
    export let size: InputSize = 'normal';
    $: sizeClass = {
		'small': 'p-1 h-8',
		'normal': 'p-3 h-12',
		'large': 'p-4 h-14',
	}[size];
    $: cl = twMerge(
		`flex-1 rounded-lg font-sans outline-none font-medium text-lg border-2 border-zinc-200 resize-none
        transition-all ease-in-out duration-300 focus:border-zinc-300`,
        sizeClass,
        $$restProps['disabled']
            ? 'cursor-not-allowed border-zinc-300' : '',
		$$restProps['class']
	);
</script>

{#if $$slots.label || label?.length}
    <label class="text-lg font-semibold mb-2">
        {#if $$slots.label}
            <slot name="label" />
        {:else}
            {label}
        {/if}
    </label>
{/if}

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