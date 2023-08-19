<script lang="ts">
    import { goto } from '$app/navigation';
    import { user, selectedProduct } from '$stores';
    import Plans from './plans.svelte';
    import Payment from './payment.svelte';
    import AlreadySubscribed from './already-subscribed.svelte';

    let subscribed = false;
    const paymentCompleted = async () => {
        subscribed = true;
        await user.get();
    }
</script>

<div class="p-2 sm:p-4">
    {#if !$user?.subscription}
        {#if !$selectedProduct}
            <Plans />
        {:else}
            {#if !subscribed}
                <Payment on:completed={paymentCompleted} />
            {:else}
                <div class="flex flex-col items-center">
                    <div
                        class={`
                            bg-contain bg-no-repeat bg-center w-[256px] h-[239px] rounded relative
                            flex flex-row items-center justify-center overflow-hidden mb-2 sm:mb-4
                        `}
                        style:background-image="url(/img/misc/support.webp)"
                    />
                    <div class="flex flex-col w-full sm:w-auto mb-2 sm:mb-4">
                        <div class="alert success">
                            <i class="material-icons mr-2">check</i>
                            Subscribed successfully.
                        </div>
                    </div>
                    <button
                        class="btn black justify-center w-full sm:w-auto px-8"
                        on:click={() => goto('/calendar')}
                    >
                        Back To Home
                    </button>
                </div>
            {/if}
        {/if}
    {:else}
        <AlreadySubscribed />
    {/if}
</div>