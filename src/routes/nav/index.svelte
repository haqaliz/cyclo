<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$api';
	import { user } from '$stores';
	import { slide } from 'svelte/transition';
	import Menu from './menu.svelte';

	let items: any[] = [];
	let show = false;

	user.subscribe((v) => {
		if (!v) {
			items = [
				{
					name: 'Join Us',
					path: '/explore'
				},
				{
					name: 'Join Us',
					path: '/signup'
				}
			];
			return;
		}
		items = [
			{
				name: 'Calendar',
				path: '/calendar'
			},
			{
				name: 'Analytics',
				path: '/analytics'
			},
			{
				name: 'Insight',
				path: '/insight'
			},
			// {
			// 	name: 'Explore',
			// 	path: '/explore'
			// },
			{
				icon: 'person',
				title: 'Profile',
				path: '/profile',
			},
			{
				icon: 'logout',
				title: 'Logout',
				onClick: async () => {
					await auth.logout();
					user.set(null);
					await goto('/');
				}
			}
		];
	});
</script>

<div class="bg-purple-200 flex flex-row items-center p-2 sm:p-4">
	<a
		href="/"
		class="
			flex flex-row items-center select-none hover:bg-black
			hover:bg-opacity-10 transition-colors ease-in-out rounded p-2
		"
	>
		<div
			class="bg-cover bg-no-repeat bg-center w-[39px] h-[27px] mr-2"
			style:background-image="url(/img/misc/cyclo-logo.svg)"
		/>
		<h3 class="font-sans font-semibold text-2xl">Cyclo</h3>
	</a>
	<div class="flex-1" />
	<button
		class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
	focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center md:hidden"
		on:click={() => (show = !show)}
	>
		<i class="material-icons">menu</i>
	</button>

	<div in:slide out:slide class="hidden flex-row md:flex">
		<Menu {items} />
	</div>
</div>

{#if show}
	<div in:slide out:slide class="flex flex-col">
		<div
			class="md:hidden bg-purple-200 flex flex-row items-center p-2 overflow-x-scroll hide-scrollbar"
		>
			<Menu {items} />
		</div>
	</div>
{/if}
