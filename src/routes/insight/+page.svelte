<script lang="ts">
	import { user } from '$stores';
	import topics from './topics';
</script>

<svelte:head>
	<title>Insight</title>
	<meta
		name="description"
		content="Explore valuable insights into menstrual health on our dedicated page. Your guide to well-being."
	/>
</svelte:head>

<div class="flex flex-col mb-2 sm:mb-4">
	{#if $user?.subscription}
		{#each topics as topic}
			{#if topic.permission ? topic.permission.includes($user.subscription?.key) : true}
				<h3 class="font-sans font-semibold text-3xl ml-2 sm:ml-4 mt-2 sm:mt-4">{topic?.name}</h3>
				<div class="flex flex-row mt-2 sm:mt-4 pl-2 sm:pl-4 overflow-x-scroll hide-scrollbar">
					{#each topic?.items ?? [] as item}
						{@const extraClasses = item?.classes ?? 'bg-gray-200 hover:bg-gray-300'}
						{#if (item.permission ?? []).includes($user.subscription?.key)}
							<a
								href={item?.link}
								class={`
                                    ${extraClasses} transition-colors rounded p-2 sm:p-4
                                    min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer
                                    min-h-[180px] sm:min-h-[120px]
                                `}
							>
								<span class="font-sans font-semibold text-xl sm:text-lg">
									{item?.name}
								</span>
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	{:else}
		<div class="flex flex-col items-center justify-center mt-2 sm:mt-4">
			<div
				class={`
                    bg-cover bg-no-repeat bg-center w-[256px] h-[264px] rounded relative
                    flex flex-row items-center justify-center overflow-hidden
                `}
				style:background-image="url(/img/misc/payment.webp)"
			/>
			<a
				href="/subscribe"
				class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
            focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center mt-2 sm:mt-4"
			>
				Subscribe To Access
			</a>
		</div>
	{/if}
</div>
