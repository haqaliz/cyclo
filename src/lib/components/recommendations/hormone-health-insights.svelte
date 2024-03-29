<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button, Modal } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';

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
	let modal: any = {
		show: false,
		title: '',
		content: ''
	};
	const showFeature = (v: any) => {
		modal.title = v?.key;
		modal.content = v?.value;
		modal.show = true;
	};
</script>

{#if !loading && hormoneHealthInsight}
	<div
		in:slide
		out:slide
		class="flex flex-col sm:flex-row items-start transition-colors rounded-lg p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-zinc-950/10"
	>
		<div
			class={twMerge(
				`flex flex-col items-center justify-center p-4 overflow-hidden mb-4 sm:mb-0
				rounded-lg mr-4 w-full md:min-w-[240px] md:w-[240px] min-h-[120px] h-[120px]`,
				hormoneHealthInsightColor,
			)}
			title={hormoneHealthInsight.name}
		>
			<h3 class="text-3xl font-semibold">
				{#if hormoneHealthInsight.name?.length > 24}
					{hormoneHealthInsight.name.substr(0, 23)}&hellip;
				{:else}
					{hormoneHealthInsight.name}
				{/if}
			</h3>
		</div>
		<div class="flex flex-col items-start">
			<h3 class="text-4xl font-semibold mb-2 md:mb-4">Hormone Health Insight</h3>
			{#if hormoneHealthInsight?.content?.length}
				<div class="flex flex-row flex-wrap">
					{#each hormoneHealthInsight?.content as item}
						<Button
							class="mb-2 md:mb-0 mr-2 md:mr-4"
							on:click={() => showFeature(item)}
						>
							{item?.key}
						</Button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<Modal bind:show={modal.show} title={modal.title} containerClass="max-w-md">
		<div
			class="flex-1 w-full flex flex-col max-h-[320px] hide-scrollbar
			overflow-y-scroll text-justify text-lg text-zinc-50"
		>
			{modal.content}
		</div>
	</Modal>
{/if}
