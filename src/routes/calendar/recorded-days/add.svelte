<script lang="ts">
	import { Modal } from '$components';
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
		medications,
    };
    let show = false;
	let logType: string|null = null;
    let logTypeValue: string|null = null;
    let logTypeIntensity: number = 0;
    const logTypeChanged = () => {
        logTypeValue = null;
        logTypeIntensity = 0;
    };
    const saveLog = async () => {
        // send req
        show = false;
        logType = null;
    };
</script>

<Modal bind:show={show}>
	<svelte:fragment slot="trigger">How are you feeling?</svelte:fragment>

	<svelte:fragment slot="content">
		<!-- log type -->
		<div class="input-group">
			<label for="log_type">Log Type:</label>
			<select
                bind:value={logType}
                name="log_type"
                id="log_type"
                on:change={logTypeChanged}
            >
				{#each Object.keys(logTypes) as i}
					<option value={i}>
						{i.replace(/_/gi, ' ')}
					</option>
				{/each}
			</select>
		</div>

        {#if logType !== null}
            {@const strippedLogType = logType.replace(/_/gi, ' ')}

            <!-- log types with predefined types -->
            {#if [
                'feelings', 'symptoms', 'vaginal_discharge', 'misc',
                'bleeding_type', 'blood_color', 'pregnancy_test', 'sex_situation',
            ].includes(logType)}
                <!-- {logType} type -->
                <div class="input-group mt-1 sm:mt-2">
                    <label for="log_type_value">{strippedLogType} Type:</label>
                    <select bind:value={logTypeValue} name="log_type_value" id="log_type_value">
                        {#each logTypes[logType] as i}
                            <option value={i}>
                                {i.replace(/_/gi, ' ')}
                            </option>
                        {/each}
                    </select>
                </div>

                {#if [
                    'feelings', 'symptoms', 'vaginal_discharge', 'misc',
                ].includes(logType)}
                    <div class="input-group mt-1 sm:mt-2">
                        <label for="log_type_intensity">{strippedLogType} Intensity:</label>
                        <input
                            bind:value={logTypeIntensity}
                            type="range"
                            id="log_type_intensity"
                            name="log_type_intensity"
                            min="0"
                            max="10"
                        >
                    </div>
                {/if}
            {/if}

            <!-- log types with only intensity -->
            {#if [
                'bleeding_amount',
            ].includes(logType)}
                <div class="input-group mt-1 sm:mt-2">
                    <label for="log_type_intensity">{strippedLogType} Intensity:</label>
                    <input
                        bind:value={logTypeIntensity}
                        type="range"
                        id="log_type_intensity"
                        name="log_type_intensity"
                        min="0"
                        max="10"
                    >
                </div>
            {/if}

            <!-- log types with only description -->
            {#if [
                'medications',
            ].includes(logType)}
                <div class="input-group mt-1 sm:mt-2">
                    <label for="log_type_intensity">{strippedLogType} Intensity:</label>
                    <textarea
                        bind:value={logTypeValue}
                    />
                </div>
            {/if}
        {/if}
	</svelte:fragment>

    <svelte:fragment slot="footer">
        <div class="flex flex-row flex-1 justify-end">
            <button
                class="btn black justify-center flex-1 sm:flex-none"
                on:click={saveLog}
            >
                Save
            </button>
        </div>
    </svelte:fragment>
</Modal>
