<script lang="ts">
	import { Badge, Card, Dialog } from '$components';
	import { recommendations } from '$stores';
	import { buttonVariants } from '$components/ui/button';

	let nutritionalGuidance: any;
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.nutritional_guidances) return;
		loading = false;
		const NGI = Math.floor(Math.random() * v?.nutritional_guidances.length) + 0;
		nutritionalGuidance = v?.nutritional_guidances?.[NGI];
	});
</script>

{#if !loading && nutritionalGuidance}
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<div class="flex flex-row items-center">
					<span>{nutritionalGuidance?.name}</span>
					<Badge class="capitalize ml-4">Nutritional Guidance</Badge>
				</div>
			</Card.Title>
			<Card.Description>
				{nutritionalGuidance.category}
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col md:flex-row">
				{#if nutritionalGuidance?.content?.length}
					<div class="flex flex-row flex-wrap justify-start">
						{#each nutritionalGuidance?.content as item}
							<Dialog.Root>
								<Dialog.Trigger
									class={buttonVariants({ variant: 'default', class: 'mr-4 last:mr-0' })}
									>{item?.key}</Dialog.Trigger
								>
								<Dialog.Content class="sm:max-w-[425px]">
									<Dialog.Header>
										<Dialog.Title>{item?.key}</Dialog.Title>
									</Dialog.Header>
									<p>{item?.value}</p>
								</Dialog.Content>
							</Dialog.Root>
						{/each}
					</div>
				{/if}
				</div>
		</Card.Content>
	</Card.Root>
{/if}
