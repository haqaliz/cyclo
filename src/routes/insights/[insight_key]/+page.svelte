<script lang="ts">
	import type { Insight } from "$types";
	import { onMount } from "svelte";


    /** @type {import('./$types').PageData} */
	export let data: any;

    let insight: Insight;
    $: hasContainerClass = (insight?.content ?? '')?.includes('{CONTAINER_CLASS}');
    $: content = (insight?.content ?? '')
        ?.replace(/\{CONTAINER_CLASS\}/gi, 'grid grid-cols-1 md:grid-cols-2 md:grid-flow-row md:auto-rows-fr gap-4 p-4')
        ?.replace(/\{BOX_CLASS\}/gi, 'bg-card text-card-foreground rounded-lg border shadow-sm')
        ?.replace(/\{BOX_CONTENT_CLASS\}/gi, 'p-6')
        ?.replace(/\{BOX_TITLE_CLASS\}/gi, 'flex flex-col space-y-1.5 p-6 pb-0 text-lg font-semibold leading-none tracking-tight')
        ?.replace(/\{BOX_CONTENT_ORDERED_LIST_CLASS\}/gi, 'p-6 list-decimal list-inside')
        ?.replace(/\{BOX_CONTENT_UNORDERED_LIST_CLASS\}/gi, 'p-6 list-disc list-inside')
        ?.replace(/\{BOX_CONTENT_LIST_TITLE_CLASS\}/gi, 'flex flex-col space-y-1.5 p-6 pb-0 text-lg font-semibold leading-none tracking-tight')
        ?.replace(/{SECTION_CLASS}/gi, 'grid gap-4');

    onMount(() => {
        insight = data.insight;
    });
</script>

{#if content}
    {#if hasContainerClass}
        {@html content}
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row md:auto-rows-fr gap-4 p-4">
            {@html content}
        </div>
    {/if}
{/if}