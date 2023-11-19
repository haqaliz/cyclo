<script lang="ts">
    import ConversationsList from "./conversations-list.svelte";
    import Conversation from "./conversation/index.svelte";
</script>

<div class="p-2 sm:p-4 max-h-max flex flex-col md:flex-row">
    <div class="md:min-w-[350px] md:max-w-[350px] md:mr-4">
        <ConversationsList />
    </div>
    <Conversation />
</div>