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
	$: days =
		startRangeOfMC &&
		Array(7)
			.fill(null)
			.map((_, i) => addDays(startRangeOfMC, i));
</script>

{#if days?.length === 7 && startRangeOfMC && differenceInMonths(new Date(), startRangeOfMC) === 0}
	<div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col mb-2 sm:mb-4">
		<div class="flex flex-row flex-1">
			{#each days as day, k}
				{@const isToday =
					differenceInDays(new Date(), day) === 0 && getDate(new Date()) === getDate(day)}
				<button
					class="btn flex flex-col flex-1 items-center"
					class:gray={!isToday}
					class:primary={isToday}
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

		{#if startRangeOfMC}
			{@const diff = differenceInDays(new Date(), startRangeOfMC) + 1}
			<div class="bg-rose-200 rounded p-2 sm:p-4 flex flex-row mt-2 sm:mt-4 items-center">
				{#if diff <= 7}
					<h5 class="font-sans font-semibold text-xs sm:text-lg">Period in.</h5>
				{/if}
				<h3 class="font-sans font-semibold text-lg sm:text-4xl ml-2 sm:ml-4">
					{diff}
					{diff > 1 ? 'Days' : 'Day'}
				</h3>
				{#if diff > 7}
					<h5 class="font-sans font-semibold text-xs sm:text-lg ml-2 sm:ml-4">Past from Period.</h5>
				{/if}
				<h5
					class="rounded font-sans font-semibold text-xs sm:text-lg p-2 sm:p-2 ml-2 sm:ml-4"
					class:bg-red-500={diff <= 7}
					class:bg-green-400={diff > 7}
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
