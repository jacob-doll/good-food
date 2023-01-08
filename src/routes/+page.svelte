<script lang="ts">
	import type { Meal, MealEntry } from 'src/lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let totalCals = data.entries.reduce((accum, meal) => {
		return (accum += meal.calories);
	}, 0);

	let totalProtein = data.entries.reduce((accum, meal) => {
		return (accum += meal.protein);
	}, 0);

	let totalCarbs = data.entries.reduce((accum, meal) => {
		return (accum += meal.carbs);
	}, 0);

	let totalFat = data.entries.reduce((accum, meal) => {
		return (accum += meal.fat);
	}, 0);

	interface MealMap {
		[type: string]: string;
	}

	var meals = data.meals.reduce(function (map: MealMap, meal: Meal) {
		map[meal.type] = meal.id;
		return map;
	}, {});

	let breakfast: MealEntry[] = data.entries.filter((entry: MealEntry) => {
		return entry.mealId === meals['breakfast'];
	});

	let lunch: MealEntry[] = data.entries.filter((entry: MealEntry) => {
		return entry.mealId === meals['lunch'];
	});

	let dinner: MealEntry[] = data.entries.filter((entry: MealEntry) => {
		return entry.mealId === meals['dinner'];
	});

	let snack: MealEntry[] = data.entries.filter((entry: MealEntry) => {
		return entry.mealId === meals['snack'];
	});
</script>

<div class="w-full mt-4">
	<h1 class="text-center text-3xl">{totalCals}/{data.goals?.calories} Cals</h1>
	<progress
		class="progress progress-primary w-full "
		value={totalCals}
		max={data.goals?.calories}
	/>

	<div class="card w-full bg-neutral shadow-xl mt-4">
		<div class="card-body">
			<h2 class="card-title">Macros</h2>
			<p>Protein: ({totalProtein}/{data.goals?.protein})</p>
			<progress
				class="progress progress-primary w-full "
				value={totalProtein}
				max={data.goals?.protein}
			/>
			<p>Carbs: ({totalCarbs}/{data.goals?.carbs})</p>
			<progress
				class="progress progress-primary w-full "
				value={totalCarbs}
				max={data.goals?.carbs}
			/>
			<p>Fat: ({totalFat}/{data.goals?.fat})</p>
			<progress class="progress progress-primary w-full " value={totalFat} max={data.goals?.fat} />
		</div>
	</div>

	<div class="card w-full bg-neutral shadow-xl mt-4">
		<div class="card-body">
			<div class="card-title">
				<div class="grow">Breakfast</div>
			</div>
			<table class="table table-fixed w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Calories</th>
						<th>Protein</th>
						<th>Carbs</th>
						<th>Fat</th>
					</tr>
				</thead>
				<tbody>
					{#each breakfast as breakfastItem}
						<tr>
							<td>{breakfastItem.name}</td>
							<td>{breakfastItem.calories}</td>
							<td>{breakfastItem.protein}</td>
							<td>{breakfastItem.carbs}</td>
							<td>{breakfastItem.fat}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="card w-full bg-neutral shadow-xl mt-4">
		<div class="card-body">
			<div class="card-title">
				<div class="grow">Lunch</div>
			</div>
			<table class="table table-fixed w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Calories</th>
						<th>Protein</th>
						<th>Carbs</th>
						<th>Fat</th>
					</tr>
				</thead>
				<tbody>
					{#each lunch as lunchItem}
						<tr>
							<td>{lunchItem.name}</td>
							<td>{lunchItem.calories}</td>
							<td>{lunchItem.protein}</td>
							<td>{lunchItem.carbs}</td>
							<td>{lunchItem.fat}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="card w-full bg-neutral shadow-xl mt-4">
		<div class="card-body">
			<div class="card-title">
				<div class="grow">Dinner</div>
			</div>
			<table class="table table-fixed w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Calories</th>
						<th>Protein</th>
						<th>Carbs</th>
						<th>Fat</th>
					</tr>
				</thead>
				<tbody>
					{#each dinner as dinnerItem}
						<tr>
							<td>{dinnerItem.name}</td>
							<td>{dinnerItem.calories}</td>
							<td>{dinnerItem.protein}</td>
							<td>{dinnerItem.carbs}</td>
							<td>{dinnerItem.fat}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="card w-full bg-neutral shadow-xl my-4">
		<div class="card-body">
			<div class="card-title">
				<div class="grow">Snacks</div>
			</div>
			<table class="table table-fixed w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Calories</th>
						<th>Protein</th>
						<th>Carbs</th>
						<th>Fat</th>
					</tr>
				</thead>
				<tbody>
					{#each snack as snackItem}
						<tr>
							<td>{snackItem.name}</td>
							<td>{snackItem.calories}</td>
							<td>{snackItem.protein}</td>
							<td>{snackItem.carbs}</td>
							<td>{snackItem.fat}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
