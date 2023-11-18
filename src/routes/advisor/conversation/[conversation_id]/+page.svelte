<script lang="ts">
    import ConversationsList from "../../conversations-list.svelte";
    import Conversation from "../index.svelte";

    /** @type {import('./$types').PageData} */
	export let data: any;
</script>

<div class="p-2 sm:p-4 h-[calc(100vh-80px)] grid grid-flow-row-dense grid-cols-4 gap-4">
    <ConversationsList />
    <div class="col-span-4 md:col-span-3">
        <Conversation conversationId={data?.conversation_id} />
    </div>
</div>