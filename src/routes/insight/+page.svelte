<script lang="ts">
    import { user } from '$stores';
    import topics from './topics';
</script>

<div class="flex flex-col mb-2 sm:mb-4">
    {#if $user?.subscription}
        {#each topics as topic}
            {#if (topic.permission ? topic.permission.includes($user.subscription?.key) : true)}
                <h3 class="font-sans font-semibold text-3xl ml-2 sm:ml-4 mt-2 sm:mt-4">{topic?.name}</h3>
                <div class="flex flex-row mt-2 sm:mt-4 pl-2 sm:pl-4 overflow-x-scroll hide-scrollbar">
                    {#each (topic?.items ?? []) as item}
                        {@const extraClasses = item?.classes ?? 'bg-gray-200 hover:bg-gray-300'}
                        {#if (item.permission ?? []).includes($user.subscription?.key)}
                            <a
                                href={item?.link}
                                class={`
                                    ${extraClasses} transition-colors rounded p-2 sm:p-4
                                    min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer
                                    min-h-[180px] sm:min-h-[120px]
                                `}
                            >
                                <span class="font-sans font-semibold text-xl sm:text-lg">
                                    {item?.name}
                                </span>
                            </a>
                        {/if}
                    {/each}
                </div>
            {/if}
        {/each}
    {:else}
        <div class="flex flex-col items-center justify-center mt-2 sm:mt-4">
            <div
                class={`
                    bg-cover bg-no-repeat bg-center w-[256px] h-[264px] rounded relative
                    flex flex-row items-center justify-center overflow-hidden
                `}
                style:background-image="url(/img/misc/payment.webp)"
            />
            <a
                href="/subscribe"
                class="btn black justify-center mt-2 sm:mt-4"
            >
                Subscribe To Access
            </a>
        </div>
    {/if}
</div>