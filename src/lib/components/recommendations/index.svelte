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
    $: component = {
        menstruation_product: MenstruationProduct,
        hormone_health_insights: HormoneHealthInsights,
        nutritional_guidances: NutritionalGuidances,
        activities: Activities,
        other_product: OtherProduct,
    }[type];
</script>

<svelte:component this={component} />