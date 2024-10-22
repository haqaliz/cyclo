<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$stores';
	import { Button, Sheet } from '$components';
	import { _globals } from '$firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	$: userPreferedName = ($user?.name ?? $user?.email ?? '');
	let show = false;
	const logout = async () => {
		await signOut(_globals.auth);
		user.set(null);
		goto('/');
	};
</script>

<Sheet.Root bind:open={show}>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon">
			<i class="material-icons">menu</i>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="flex flex-col">
		<div class="flex flex-col flex-1 my-4">
			{#if $user}
				<Button
					title="Dashboard"
					variant="ghost"
					href="/dashboard"
					disabled={$page.url.pathname.match(/^\/dashboard$/i)}
					class="justify-start mb-2"
					on:click={() => (show = false)}
				>
					<i class="material-icons mr-2">space_dashboard</i>
					Dashboard
				</Button>
				<Button
					title="Insights"
					variant="ghost"
					href="/insights"
					disabled={$page.url.pathname.match(/^\/insights$/i)}
					class="justify-start mb-2"
					on:click={() => (show = false)}
				>
					<i class="material-icons mr-2">school</i>
					Insights
				</Button>
			{/if}
		</div>

		{#if $user}
			<Sheet.Footer>
				<div class="flex flex-row">
					<Button size="icon" title="Logout" on:click={logout}>
						<i class="material-icons">logout</i>
					</Button>
				</div>
			</Sheet.Footer>
		{/if}
	</Sheet.Content>
</Sheet.Root>
