<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button, Dialog } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';
	import { buttonVariants } from '$components/ui/button';

	let nutritionalGuidance: any;
	let nutritionalGuidanceColor: any = 'bg-purple-200';
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.nutritional_guidances) return;
		loading = false;
		const NGI = Math.floor(Math.random() * v?.nutritional_guidances.length) + 0;
		nutritionalGuidance = v?.nutritional_guidances?.[NGI];
		nutritionalGuidanceColor = {
			0: 'bg-orange-200',
			1: 'bg-rose-200',
			2: 'bg-sky-200'
		}[Math.floor(Math.random() * 2) + 0];
	});
</script>

{#if !loading && nutritionalGuidance}
	<div
		in:slide
		out:slide
		class="flex flex-col sm:flex-row items-start transition-colors rounded-lg p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-zinc-950/10"
	>
		<div class="flex flex-col lg:flex-row md:max-w-min w-full mr-4">
			<div
				class={twMerge(
					`flex flex-col items-center justify-center p-4 overflow-hidden
					rounded-lg mr-4 w-full md:min-w-[240px] mb-4 sm:mb-0
					md:w-[240px] min-h-[120px] h-[120px]`,
					nutritionalGuidanceColor,
				)}
				title={nutritionalGuidance.name}
			>
				<h3 class="text-3xl font-semibold">
					{#if nutritionalGuidance.name?.length > 24}
						{nutritionalGuidance.name.substr(0, 23)}&hellip;
					{:else}
						{nutritionalGuidance.name}
					{/if}
				</h3>
			</div>
			<div
				class={twMerge(
					`flex flex-col items-center justify-center p-4 overflow-hidden
					rounded-lg mr-4 w-full md:min-w-[240px] md:w-[240px]
					min-h-[120px] h-[120px] mb-4 sm:mb-0`,
					nutritionalGuidanceColor,
				)}
				title={nutritionalGuidance.category}
			>
				<h3 class="text-3xl font-semibold">
					{#if nutritionalGuidance.category?.length > 24}
						{nutritionalGuidance.category.substr(0, 23)}&hellip;
					{:else}
						{nutritionalGuidance.category}
					{/if}
				</h3>
			</div>
		</div>
		<div class="flex flex-col items-start">
			<h3 class="text-4xl font-semibold mb-4">Nutritional Guidance</h3>
			{#if nutritionalGuidance?.content?.length}
				<div class="flex flex-row flex-wrap">
					{#each nutritionalGuidance?.content as item}
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
	</div>
{/if}
