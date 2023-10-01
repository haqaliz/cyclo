<script lang="ts">
	export let items: Array<string>;
	export let selected: string;
</script>

{#if items?.length}
	<div class="flex flex-col">
		<div class={`flex flex-row mb-2 sm:mb-4 ${$$props['tab-items-class'] ?? ''}`}>
			{#each items as item, k}
				<button
					class={`p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
						focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center justify-center capitalize
						${
							selected === item
								? 'bg-purple-400 text-black hover:bg-purple-800 focus:ring-purple-400'
								: 'bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400'
						}`}
					class:mr-2={k < items.length - 1}
					class:sm:mr-4={k < items.length - 1}
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
