<script lang="ts">
	import { users_challenges } from '$firebase';
	import { challenges, user } from '$stores';
	import { twMerge } from 'tailwind-merge';

	let userChallenges: any[] = [];
	user.subscribe(async (v: any) => {
		if (!v) return;
		userChallenges = await users_challenges.getUserActiveChallenges({
			user_id: v.uid,
		});
	});
</script>

<div class="flex flex-col px-4">
	<div class="flex flex-col bg-zinc-950/10 rounded-lg relative overflow-hidden">
		{#if Object.keys($challenges ?? {})?.length}
			{@const challengesKeys = Object.keys($challenges ?? {})}

			{#each challengesKeys as challengeKey}
				{@const value = $challenges[challengeKey].map((i) => ({ key: challengeKey, ...i }))}
				{@const challenegeType = value[0]?.type ?? ''}

				<!-- Challenges -->
				<div class="flex flex-col mb-4">
					<h3 class="text-2xl font-semibold my-4 ml-4">{challenegeType}</h3>
					<div class="flex flex-row overflow-x-scroll hide-scrollbar ml-4">
						{#each value as challenge}
							<a
								class={twMerge(
									`flex flex-row items-start transition-colors rounded-lg relative p-4
										min-w-max mr-4 cursor-pointer h-[180px] sm:h-[212px]`,
									userChallenges.includes(challenge.id)
										? 'bg-green-500 bg-opacity-40 hover:bg-green-600 hover:bg-opacity-70'
										: 'bg-zinc-950/10 hover:bg-zinc-950/20',
								)}
								href={`/challenges/${challenge.id}`}
							>
								{#if userChallenges.includes(challenge.id)}
									<i
										class="material-icons text-3xl text-gray-600 absolute top-4 left-4"
										>bookmark</i
									>
								{/if}
								<!-- svelte-ignore a11y-missing-attribute -->
								<img
									class="max-h-[120px] sm:max-w-[140px] drag-none mr-4"
									src={challenge.img}
								/>
								<div
									class="flex flex-row flex-1 items-start mr-4
										min-w-[90px] max-w-[170px] sm:min-w-[150px] sm:max-w-[270px]">
									<span class="font-sans font-semibold text-base sm:text-lg">
										{challenge.value}
									</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
