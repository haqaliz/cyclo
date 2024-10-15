<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { users_challenges } from '$firebase';
	import { user } from '$stores';
	import { Dialog, Button, Textarea } from '$components';
	import { slide } from 'svelte/transition';
	import { differenceInDays, startOfDay } from 'date-fns';

	let challenges: any;
	let loading = false;
	const update = async (userId: string) => {
		loading = true;
		challenges = await users_challenges.getAcceptedChallenges({
			user_id: userId,
		});
		loading = false;
	};
	user.subscribe(async (v: any) => {
		if (!v) return;
		await update(v.uid);
	});

	let modal: any = {
		show: false,
		ref: null,
		title: '',
		content: '',
		loading: false
	};
	const showChallengeModal = (chlng: any) => {
		const chlngIndex = differenceInDays(
			startOfDay(new Date()),
			startOfDay(new Date(chlng.created_at.seconds * 1000))
		);
		modal.ref = chlng;
		modal.title = `Day ${chlngIndex + 1}`;
		modal.content = chlng.content?.[chlngIndex]?.value ?? '';
		modal.show = true;
	};
	const updateChallenge = async () => {
		if (modal.loading) return;
		modal.loading = true;
		await users_challenges.updateUserChallenge({
			user_id: $user.uid,
			challenge_id: modal.ref?.challenge_id,
			content: modal.content,
		});
		modal.loading = false;
		modal.ref = null;
		modal.title = '';
		modal.content = '';
		modal.show = false;
		await update($user.uid);
	};
</script>

{#if challenges?.length}
	{#each challenges as chlng}
		{@const chlngIndex = differenceInDays(
			startOfDay(new Date()),
			startOfDay(new Date(chlng.created_at.seconds * 1000))
		)}
		{@const activeDay = chlngIndex + 1}
		<a
			in:slide
			out:slide
			data-sveltekit-reload
			class={twMerge(
				'flex flex-col lg:flex-row flex-wrap items-start transition-colors rounded-lg p-4\
				bg-zinc-950/10 overflow-hidden mb-4 last:mb-0 relative',
				$$restProps.class,
			)}
			href={`/challenges/${chlng.challenge.id}`}
		>
			<svg
				width="60"
				height="60"
				viewBox="0 0 120 120"
				class="absolute left-4 top-4 m-4 -rotate-90"
			>
				<circle
					cx="60"
					cy="60"
					r="54"
					class="fill-none stroke-zinc-950/10"
					style:stroke-width="12px"
				/>
				<circle
					class="fill-none stroke-purple-500"
					style:stroke-dasharray="100"
					style:stroke-dashoffset={`calc(100 - ${(activeDay * 100) / 7})`}
					style:stroke-width="12px"
					cx="60"
					cy="60"
					r="54"
					pathLength="100"
				/>
			</svg>
			<div
				class="flex flex-row items-center bg-zinc-950/10 p-4 rounded-lg justify-center flex-1 w-full lg:max-w-[350px]"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="h-full drag-none max-h-[250px]" src={chlng.challenge.img} />
			</div>
			<div class="flex flex-col flex-1 items-start mt-2 lg:mt-0 lg:ml-4">
				<span class="font-sans font-semibold text-3xl mb-4">
					{chlng.challenge.value}
				</span>
				<p class="flex-1 text-gray-700 text-lg mb-4">
					{chlng.challenge.objective}
				</p>
				<Button
					on:click={(e) => {
						e.stopPropagation();
						e.preventDefault();
						showChallengeModal(chlng);
					}}
				>
					{#if chlng.content?.[chlngIndex]}
						<i class="material-icons">check</i>
					{/if}
					Day {activeDay}
				</Button>
			</div>
		</a>
	{/each}

	<Dialog.Root bind:open={modal.show}>
		<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{modal.title}</Dialog.Title>
		</Dialog.Header>
		
		<div class="flex flex-col bg-white flex-1 rounded relative">
			<Textarea
				bind:value={modal.content}
				placeholder="Write&hellip;"
			/>
			<div class="flex flex-row items-end absolute right-4 bottom-4">
				<Button
					disabled={!modal.content?.length}
					on:click={updateChallenge}
				>
					{#if !modal.loading}
						Save
					{:else}
						<div
							class={twMerge(
								'w-3 h-3 rounded-full animate-ping',
								modal.content?.length ? 'bg-gray-700' : 'bg-white',
							)}
						/>
					{/if}
				</Button>
			</div>
		</div>
		<!-- share section -->
		<div class="flex flex-row mt-4">
			<Button
				variant="link"
				size="icon"
				href={`https://twitter.com/intent/tweet?text=${modal.title + ': ' + modal.content.substr(0, 144) + ' ' + window.location.href}&related=cyclo`}
				target="_blank"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
					<path
						d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
						class="fill-foreground"
					/>
				</svg>
			</Button>
		</div>

		</Dialog.Content>
	</Dialog.Root>
{/if}
