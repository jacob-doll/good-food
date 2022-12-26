<script lang="ts">
	import { currentUser, pb } from '$lib/store';
	import { onMount } from 'svelte';

	interface Goals {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	}

	let goals: Goals;

	onMount(async () => {
		if (!$currentUser) {
			window.location.href = '/login';
		} else {
			goals = await pb.collection('goals').getFirstListItem(`user="${$currentUser.id}"`);
			console.log(goals);
		}
	});
</script>

<div class="w-full mt-4">
	<h1 class="text-center text-3xl">0/{goals?.calories} Cals</h1>
	<progress class="progress progress-primary w-full " value="1000" max={goals?.calories} />

	<div class="card w-full bg-neutral shadow-xl mt-4">
		<div class="card-body">
			<h2 class="card-title">Macros</h2>
			<p>Protein</p>
			<progress class="progress progress-primary w-full " value="10" max={goals?.protein} />
			<p>Protein</p>
			<progress class="progress progress-primary w-full " value="10" max={goals?.carbs} />
			<p>Protein</p>
			<progress class="progress progress-primary w-full " value="10" max={goals?.fat} />
		</div>
	</div>
</div>
