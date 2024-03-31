<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    type InputType = 'text'|'password'|'textarea'|'smart-textarea';
    export let type = 'text';
	export let value = '';
    export let label = '';
    export let minRows = 1;
	export let maxRows = 10;
    type InputSize = 'small'|'normal'|'large';
    export let size: InputSize = 'normal';
    $: sizeClass = {
		'small': 'p-1 h-8',
		'normal': 'p-3 h-12',
		'large': 'p-4 h-14',
	}[size];
    $: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
    $: cl = twMerge(
		`flex-1 rounded-lg font-sans outline-none font-medium text-lg border-2 border-zinc-200 resize-none
        transition-all ease-in-out duration-300 focus:border-zinc-300`,
        sizeClass,
        $$restProps['disabled']
            ? 'cursor-not-allowed border-zinc-300' : '',
        type === 'smart-textarea'
            ? 'absolute w-full h-full top-0' : '',
		$$restProps['class'],
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
{:else if type === 'smart-textarea'}
    <div class="flex flex-col flex-1 relative">
        <pre
            aria-hidden="true"
            class="font-sans p-2 md:p-4 box-border leading-5 rounded overflow-hidden"
            style:min-height={minHeight}
            style:max-height={maxHeight}>
            {value + '\n'}
        </pre>

        <textarea
            bind:value
            {...$$restProps}
            class={cl}
        />
    </div>
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