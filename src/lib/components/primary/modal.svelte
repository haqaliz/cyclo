<script lang="ts">
	import { clickOutside, inject } from '$directives';

	export let trigger = true;
	export let triggerTooltip = '';
	export let triggerClass = `p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
            focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400`;
	export let containerClass = '';
	export let show = false;
	export let title = '';
</script>

<!-- Modal -->
{#if trigger}
	<button class={triggerClass} title={triggerTooltip} on:click={() => (show = !show)}>
		<slot name="trigger" />
	</button>
{/if}

{#if show}
	<div
		use:inject
		class="
			bg-black/75 p-2 sm:p-4 fixed inset-0 z-[1] flex flex-row items-center justify-center
			before:fixed before:inset-0 before:content-[''] before:cursor-pointer
		"
	>
		<div
			class={`
				bg-white rounded flex flex-col p-2 sm:p-4 z-[2]
				w-full h-full sm:w-auto sm:h-auto sm:min-w-[30%] sm:min-h-[320px]
				${containerClass ?? ''}
			`}
			use:clickOutside
			on:outclick={() => (show = false)}
		>
			<div class="flex flex-row items-center">
				{#if title?.length}
					<h1 class="font-sans font-semibold text-3xl">{title}</h1>
				{:else if $$slots.title}
					<slot name="title" />
				{/if}
				<div class="flex-1" />
				<button
					class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
				focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-transparent text-black hover:bg-gray-50 ml-2 md:ml-4"
					on:click={() => (show = false)}
				>
					<i class="material-icons">close</i>
				</button>
			</div>

			{#if $$slots.content}
				<div class="flex flex-col mt-2 sm:mt-4 flex-1">
					<slot name="content" />
				</div>
			{/if}

			{#if $$slots.footer}
				<div class="flex flex-row mt-2 sm:mt-4">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
{/if}
