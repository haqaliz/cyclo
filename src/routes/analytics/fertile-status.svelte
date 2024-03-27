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
	const menstrualCycleLength = 7;
	const gapBetweenMCandFW = 4; // gap between end of menstrual cycle and start of fertile window
	$: startFertileWindow =
		startRangeOfMC && addDays(startRangeOfMC, menstrualCycleLength + gapBetweenMCandFW);
	$: days =
		startFertileWindow &&
		Array(6)
			.fill(null)
			.map((_, i) => addDays(startFertileWindow, i));
</script>

{#if days?.length === 6 && startFertileWindow && differenceInMonths(new Date(), startFertileWindow) === 0}
	<div class="bg-zinc-950/10 rounded-lg p-4 flex flex-col">
		<div class="flex flex-row flex-1 overflow-x-scroll hide-scrollbar">
			{#each days as day, k}
				{@const isToday =
					differenceInDays(new Date(), day) === 0 && getDate(new Date()) === getDate(day)}
				<div
					class={twMerge(
						`p-2 rounded-lg font-sans font-medium text-lg focus:outline-none focus:ring-2
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
						<div class="bg-purple-300 rounded-lg w-8 h-1.5" />
					{/if}
				</div>
			{/each}
		</div>

		{#if startFertileWindow}
			{@const diff = differenceInDays(new Date(), startFertileWindow) + 1}
			{@const mcDiff = differenceInDays(new Date(), startRangeOfMC)}
			<div
				class="bg-teal-200/50 min-h-[46px] sm:h-[76px] transition-all ease-in-out duration-300 rounded-lg
				p-4 flex flex-col sm:flex-row mt-4 sm:items-center"
			>
				{#if mcDiff >= menstrualCycleLength + gapBetweenMCandFW && mcDiff <= menstrualCycleLength + gapBetweenMCandFW + 6}
					<h5 class="font-sans font-semibold text-lg">Fertility in.</h5>
					<h3 class="font-sans font-semibold text-4xl sm:ml-4">
						{diff}
						{diff > 1 ? 'Days' : 'Day'}
					</h3>
					{#if diff > 4}
						<h5 class="font-sans font-semibold ml-4">
							Past from Start of Fertility.
						</h5>
					{/if}
					<h5 class="rounded-lg font-sans font-semibold bg-green-400/50 text-lg p-3 sm:ml-4">
						{#if diff <= 3}
							Most Fertile Days
						{:else if diff === 4}
							Ovulation Day
						{:else}
							Could Still be Fertile After Ovulation
						{/if}
					</h5>
				{:else if mcDiff < menstrualCycleLength + gapBetweenMCandFW}
					<div class="flex flex-col flex-1 justify-center">
						<h5 class="font-sans font-semibold text-lg">
							Fertility window hasn't started yet.
						</h5>
					</div>
				{:else if mcDiff > menstrualCycleLength + gapBetweenMCandFW + 6}
					<div class="flex flex-col flex-1 justify-center">
						<h5 class="font-sans font-semibold text-lg">Fertility window has ended.</h5>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
