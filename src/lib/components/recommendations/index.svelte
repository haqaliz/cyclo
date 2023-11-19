<script lang="ts">
    import MenstruationProduct from "./menstruation-product.svelte";
    import HormoneHealthInsights from "./hormone-health-insights.svelte";
    import NutritionalGuidances from "./nutritional-guidances.svelte";
    import Activities from "./activities.svelte";

    type Recommendation = 'menstruation_product'
    |'hormone_health_insights'
    |'nutritional_guidances'
    |'activities';
    export let type: Recommendation;
</script>

{#if type === 'menstruation_product'}
    <MenstruationProduct />
{:else if type === 'hormone_health_insights'}
    <HormoneHealthInsights />
{:else if type === 'nutritional_guidances'}
    <NutritionalGuidances />
{:else if type === 'activities'}
    <Activities />
{/if}