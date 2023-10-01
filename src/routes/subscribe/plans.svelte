<script lang="ts">
	import { plans, selectedProduct } from '$stores';
	import { Tabs } from '$components';

	let selectTabItem = 'monthly';
	let selectedPlan: any = null;
	const proceedToPayment = () => {
		selectedProduct.set(selectedPlan);
	};
	const colors = {
		beginner_monthly: 'bg-amber-200',
		professional_monthly: 'bg-emerald-200',
		enterprise_monthly: 'bg-blue-200',
		beginner_annually: 'bg-amber-300',
		professional_annually: 'bg-emerald-300',
		enterprise_annually: 'bg-blue-300'
	};
</script>

{#if $plans}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<Tabs items={Object.keys($plans)} bind:selected={selectTabItem} tab-items-class="justify-center">
		<svelte:fragment slot="content" let:selected={selectTabItem}>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
				{#each $plans[selectTabItem] as plan}
					{@const planKey = `${plan?.name}_${selectTabItem}`}
					{@const planColor = colors[planKey]}
					<div
						class={`
                            rounded p-2 sm:p-4 flex flex-col flex-1 ${planColor} transition-colors
                            border-4 relative cursor-pointer hover:border-purple-200
                            ${
															planKey === selectedPlan
																? ' !border-purple-400 after:content-[""] after:absolute after:inset-0 after:bg-purple-300 after:bg-opacity-50'
																: 'border-transparent'
														}
                        `}
						on:click={() => (selectedPlan = planKey)}
					>
						<div
							class={`
                                bg-[length:6.5rem] sm:bg-[length:10rem] bg-slate-700 bg-opacity-30 bg-no-repeat bg-center w-full h-[132px] sm:h-[218px] rounded relative
                                flex flex-row items-center justify-center overflow-hidden
                                ${planKey === selectedPlan ? ' animate-pulse' : ''}
                            `}
							style:background-image={`url(/img/plans/${plan?.name}.webp)`}
						>
							<div class={`absolute inset-0 ${planColor} bg-opacity-30`} />
							<div class="flex flex-col items-center z-10">
								<h3
									class="text-3xl lg:text-5xl font-semibold capitalize text-white bg-gray-600 bg-opacity-40 p-2 rounded mb-2 sm:mb-4"
								>
									{plan?.name}
								</h3>
								<h4
									class={`text-2xl lg:text-3xl font-semibold capitalize rounded p-1 sm:p-2 ${planColor} bg-opacity-90 text-black`}
								>
									${plan?.price}
								</h4>
							</div>
						</div>
						<ul class="mt-2 sm:mt-4">
							{#each plan?.features ?? [] as feature, k}
								<li
									class="
                                        bg-gray-200 bg-opacity-20 hover:bg-gray-200
                                        hover:bg-opacity-50 p-2 rounded transition-all ease-in-out
                                    "
									class:mb-2={k < plan.features.length - 1}
									class:sm:mb-4={k < plan.features.length - 1}
								>
									<span class="text-black text-base lg:text-xl font-medium">{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</svelte:fragment>
	</Tabs>
	{#if selectedPlan}
		<div class="flex flex-col items-center">
			<button
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center mt-2 sm:mt-4 w-full sm:w-auto px-8"
				on:click={proceedToPayment}
			>
				Proceed To Payment
			</button>
		</div>
	{/if}
{/if}
