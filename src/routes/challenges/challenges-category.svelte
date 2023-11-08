<script lang="ts">
	import { user } from '$stores';

	export let value: any[] = [];
</script>

{#if value?.length}
	{@const challenegeType = value[0]?.type ?? ''}

	<!-- Challenges -->
	<div class="flex flex-col mb-2 md:mb-4">
		<h3 class="text-2xl font-semibold my-2 ml-2 md:my-4 md:ml-4">{challenegeType}</h3>
		<div class="flex flex-row overflow-x-scroll hide-scrollbar ml-2 md:ml-4">
			{#each value as challenge}
				<a
					class="flex flex-row items-start transition-colors rounded relative p-2 sm:p-4
					min-w-max mr-2 sm:mr-4 cursor-pointer min-h-[180px]"
					class:bg-white={!($user?.challenges ?? []).includes(challenge.id)}
					class:bg-opacity-25={!($user?.challenges ?? []).includes(challenge.id)}
					class:hover:bg-black={!($user?.challenges ?? []).includes(challenge.id)}
					class:hover:bg-opacity-10={!($user?.challenges ?? []).includes(challenge.id)}
					class:bg-green-500={($user?.challenges ?? []).includes(challenge.id)}
					class:bg-opacity-40={($user?.challenges ?? []).includes(challenge.id)}
					class:hover:bg-green-600={($user?.challenges ?? []).includes(challenge.id)}
					class:hover:bg-opacity-70={($user?.challenges ?? []).includes(challenge.id)}
					href={`/challenges/${challenge.id}`}
				>
					{#if ($user?.challenges ?? []).includes(challenge.id)}
						<i
							class="material-icons text-3xl text-gray-600 absolute top-2 sm:top-4 left-2 sm:left-4"
							>bookmark</i
						>
					{/if}
					<div
						class="bg-no-repeat bg-contain bg-center w-full max-w-[150px] h-full mr-2 md:mr-4"
						style:background-image={`url(${challenge.img ?? ''})`}
					/>
					<div class="flex flex-row flex-1 items-start mr-r md:mr-4 min-w-[150px] max-w-[350px]">
						<span class="font-sans font-semibold text-xl sm:text-lg">
							{challenge.value}
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}
