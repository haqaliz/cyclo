<script lang="ts">
	import { Button, Dialog, Card, Badge } from '$components';
	import { recommendations } from '$stores';
	import { buttonVariants } from '$components/ui/button';

	let menstruationProduct: any;
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.menstruation_products) return;
		loading = false;
		// Menstruation Product Index
		const MPI = Math.floor(Math.random() * v?.menstruation_products.length) + 0;
		menstruationProduct = v?.menstruation_products?.[MPI];
	});
</script>

{#if menstruationProduct}
	<Card.Root class={$$restProps.class}>
		<Card.Header>
			<Card.Title class="capitalize">
				<div class="flex flex-row items-center">
					<span>{menstruationProduct?.brand}</span>
					{#if menstruationProduct.name?.length}
						<Badge class="capitalize ml-4">{menstruationProduct.name}</Badge>
					{/if}
					<div class="flex-1" />
					<Button
						size="icon"
						href={menstruationProduct?.url}
					>
						<i class="material-icons">shopping_cart</i>
					</Button>
				</div>
			</Card.Title>
			<Card.Description class="capitalize">
				<div class="flex flex-row">
					<span class="mr-4">{menstruationProduct.type}</span>
					<Badge>
						<span>{{
							usd: '$',
							gbp: '£',
							eur: '€'
						}[menstruationProduct?.price?.currency]}</span>
						<span>{menstruationProduct?.price?.value}</span>
					</Badge>
				</div>
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col md:flex-row">
				<img
					class="rounded-lg max-h-32 drag-none object-contain mb-4 md:mb-0 md:mr-4"
					src={menstruationProduct?.img}
					alt={menstruationProduct?.brand}
				/>

				{#if menstruationProduct?.features?.length}
					<div class="flex flex-row flex-wrap justify-start">
						{#each menstruationProduct?.features as feature}
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
