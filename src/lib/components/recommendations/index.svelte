<script lang="ts">
    import MenstruationProduct from "./menstruation-product.svelte";
    import HormoneHealthInsights from "./hormone-health-insights.svelte";
    import NutritionalGuidances from "./nutritional-guidances.svelte";
    import Activities from "./activities.svelte";
    import OtherProduct from "./other-product.svelte";

    type Recommendation = 'menstruation_product'
    |'hormone_health_insights'
    |'nutritional_guidances'
    |'activities'
    |'other_product';
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
{:else if type === 'other_product'}
    <OtherProduct />
{/if}