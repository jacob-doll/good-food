<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="w-full mt-4">
	<h2 class="text-3xl">Account Settings</h2>
	<div class="divider" />
	<form method="POST" class="form-control gap-2 w-80">
		<span class="text-2xl">Update Password</span>
		<div class="input-group input-group-vertical">
			<span>Old Password</span>
			<input
				class="input input-bordered"
				type="password"
				name="oldPassword"
				placeholder="Password"
			/>
		</div>

		<div class="input-group input-group-vertical">
			<span>New Password</span>
			<input class="input input-bordered" type="password" name="password" placeholder="Password" />
		</div>

		<div class="input-group input-group-vertical">
			<span>Confirm New Password</span>
			<input
				class="input input-bordered"
				type="password"
				name="passwordConfirm"
				placeholder="Password"
			/>
		</div>

		<button class="btn btn-primary" type="submit">Update</button>
		{#if form?.msg}
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
					<span>{form?.msg}</span>
				</div>
			</div>
		{/if}
	</form>
</div>
