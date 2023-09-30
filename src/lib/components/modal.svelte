<script lang="ts">
	import { clickOutside, inject } from '$directives';

	export let trigger = true;
	export let triggerTooltip: string = '';
	export let triggerClass: string = 'btn black';
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
	<div use:inject class="modal">
		<div class="modal-container" use:clickOutside on:outclick={() => (show = false)}>
			<div class="header">
				{#if title?.length}
					<h1>{title}</h1>
				{/if}
				<div class="flex-1" />
				<button class="btn link black" on:click={() => (show = false)}>
					<i class="material-icons">close</i>
				</button>
			</div>

			{#if $$slots.content}
				<div class="content">
					<slot name="content" />
				</div>
			{/if}

			{#if $$slots.footer}
				<div class="footer">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
{/if}
