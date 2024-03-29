<script lang="ts">
	import { insights, pageTitle } from "$stores";

    /** @type {import('./$types').PageData} */
	export let data: any;
    let insight: any;
    insights.subscribe((v) => {
        if (!v) return;
        const insightKey = data?.insight_key;
        insight = v.find((i) => insightKey && i.key === insightKey);
        $pageTitle = insight?.name ?? '';
    });
</script>

{#if insight}
    {@html insight.content}
{/if}