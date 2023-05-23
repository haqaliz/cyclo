<script lang="ts">
    const items = ['Mon','Teu','Wed','Thu','Fri','Sat','Sun'];
</script>

<div class="bg-gray-100 rounded p-2 flex flex-row">
    {#each items as item}
	<div class="flex flex-col flex-1">
		<span class="font-sans font-semibold text-2xl">{item}</span>
	</div>
    {/each}
</div>

<style>
</style>
