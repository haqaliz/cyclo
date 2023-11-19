<script lang="ts">
	import { Modal, Progress } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';

	let activity: any;
	let activityColor: any = 'bg-purple-200';
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.activities) return;
		loading = false;
		const NGI = Math.floor(Math.random() * v?.activities.length) + 0;
		activity = v?.activities?.[NGI];
        if (/low/gi.test(JSON.stringify(activity))) {
            activityColor = 'bg-sky-200 hover:bg-sky-300 transition-colors ease-in-out';
        } else if (/moderate/gi.test(JSON.stringify(activity))) {
            activityColor = 'bg-orange-200 hover:bg-orange-300 transition-colors ease-in-out';
        } else if (/high/gi.test(JSON.stringify(activity))) {
            activityColor = 'bg-rose-200 hover:bg-rose-300 transition-colors ease-in-out';
        }
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

{#if activity}
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
					flex flex-col items-start justify-start ${activityColor} p-4 overflow-hidden
					rounded mr-2 sm:mr-4 mb-2 sm:mb-4 lg:mb-0 w-full md:min-w-[240px] md:w-[240px] min-h-[240px] h-[240px]
				`}
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
						<button
							class={`flex flex-col ${activityColor} rounded p-2 md:p-4 mb-2 md:mb-0 mr-2 md:mr-4 font-semibold`}
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
