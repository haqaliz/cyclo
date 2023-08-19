<script lang="ts">

</script>

<div class="flex flex-col items-center justify-center p-2 mt-2 sm:mt-4">
    <div
        class={`
            bg-cover bg-no-repeat bg-center w-[256px] h-[355px] rounded relative
            flex flex-row items-center justify-center overflow-hidden mb-2 sm:mb-4
        `}
        style:background-image="url(/img/misc/group-support.webp)"
    />
    <div class="flex flex-col w-full sm:w-auto mb-2 sm:mb-4">
        <div class="alert primary">
            <i class="material-icons mr-2">info</i>
            You've already subscribed.
        </div>
    </div>
    <a
        href="/calendar"
        class="btn black justify-center"
    >
        Go To Home
    </a>
</div>