<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	type ButtonType = 'normal' | 'text';
	export let type: ButtonType = 'normal';
	type ButtonColor = 'black' | 'red' | 'gray' | 'yellow';
	export let color: ButtonColor = 'black';
	export let icon: string | undefined = undefined;
	type ButtonSize = 'small'|'normal'|'large';
	export let size: ButtonSize = 'normal';
	$: buttonStyle = `${type}-${color}`;
	$: elementType = $$restProps.href ? 'a' : 'button';
	$: colorClass = {
		// Normal
		'normal-black': 'bg-zinc-800 text-zinc-950 text-zinc-50 hover:bg-zinc-900',
		'normal-red': 'bg-red-600 text-zinc-950 hover:bg-red-700',
		'normal-green': 'bg-green-600 text-zinc-950 hover:bg-green-700',
		'normal-gray': 'bg-zinc-300 text-zinc-950 hover:bg-zinc-400',
		'normal-yellow': 'bg-amber-400 text-zinc-950 hover:bg-amber-500',
		// Text
		'text-black': 'bg-transparent text-zinc-950 hover:text-zinc-50 hover:bg-zinc-900',
		'text-red': 'bg-transparent text-zinc-950 hover:bg-red-700',
		'text-green': 'bg-transparent text-zinc-950 hover:bg-green-700',
		'text-gray': 'bg-transparent text-zinc-950 hover:bg-zinc-400',
		'text-yellow': 'bg-transparent text-zinc-950 hover:bg-amber-500'
	}[buttonStyle];
	$: sizeClass = {
		'small': 'p-1 h-8',
		'normal': 'p-3 h-12',
		'large': 'p-4 h-14',
	}[size];
	$: cl = twMerge(
		`flex flex-row items-center justify-center rounded-lg
        font-semibold text-lg transition-all ease-in-out duration-300`,
		colorClass,
		sizeClass,
		$$restProps['class']
	);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={elementType} {...$$restProps} class={cl} on:click>
	{#if icon?.length}
		<i class={twMerge('material-icons', $$slots.default ? 'mr-2' : '')}>{icon}</i>
	{/if}

	{#if $$slots.default}
		<slot />
	{/if}
</svelte:element>