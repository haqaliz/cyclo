<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { type HealthScore } from '$types';
	import { Badge, Card } from '$components';

	export let value: HealthScore;
</script>

{#if value}
	<div class={twMerge('p-1 rounded-lg', $$restProps.class)}>
		<Card.Root class="h-full">
			<Card.Header>
				<Card.Title>
                    <div class="flex flex-row items-center">
                        <span class="mr-4">Health Score</span>
                        {#if !value.score}
                            <Badge>Data likely not submitted recently</Badge>
                        {/if}
                    </div>
                </Card.Title>
                {#if value.score !== null}
                    <Card.Description>
                        <Badge class={twMerge(
                            (value?.score > 75) && 'bg-sky-200',
                            (value?.score >= 25 && value?.score <= 75) && 'bg-orange-200',
                            (value?.score < 25) && 'bg-rose-200',
                        )} />
                    </Card.Description>
                {/if}
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col md:flex-row">
					<div class="flex flex-col h-full mb-4 md:mb-0 md:mr-4">
						<div
                            class={twMerge(
                                'rounded-lg border min-w-32 max-w-32 min-h-32 max-h-32\
                                flex flex-col items-center justify-center transition-colors\
                                ease-in-out duration-100',
                                (value?.score > 75) && 'bg-sky-200',
                                (value?.score >= 25 && value?.score <= 75) && 'bg-orange-200',
                                (value?.score < 25) && 'bg-rose-200',
                            )}
						>
                            <h2
                                class="scroll-m-20 text-3xl
                                font-semibold tracking-tight transition-colors
                                first:mt-0"
                            >
                                %{value.score?.toFixed(1)}
                            </h2>
                        </div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}