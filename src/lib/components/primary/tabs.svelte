<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import Button from "./button.svelte";
	export let items: Array<string>;
	export let selected: string;
</script>

{#if items?.length}
	<div class={twMerge(
		`flex flex-row overflow-x-scroll hide-scrollbar`,
		$$restProps['class'],
	)}>
		{#each items as item, k}
			<Button
				color={selected === item ? 'gray' : 'black'}
				class={twMerge(
					k < items.length - 1 ? 'mr-4' : '', 
					$$props['tab-item-class'],
				)}
				on:click={() => { selected = item }}
			>
				{#if $$slots.default}
					<slot {item} />
				{:else}
					{item}
				{/if}
			</Button>
		{/each}
	</div>
{/if}
