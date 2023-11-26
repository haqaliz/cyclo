<script lang="ts">
	import { user, brands } from '$stores';
	import { Checkbox } from '$components';

	interface MenstruationProducts {
		tampon: boolean;
		pad: boolean;
		cup: boolean;
		brands: any;
	}
	export let value: MenstruationProducts = {
		tampon: false,
		pad: false,
		cup: false,
		brands: {}
	};
	let products = {
		tampon: {
			name: 'Tampons',
			title: 'Which tampon brands you use?',
			brands: []
		},
		pad: {
			name: 'Sanity Pads',
			title: 'Which pad brands you use?',
			brands: []
		},
		cup: {
			name: 'Menstrual Cups',
			title: 'Which cup brands you use?',
			brands: []
		}
	};

	brands.subscribe((v) => {
		if (!v) return;
		value.brands = v.reduce((a, i) => {
			if (i.value in a) return a;
			a[i.value] = false;
			products[i.metadata?.type]?.brands?.push(i.value);
            return a;
        }, {});
		if ($user) {
			value.tampon = $user.metadata?.prefs?.menstruation_products?.tampon;
			value.pad = $user.metadata?.prefs?.menstruation_products?.pad;
			value.cup = $user.metadata?.prefs?.menstruation_products?.cup;
			value.brands = $user.metadata?.prefs?.menstruation_products?.brands;
		}
	});

	user.subscribe((v: any) => {
		if (!v) return;
		value.tampon = v?.metadata?.prefs?.menstruation_products?.tampon;
		value.pad = v?.metadata?.prefs?.menstruation_products?.pad;
		value.cup = v?.metadata?.prefs?.menstruation_products?.cup;
		value.brands = v?.metadata?.prefs?.menstruation_products?.brands;
	});
</script>

{#if Object.keys(value.brands).length}
	<!-- Products -->
	<div class="flex flex-col mb-2 md:mb-4">
		<h3 class="text-2xl font-semibold mb-2 md:mb-4">Menstruation Products</h3>
		<div class="flex flex-row overflow-x-scroll hide-scrollbar">
			{#each Object.keys(products) as productKey}
				{@const product = products[productKey]}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="flex flex-row items-start transition-colors rounded p-2 sm:p-4
					min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer
					min-h-[180px] sm:min-h-[120px]"
					class:bg-purple-400={value[productKey]}
					class:hover:bg-purple-500={value[productKey]}
					class:bg-gray-300={!value[productKey]}
					class:hover:bg-gray-400={!value[productKey]}
					on:click|stopPropagation={() => (value[productKey] = !value[productKey])}
				>
					<div class="flex flex-row items-start">
						<Checkbox bind:value={value[productKey]} />
						<span class="font-sans font-semibold text-xl sm:text-lg ml-2">
							{product.name}
						</span>
					</div>
					<div
						class="bg-no-repeat bg-contain bg-center w-full h-full"
						style:background-image={`url(/img/misc/${productKey}.svg)`}
					/>
				</div>
			{/each}
		</div>

		{#each Object.keys(products) as productKey}
			{#if products[productKey]?.brands?.length && value[productKey]}
				<div class="flex flex-col mt-2 mb-mt-4">
					<h3 class="text-2xl font-semibold mb-2 md:mb-4">{products[productKey].title}</h3>
					<div class="flex flex-row overflow-x-scroll hide-scrollbar">
						{#each products[productKey].brands as brand}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class="flex flex-row items-start transition-colors rounded p-2 sm:p-4
								min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer
								min-h-[180px] sm:min-h-[120px]"
								class:bg-purple-400={value.brands[brand]}
								class:hover:bg-purple-500={value.brands[brand]}
								class:bg-gray-300={!value.brands[brand]}
								class:hover:bg-gray-400={!value.brands[brand]}
								on:click={() => (value.brands[brand] = !value.brands[brand])}
							>
								<Checkbox bind:value={value.brands[brand]} />
								<div
									class="bg-no-repeat bg-contain bg-center w-full h-full ml-2"
									style:background-image={`url(/img/misc/brands/${brand}.webp)`}
								/>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
