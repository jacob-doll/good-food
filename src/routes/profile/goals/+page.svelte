<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full mt-4">
	<h2 class="text-3xl">Goals</h2>
	<div class="divider" />
	<form method="POST" class="form-control gap-2 w-80">
		<div class="input-group input-group-vertical">
			<span>Calories</span>
			<input class="input input-bordered" name="calories" value={data.goals?.calories} />
		</div>
		<div class="input-group input-group-vertical">
			<span>Protein</span>
			<input class="input input-bordered" name="protein" value={data.goals?.protein} />
		</div>
		<div class="input-group input-group-vertical">
			<span>Carbs</span>
			<input class="input input-bordered" name="carbs" value={data.goals?.carbs} />
		</div>
		<div class="input-group input-group-vertical">
			<span>Fat</span>
			<input class="input input-bordered" name="fat" value={data.goals?.fat} />
		</div>
		<button class="btn btn-primary" type="submit">Update</button>
	</form>
</div>
