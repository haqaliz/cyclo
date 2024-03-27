<script lang="ts">
	import { clickOutside, inject } from '$directives';
	import { twMerge } from 'tailwind-merge';
	import Button from './button.svelte';

	export let containerClass = '';
	export let show = false;
	export let title = '';
</script>

{#if show}
	<!-- Modal -->
	<div
		use:inject
		class="
			bg-zinc-950/20 backdrop-blur-lg p-2 sm:p-4 fixed inset-0 flex flex-row items-center justify-center z-40
			before:fixed before:inset-0 before:content-[''] before:cursor-pointer
		"
	>
		<div
			class={twMerge(
				`bg-zinc-100 rounded-lg flex flex-col p-2 sm:p-4 z-[2]
				w-full h-full sm:w-auto sm:h-auto sm:min-w-[30%] sm:min-h-[320px]
				overflow-y-scroll hide-scrollbar`,
				containerClass
			)}
			use:clickOutside
			on:outclick={() => (show = false)}
		>
			<div class="flex flex-row items-center text-zinc-950">
				{#if title?.length}
					<h1 class="font-sans font-semibold text-3xl">{title}</h1>
				{:else if $$slots.title}
					<slot name="title" />
				{/if}
				<div class="flex-1" />
				<Button icon="close" on:click={() => (show = false)} />
			</div>

			{#if $$slots.default}
				<div class="flex flex-col mt-2 sm:mt-4 flex-1 text-zinc-950">
					<slot />
				</div>
			{/if}
		</div>
	</div>
{/if}
