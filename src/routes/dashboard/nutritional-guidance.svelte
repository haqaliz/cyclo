<script lang="ts">
	import type { Insight } from '$types';
	import { Badge, Card, Dialog } from '$components';
	import {
		buttonVariants
	} from "$lib/components/ui/button";
	import { twMerge } from 'tailwind-merge';

	export let value: Insight;
</script>

{#if value}
	<div class={twMerge('p-1 rounded-lg', $$restProps.class)}>
		<Card.Root class="h-full">
			<Card.Header>
				<Card.Title>
					<div class="flex flex-row items-center">
						<span class="mr-4">{value.name}</span>
						<Badge>{value.category}</Badge>
					</div>
				</Card.Title>
				<Card.Description>
					<div class="flex flex-row items-center">
						<span class="mr-4">Nutritional Guidance</span>
					</div>
				</Card.Description>
			</Card.Header>
			{#if value.content}
				<Card.Content>
					{#each value.content as item}
						<Dialog.Root>
							<Dialog.Trigger class={twMerge(buttonVariants({ variant: 'default' }), 'mb-2 mr-1.5')}>
								{item.key}
							</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>{item.key}</Dialog.Title>
								</Dialog.Header>

								<p>{item.value}</p>
							</Dialog.Content>
						</Dialog.Root>
					{/each}
				</Card.Content>
			{/if}
		</Card.Root>
	</div>
{/if}
