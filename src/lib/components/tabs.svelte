<script lang="ts">
	export let items: Array<String>;
	export let selected: String;
</script>

{#if items?.length}
	<div class="flex flex-col">
		<div class={`flex flex-row mb-2 sm:mb-4 ${$$props['tab-items-class'] ?? ''}`}>
			{#each items as item, k}
				<button
					class="btn justify-center capitalize"
					class:mr-2={k < items.length - 1}
					class:sm:mr-4={k < items.length - 1}
					class:black={selected !== item}
					class:primary={selected === item}
					on:click={() => (selected = item)}
				>
					{item}
				</button>
			{/each}
		</div>
		<div class={`flex flex-col ${$$props['tab-content-class'] ?? ''}`}>
			<slot name="content" {selected} />
		</div>
	</div>
{/if}
