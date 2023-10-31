<script lang="ts">
	import { user } from '$stores';

	export let value: any[] = [];
	user.subscribe((v: any) => {
		if (!v) return;
		// value.tampon = v?.metadata?.prefs?.menstruation_products?.tampon;
		// value.pad = v?.metadata?.prefs?.menstruation_products?.pad;
		// value.cup = v?.metadata?.prefs?.menstruation_products?.cup;
		// value.brands = v?.metadata?.prefs?.menstruation_products?.brands;
	});
</script>

{#if value?.length}
	{@const challenegeType = value[0]?.type ?? ''}

	<!-- Challenges -->
	<div class="flex flex-col mb-2 md:mb-4">
		<h3 class="text-2xl font-semibold my-2 ml-2 md:my-4 md:ml-4">{challenegeType}</h3>
		<div class="flex flex-row overflow-x-scroll hide-scrollbar ml-2 md:ml-4">
			{#each value as challenge}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="flex flex-row items-start transition-colors rounded p-2 sm:p-4
					min-w-max mr-2 sm:mr-4 cursor-pointer
					min-h-[180px] sm:min-h-[120px] bg-white bg-opacity-25 hover:bg-black hover:bg-opacity-10"
				>
					<div
						class="bg-no-repeat bg-contain bg-center w-full max-w-[150px] h-full mr-2 md:mr-4"
						style:background-image={`url(${challenge.img ?? ''})`}
					/>
					<div class="flex flex-row flex-1 items-start mr-r md:mr-4 min-w-[150px] max-w-[350px]">
						<span class="font-sans font-semibold text-xl sm:text-lg">
							{challenge.value}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
