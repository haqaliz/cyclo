<svelte:head>
	<title>404 | Not Found</title>
	<meta
		name="description"
		content="Oops! Lost in cyberspace? Our 404 page guides you back to your menstrual health journey with ease."
	/>
	<style>
		body {
			background-color: #e9d5ff;
		}
	</style>
</svelte:head>

<div class="flex flex-col h-[calc(100vh-80px-303px)] items-center justify-center p-2 mt-2 sm:mt-4">
	<div
		class={`
            bg-cover bg-no-repeat bg-center w-[256px] h-[512px] rounded relative
            flex flex-row items-center justify-center overflow-hidden mb-2 sm:mb-4
        `}
		style:background-image="url(/img/misc/lost.webp)"
	/>
	<div class="flex flex-col w-full sm:w-auto mb-2 sm:mb-4">
		<div
			class="p-2 rounded font-sans font-medium text-lg flex items-center bg-purple-400 text-black"
		>
			<i class="material-icons mr-2">info</i>
			Seems you're lost.
		</div>
	</div>
	<a
		href="/"
		class="p-2 rounded font-sans font-medium text-lg focus:outline-none focus:ring-2
	focus:ring-opacity-75 ease-in-out duration-300 flex flex-row items-center bg-zinc-900 text-white hover:bg-gray-700 focus:ring-gray-400 justify-center"
	>
		Go To Home
	</a>
</div>
