<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let foodItem = data.foodItem;

	let fat = foodItem.labelNutrients.fat?.value;
	let saturatedFat = foodItem.labelNutrients.saturatedFat?.value;
	let transFat = foodItem.labelNutrients.transFat?.value;
	let cholesterol = foodItem.labelNutrients.cholesterol?.value;
	let sodium = foodItem.labelNutrients.sodium?.value;
	let carbohydrates = foodItem.labelNutrients.carbohydrates?.value;
	let fiber = foodItem.labelNutrients.fiber?.value;
	let sugars = foodItem.labelNutrients.sugars?.value;
	let protein = foodItem.labelNutrients.protein?.value;
	let calcium = foodItem.labelNutrients.calcium?.value;
	let iron = foodItem.labelNutrients.iron?.value;
	let postassium = foodItem.labelNutrients.postassium?.value;
	let calories = foodItem.labelNutrients.calories?.value;
</script>

<div>
	<div class="card w-full bg-neutral shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{foodItem.description}</h2>
			<p>{foodItem.brandOwner}</p>
			<p>Ingredients: {foodItem.ingredients}</p>
			<p>Calories: {calories} per {foodItem.servingSize}{foodItem.servingSizeUnit}</p>
			<div class="divider" />
			<p>Protein: {protein}</p>
			<p>Carbs: {carbohydrates}</p>
			<p>Fat: {fat}</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Add</button>
			</div>
		</div>
	</div>

	<div class="overflow-auto pt-4">
		<table class="table table-compact table-fixed w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Nutrient</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Fat</td>
					<td>{fat || 0}</td>
				</tr>
				<tr>
					<td>Saturated Fat</td>
					<td>{saturatedFat || 0}</td>
				</tr>
				<tr>
					<td>Trans Fat</td>
					<td>{transFat || 0}</td>
				</tr>
				<tr>
					<td>Cholesterol</td>
					<td>{cholesterol || 0}</td>
				</tr>
				<tr>
					<td>Sodium</td>
					<td>{sodium || 0}</td>
				</tr>
				<tr>
					<td>Carbohydrates</td>
					<td>{carbohydrates || 0}</td>
				</tr>
				<tr>
					<td>Fiber</td>
					<td>{fiber || 0}</td>
				</tr>
				<tr>
					<td>Sugars</td>
					<td>{sugars || 0}</td>
				</tr>
				<tr>
					<td>Protein</td>
					<td>{protein || 0}</td>
				</tr>
				<tr>
					<td>Calcium</td>
					<td>{calcium || 0}</td>
				</tr>
				<tr>
					<td>Iron</td>
					<td>{iron || 0}</td>
				</tr>
				<tr>
					<td>Postassium</td>
					<td>{postassium || 0}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
