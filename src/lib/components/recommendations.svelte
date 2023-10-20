<script lang="ts">
    import { recommendations } from '$stores';

    let menstruationProduct: any;
    let menstruationProductColor: string = 'bg-purple-200';
    recommendations.subscribe((v: any) => {
        if (!v?.menstruation_products) return;
        menstruationProduct = v?.menstruation_products?.[0];
        menstruationProductColor = {
            pad: 'bg-orange-200',
            tampon: 'bg-rose-200',
            cup: 'bg-sky-200',
        }[menstruationProduct?.type];
    })
</script>

{#if menstruationProduct}
    <div class="flex flex-row items-start transition-colors rounded p-2 sm:p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-gray-100 hover:bg-gray-200">
        <div class={`flex flex-col ${menstruationProductColor} rounded mr-2 sm:mr-4`}>
            <div
                class="bg-no-repeat bg-contain bg-center w-[240px] h-[240px] mix-blend-multiply"
                style:background-image={`url(${menstruationProduct?.img ?? ''})`}
            />
        </div>
        <div class="flex flex-col items-start">
            <div class="flex flex-row items-start">
                <h3 class={`font-semibold text-3xl ${menstruationProductColor} p-2 sm:p-4 rounded mb-2 sm:mb-4 mr-2 sm:mr-4`}>
                    <span>$</span>
                    <span>{menstruationProduct?.price?.value}</span>
                </h3>
                <a
                    class="p-2 sm:p-4 rounded font-sans font-medium focus:outline-none focus:ring-2
                    focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center
                    bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center
                    "
                    href={menstruationProduct?.url}
                >
                    <i class="material-icons text-3xl">shopping_cart</i>
                </a>
            </div>
            {#if menstruationProduct?.features?.length}
                <div class="flex flex-row flex-wrap">
                    {#each menstruationProduct?.features as feature}
                        <div class={`flex flex-col ${menstruationProductColor} rounded p-2 sm:p-4 mb-2 sm:mb-4 mr-2 sm:mr-4 font-semibold`}>
                            {feature?.title}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}