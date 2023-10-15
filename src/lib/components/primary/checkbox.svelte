<script>
	const uuid = Math.random().toString();
	export let value = false;
	export let label = '';
	const clickEvent = () => {
		// just for stop propagation
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	for={uuid}
	class="group/checkbox flex flex-row select-none cursor-pointer relative"
	on:click|stopPropagation={clickEvent}
>
	<input id={uuid} type="checkbox" class="absolute opacity-0 w-0 h-0" bind:checked={value} />
	<div
		class={`w-7 h-7 rounded flex flex-row items-center justify-center
                transition-all ease-in-out
                ${
									!value
										? 'border-2 border-gray-200 group-hover/checkbox:bg-gray-100 group-hover/checkbox:border-gray-300'
										: 'bg-purple-300 group-hover/checkbox:bg-purple-400'
								}`}
	>
		<i
			class={`material-icons scale-0 opacity-0 text-lg font-semibold transition-all ease-in-out
                ${value ? 'scale-100 opacity-100' : ''}`}
		>
			check
		</i>
	</div>
	{#if $$slots.label}
		<slot name="label" />
	{:else if label?.length}
		<span class="ml-2 font-semibold">{label}</span>
	{/if}
</label>
