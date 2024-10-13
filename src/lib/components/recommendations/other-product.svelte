<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button, Dialog } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';
	import { buttonVariants } from '$components/ui/button';

	let otherProduct: any;
	let otherProductColor = 'bg-purple-200';
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.other_products) return;
		loading = false;
		// Menstruation Product Index
		const OPI = Math.floor(Math.random() * v?.other_products.length) + 0;
		otherProduct = v?.other_products?.[OPI];
		otherProductColor = {
			vibrator: 'bg-sky-200'
		}[otherProduct?.type];
	});
</script>

{#if otherProduct}
	<div
		in:slide
		out:slide
		class="flex flex-col sm:flex-row items-start transition-colors rounded-lg p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-zinc-950/10"
	>
		<div
			class={twMerge(
				`group/img flex flex-col relative items-center p-4 overflow-hidden
				rounded-lg mr-4 w-full md:min-w-[240px] md:w-[240px]
				min-h-[240px] h-[240px] mb-4 sm:mb-0`,
				otherProductColor,
			)}
		>
			<!-- svelte-ignore a11y-missing-attribute -->
			<img
				class="w-full h-full rounded drag-none"
				src={otherProduct?.img}
			/>
			<div
				class={twMerge(
					`flex flex-row opacity-0 group-hover/img:opacity-100
					absolute p-2 rounded-br-lg font-semibold capitalize
					transition-opacity ease-in-out duration-300
					text-2xl left-4 top-4`,
					otherProductColor,
				)}
			>
				{otherProduct.type}
			</div>
		</div>
		<div class="flex flex-col items-start">
			<div class="flex flex-col sm:flex-row w-full sm:w-auto items-start mb-4 sm:mb-0">
				<h3
					class={twMerge(
						`font-semibold w-full sm:w-auto text-3xl p-4 rounded-lg mb-4 mr-4`,
						otherProductColor,
					)}
				>
					<span class="text-4xl capitalize">
						{otherProduct.brand}{otherProduct.name?.length ? ': ' : ''}
					</span>
					{#if otherProduct.name?.length}
						<span>{otherProduct.name}</span>
					{/if}
				</h3>
				<h3
					class={twMerge(
						`font-semibold w-full sm:w-auto text-3xl p-4 rounded-lg mb-4 mr-4`,
						otherProductColor,
					)}
				>
					<span>{{
						usd: '$',
						gbp: '£',
						eur: '€'
					}[otherProduct?.price?.currency]}</span>
					<span>{otherProduct?.price?.value}</span>
				</h3>
				<Button
					size="icon"
					href={otherProduct?.url}
				>
					<i class="material-icons">shopping_cart</i>
				</Button>
			</div>
			{#if otherProduct?.features?.length}
				<div class="flex flex-row flex-wrap">
					{#each otherProduct?.features as feature}
						<Dialog.Root>
							<Dialog.Trigger class={buttonVariants({ variant: "default", class: "mr-4 last:mr-0" })}
							>{feature?.title}</Dialog.Trigger
							>
							<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>{feature?.title}</Dialog.Title>
							</Dialog.Header>
							<p>{feature?.content}</p>
							</Dialog.Content>
						</Dialog.Root>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
