<script lang="ts">
	import CompactFooter from './compact-footer.svelte'
	import FullSizeFooter from './full-size-footer.svelte'
	export let compact = false;
</script>

{#if compact}
	<CompactFooter />
{:else}
	<FullSizeFooter />
{/if}