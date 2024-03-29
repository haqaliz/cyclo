<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button, Modal } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';

	let activity: any;
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.activities) return;
		loading = false;
		const NGI = Math.floor(Math.random() * v?.activities.length) + 0;
		activity = v?.activities?.[NGI];
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

{#if !loading && activity}
	<div
		in:slide
		out:slide
		class="flex flex-col sm:flex-row items-start transition-colors rounded-lg p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-zinc-950/10"
	>
		<div class="flex flex-col lg:flex-row md:max-w-min w-full mr-4 md:mr-0">
			<div
				class={twMerge(
					`flex flex-col items-start justify-start p-4 overflow-hidden
					rounded-lg mr-4 mb-4 md:mb-0 w-full md:min-w-[240px] md:w-[240px]
					min-h-[240px] h-[240px]`,
					/low/gi.test(JSON.stringify(activity))
						? 'bg-sky-200' : '',
					/moderate/gi.test(JSON.stringify(activity))
						? 'bg-orange-200' : '',
					/high/gi.test(JSON.stringify(activity))
						? 'bg-rose-200' : '',
				)}
				title={activity.name}
			>
				<h3 class="text-3xl font-semibold">
					{#if activity.name?.length > 24}
						{activity.name.substr(0, 23)}&hellip;
					{:else}
						{activity.name}
					{/if}
				</h3>
                <h4 class="text-2xl text-gray-600 font-semibold">
					{#if activity.category?.length > 24}
						{activity.category.substr(0, 23)}&hellip;
					{:else}
						{activity.category}
					{/if}
				</h4>
			</div>
		</div>
		<div class="flex flex-col items-start">
			<h3 class="text-4xl font-semibold mb-2 md:mb-4">Cycle-Based Activity</h3>
			{#if activity?.content?.length}
				<div class="flex flex-row flex-wrap">
					{#each activity?.content as item}
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
		<div class="flex-1 w-full flex flex-col max-h-[320px] hide-scrollbar
		overflow-y-scroll text-justify text-lg text-zinc-50">
			{modal.content}
		</div>
	</Modal>
{/if}
