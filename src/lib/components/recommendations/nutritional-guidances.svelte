<script lang="ts">
	import { Modal, Progress } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';

	let nutritionalGuidance: any;
	let nutritionalGuidanceColor: any = 'bg-purple-200';
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.nutritional_guidances) return;
		loading = false;
		const NGI = Math.floor(Math.random() * v?.nutritional_guidances.length) + 0;
		nutritionalGuidance = v?.nutritional_guidances?.[NGI];
		nutritionalGuidanceColor = {
			0: 'bg-orange-200 hover:bg-orange-300 transition-colors ease-in-out',
			1: 'bg-rose-200 hover:bg-rose-300 transition-colors ease-in-out',
			2: 'bg-sky-200 hover:bg-sky-300 transition-colors ease-in-out'
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

{#if loading}
	<div
		in:slide
		out:slide
		class={`flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
			bg-gray-100 hover:bg-gray-200 overflow-hidden mb-2 md:mb-4 last:mb-0
			${$$restProps['class'] ?? ''}`}
	>
		<Progress />
	</div>
{/if}

{#if nutritionalGuidance}
	<div
		in:slide
		out:slide
		class="flex flex-col sm:flex-row items-start transition-colors rounded p-2 sm:p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-gray-100 hover:bg-gray-200
			"
	>
		<div class="flex flex-col lg:flex-row md:max-w-min w-full mr-4 md:mr-0">
			<div
				class={`
					flex flex-col items-center justify-center ${nutritionalGuidanceColor} p-4 overflow-hidden
					rounded mr-2 sm:mr-4 mb-2 sm:mb-4 lg:mb-0 w-full md:min-w-[240px] md:w-[240px] min-h-[120px] h-[120px]
				`}
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
				class={`
					flex flex-col items-center justify-center ${nutritionalGuidanceColor} p-4 overflow-hidden
					rounded mr-2 sm:mr-4 mb-2 sm:mb-0 w-full md:min-w-[240px] md:w-[240px] min-h-[120px] h-[120px]
				`}
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
			<h3 class="text-4xl font-semibold mb-2 md:mb-4">Nutritional Guidances</h3>
			{#if nutritionalGuidance?.content?.length}
				<div class="flex flex-row flex-wrap">
					{#each nutritionalGuidance?.content as item}
						<button
							class={`flex flex-col ${nutritionalGuidanceColor} rounded p-2 md:p-4 mb-2 md:mb-0 mr-2 md:mr-4 font-semibold`}
							on:click={() => showFeature(item)}
						>
							{item?.key}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<Modal bind:show={modal.show} trigger={false} title={modal.title} containerClass="max-w-md">
		<svelte:fragment slot="content">
			<div
				class="flex-1 w-full flex flex-col max-h-[320px] hide-scrollbar overflow-y-scroll text-justify text-lg"
			>
				{modal.content}
			</div>
		</svelte:fragment>
	</Modal>
{/if}
