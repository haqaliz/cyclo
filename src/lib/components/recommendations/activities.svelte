<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button, Badge, Card, Dialog } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';
	import { buttonVariants } from '$components/ui/button';

	let activity: any;
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.activities) return;
		loading = false;
		const NGI = Math.floor(Math.random() * v?.activities.length) + 0;
		activity = v?.activities?.[NGI];
	});
</script>

{#if !loading && activity}
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<div class="flex flex-row items-center">
					<span>{activity?.name}</span>
					<Badge class="capitalize ml-4">Cycle-Based Activity</Badge>
				</div>
			</Card.Title>
			<Card.Description>
				<div class="flex flex-row">
					<span class="mr-4">{activity?.category}</span>
					<Badge class="capitalize">
						{activity?.type}
					</Badge>
				</div>
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col md:flex-row">
				{#if activity?.content?.length}
					<div class="flex flex-row flex-wrap">
						{#each activity?.content as item}
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
