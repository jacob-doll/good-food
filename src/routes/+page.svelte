<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full mt-4">
	<h1 class="text-center text-3xl">0/{data.goals?.calories} Cals</h1>
	<progress class="progress progress-primary w-full " value="1000" max={data.goals?.calories} />

	<div class="card w-full bg-neutral shadow-xl mt-4">
		<div class="card-body">
			<h2 class="card-title">Macros</h2>
			<p>Protein</p>
			<progress class="progress progress-primary w-full " value="10" max={data.goals?.protein} />
			<p>Carbs</p>
			<progress class="progress progress-primary w-full " value="10" max={data.goals?.carbs} />
			<p>Fat</p>
			<progress class="progress progress-primary w-full " value="10" max={data.goals?.fat} />
		</div>
	</div>
</div>

<div>TODO</div>
