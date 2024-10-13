<script lang="ts">
    import { user } from '$stores';
    import { Card, Avatar } from '$components';
    $: shortUserName = ($user?.name ?? $user?.email ?? '')
		.split(' ')
		.reduce((a, i) => {
			a += i?.[0]?.toUpperCase() ?? '';
			return a;
		}, '');
</script>

{#if $user}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gric-cols-4 bg-foreground/10 rounded-lg p-4"
    >
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row items-center">
                    <Avatar.Root class="mr-4">
                        <Avatar.Image
                            src={$user.profile}
                            alt={shortUserName}
                        />
                        <Avatar.Fallback>{shortUserName}</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="flex flex-col">
                        <Card.Title>{$user.name}</Card.Title>
                    </div>
                </div>
            </Card.Header>
            <Card.Content>
                <strong>Email:</strong> {$user.email}
            </Card.Content>
        </Card.Root>
    </div>
{/if}
