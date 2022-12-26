<script lang="ts">
	import { pb } from '$lib/store';

	let username: string;
	let password: string;

	async function login() {
		await pb.collection('users').authWithPassword(username, password);
		window.location.href = '/';
	}
</script>

<form on:submit|preventDefault class="form-control gap-2 pt-4 px-4 md:w-1/2 md:mx-auto">
	<h1 class="text-3xl text-center">Login</h1>
	<input
		class="input input-bordered"
		placeholder="Username"
		required={true}
		bind:value={username}
	/>
	<input
		class="input input-bordered"
		type="password"
		placeholder="Password"
		required={true}
		bind:value={password}
	/>
	<button class="btn btn-primary" type="button" on:click={login}>Login</button>
</form>
