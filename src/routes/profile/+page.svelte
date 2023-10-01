<script lang="ts">
	import { user as usr } from '$stores';
	interface User {
		email: string;
	}
	let user: User | null;
	usr.subscribe((v) => {
		if (!v) return;
		user = structuredClone(v);
	});
</script>

{#if user}
	<div class="flex flex-col p-2 sm:p-4">
		<div class="flex flex-col bg-gray-100 rounded p-2 sm:p-4">
			<label for="" class="text-lg font-semibold mb-2">Email</label>
			<input
				bind:value={user.email}
				type="email"
				placeholder="Email"
				disabled
				class="p-2 rounded bg-white font-sans font-medium text-lg border-2 resize-none"
			/>
		</div>
	</div>
{/if}
