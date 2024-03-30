<script>
	import { twMerge } from "tailwind-merge";
	const uuid = Math.random().toString();
	export let value = false;
	export let label = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label
	for={uuid}
	class="group/checkbox flex flex-row select-none cursor-pointer relative"
	on:click|stopPropagation={() => {}}
>
	<input id={uuid} type="checkbox" class="absolute opacity-0 w-0 h-0" bind:checked={value} />
	<div
		class={twMerge(
			`w-7 h-7 rounded-lg flex flex-row items-center justify-center
                transition-all ease-in-out`,
			!value
				? 'border-2 border-zinc-400 group-hover/checkbox:bg-zinc-950/20 group-hover/checkbox:border-zinc-500'
				: 'bg-zinc-800 group-hover/checkbox:bg-zinc-950'
		)}
	>
		<i
			class={twMerge(
				'material-icons scale-0 opacity-0 text-lg font-semibold text-zinc-50 transition-all ease-in-out',
				value ? 'scale-100 opacity-100' : ''
			)}
		>
			check
		</i>
	</div>
	{#if $$slots.label || label?.length}
		<span class="ml-2 font-semibold">
			{#if $$slots.label}
				<slot name="label" />
			{:else if label?.length}
				{label}
			{/if}
		</span>
	{/if}
</label>
