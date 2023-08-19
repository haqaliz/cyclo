<script lang="ts">
    import { page } from '$app/stores';
    import { user } from '$stores';
    import topics from '../topics';

    let isValid = null;
    user.subscribe((v) => {
        if (!v) return;
        topics.forEach((topic) => {
            // First level check is inside the topic
            if (isValid) return;
            if ((topic.permission ?? []).includes($user.subscription?.key)) {
                isValid = true;
                return;
            }
            // Second level check is inside the topic items
            topic.items.forEach((i) => {
                if ($page.url.pathname !== i?.link) return;
                if ((i.permission ?? []).includes(v?.subscription?.key)) {
                    console.log(i.permission)
                    isValid = true;
                    return;
                }
            });
        });
        if (isValid === null) isValid = false;
    })
</script>

{#if isValid === true}
    <slot />
{:else if isValid === false}
    <div class="flex flex-col items-center justify-center p-2 mt-2 sm:mt-4">
        <div
            class={`
                bg-cover bg-no-repeat bg-center w-[256px] h-[620px] rounded relative
                flex flex-row items-center justify-center overflow-hidden mb-2 sm:mb-4
            `}
            style:background-image="url(/img/misc/not-allowed.webp)"
        />
        <div class="flex flex-col w-full sm:w-auto mb-2 sm:mb-4">
            <div class="alert primary">
                <i class="material-icons mr-2">info</i>
                You're not allowed to this page.
            </div>
        </div>
        <a
            href="/calendar"
            class="btn black justify-center"
        >
            Go To Home
        </a>
    </div>
{:else}
    <div class="fixed inset-0 flex flex-row items-center justify-center">
        <span class="animate-ping inline-flex h-7 w-7 rounded-full bg-purple-300 opacity-75"></span>
    </div>
{/if}