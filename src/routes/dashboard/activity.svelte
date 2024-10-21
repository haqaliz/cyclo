<script lang="ts">
	import { type Activity } from '$types';
	import { Badge, Card, Dialog } from '$components';
	import {
		buttonVariants
	} from "$lib/components/ui/button";
	import { twMerge } from 'tailwind-merge';

	export let value: Activity;
</script>

{#if value}
	<div class="p-1 rounded-lg h-36 md:col-span-3">
		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="flex flex-row items-center">
						<span class="mr-4">{value.name}</span>
						<Badge>{value.type}</Badge>
					</div>
				</Card.Title>
				<Card.Description>
					<div class="flex flex-row items-center">
						<span class="mr-4">Activity</span>
						<Badge>{value.category}</Badge>
					</div>
				</Card.Description>
			</Card.Header>
			{#if value.content}
				<Card.Content>
					{#each value.content as item}
						<Dialog.Root>
							<Dialog.Trigger class={twMerge(buttonVariants({ variant: 'default' }), 'mr-3')}>
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
