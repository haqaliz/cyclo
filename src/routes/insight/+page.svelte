<script lang="ts">
    import topics from './topics';
</script>

<div class="flex flex-col mb-2 sm:mb-4">
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
</div>