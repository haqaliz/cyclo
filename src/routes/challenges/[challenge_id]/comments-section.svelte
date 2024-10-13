<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { user as usr } from '$stores';
	import { NewPost, SinglePostItem } from '$components';
	const dispatch = createEventDispatcher();
	export let challenge: any;
</script>

{#if $usr}
	<div class="flex flex-col mt-2 md:mt-4">
		<NewPost
			parentType="challenge"
			parentId={challenge?.id}
			placeholder="Comment"
			submitButtonText="Send"
			on:created={() => dispatch('change')}
		/>
	</div>
	{#if challenge.comments?.length}
		{#each challenge.comments as comment}
			<SinglePostItem post={comment} actions={true} on:deleted={() => dispatch('change')} />
		{/each}
	{/if}
{/if}
