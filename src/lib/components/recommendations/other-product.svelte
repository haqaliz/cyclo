<script lang="ts">
	import { Modal, Progress } from '$components';
	import { recommendations } from '$stores';
	import { slide } from 'svelte/transition';

	let otherProduct: any;
	let otherProductColor = 'bg-purple-200';
	let loading = true;
	recommendations.subscribe((v: any) => {
		if (!v?.other_products) return;
		loading = false;
		// Menstruation Product Index
		const OPI = Math.floor(Math.random() * v?.other_products.length) + 0;
		otherProduct = v?.other_products?.[OPI];
		otherProductColor = {
			vibrator: 'bg-sky-200 hover:bg-sky-300 transition-colors ease-in-out'
		}[otherProduct?.type];
	});
	let modal: any = {
		show: false,
		title: '',
		content: ''
	};
	const showFeature = (v: any) => {
		modal.title = v?.title;
		modal.content = v?.content;
		modal.show = true;
	};
</script>

{#if loading}
	<div
		in:slide
		out:slide
		class={`flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
			bg-gray-100 hover:bg-gray-200 overflow-hidden mb-2 md:mb-4 last:mb-0 animate-pulse
			min-h-[272px] ${$$restProps['class'] ?? ''}`}
	>
		<div
			class={`
				group/img flex flex-col relative items-center bg-black bg-opacity-10 p-4 overflow-hidden
				rounded mr-2 sm:mr-4 mb-2 sm:mb-0 w-full md:min-w-[240px] md:w-[240px] min-h-[240px] h-[240px]
			`}
		/>
	</div>
{/if}

{#if otherProduct}
	<div
		in:slide
		out:slide
		class={`flex flex-col sm:flex-row items-start transition-colors rounded p-2 sm:p-4
            min-w-[280px] sm:min-w-[250px] min-h-[180px] sm:min-h-[120px]
            bg-gray-100 hover:bg-gray-200
			`}
	>
		<div
			class={`
				group/img flex flex-col relative items-center ${otherProductColor} p-4 overflow-hidden
				rounded mr-2 sm:mr-4 mb-2 sm:mb-0 w-full md:min-w-[240px] md:w-[240px] min-h-[240px] h-[240px]
			`}
		>
			<div
				class="
					bg-no-repeat relative bg-cover bg-center rounded w-full h-full
				"
				style:background-image={`url(${otherProduct?.img ?? ''})`}
			/>
			<div
				class={`
					flex flex-row opacity-0 group-hover/img:opacity-100
					absolute p-2 rounded-br font-semibold capitalize
					transition-opacity ease-in-out duration-300
					text-2xl left-4 top-4 ${otherProductColor}
				`}
			>
				{otherProduct.type}
			</div>
		</div>
		<div class="flex flex-col items-start">
			<div class="flex flex-col sm:flex-row w-full sm:w-auto items-start mb-2 sm:mb-0">
				<h3
					class={`font-semibold w-full sm:w-auto text-3xl ${otherProductColor} p-2 sm:p-4 rounded mb-2 sm:mb-4 mr-2 sm:mr-4`}
				>
					<span class="text-4xl capitalize">
						{otherProduct.brand}{otherProduct.name?.length ? ': ' : ''}
					</span>
					{#if otherProduct.name?.length}
						<span>{otherProduct.name}</span>
					{/if}
				</h3>
				<h3
					class={`font-semibold w-full sm:w-auto text-3xl ${otherProductColor} p-2 sm:p-4 rounded mb-2 sm:mb-4 mr-2 sm:mr-4`}
				>
					<span>{{
						usd: '$',
						gbp: '£',
						eur: '€'
					}[otherProduct?.price?.currency]}</span>
					<span>{otherProduct?.price?.value}</span>
				</h3>
				<a
					class="p-2 sm:p-4 w-full sm:w-auto rounded font-sans font-medium focus:outline-none focus:ring-2
                    focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center
                    bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center
                    "
					href={otherProduct?.url}
				>
					<i class="material-icons text-3xl">shopping_cart</i>
				</a>
			</div>
			{#if otherProduct?.features?.length}
				<div class="flex flex-row flex-wrap">
					{#each otherProduct?.features as feature}
						<button
							class={`flex flex-col ${otherProductColor} rounded p-2 sm:p-4 mb-2 sm:mb-4 mr-2 sm:mr-4 font-semibold`}
							on:click={() => showFeature(feature)}
						>
							{feature?.title}
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
