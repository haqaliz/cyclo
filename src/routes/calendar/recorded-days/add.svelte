<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Dialog, Input, Label, Combobox, Slider, Badge } from '$components';
	import { user } from '$stores';
	import { recorded_days } from '$firebase';
	import { buttonVariants } from '$components/ui/button';
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
	let logTypeIntensitySlider = [0];
	$: logTypeIntensity = logTypeIntensitySlider[0];
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
			user_id: $user.uid
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

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		How are you feeling?
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<!-- log type -->
		<div class="flex flex-col">
			<Label for="log_type" class="mb-2">Log Type:</Label>
			<Combobox
				bind:value={logType}
				id="log_type"
				options={Object.keys(logTypes).map((i) => ({
					value: i,
					label: i.replace(/_/gi, ' '),
				}))}
				content-class="max-w-[375px]"
			/>
		</div>

		{#if logType !== null}
			{@const strippedLogType = logType.replace(/_/gi, ' ')}

			<!-- log types with predefined types -->
			{#if ['feelings', 'symptoms', 'vaginal_discharge', 'misc', 'bleeding_type', 'blood_color', 'pregnancy_test', 'sex_situation'].includes(logType)}
				<!-- {logType} type -->
				<div class="flex flex-col mt-2">
					<Label for="log_type_value" class="mb-2">{strippedLogType} Type:</Label>
					<Combobox
						bind:value={logTypeValue}
						id="log_type_value"
						options={logTypes[logType].map((i) => ({
							value: i,
							label: i.replace(/_/gi, ' '),
						}))}
						content-class="max-w-[375px]"
					/>
				</div>

				{#if ['feelings', 'symptoms', 'vaginal_discharge', 'misc'].includes(logType)}
					<div class="flex flex-col mt-2">
						<Label for="log_type_intensity" class="mb-2">{strippedLogType} Intensity:</Label>
						<div class="flex flex-row items-center">
							<Slider
								bind:value={logTypeIntensitySlider}
								id="log_type_intensity"
								min={0}
								max={10}
							/>
							<Badge class="ml-4">{logTypeIntensity}</Badge>
						</div>
					</div>
				{/if}
			{/if}

			<!-- log types with only intensity -->
			{#if ['bleeding_amount'].includes(logType)}
				<div class="flex flex-col mt-2">
					<Label for="log_type_intensity" class="mb-2">{strippedLogType} Intensity:</Label>
					<div class="flex flex-row items-center">
						<Slider
							bind:value={logTypeIntensitySlider}
							id="log_type_intensity"
							min={0}
							max={10}
						/>
						<Badge class="ml-4">{logTypeIntensity}</Badge>
					</div>
				</div>
			{/if}

			<!-- log types with only description -->
			{#if ['medications'].includes(logType)}
				<div class="flex flex-col mt-2">
					<Label for="medications" class="mb-2">Medications:</Label>
					<Input id="medications" bind:value={logTypeValue} type="textarea" />
				</div>
			{/if}
		{/if}

		<Dialog.Footer>
			<Button disabled={isSaveDisabled} on:click={saveLog}>Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
