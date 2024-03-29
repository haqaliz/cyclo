<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { insights } from '$stores';
    import _ from 'lodash';

    let topics: any = null;

    insights.subscribe((v) => {
        if (!v) return;
        topics = _.groupBy(
            v
                .filter((i) => !i.deleted_at)
                .map((i) => ({
                    key: i.key,
                    name: i.name,
                    category: i.category,
                    classes: i.classes,
                })),
            'category',
        );
    });
</script>

<svelte:head>
	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

{#if topics}
    <div class="flex flex-col mb-4">
        {#each Object.keys(topics) as topicName}
            {@const topic = topics[topicName]}
            <h3 class="font-sans font-semibold text-3xl ml-4 mt-4">{topicName}</h3>
            <div class="flex flex-row mt-4 pl-4 overflow-x-scroll hide-scrollbar">
                {#each topic as item}
                    <a
                        href={`/insight/${item?.key}`}
                        class={twMerge(
                            `transition-colors rounded-lg p-4
                            min-w-[280px] sm:min-w-[250px] mr-4 cursor-pointer
                            min-h-[180px] sm:min-h-[120px]`,
                            item?.classes ?? 'bg-gray-200 hover:bg-gray-300',
                        )}
                    >
                        <span class="font-sans font-semibold text-lg">
                            {item?.name}
                        </span>
                    </a>
                {/each}
            </div>
        {/each}
    </div>
{/if}