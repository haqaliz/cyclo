<script lang="ts">
	import { Tabs } from '$components';
	import { goto } from '$app/navigation';

	const tabs = ['Account', 'Preferences'];
	let selectTabItem = 'Account';
	$: {
		goto(`/profile/${selectTabItem.toLowerCase()}`);
	}
</script>

<div class="flex flex-col p-2 sm:p-4">
	<Tabs items={tabs} bind:selected={selectTabItem} tab-items-class="bg-gray-100 rounded p-2 sm:p-4">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		<svelte:fragment slot="content" let:selected={selectTabItem} />
	</Tabs>

	<slot />
</div>
