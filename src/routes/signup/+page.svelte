<form method="POST" class="form-control gap-2 pt-4 px-4 md:w-1/2 md:mx-auto">
	<h1 class="text-3xl text-center">Sign-Up</h1>
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
