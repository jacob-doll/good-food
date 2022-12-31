<form method="POST" class="form-control mx-auto gap-2 sm:w-full lg:w-1/3 pt-4">
	<h1>Sign-Up</h1>
	<input class="input input-bordered" name="username" placeholder="Username" required={true} />
	<input class="input input-bordered" name="email" placeholder="Email" required={true} />
	<input
		class="input input-bordered"
		name="password"
		type="password"
		placeholder="Password"
		required={true}
	/>
	<input
		class="input input-bordered"
		name="passwordConfirm"
		type="password"
		placeholder="Confirm Password"
		required={true}
	/>
	<button class="btn btn-primary" type="submit">Sign-Up</button>
</form>
