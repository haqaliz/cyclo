<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Modal, Input } from '$components';
	import { user } from '$stores';
	import { recorded_days } from '$firebase';
	const dispatch = createEventDispatcher();
	const feelings = [
		'calm',
		'happy',
		'energetic',
		'frisky',
		'mood swings',
		'irritated',
		'sad',
		'anxious',
		'depressed',
		'feeling guilty',
		'obsessive thoughts',
		'apathetic',
		'confused',
		'very self-critical'
	];
	const symptoms = [
		'bloating',
		'cramps',
		'tender breasts',
		'headache',
		'acne',
		'backache',
		'fatigue',
		'cravings',
		'insomnia',
		'abdominal pain',
		'nausea',
		'constipation',
		'diarrhea'
	];
	const vaginal_discharge = ['creamy', 'watery', 'sticky', 'egg white', 'spotting', 'unusual'];
	const misc = [
		'travel',
		'stress',
		'disease or injury',
		'alcohol',
		'yoga',
		'gym',
		'aerobics & dancing',
		'swimming',
		'team sports',
		'running',
		'cycling'
	];
	const bleeding_amount = null;
	const bleeding_type = ['clots', 'watery flow'];
	const blood_color = ['dark brown', 'bright red'];
	const pregnancy_test = ['negative', 'positive', 'faint line'];
	const sex_situation = ['unprotected sex', 'protected sex', 'masturbation', 'high sex drive'];
	const medications = null;
	const logTypes: any = {
		feelings,
		symptoms,
		vaginal_discharge,
		misc,
		bleeding_amount,
		bleeding_type,
		blood_color,
		pregnancy_test,
		sex_situation,
		medications
	};
	let show = false;
	let logType: string | null = null;
	let logTypeValue: string | null = null;
	let logTypeIntensity = 0;
	export let selectedDay: Date;
	export let recordedDay: any;
	$: isSaveDisabled = ((): boolean => {
		if (!$user) return true;
		if (!logType) return true;
		if (
			['feelings', 'symptoms', 'vaginal_discharge', 'misc'].includes(logType) &&
			(!logTypeValue || !logTypeIntensity)
		)
			return true;
		if (
			['bleeding_type', 'blood_color', 'pregnancy_test', 'sex_situation', 'medications'].includes(
				logType
			) &&
			!logTypeValue
		)
			return true;
		if (['bleeding_amount'].includes(logType) && !logTypeIntensity) return true;
		return false;
	})();
	const logTypeChanged = () => {
		logTypeValue = null;
		logTypeIntensity = 0;
	};
	const saveLog = async () => {
		if (!$user) return;
		let payload: any = {
			user_id: $user.uid,
		};
		if (!recordedDay) {
			payload.created_at = selectedDay;
			if (['feelings', 'symptoms', 'vaginal_discharge', 'misc'].includes(logType)) {
				payload[logType] = [
					{
						value: logTypeValue,
						intensity: logTypeIntensity
					}
				];
			} else if (
				['bleeding_type', 'blood_color', 'pregnancy_test', 'sex_situation', 'medications'].includes(
					logType
				)
			) {
				payload[logType] = logTypeValue;
			} else if (['bleeding_amount'].includes(logType)) {
				payload[logType] = logTypeIntensity;
			}
			await recorded_days.addRecordedDayForUser(payload);
		} else {
			for (const key of Object.keys(recordedDay)) {
				if (!recordedDay[key] || key === 'created_at' || key === 'updated_at') continue;
				if (key === 'id') {
					payload.recorded_day_id = recordedDay[key] || recordedDay?.id;
					continue;
				}
				payload[key] = recordedDay[key];
			}
			if (['feelings', 'symptoms', 'vaginal_discharge', 'misc'].includes(logType)) {
				if (!payload[logType]) {
					payload[logType] = [
						{
							value: logTypeValue,
							intensity: logTypeIntensity
						}
					];
				} else {
					// remove old value if exist
					payload[logType] = payload[logType].filter((i: any) => i.value !== logTypeValue);
					// add new value
					payload[logType].push({
						value: logTypeValue,
						intensity: logTypeIntensity
					});
				}
			} else if (
				['bleeding_type', 'blood_color', 'pregnancy_test', 'sex_situation', 'medications'].includes(
					logType
				)
			) {
				payload[logType] = logTypeValue;
			} else if (['bleeding_amount'].includes(logType)) {
				payload[logType] = logTypeIntensity;
			}
			await recorded_days.updateRecordedDayForUser(payload);
		}
		show = false;
		logType = null;
		dispatch('update');
	};
</script>

<Button on:click={() => {
	show = true;
}}>How are you feeling?</Button>
<Modal bind:show>
	<!-- log type -->
	<div class="flex flex-col">
		<label
			for="log_type"
			class="font-sans font-semibold text-xl mb-1 sm:mb-2 capitalize text-zinc-50"
		>Log Type:</label>
		<select
			bind:value={logType}
			name="log_type"
			id="log_type"
			on:change={logTypeChanged}
			class="bg-zinc-950/10 p-2 rounded-lg font-sans font-medium text-lg border-2 capitalize"
		>
			{#each Object.keys(logTypes) as i}
				<option value={i} class="font-sans font-medium text-lg capitalize">
					{i.replace(/_/gi, ' ')}
				</option>
			{/each}
		</select>
	</div>

	{#if logType !== null}
		{@const strippedLogType = logType.replace(/_/gi, ' ')}

		<!-- log types with predefined types -->
		{#if ['feelings', 'symptoms', 'vaginal_discharge', 'misc', 'bleeding_type', 'blood_color', 'pregnancy_test', 'sex_situation'].includes(logType)}
			<!-- {logType} type -->
			<div class="flex flex-col mt-1 sm:mt-2">
				<label
					for="log_type_value"
					class="font-sans font-semibold text-xl mb-1 sm:mb-2 capitalize text-zinc-50"
				>{strippedLogType} Type:</label>
				<select
					bind:value={logTypeValue}
					name="log_type_value"
					id="log_type_value"
					class="bg-zinc-950/10 p-2 rounded-lg font-sans font-medium text-lg border-2 capitalize"
				>
					{#each logTypes[logType] as i}
						<option value={i} class="font-sans font-medium text-lg capitalize">
							{i.replace(/_/gi, ' ')}
						</option>
					{/each}
				</select>
			</div>

			{#if ['feelings', 'symptoms', 'vaginal_discharge', 'misc'].includes(logType)}
				<div class="flex flex-col mt-1 sm:mt-2">
					<label
						for="log_type_intensity"
						class="font-sans font-semibold text-xl mb-1 sm:mb-2 capitalize text-zinc-50"
					>
						{strippedLogType} Intensity:
					</label>
					<div class="flex flex-row items-center">
						<input
							bind:value={logTypeIntensity}
							type="range"
							id="log_type_intensity"
							name="log_type_intensity"
							min="0"
							max="10"
							class="p-2 rounded-lg font-sans font-medium text-lg border-2 resize-none flex-1"
						/>
						<span class="bg-gray-300 rounded-lg px-1 sm:px-2 ml-1 font-sans font-semibold text-l"
							>{logTypeIntensity}</span
						>
					</div>
				</div>
			{/if}
		{/if}

		<!-- log types with only intensity -->
		{#if ['bleeding_amount'].includes(logType)}
			<div class="flex flex-col mt-1 sm:mt-2">
				<label
					for="log_type_intensity"
					class="font-sans font-semibold text-xl mb-1 sm:mb-2 capitalize text-zinc-50"
				>{strippedLogType} Intensity:</label>
				<div class="flex flex-row items-center">
					<input
						bind:value={logTypeIntensity}
						type="range"
						id="log_type_intensity"
						name="log_type_intensity"
						min="0"
						max="10"
						class="p-2 rounded-lg font-sans font-medium text-lg border-2 resize-none flex-1"
					/>
					<span class="bg-gray-300 rounded-lg px-1 sm:px-2 ml-1 font-sans font-semibold text-l"
						>{logTypeIntensity}</span
					>
				</div>
			</div>
		{/if}

		<!-- log types with only description -->
		{#if ['medications'].includes(logType)}
			<div class="flex flex-col mt-1 sm:mt-2">
				<label
					for="log_type_intensity"
					class="font-sans font-semibold text-xl mb-1 sm:mb-2 capitalize text-zinc-50"
				>{strippedLogType} Intensity:</label>
				<Input bind:value={logTypeValue} type="textarea" />
			</div>
		{/if}
	{/if}

	<div class="flex-1" />

	<div class="flex flex-row mt-4 justify-end">
		<Button disabled={isSaveDisabled} on:click={saveLog}>Save</Button>
	</div>
</Modal>
