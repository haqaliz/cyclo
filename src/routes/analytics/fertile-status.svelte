<script lang="ts">
	import {
		addDays,
		startOfDay,
		differenceInMonths,
		differenceInDays,
		getDate,
		format
	} from 'date-fns';
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
	<div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col mb-2 sm:mb-4">
		<div class="flex flex-row flex-1 overflow-x-scroll hide-scrollbar">
			{#each days as day, k}
				{@const isToday =
					differenceInDays(new Date(), day) === 0 && getDate(new Date()) === getDate(day)}
				<button
					class={`p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
						focus:ring-opacity-75 ease-in-out duration-300 flex flex-col flex-1 items-center
						${
							isToday
								? 'bg-purple-400 text-black hover:bg-purple-800 focus:ring-purple-400'
								: 'bg-gray-200 text-black hover:bg-gray-400 focus:ring-gray-300'
						}`}
					class:mr-2={days.length - 1 !== k}
					class:sm:mr-4={days.length - 1 !== k}
				>
					<div class={`flex flex-row ${isToday ? 'mr-[-0.375rem]' : ''}`}>
						<span class="font-sans font-semibold text-2xl">{k + 1}</span>
						{#if isToday}
							<!-- Desktop -->
							<div
								class="hidden sm:flex bg-red-600 p-1 text-xs font-medium h-6 box-border rounded ml-2"
							>
								{format(day, 'dd LLL')}
							</div>
							<!-- Mobile -->
							<div class="flex sm:hidden bg-red-600 rounded-full w-1.5 h-1.5" />
						{/if}
					</div>
					{#if day.getTime() <= Date.now()}
						<div class="bg-purple-300 rounded w-8 h-1.5" />
					{/if}
				</button>
			{/each}
		</div>

		{#if startFertileWindow}
			{@const diff = differenceInDays(new Date(), startFertileWindow) + 1}
			{@const mcDiff = differenceInDays(new Date(), startRangeOfMC)}
			<div
				class="bg-teal-200 h-[46px] sm:h-[76px] transition-all ease-in-out duration-300 rounded p-2 sm:p-4 flex flex-row mt-2 sm:mt-4 items-center"
			>
				{#if mcDiff >= menstrualCycleLength + gapBetweenMCandFW && mcDiff <= menstrualCycleLength + gapBetweenMCandFW + 6}
					<h5 class="font-sans font-semibold text-xs sm:text-lg">Fertility in.</h5>
					<h3 class="font-sans font-semibold text-lg sm:text-4xl ml-2 sm:ml-4">
						{diff}
						{diff > 1 ? 'Days' : 'Day'}
					</h3>
					{#if diff > 4}
						<h5 class="font-sans font-semibold text-xs sm:text-lg ml-2 sm:ml-4">
							Past from Start of Fertility.
						</h5>
					{/if}
					<h5
						class="rounded font-sans font-semibold bg-green-400 text-xs sm:text-lg p-2 ml-2 sm:ml-4"
					>
						{#if diff <= 3}
							Most Fertile Days
						{:else if diff === 4}
							Ovulation Day
						{:else}
							Could Still be Fertile After Ovulation
						{/if}
					</h5>
				{:else if mcDiff < menstrualCycleLength + gapBetweenMCandFW}
					<h5 class="font-sans font-semibold text-xs sm:text-lg">
						Fertility window hasn't started yet.
					</h5>
				{:else if mcDiff > menstrualCycleLength + gapBetweenMCandFW + 6}
					<h5 class="font-sans font-semibold text-xs sm:text-lg">Fertility window has ended.</h5>
				{/if}
			</div>
		{/if}
	</div>
{/if}
