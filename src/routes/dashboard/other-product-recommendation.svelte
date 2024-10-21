<script lang="ts">
	import { Badge, Button, Card, Dialog } from '$components';
	import { buttonVariants } from '$components/ui/button';
	import { type Recommendation } from '$types';
	import { twMerge } from 'tailwind-merge';

	export let value: Recommendation;
</script>

{#if value}
	<div class={twMerge('p-1 rounded-lg', $$restProps.class)}>
		<Card.Root class="h-full">
			<Card.Header>
				<Card.Title>
					<div class="flex flex-row items-center">
						<span class="capitalize">{value?.brand}</span>
						{#if value.name?.length}
							<Badge class="capitalize ml-4">{value.name}</Badge>
						{/if}
						<div class="flex-1" />
						<Button
							size="icon"
							href={value?.url}
						>
							<i class="material-icons">shopping_cart</i>
						</Button>
					</div>
				</Card.Title>
				<Card.Description>
					<div class="flex flex-row">
						<span class="mr-4">{value.type}</span>
						<Badge>
							<span>{{
								usd: '$',
								gbp: '£',
								eur: '€'
							}[value?.price?.currency]}</span>
							<span>{value?.price?.value}</span>
						</Badge>
					</div>
				</Card.Description>
			</Card.Header>
			<Card.Content>
					<div class="flex flex-col md:flex-row">
						<img
							class="rounded-lg border drag-none min-w-32 max-w-32 min-h-32 max-h-32
							object-cover mb-4 md:mb-0 md:mr-4"
							src={value?.img}
							alt={value?.brand}
						/>
						{#if value.features}
							<div class="flex flex-col">
								<div class="flex flex-row flex-wrap">
									{#each value.features
										.filter((i) => i.content?.length) as feature}
										<Dialog.Root>
											<Dialog.Trigger
												class={buttonVariants({
													variant: "default", class: "mb-4 mr-4"
												})}
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
								<div class="flex flex-row flex-wrap">
									{#each value.features
										.filter((i) => !i.content?.length) as feature}
										<Badge class="mb-4 mr-4">{feature?.title}</Badge>
									{/each}
								</div>
							</div>
						{/if}
					</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
