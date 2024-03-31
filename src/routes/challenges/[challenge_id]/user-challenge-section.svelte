<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { users_challenges } from '$firebase';
	import { Input, Button } from '$components';
	import { differenceInDays, startOfDay } from 'date-fns';
	import { user } from '$stores';

	const dispatch = createEventDispatcher();
	export let challenge: any;
	let bar: any = {
		title: '',
		content: '',
		mode: 'view',
		show: false,
		loading: false
	};
	const updateChallenge = async () => {
		if (bar.loading) return;
		bar.loading = true;
		await users_challenges.updateUserChallenge({
			user_id: $user.uid,
			challenge_id: challenge.id,
			content: bar.content,	
		});
		bar.loading = false;
		bar.content = '';
		bar.show = false;
		dispatch('change');
	};
	let windowWidth = window.innerWidth;
	const resized = () => {
		windowWidth = window.innerWidth;
	};
</script>

<svelte:window on:resize={resized} />

<!-- Navigators of challenge -->
{#if challenge.user_challenge}
	{@const chlngIndex = differenceInDays(
		startOfDay(new Date()),
		startOfDay(new Date(challenge.user_challenge.created_at.seconds * 1000))
	)}
	<div
		in:slide
		out:slide
		class="flex flex-col md:flex-row items-start transition-colors rounded-lg p-4
        bg-zinc-950/10 mt-4 hide-scrollbar md:overflow-x-scroll"
		style:width={`calc(${windowWidth}px - (2 * ${windowWidth < 768 ? '0.5rem' : '1rem'}))`}
	>
		{#each [...Array(7).keys()] as k}
			{@const item = challenge.user_challenge?.content?.[k]}
			{@const btnColor = (() => {
				if (!item) {
					if (k === chlngIndex) {
						return 'black';
					} else {
						if (k < chlngIndex) return 'red';
						return 'yellow';
					}
				} else {
					if (k <= chlngIndex) return 'green';
				}
			})()}
			{@const btnIcon = (() => {
				if (item && k <= chlngIndex) {
					return 'check';
				} else if (!item && k < chlngIndex) {
					return 'close';
				} else if (!item && k !== chlngIndex) {
					return 'more_horiz';
				} else if (!item && k === chlngIndex) {
					return 'edit';
				}
			})()}
			<Button
				color={btnColor}
				icon={btnIcon}
				class={twMerge(
					'w-full sm:w-auto mr-4 last:mr-0 mb-4 last:mb-0 sm:mb-0',
					(!item || k > chlngIndex) ? 'cursor-not-allowed' : '',
				)}
				on:click={() => {
					if ((!item && k === chlngIndex) || (!!item && k <= chlngIndex)) {
						bar.title = `Day ${k + 1}`;
						bar.content = item?.value ?? '';
						bar.mode = k === chlngIndex ? 'edit' : 'view';
						bar.show = true;
					}
				}}
			>
				Day {k + 1}
			</Button>
		{/each}
	</div>
{/if}

<!-- Challenge day content -->
{#if bar.show}
	<div
		in:slide
		out:slide
		class="flex flex-col md:flex-row items-start transition-colors rounded-lg p-4
        bg-zinc-950/10 mt-4"
		style:max-width={`calc(${windowWidth}px - (2 * ${windowWidth < 768 ? '0.5rem' : '1rem'}))`}
	>
		{#if bar.mode === 'edit'}
			<div class="flex flex-col flex-1 w-full">
				<h3 class="font-semibold text-3xl mb-4">{bar.title}</h3>
				<div class="flex flex-col flex-1 w-full relative">
					<Input
						bind:value={bar.content}
						type="smart-textarea"
						placeholder="Write&hellip;"
						minRows={12}
						maxRows={16}
						class="min-w-[320px]"
					/>
					<div class="flex flex-row items-end absolute right-4 bottom-4">
						<Button disabled={!bar.content?.length} on:click={updateChallenge}>
							{#if !bar.loading}
								Save
							{:else}
								<div
									class={twMerge(
										'w-3 h-3 rounded-full animate-ping',
										bar.content?.length
											? 'bg-gray-700'
											: 'bg-white',
									)}
								/>
							{/if}
						</Button>
					</div>
				</div>
				<!-- share section -->
				<div class="flex flex-row mt-4">
					<Button
						href={`https://twitter.com/intent/tweet?text=${bar.title + ': ' + bar.content.substr(0, 144) + ' ' + window.location.href}&related=cyclo`}
						target="_blank"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
							<path
								d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
								class="fill-zinc-50"
							/>
						</svg>
					</Button>
				</div>
			</div>
		{:else}
			<div class="flex flex-col">
				<h3 class="font-semibold text-3xl mb-4">{bar.title}</h3>
				<p class="text-lg">
					{bar.content ?? ''}
				</p>
				<!-- share section -->
				<div class="flex flex-row mt-4">
					<Button
						href={`https://twitter.com/intent/tweet?text=${bar.title + ': ' + bar.content.substr(0, 144) + ' ' + window.location.href}&related=cyclo`}
						target="_blank"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[25px] h-[25px]">
							<path
								d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
								class="fill-zinc-50"
							/>
						</svg>
					</Button>
				</div>
			</div>
		{/if}
	</div>
{/if}
