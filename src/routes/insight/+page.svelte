<script lang="ts">
    import { user } from '$stores';
    import topics from './topics';
</script>

<div class="flex flex-col mb-2 sm:mb-4">
    {#if $user?.subscription}
        {#each topics as topic}
            <h3 class="font-sans font-semibold text-3xl ml-2 sm:ml-4 mt-2 sm:mt-4">{topic?.name}</h3>
            <div class="flex flex-row mt-2 sm:mt-4 overflow-x-scroll hide-scrollbar">
                {#each (topic?.items ?? []) as item, k}
                    {@const extraClasses = item?.classes ?? 'bg-gray-200 hover:bg-gray-300'}
                    <a
                        href={item?.link}
                        class={`${extraClasses} transition-colors rounded p-2 sm:p-4 min-w-[280px] sm:min-w-[250px] mr-2 sm:mr-4 cursor-pointer`}
                        class:ml-2={k === 0}
                        class:sm:ml-4={k === 0}
                    >
                        <span class="font-sans font-semibold text-base sm:text-lg">
                            {item?.name}
                        </span>
                    </a>
                {/each}
            </div>
        {/each}
    {:else}
        <div class="flex flex-col items-center justify-center mt-2 sm:mt-4">
            <div
                class={`
                    bg-cover bg-no-repeat bg-center w-[256px] h-[264px] rounded relative
                    flex flex-row items-center justify-center overflow-hidden
                `}
                style:background-image="url(/img/misc/subscribe.png)"
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