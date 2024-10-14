<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$stores';
	import { Label, Button, Avatar, Sheet, Tooltip } from '$components';
	import { _globals } from '$firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	$: userPreferedName = ($user?.name ?? $user?.email ?? '');
	$: shortUserName = userPreferedName.split(' ').reduce((a: string, i: any) => {
		a += i?.[0]?.toUpperCase() ?? '';
		return a;
	}, '');
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
		<Sheet.Header>
			<Sheet.Title>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button variant="link" href="/profile/account">
							<Avatar.Root>
								<Avatar.Image src={$user?.profile} alt={shortUserName} />
								<Avatar.Fallback>{shortUserName}</Avatar.Fallback>
							</Avatar.Root>
							<Label class="text-xl font-semibold ml-2">
								{userPreferedName.length > 20
									? `${userPreferedName.substr(0, 20)}...`
									: userPreferedName}
							</Label>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						{userPreferedName}
					</Tooltip.Content>
				  </Tooltip.Root>
			</Sheet.Title>
			<Sheet.Close class="hidden" />
		</Sheet.Header>

		<div class="flex flex-col flex-1 my-4">
			{#if $user}
				<Button
					title="Calendar"
					variant="ghost"
					href="/calendar"
					disabled={$page.url.pathname.match(/^\/calendar$/i)}
					class="justify-start mb-2"
					on:click={() => (show = false)}
				>
					<i class="material-icons mr-2">today</i>
					Calendar
				</Button>
				<Button
					title="Analytics"
					variant="ghost"
					href="/analytics"
					disabled={$page.url.pathname.match(/^\/analytics$/i)}
					class="justify-start mb-2"
					on:click={() => (show = false)}
				>
					<i class="material-icons mr-2">analytics</i>
					Analytics
				</Button>
				<Button
					title="Insight"
					variant="ghost"
					href="/insight"
					disabled={$page.url.pathname.match(/^\/insight$/i)}
					class="justify-start mb-2"
					on:click={() => (show = false)}
				>
					<i class="material-icons mr-2">school</i>
					Insight
				</Button>
				<Button
					title="Challenges"
					variant="ghost"
					href="/challenges"
					disabled={$page.url.pathname.match(/^\/challenges$/i)}
					class="justify-start mb-2"
					on:click={() => (show = false)}
				>
					<i class="material-icons mr-2">spa</i>
					Challenges
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
