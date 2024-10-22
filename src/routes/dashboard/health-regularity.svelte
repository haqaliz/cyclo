<script lang="ts">
	import type { HealthRegularity } from '$types';
    import { twMerge } from 'tailwind-merge';
	import { Card } from '$components';
    import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

    let range = {
		start: subMonths(startOfMonth(new Date()), 6),
		end: endOfMonth(new Date())
	};

	export let value: HealthRegularity;
</script>

{#if value}
	<div class={twMerge('p-1 rounded-lg', $$restProps.class)}>
		<Card.Root class="h-full">
			<Card.Header>
				<Card.Title>Regularity Frequency</Card.Title>
                <Card.Description>
                    {format(new Date(range.start), 'LLL')} -
                    {format(new Date(range.end), 'LLL')}
                </Card.Description>
			</Card.Header>
			<Card.Content>
                <div class="flex flex-col md:flex-row md:flex-wrap">
                    {#each value.cycles as item}
                        <Card.Root
                            class={twMerge(
                                'mr-4',
                                item.is_regular
                                    ? 'bg-sky-200'
                                    : 'bg-rose-200'
                            )}
                        >
                            <Card.Header>
                                <Card.Title>
                                    <div class="flex flex-row">
                                        {format(new Date(item.from * 1000), 'LLL, dd')}
                                        <i class="material-icons mx-1">chevron_right</i>
                                        {format(new Date(item.to * 1000), 'LLL, dd')}
                                    </div>
                                </Card.Title>
                                <Card.Description>
                                    {#if item.diff > 31}
                                        <div
                                            class="flex flex-row items-center justify-center bg-red-500 rounded-lg w-7 h-7 ml-2"
                                            title={`Seems you've not logged symptoms in ${item.diff} days`}
                                        >
                                            <i class="material-icons text-sm">priority_high</i>
                                        </div>
                                    {/if}
                                </Card.Description>
                            </Card.Header>

                            <Card.Content>
                                <h2
                                    class="scroll-m-20 text-3xl
                                    font-semibold tracking-tight transition-colors
                                    first:mt-0"
                                >
                                    {item.diff} days
                                </h2>
                            </Card.Content>
                        </Card.Root>
                    {/each}
                </div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
