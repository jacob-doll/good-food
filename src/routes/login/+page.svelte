<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<form method="POST" class="form-control gap-2 pt-4 px-4 md:w-1/2 md:mx-auto">
	<h1 class="text-3xl text-center">Login</h1>
	<input class="input input-bordered" name="username" placeholder="Username" required={true} />
	<input
		class="input input-bordered"
		name="password"
		type="password"
		placeholder="Password"
		required={true}
	/>
	<button class="btn btn-primary" type="submit">Login</button>
	{#if form?.notVerified}
		<div class="alert alert-error shadow-lg w-full max-w-md">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>You must verify your email before you can login.</span>
			</div>
		</div>
	{/if}
</form>
