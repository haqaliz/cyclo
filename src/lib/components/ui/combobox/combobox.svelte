<script lang="ts">
	import * as Command from '../command';
	import * as Popover from '../popover';
	import { Button } from '../button';
	import { ScrollArea } from '../scroll-area';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	export let options: any = [];
	export let placeholder: string = 'Select ...';
	export let value: string | null = '';

	let open = false;

	type Option = {
		value: string;
		label: string;
	};
	$: selectedValue = options.find((f: Option) => f.value === value)?.label ?? placeholder;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-full justify-between"
		>
			{selectedValue}
			<i class="material-icons text-border">expand_more</i>
		</Button>
	</Popover.Trigger>
	<Popover.Content class={cn(
        'w-full mt-2 p-0',
        $$restProps['content-class']
    )} >
		<Command.Root>
			<Command.Input placeholder="Search ..." />
			<Command.Empty>No item found.</Command.Empty>
			<Command.Group>
				<ScrollArea class="h-32">
					{#each options as option}
						<Command.Item
							value={option.value}
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							<i
								class={cn(
									'material-icons mr-2 h-4 w-4',
									value !== option.value && 'text-transparent'
								)}
							>
								check
							</i>
							{option.label}
						</Command.Item>
					{/each}
				</ScrollArea>
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
