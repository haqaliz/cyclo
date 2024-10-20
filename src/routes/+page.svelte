<script lang="ts">
	import { type Activity } from '$types';
	import { Badge, Card, Dialog, Spinner } from '$components';
	import {
		buttonVariants
	} from "$lib/components/ui/button";
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	/** @type {import('./$types').PageData} */
	export let data;

	let activity: Activity;

	onMount(() => {
		activity = data.activity;
	});
</script>

{#if !data}
	<div class="fixed inset-0 flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="w-full py-4 px-3">
		<div class="grid sm:grid-cols-2 md:grid-cols-6 gap-4">
			{#if activity}
				<div class="p-1 rounded-lg h-36 md:col-span-3">
					<Card.Root>
						<Card.Header>
							<Card.Title>
								<div class="flex flex-row items-center">
									<span class="mr-4">{activity.name}</span>
									<Badge>Activity</Badge>
								</div>
							</Card.Title>
							<Card.Description>
								<div class="flex flex-row items-center">
									<span class="mr-4">{activity.category}</span>
									<Badge>{activity.type}</Badge>
								</div>
							</Card.Description>
						</Card.Header>
						<Card.Content>
							{#each activity.content as item}
								<Dialog.Root>
									<Dialog.Trigger
										class={twMerge(
											buttonVariants({ variant: "default" }),
											'mr-3'
										)}
									>
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
					</Card.Root>
				</div>
			{/if}
		</div>
	</div>
{/if}
