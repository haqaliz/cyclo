<script lang="ts">
	import {
		addDays,
		startOfDay,
		differenceInMonths,
		differenceInDays,
		getDate,
		format
	} from 'date-fns';
	import { twMerge } from 'tailwind-merge';
	export let latestMenstrualCycleStart: any;
	$: startRangeOfMC =
		latestMenstrualCycleStart &&
		startOfDay(new Date(latestMenstrualCycleStart?.created_at?.seconds * 1000));
	$: days =
		startRangeOfMC &&
		Array(7)
			.fill(null)
			.map((_, i) => addDays(startRangeOfMC, i));
</script>

{#if days?.length === 7 && startRangeOfMC && differenceInMonths(new Date(), startRangeOfMC) === 0}
	<div class="bg-zinc-950/10 rounded-lg p-4 flex flex-col">
		<div class="flex flex-row flex-1 overflow-x-scroll hide-scrollbar">
			{#each days as day, k}
				{@const isToday =
					differenceInDays(new Date(), day) === 0 && getDate(new Date()) === getDate(day)}
				<div
					class={twMerge(
						`p-2 rounded-lg font-sans font-medium text-lg focus:outline-none focus:ring-2 min-w-[54px]
						focus:ring-opacity-75 ease-in-out duration-300 flex flex-col flex-1 items-center`,
						isToday
							? 'bg-zinc-950/40 text-zinc-950'
							: 'bg-zinc-950/10 text-zinc-950',
						days.length - 1 !== k ? 'mr-4' : '',
					)}
				>
					<div
						class={twMerge(
							'flex flex-row',
							isToday ? 'mr-[-0.375rem]' : '',
						)}
					>
						<span class="font-sans font-semibold text-2xl">{k + 1}</span>
						{#if isToday}
							<!-- Desktop -->
							<div
								class="hidden sm:flex bg-red-600 p-1 text-xs font-medium h-6 box-border rounded-lg ml-2"
							>
								{format(day, 'dd LLL')}
							</div>
							<!-- Mobile -->
							<div class="flex sm:hidden bg-red-600 rounded-full w-1.5 h-1.5" />
						{/if}
					</div>
					{#if day.getTime() <= Date.now()}
						<div class="bg-zinc-950/50 rounded-lg w-8 h-1.5" />
					{/if}
				</div>
			{/each}
		</div>

		{#if startRangeOfMC}
			{@const diff = differenceInDays(new Date(), startRangeOfMC) + 1}
			<div
				class="bg-rose-200 min-h-[46px] sm:h-[76px] transition-all ease-in-out duration-300 rounded-lg
				p-4 flex flex-col sm:flex-row mt-4 sm:items-center"
			>
				{#if diff <= 7}
					<h5 class="font-sans font-semibold text-lg">Period in.</h5>
				{/if}
				<h3 class="font-sans font-semibold text-4xl sm:ml-4">
					{diff}
					{diff > 1 ? 'Days' : 'Day'}
				</h3>
				{#if diff > 7}
					<h5 class="font-sans font-semibold text-lg sm:ml-4">Past from Period.</h5>
				{/if}
				<h5
					class={
						twMerge(
							'rounded-lg font-sans font-semibold text-lg p-3 mt-4 sm:mt-0 sm:ml-4',
							diff > 7 ? 'bg-green-400' : 'bg-red-500',
						)
					}
				>
					{#if diff <= 7}
						Lower chance to get pregnant
					{:else}
						More chance to get pregnant
					{/if}
				</h5>
			</div>
		{/if}
	</div>
{/if}
