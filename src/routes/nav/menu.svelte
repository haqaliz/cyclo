<script lang="ts">
	import { page } from '$app/stores';
	interface MenuItem {
		name?: string;
		icon?: string;
		path?: string;
		onClick?: () => Promise<void>;
	}
	export let items: Array<MenuItem> = [];
</script>

{#each items as item}
	{#if item.path}
		<a
			href={item.path}
			class={`p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center justify-center mr-4 last:mr-0
                ${
									$page.url.pathname === item.path
										? 'bg-purple-400 text-black hover:bg-purple-800 focus:ring-purple-400'
										: 'bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400'
								}
                ${item.icon ? 'w-11 h-11' : ''}`}
		>
			{#if item.name}
				{item.name}
			{:else if item.icon}
				<i class="material-icons">{item.icon}</i>
			{/if}
		</a>
	{:else if item.onClick}
		<button
			class={`p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
                focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center
                bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center w-11 h-11
                ${item.icon ? 'w-11 h-11' : ''}`}
			on:click={item.onClick}
		>
			{#if item.name}
				{item.name}
			{:else if item.icon}
				<i class="material-icons">{item.icon}</i>
			{/if}
		</button>
	{/if}
{/each}
