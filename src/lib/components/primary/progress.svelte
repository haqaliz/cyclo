<script lang="ts">
	export let progressBarClass: string = '';
</script>

<div class="w-full h-2 bg-gray-200 rounded-sm overflow-hidden">
	<div
		class={`w-full h-full rounded-sm bg-purple-400 origin-[0%_50%] animate-bar ${progressBarClass}`}
	/>
</div>

<style>
	.animate-bar {
		animation: bar 1s infinite linear;
	}

	@keyframes bar {
		0% {
			transform: translateX(0) scaleX(0);
		}

		40% {
			transform: translateX(0) scaleX(0.4);
		}

		100% {
			transform: translateX(100%) scaleX(0.5);
		}
	}
</style>
