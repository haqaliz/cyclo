<script lang="ts">
    import { user } from '$stores';
    import { Input } from '$components';
</script>

{#if $user}
	<div class="flex flex-col bg-zinc-950/10 rounded-lg p-4">
        <div class="flex flex-col rounded-lg w-32 h-32 bg-zinc-950/10 p-4 mb-4">
            {#if $user.profile}
                <!-- svelte-ignore a11y-missing-attribute -->
                <img
                    class="w-full h-full rounded-lg"
                    src={$user.profile}
                />
            {:else}
                <div class="flex flex-row w-full h-full items-center justify-center">
                    <i class="material-icons !text-6xl">person</i>
                </div>
            {/if}
        </div>
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-col min-w-[50px] flex-1 mb-2 md:mr-4 md:mb-4">
				<Input
					bind:value={$user.email}
                    label="Email"
                    disabled={true}
				/>
			</div>
			<div class="flex flex-col min-w-[50px] flex-1 mb-2 md:mr-4 md:mb-4">
				<Input
					bind:value={$user.name}
                    label="Name"
                    disabled={true}
				/>
			</div>
		</div>
	</div>
{/if}
