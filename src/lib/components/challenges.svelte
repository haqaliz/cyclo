<script lang="ts">
	import { challenges as chlngs, user } from '$api';
	import { Progress, Modal, SmartTextarea } from '$components';
	import { slide } from 'svelte/transition';
	import { differenceInDays, startOfDay } from 'date-fns';

	let challenges: any;
	let loading = false;
	const update = async () => {
		loading = true;
		challenges = await chlngs.getAcceptedChallenges();
		loading = false;
	};
	$: (async () => {
		await update();
	})();

	let modal: any = {
		show: false,
		ref: null,
		title: '',
		content: '',
		loading: false
	};
	const showChallengeModal = (chlng: any) => {
		const chlngIndex = differenceInDays(new Date(), chlng.created_at.seconds * 1000);
		modal.ref = chlng;
		modal.title = `Day ${chlngIndex + 1}`;
		modal.content = chlng.content?.[chlngIndex]?.value ?? '';
		modal.show = true;
	};
	const updateChallenge = async () => {
		if (modal.loading) return;
		modal.loading = true;
		await user.updateChallenge({
			challenge_id: modal.ref?.challenge_id,
			content: modal.content
		});
		modal.loading = false;
		modal.ref = null;
		modal.title = '';
		modal.content = '';
		modal.show = false;
		await update();
	};
</script>

{#if loading}
	<div
		in:slide
		out:slide
		class="flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
			bg-gray-100 hover:bg-gray-200 overflow-hidden mb-2 md:mb-4 last:mb-0"
	>
		<Progress />
	</div>
{/if}

{#if challenges?.length}
	{#each challenges as chlng}
		{@const chlngIndex = differenceInDays(
			startOfDay(new Date()),
			startOfDay(new Date(chlng.created_at.seconds * 1000))
		)}
		{@const activeDay = chlngIndex + 1}
		<div
			in:slide
			out:slide
			class="flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded p-2 sm:p-4
				bg-gray-100 hover:bg-gray-200 overflow-hidden mb-2 md:mb-4 last:mb-0"
		>
			<div
				class="flex flex-row items-center bg-purple-100 p-2 md:p-4 rounded justify-center flex-1 w-full lg:max-w-[350px]"
			>
				<div
					class="bg-no-repeat bg-contain bg-center w-full h-full min-h-[250px]"
					style:background-image={`url(${chlng.challenge.img ?? ''})`}
				/>
			</div>
			<div class="flex flex-col flex-1 items-start mt-2 lg:mt-0 lg:ml-4">
				<span class="font-sans font-semibold text-2xl md:text-3xl mb-2 md:mb-4">
					{chlng.challenge.value}
				</span>
				<p class="flex-1 text-gray-700 text-lg mb-2 md:mb-4">
					{chlng.challenge.objective}
				</p>
				<button
					class="
						flex flex-row transition-colors ease-in-out rounded py-4 px-8
						font-semibold text-white bg-zinc-900 hover:bg-gray-700"
					on:click={() => showChallengeModal(chlng)}
				>
					{#if chlng.content?.[chlngIndex]}
						<i class="material-icons mr-2">check</i>
					{/if}
					Day {activeDay}
				</button>
			</div>
		</div>
	{/each}
	<Modal bind:show={modal.show} trigger={false} title={modal.title} containerClass="max-w-md">
		<svelte:fragment slot="content">
			<div class="flex flex-col bg-white flex-1 rounded relative">
				<SmartTextarea
					bind:value={modal.content}
					placeholder="Write&hellip;"
					minRows={12}
					maxRows={16}
					class="bg-gray-100 placeholder:text-gray-600 min-w-[320px]"
				/>
				<div class="flex flex-row items-end absolute right-2 md:right-4 bottom-2 md:bottom-4">
					<button
						class="px-8 py-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
						focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center mr-2 sm:mr-4 last:mr-0
							focus:ring-gray-400 justify-center h-[44px]"
						class:bg-zinc-900={modal.content?.length}
						class:hover:bg-gray-700={modal.content?.length}
						class:text-white={modal.content?.length}
						class:bg-gray-300={!modal.content?.length}
						class:hover:bg-gray-400={!modal.content?.length}
						class:text-gray-700={!modal.content?.length}
						class:cursor-not-allowed={!modal.content?.length || modal.loading}
						disabled={!modal.content?.length}
						on:click={updateChallenge}
					>
						{#if !modal.loading}
							Save
						{:else}
							<div
								class="w-3 h-3 rounded-full animate-ping"
								class:bg-white={!modal.content?.length}
								class:bg-gray-700={modal.content?.length}
							/>
						{/if}
					</button>
				</div>
			</div>
		</svelte:fragment>
	</Modal>
{/if}
