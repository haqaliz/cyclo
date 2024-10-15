<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Badge, Card, Dialog } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';
	import { buttonVariants } from '$components/ui/button';

	let hormoneHealthInsight: any;
	let hormoneHealthInsightColor: any = 'bg-purple-200';
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.hormone_health_insights) return;
		loading = false;
		const HHII = Math.floor(Math.random() * v?.hormone_health_insights.length) + 0;
		hormoneHealthInsight = v?.hormone_health_insights?.[HHII];
		hormoneHealthInsightColor = {
			0: 'bg-orange-200',
			1: 'bg-rose-200',
			2: 'bg-sky-200'
		}[Math.floor(Math.random() * 2) + 0];
	});
</script>

{#if !loading && hormoneHealthInsight}
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<div class="flex flex-row items-center">
					<span>{hormoneHealthInsight?.name}</span>
					<Badge class="capitalize ml-4">Hormone Health Insight</Badge>
				</div>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col md:flex-row">
				{#if hormoneHealthInsight?.content?.length}
					<div class="flex flex-row flex-wrap">
						{#each hormoneHealthInsight?.content as item}
							<Dialog.Root>
								<Dialog.Trigger class={buttonVariants({ variant: "default", class: "mr-4 last:mr-0" })}
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
