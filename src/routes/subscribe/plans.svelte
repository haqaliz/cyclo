<script lang="ts">
    import { user } from '$stores';
    import { products } from '$api';
    import { Tabs } from '$components';

    let plans: any = null;
    let selectTabItem = 'monthly';
    user.subscribe(async (v) => {
        if (!v) return;
        plans = await products.plans();
    });
</script>

{#if plans}
    <Tabs
        items={['monthly', 'annually']}
        selected={selectTabItem}
        tab-items-class="justify-center"
    >
        <svelte:fragment slot="content" let:selected={selectTabItem}>
            <div class="flex flex-row">
                {#if selectTabItem === 'monthly'}
                    {#each plans[selectTabItem] as plan, k}
                        <div
                            class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col flex-1"
                            class:mr-2={k < plans[selectTabItem].length - 1}
                            class:sm:mr-4={k < plans[selectTabItem].length - 1}
                        >
                        ok
                        </div>
                    {/each}
                {:else if selectTabItem === 'annually'}
                    Annually Plans
                {/if}
            </div>
        </svelte:fragment>
    </Tabs>
{/if}

