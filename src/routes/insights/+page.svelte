<script lang="ts">
	import { type Insight } from '$types';
	import { onMount } from 'svelte';
	import { Badge, Card, Spinner } from '$components';
	import { twMerge } from 'tailwind-merge';

	/** @type {import('./$types').PageData} */
	export let data;

	let topics: Insight[] = [];

	$: topicsByCategory = topics.reduce((a: any, i: any) => {
		const category = i.category?.toLowerCase()?.replace(/[ -_]+/g, '_');
		if (!a[category]) a[category] = [];
		a[category].push(i);
		return a;
	}, {});

	onMount(() => {
		topics = data.insights;
	});
</script>

{#if !data}
	<div class="fixed inset-0 flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:else}
	{#each Object.keys(topicsByCategory) as topicKey}
		{@const topic = topicsByCategory[topicKey] ?? []}
		{@const topicCategory = topic?.[0]?.category}
		<div class="flex flex-col mb-4">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight ml-4 mb-2">{topicCategory}</h3>
			<div class="flex flex-row overflow-x-scroll hide-scrollbar pl-4">
				{#each topic as item}
					{@const classes = (item.classes ?? '').split(' ')}
					<a href={`/insights/${item.key}`} class="flex w-max mr-4">
						<Card.Root
							class={twMerge(
								'min-w-[350px] max-w-[350px] min-h-[110px] \
                                    max-h-[110px] transition-colors ease-in-out duration-100',
								classes[1]
							)}
						>
							<Card.Header>
								<Card.Title>{item.name}</Card.Title>
								<Card.Description>
									<Badge class={classes[0]} />
								</Card.Description>
							</Card.Header>
						</Card.Root>
					</a>
				{/each}
			</div>
		</div>
	{/each}
{/if}
