<script lang="ts">
	export let value = '';
	export let minRows = 1;
	export let maxRows: number;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="flex flex-col flex-1 relative">
	<pre
		aria-hidden="true"
		class={`
			font-sans p-2 md:p-4 box-border leading-5 rounded overflow-hidden
			${$$restProps['class'] ?? ''}
		`}
		style:min-height={minHeight}
		style:max-height={maxHeight}>
        {value + '\n'}
    </pre>

	<textarea
		bind:value
		{...$$restProps}
		class={`
			font-sans p-2 md:p-4 box-border leading-5 outline-none
			rounded overflow-hidden absolute w-full h-full top-0 resize-none
			${$$restProps['class'] ?? ''}
		`}
	/>
</div>
