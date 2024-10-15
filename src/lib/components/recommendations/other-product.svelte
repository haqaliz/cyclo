<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Badge, Button, Card, Dialog } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';
	import { buttonVariants } from '$components/ui/button';

	let otherProduct: any;
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.other_products) return;
		loading = false;
		// Menstruation Product Index
		const OPI = Math.floor(Math.random() * v?.other_products.length) + 0;
		otherProduct = v?.other_products?.[OPI];
	});
</script>

{#if otherProduct}
	<Card.Root class={$$restProps.class}>
		<Card.Header>
			<Card.Title>
				<div class="flex flex-row items-center">
					<span>{otherProduct?.brand}</span>
					{#if otherProduct.name?.length}
						<Badge class="capitalize ml-4">{otherProduct.name}</Badge>
					{/if}
					<div class="flex-1" />
					<Button
						size="icon"
						href={otherProduct?.url}
					>
						<i class="material-icons">shopping_cart</i>
					</Button>
				</div>
			</Card.Title>
			<Card.Description>
				<div class="flex flex-row">
					<span class="mr-4">{otherProduct.type}</span>
					<Badge>
						<span>{{
							usd: '$',
							gbp: '£',
							eur: '€'
						}[otherProduct?.price?.currency]}</span>
						<span>{otherProduct?.price?.value}</span>
					</Badge>
				</div>
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col md:flex-row">
				<img
					class="rounded-lg max-h-32 drag-none object-contain mb-4 md:mb-0 md:mr-4"
					src={otherProduct?.img}
					alt={otherProduct?.brand}
				/>

				{#if otherProduct?.features?.length}
					<div class="flex flex-row flex-wrap justify-start">
						{#each otherProduct?.features as feature}
							<Dialog.Root>
								<Dialog.Trigger class={buttonVariants({ variant: "default", class: "mb-4 mr-4" })}
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
		</Card.Content>
	</Card.Root>
{/if}
