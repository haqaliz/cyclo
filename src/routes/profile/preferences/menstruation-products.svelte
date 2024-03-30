<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { user, brands } from '$stores';
	import { Checkbox } from '$components';
	import { storage } from '$lib';

	const storageMiscBaseUrl = `${storage.public.base_url}/${encodeURIComponent('public/img/misc/')}`;

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
	let products: any = {
		tampon: {
			name: 'Tampons',
			img: `${storageMiscBaseUrl}tampon.svg?alt=media&token=802b3937-8eea-43f4-96df-60b753d6f5f0`,
			title: 'Which tampon brands you use?',
			brands: []
		},
		pad: {
			name: 'Sanity Pads',
			img: `${storageMiscBaseUrl}pad.svg?alt=media&token=f1964617-827d-4ada-ab3d-33398594189e`,
			title: 'Which pad brands you use?',
			brands: []
		},
		cup: {
			name: 'Menstrual Cups',
			img: `${storageMiscBaseUrl}cup.svg?alt=media&token=b5f84d4a-8fc1-408f-a1ad-0e8bae9cf652`,
			title: 'Which cup brands you use?',
			brands: []
		}
	};

	brands.subscribe((v) => {
		if (!v) return;
		value.brands = v.reduce((a: any, i: any) => {
			if (i.value in a) return a;
			a[i.value] = false;
			products[i.metadata?.type]?.brands?.push(i.value);
			return a;
		}, {});
		if ($user) {
			value.tampon = $user.prefs?.menstruation_products?.tampon;
			value.pad = $user.prefs?.menstruation_products?.pad;
			value.cup = $user.prefs?.menstruation_products?.cup;
			value.brands = $user.prefs?.menstruation_products?.brands;
		}
	});

	$: brandsByName = Object.fromEntries(($brands ?? []).map((i: any) => [i.value, i]));

	user.subscribe((v: any) => {
		if (!v) return;
		value.tampon = v.prefs?.menstruation_products?.tampon;
		value.pad = v.prefs?.menstruation_products?.pad;
		value.cup = v.prefs?.menstruation_products?.cup;
		value.brands = v.prefs?.menstruation_products?.brands;
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
					class={twMerge(
						`flex flex-row items-start transition-colors rounded p-2 sm:p-4
							min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer
							min-h-[180px] sm:min-h-[120px] overflow-hidden`,
						value[productKey]
							? 'bg-purple-400 hover:bg-purple-500'
							: 'bg-zinc-950/10 hover:bg-zinc-950/20',
					)}
					on:click|stopPropagation={() => (value[productKey] = !value[productKey])}
				>
					<div class="flex flex-row items-start">
						<Checkbox bind:value={value[productKey]} />
						<span class="font-sans font-semibold text-xl sm:text-lg ml-2">
							{product.name}
						</span>
					</div>
					<!-- svelte-ignore a11y-missing-attribute -->
					<img
						class="w-full h-full drag-none"
						src={product.img}
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
								class={twMerge(
									`flex flex-row items-start transition-colors rounded p-2 sm:p-4
										min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer
										min-h-[180px] sm:min-h-[120px]`,
									value.brands[brand]
										? 'bg-purple-400 hover:bg-purple-500'
										: 'bg-zinc-950/10 hover:bg-zinc-950/20',
								)}
								on:click={() => (value.brands[brand] = !value.brands[brand])}
							>
								<Checkbox bind:value={value.brands[brand]} />
								<div class="flex flex-col justify-center h-full">
									<!-- svelte-ignore a11y-missing-attribute -->
									<img
										class="drag-none ml-2"
										src={brandsByName[brand]?.logo}
									/>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
