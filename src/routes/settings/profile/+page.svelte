<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full">
	<div class="card w-full bg-neutral shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Goals</h2>

			<form method="POST" class="form-control gap-2">
				<p>Calories</p>
				<input class="input input-bordered" name="calories" value={data.goals?.calories} />
				<p>Protein</p>
				<input class="input input-bordered" name="protein" value={data.goals?.protein} />
				<p>Carbs</p>
				<input class="input input-bordered" name="carbs" value={data.goals?.carbs} />
				<p>Fat</p>
				<input class="input input-bordered" name="fat" value={data.goals?.fat} />
				<button class="btn btn-primary" type="submit">Save</button>
			</form>
		</div>
	</div>
</div>
