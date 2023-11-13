<script lang="ts">
    import { user } from '$api';
    import { browser } from '$app/environment';
    import { format } from 'date-fns';
    import { Progress } from '$components';

    let notifications: any = [];
    let loading = false;
    $: (async () => {
        if (!browser || loading || notifications?.length) return;
        loading = true;
        notifications = await user.getNotifications();
        loading = false;
    })();
</script>

<svelte:head>
	<title>Profile Notifications</title>
	<meta
		name="description"
		content="Manage your account notifications."
	/>
</svelte:head>

<div class="flex flex-col bg-gray-100 rounded p-2 sm:p-4">
    {#if loading}
        <Progress />
    {:else}
        {#if notifications.length}
            {#each notifications as notification}
                <div
                    class="flex flex-col transition-colors rounded p-2 sm:p-4 min-w-[280px] sm:min-w-[250px]
                    min-h-[180px] sm:min-h-[120px] bg-gray-300 hover:bg-gray-400 mb-2 md:mb-4 last:mb-0"
                >
                    <span class="font-sans font-semibold text-xl sm:text-lg">
                        {format(new Date(notification.created_at?.seconds * 1000), 'yyyy, dd LLL')}
                    </span>
                    <span class="font-sans font-semibold text-2xl sm:text-3xl capitalize">
                        {notification.type?.replace(/[-_ ]+/g, ' ')}
                    </span>
                    {#if notification.type === 'fertility_window'}
                        <div class="flex flex-row flex-wrap items-start mt-2 md:mt-4">
                            <span class="font-sans font-semibold text-base sm:text-lg bg-purple-200 p-2 rounded mb-2 md:mb-0 md:mr-4">
                                Start of Fertility Window:
                                {format(new Date(notification.start_of_fertility_window?.seconds * 1000), 'yyyy, dd LLL')}
                            </span>
                            <span class="font-sans font-semibold text-base sm:text-lg bg-purple-200 p-2 rounded">
                                Day: {notification.day}
                            </span>
                        </div>
                    {/if}
                    {#if notification.type === 'pms_symptoms'}
                        <div class="flex flex-row flex-wrap items-start mt-2 md:mt-4">
                            <span class="font-sans font-semibold text-base sm:text-lg bg-purple-200 p-2 rounded mb-2 md:mb-0 md:mr-4">
                                Start of Menstrual Cycle:
                                {format(new Date(notification.start_of_menstrual_cycle?.seconds * 1000), 'yyyy, dd LLL')}
                            </span>
                            <span class="font-sans font-semibold text-base sm:text-lg bg-purple-200 p-2 rounded">
                                Day: {notification.day}
                            </span>
                        </div>
                    {/if}
                </div>
            {/each}
        {:else}
            <div
                class="
                    p-2 sm:p-4 h-[46px] sm:h-[76px] transition-all ease-in-out duration-300 rounded font-sans text-xs sm:text-lg flex items-center
                    bg-yellow-300 font-semibold text-black
                "
            >
                <i class="material-icons mr-2">info</i>
                Not enough data
            </div>
        {/if}
    {/if}
</div>
