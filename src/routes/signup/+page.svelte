<!-- <script lang="ts">
	import { pb } from '$lib/store';

	let username: string;
	let password: string;
	let confirmPassword: string;

	async function signUp() {
		try {
			const data = {
				username,
				password,
				passwordConfirm: password
			};
			const user = await pb.collection('users').create(data);
			await pb.collection('goals').create({
				user: user.id
			});
			await pb.collection('users').authWithPassword(username, password);
			window.location.href = '/';
		} catch (err) {
			console.error(err);
		}
	}
</script>

<form on:submit|preventDefault class="form-control mx-auto gap-2 sm:w-full lg:w-1/3 pt-4">
	<h1>Sign-Up</h1>
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
	<input
		class="input input-bordered"
		type="password"
		placeholder="Confirm Password"
		required={true}
		bind:value={confirmPassword}
	/>
	<button class="btn btn-primary" type="button" on:click={signUp}>Sign-Up</button>
</form> -->
