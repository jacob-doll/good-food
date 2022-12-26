<script lang="ts">
	import '../app.css';
	import { currentUser, pb } from '$lib/store';

	function signOut() {
		pb.authStore.clear();
	}

	function getAvatar(): string {
		return `https://jacob-doll.com/api/files/${$currentUser?.collectionId}/${$currentUser?.id}/${$currentUser?.avatar}`;
	}
</script>

<div class="navbar bg-primary">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">Good Food</a>
	</div>
	{#if $currentUser}
		<div class="flex-none gap-2">
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-circle avatar">
					{#if $currentUser.avatar}
						<img class="rounded-full" src={getAvatar()} alt="User Avatar" />
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 rounded-full"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
					{/if}
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul tabindex="0" class="dropdown-content menu mt-3 p-2 shadow bg-neutral rounded-box w-52">
					<li><button on:click={signOut}>Sign Out</button></li>
				</ul>
			</div>
		</div>
	{:else}
		<div class="flex-none gap-2">
			<a class="btn btn-secondary" href="/login">Login</a>
			<a class="btn" href="/signup">Sign-Up</a>
		</div>
	{/if}
</div>

<div class="h-screen container mx-auto px-4 md:px-0">
	<slot />
</div>
