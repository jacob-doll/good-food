<!-- <script lang="ts">
	import { currentUser, pb } from '$lib/store';

	let name: string = $currentUser?.name;

	async function updateProfile() {
		if (!$currentUser) return;
		await pb.collection('users').update($currentUser.id, {
			name
		});
	}
</script>

<form on:submit|preventDefault class="form-control gap-2 pt-4 px-4 md:w-1/2 md:mx-auto">
	<h1 class="text-3xl">Profile: {$currentUser?.username}</h1>

	<span>Name</span>
	<input
		type="text"
		placeholder={$currentUser?.name}
		class="input input-bordered"
		bind:value={name}
	/>

	<span>Avatar</span>
	<input type="file" class="file-input w-full max-w-xs" />

	<button class="btn btn-primary" type="button" on:click={updateProfile}>Update</button>
</form> -->
