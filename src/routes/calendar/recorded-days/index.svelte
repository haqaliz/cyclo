<script lang="ts">
    import Add from './add.svelte';
    export let recordedDays: any[] = [];
</script>

{#if recordedDays?.length}
    {#each recordedDays as recordedDay}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-2 sm:mb-4">
            <!-- Feelings -->
            {#if recordedDay?.feelings?.length}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
                    <h3 class="font-sans font-semibold text-xl">Feelings:</h3>
                    <div class="grid grid-cols-1 gap-2">
                        {#each recordedDay.feelings as feeling}
                            <div class="flex flex-row font-sans items-center">
                                <strong class="capitalize mr-1">{feeling.value}:</strong>
                                <span class="bg-gray-300 rounded p-1">{feeling.intensity}/10</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
            <!-- Symptoms -->
            {#if recordedDay?.symptoms?.length}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
                    <h3 class="font-sans font-semibold text-xl">Symptoms:</h3>
                    <div class="grid grid-cols-1 gap-2">
                        {#each recordedDay.symptoms as symptom}
                            <div class="flex flex-row font-sans items-center">
                                <strong class="capitalize mr-1">{symptom.value}:</strong>
                                <span class="bg-gray-300 rounded p-1">{symptom.intensity}/10</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
            <!-- Vaginal Discharge -->
            {#if recordedDay?.vaginal_discharge?.length}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
                    <h3 class="font-sans font-semibold text-xl">Vaginal Discharge:</h3>
                    <div class="grid grid-cols-1 gap-2">
                        {#each recordedDay.vaginal_discharge as vd}
                            <div class="flex flex-row font-sans items-center">
                                <strong class="capitalize mr-1">{vd.value}:</strong>
                                <span class="bg-gray-300 rounded p-1">{vd.intensity}/10</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
            <!-- Misc -->
            {#if recordedDay?.misc?.length}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-col">
                    <h3 class="font-sans font-semibold text-xl">Misc:</h3>
                    <div class="grid grid-cols-1 gap-2">
                        {#each recordedDay.misc as m}
                            <div class="flex flex-row font-sans items-center">
                                <strong class="capitalize mr-1">{m.value}:</strong>
                                <span class="bg-gray-300 rounded p-1">{m.intensity}/10</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
            <!-- Bleeding Amount -->
            {#if recordedDay?.bleeding_amount !== null}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-row font-sans items-center">
                    <strong class="capitalize mr-1">Bleeding Amount:</strong>
                    <span class="bg-gray-300 rounded p-1">{recordedDay?.bleeding_amount}/10</span>
                </div>
            {/if}
            <!-- Bleeding Type -->
            {#if recordedDay?.bleeding_type !== null}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-row font-sans items-center">
                    <strong class="capitalize mr-1">Bleeding Type:</strong>
                    <span class="bg-gray-300 rounded p-1 capitalize">{recordedDay?.bleeding_type}</span>
                </div>
            {/if}
            <!-- Blood Color -->
            {#if recordedDay?.blood_color !== null}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-row font-sans items-center">
                    <strong class="capitalize mr-1">Blood Color:</strong>
                    <span class="bg-gray-300 rounded p-1 capitalize">{recordedDay?.blood_color}</span>
                </div>
            {/if}
            <!-- Pregnancy Test -->
            {#if recordedDay?.pregnancy_test !== null}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-row font-sans items-center">
                    <strong class="capitalize mr-1">Pregnancy Test:</strong>
                    <span class="bg-gray-300 rounded p-1 capitalize">{recordedDay?.pregnancy_test}</span>
                </div>
            {/if}
            <!-- Sex Situation -->
            {#if recordedDay?.sex_situation !== null}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-row font-sans items-center">
                    <strong class="capitalize mr-1">Sex Situation:</strong>
                    <span class="bg-gray-300 rounded p-1 capitalize">{recordedDay?.sex_situation}</span>
                </div>
            {/if}
            <!-- Medications -->
            {#if recordedDay?.medications !== null}
                <div class="bg-gray-100 rounded p-2 sm:p-4 flex flex-row font-sans items-center">
                    <strong class="capitalize mr-1">Medications:</strong>
                    <span class="bg-gray-300 rounded p-1 capitalize">{recordedDay?.medications}</span>
                </div>
            {/if}
        </div>
    {/each}
{/if}

<Add />