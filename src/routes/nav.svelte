<script lang="ts">
    import { Button, Modal } from '$components';
    import { user, pageTitle } from '$stores';
    import { _globals } from '$firebase';
	import { signOut } from "firebase/auth";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    let show = false;
	const logout = async () => {
		await signOut(_globals.auth);
		user.set(null);
        goto('/');
	};
    $: {
        if ($page.url.pathname === '/calendar') {
            $pageTitle = 'Calendar';
        } else if ($page.url.pathname === '/calendar/detail') {
            $pageTitle = 'Calendar Detail';
        } else if ($page.url.pathname === '/analytics') {
            $pageTitle = 'Analytics';
        } else if ($page.url.pathname === '/insight') {
            $pageTitle = 'Insight';
        } else if ($page.url.pathname === '/profile/account') {
            $pageTitle = 'Profile Account';
        } else if ($page.url.pathname === '/profile/preferences') {
            $pageTitle = 'Profile Preferences';
        } else if ($page.url.pathname === '/profile/notifications') {
            $pageTitle = 'Profile Notifications';
        }
    }
</script>

<div class="bg-purple-200 flex flex-row items-center p-4">
    <Button type="text" href="/" class="group/logo">
        <svg
            height="20"
            viewBox="0 0 39 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.0051 0.100752C18.7683 0.0936285 18.5326 0.137615 18.3142 0.229889C18.0958 0.322162 17.8998 0.46056 17.7398 0.635739C16.2213 2.29857 15.0249 4.01029 14.1946 5.76668C12.487 4.5788 10.4461 3.63136 8.10957 2.89404C7.89167 2.82531 7.66181 2.80265 7.43484 2.82743C7.20777 2.85221 6.98827 2.92393 6.79037 3.03812C6.59246 3.15231 6.42036 3.30654 6.28528 3.49119C6.15021 3.67582 6.0552 3.8867 6.00652 4.11039C5.3713 7.03043 5.2666 9.73888 5.78906 12.1846C4.38776 12.2385 2.91987 12.438 1.39192 12.7727C1.16908 12.8215 0.958487 12.9161 0.773881 13.0508C0.589331 13.1854 0.434783 13.3571 0.320291 13.555C0.205771 13.7529 0.1339 13.9726 0.109413 14.2001C0.0849222 14.4276 0.108387 14.6576 0.178241 14.8754C1.60381 19.3179 3.91056 22.6774 7.24652 24.5677C10.4939 26.4077 14.5018 26.7306 19.1001 25.7076C23.6983 26.7305 27.7061 26.4077 30.9535 24.5677C34.2895 22.6774 36.5962 19.318 38.0217 14.8755C38.0916 14.6577 38.1151 14.4276 38.0906 14.2001C38.0661 13.9726 37.9942 13.7529 37.8797 13.555C37.7652 13.3571 37.6107 13.1854 37.4261 13.0508C37.2415 12.9161 37.031 12.8215 36.8082 12.7727C35.2161 12.424 33.6893 12.2224 32.235 12.1791C32.7561 9.73482 32.651 7.02826 32.0162 4.11045C31.9675 3.88676 31.8725 3.67581 31.7374 3.49119C31.6023 3.30654 31.4302 3.15231 31.2323 3.03812C31.0344 2.92393 30.8149 2.85221 30.5879 2.82743C30.3609 2.80265 30.1311 2.82528 29.9132 2.89401C27.5699 3.63348 25.5238 4.58423 23.8132 5.77698C22.9392 4.02775 21.7103 2.31232 20.1682 0.632484C20.0195 0.470591 19.8399 0.340189 19.6402 0.248951C19.4404 0.157691 19.2244 0.107359 19.0051 0.100752ZM29.3292 21.7142C27.262 22.8855 24.6313 23.3079 21.2696 22.782C22.4638 19.7732 24.1318 17.8283 26.2029 16.699C27.7362 15.8629 29.5779 15.4317 31.7708 15.4496C32.5499 15.4559 33.3734 15.5195 34.2419 15.6417C33.0166 18.5854 31.3668 20.5597 29.3292 21.7142ZM8.87091 21.7142C6.83338 20.5597 5.1834 18.5854 3.95807 15.6418C4.82657 15.5196 5.64989 15.456 6.42894 15.4496C8.62142 15.4316 10.4625 15.8629 11.9955 16.699C14.0661 17.8282 15.7341 19.7731 16.9297 22.7821C13.5684 23.3079 10.938 22.8855 8.87091 21.7142ZM19.2344 19.0338C21.2576 16.497 22.1162 14.0854 22.0632 11.7362C22.0102 9.38353 21.0276 6.90646 18.9629 4.28115C17.0114 6.81239 16.1185 9.22321 16.1331 11.5564C16.1479 13.9219 17.0952 16.3992 19.2344 19.0338ZM7.92877 9.16918C7.91221 8.2816 7.97273 7.34495 8.11118 6.35829C8.13962 6.15564 8.17134 5.95088 8.20636 5.744C8.00085 6.95811 7.90881 8.0993 7.92877 9.16918ZM9.23181 12.372C8.73422 10.7509 8.60847 8.85607 8.89631 6.6571C10.5852 7.33551 11.9784 8.13647 13.0911 9.04429C12.9223 9.88208 12.8387 10.7267 12.844 11.5768C12.8481 12.2309 12.9049 12.883 13.0134 13.5323C11.8399 12.9674 10.5758 12.5846 9.23181 12.372ZM25.0004 8.98825C26.1015 8.10344 27.4722 7.32152 29.1264 6.65709C29.416 8.86982 29.2869 10.7746 28.7815 12.4024C27.5322 12.6159 26.3533 12.9785 25.2534 13.4998C25.3324 12.8899 25.3654 12.2772 25.3516 11.6623C25.3314 10.7653 25.2127 9.87353 25.0004 8.98825Z"
                class="transition-all ease-in-out duration-300 fill-zinc-950 group-hover/logo:fill-zinc-50"
            />
        </svg>
            
		Cyclo
	</Button>
    <div class="flex-1" />
    {#if $user}
        <h2 class="
            text-2xl font-semibold text-center -ml-8 max-w-32
            md:max-w-96 xl:max-w-max text-ellipsis
            overflow-hidden whitespace-nowrap
        ">{$pageTitle}</h2>
        <div class="flex-1" />
        <Button icon="menu" title="Menu" on:click={() => show = true} />
        <Modal bind:show title="Menu">
            <Button
                title={$user.name ?? $user.email}
                href="/profile/account"
                class="mb-4"
                on:click={() => show = false}
            >
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src={$user.profile} class="w-6 h-6 rounded drag-none mr-2" />
                {$user.name ?? $user.email}
            </Button>
            <Button
                title="Calendar"
                href="/calendar"
                icon="today"
                class="mb-4"
                disabled={$page.url.pathname.match(/^\/calendar$/i)}
                on:click={() => show = false}
            >
                Calendar
            </Button>
            <Button
                title="Analytics"
                href="/analytics"
                icon="analytics"
                class="mb-4"
                disabled={$page.url.pathname.match(/^\/analytics$/i)}
                on:click={() => show = false}
            >
                Analytics
            </Button>
            <Button
                title="Insight"
                href="/insight"
                icon="school"
                class="mb-4"
                disabled={$page.url.pathname.match(/^\/insight$/i)}
                on:click={() => show = false}
            >
                Insight
            </Button>
            <div class="flex-1" />
            <Button icon="logout" title="Logout" on:click={logout} />
        </Modal>
    {:else}
        <Button href="/login">Join Us</Button>
    {/if}
</div>